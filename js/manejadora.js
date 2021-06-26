"use strict";
var Manejadora = /** @class */ (function () {
    function Manejadora() {
        this.dom = new DOMtools();
        this.form = this.dom.$("container");
        this.autos = new Array();
        this.camionetas = new Array();
        this.formContainer = this.dom.$("formContainer");
    }
    /**
     * setId
  tipo:string   */
    Manejadora.prototype.setId = function (tipo) {
        var id;
        if (tipo == "auto") {
            if (this.autos.length == 0) {
                id = 1;
            }
            else {
                id = this.autos.reduce(function (max, curr) {
                    if (curr.id >= max) {
                        return curr.id + 1;
                    }
                    return max;
                }, 0);
            }
            return id;
        }
        else {
            if (this.camionetas.length == 0) {
                id = 1;
            }
            else {
                id = this.camionetas.reduce(function (max, curr) {
                    if (curr.id >= max) {
                        return curr.id + 1;
                    }
                    return max;
                }, 0);
            }
            return id;
        }
    };
    Manejadora.prototype.AgregarVehiculo = function () {
        var _a, _b;
        var form = new FormData(this.form);
        var tipo = form.get("tipoVehiculo");
        var vehiculo = {
            id: this.setId(tipo),
            marca: ((_a = form.get("marca")) === null || _a === void 0 ? void 0 : _a.toString().trim()) || "",
            modelo: ((_b = form.get("modelo")) === null || _b === void 0 ? void 0 : _b.toString().trim()) || "",
            precio: form.get("precio"),
            cantidadPuertas: form.get("cantPuertas"),
            tipo: form.get("tipoVehiculo"),
        };
        if (vehiculo.tipo == "auto") {
            this.autos.push(new Auto(vehiculo.id, vehiculo.marca, vehiculo.modelo, vehiculo.precio, vehiculo.cantidadPuertas));
        }
        else {
            this.camionetas.push(new Camioneta(vehiculo.id, vehiculo.marca, vehiculo.modelo, vehiculo.precio, true));
        }
        console.log(this.camionetas);
        console.log(this.autos);
        this.formContainer.style.display = "none";
    };
    Manejadora.prototype.OpenForm = function () {
        this.formContainer.style.display = "flex";
    };
    Manejadora.prototype.FiltrarPor = function () {
        var filtroTipo = this.dom.$("filtroXtipo");
        var tipo = filtroTipo.value;
        if (this.autos.length >= 1 || this.camionetas.length >= 1) {
            if (tipo == "auto") {
                this.dom.Tabla(this.autos);
            }
            else if (tipo == "camioneta") {
                //   let arr = this.camionetas.filter((c:Vehiculo) => (typeof c) == typeof Camioneta)
                this.dom.Tabla(this.camionetas);
            }
        }
        else {
            alert("Sin vehiculos");
        }
    };
    Manejadora.prototype.handleEvent = function (evt) {
        var target = evt.target;
        if (target.id == "btnAlta") {
            this.OpenForm();
        }
        else if (target.id == "btnAltaNueva") {
            this.AgregarVehiculo();
        }
        else if (target.id == "filtroXtipo") {
            console.log("here");
            this.FiltrarPor();
        }
    };
    return Manejadora;
}());
window.addEventListener("load", function (event) {
    event.preventDefault();
    var manejadora = new Manejadora();
    var filt = document.getElementsByName("filtros");
    filt.forEach(function (n) { return console.log(n.id); });
    var btnAlta = manejadora.dom.$("btnAlta");
    var btnAltaNueva = manejadora.dom.$("btnAltaNueva");
    btnAlta.addEventListener("click", function (event) { return manejadora.handleEvent(event); });
    btnAltaNueva.addEventListener("click", function (event) {
        return manejadora.handleEvent(event);
    });
    var tipo = manejadora.dom.$("filtroXtipo");
    tipo.addEventListener("change", function (event) { return manejadora.handleEvent(event); });
});
