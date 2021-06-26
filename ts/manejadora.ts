class Manejadora implements EventListenerObject {
  dom: DOMtools;
  form: HTMLFormElement;
  autos: Array<Auto>;
  camionetas: Array<Camioneta>;
  formContainer: HTMLElement;
  constructor() {
    this.dom = new DOMtools();
    this.form = <HTMLFormElement>this.dom.$("container");
    this.autos = new Array<Auto>();
    this.camionetas = new Array<Camioneta>();
    this.formContainer = this.dom.$("formContainer");
  }
  /**
   * setId
tipo:string   */
  public setId(tipo:string) :number{
      let id:number;
      if (tipo == "auto") {
          if (this.autos.length == 0) {
              id = 1;
            } else {
              id = this.autos.reduce((max, curr) => {
                if (curr.id >= max) {
                  return curr.id + 1;
                }
                return max;
              }, 0); 
          }
          return id;
      }else
      {
        if (this.camionetas.length == 0) {
            id = 1;
          } else {
            id = this.camionetas.reduce((max, curr) => {
              if (curr.id >= max) {
                return curr.id + 1;
              }
              return max;
            }, 0); 
        }
        return id;
      }
  }

  public AgregarVehiculo() {
    let form = new FormData(this.form);
    let tipo =<string>form.get("tipoVehiculo");
    let vehiculo = {
      id: this.setId(tipo),
      marca: form.get("marca")?.toString().trim() || "",
      modelo: form.get("modelo")?.toString().trim() || "",
      precio: <number><unknown>form.get("precio"),
      cantidadPuertas:<number><unknown> form.get("cantPuertas"),
      tipo: form.get("tipoVehiculo"),
    };
    if (vehiculo.tipo == "auto") {
      this.autos.push(
        new Auto(
          vehiculo.id,
          vehiculo.marca,
          vehiculo.modelo,
          vehiculo.precio,
          vehiculo.cantidadPuertas
        )
      );
    }
    else
    {
        this.camionetas.push(
            new Camioneta(
              vehiculo.id,
              vehiculo.marca,
              vehiculo.modelo,
              vehiculo.precio,
              true
            )
          );
    }
    console.log(this.camionetas);
    console.log(this.autos);
    
    this.formContainer.style.display = "none";
  }

  public OpenForm() {
    this.formContainer.style.display = "flex";
  }

  public FiltrarPor() {
      let filtroTipo = <HTMLSelectElement>this.dom.$("filtroXtipo");
      let tipo = filtroTipo.value;
      if (this.autos.length >= 1 || this.camionetas.length >= 1) {
        if (tipo == "auto") {
            this.dom.Tabla(this.autos)
        }else if (tipo == "camioneta")
        {
          //   let arr = this.camionetas.filter((c:Vehiculo) => (typeof c) == typeof Camioneta)
          this.dom.Tabla(this.camionetas)
        }
      }else{
          alert("Sin vehiculos");
      }
    
  }

  handleEvent(evt: Event): void {
    let target = <Element>evt.target;
    if (target.id == "btnAlta") {
      this.OpenForm();
    } else if (target.id == "btnAltaNueva") {
      this.AgregarVehiculo();
    }else if(target.id == "filtroXtipo"){
        console.log("here");
        
        this.FiltrarPor()
    }
  }
}

window.addEventListener("load", (event) => {
  event.preventDefault();
  let manejadora = new Manejadora();
  let filt = document.getElementsByName("filtros");
  filt.forEach((n) => console.log(n.id));
  let btnAlta = <HTMLElement>manejadora.dom.$("btnAlta");
  let btnAltaNueva = <HTMLElement>manejadora.dom.$("btnAltaNueva");
  btnAlta.addEventListener("click", (event) => manejadora.handleEvent(event));
  btnAltaNueva.addEventListener("click", (event) =>
    manejadora.handleEvent(event)
  );
  let tipo = <HTMLSelectElement>manejadora.dom.$("filtroXtipo");
  tipo.addEventListener("change", (event)  => manejadora.handleEvent(event));
});
