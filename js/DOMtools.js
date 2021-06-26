"use strict";
var DOMtools = /** @class */ (function () {
    function DOMtools() {
        this.divTabla = this.$("tabla");
    }
    DOMtools.prototype.$ = function (el) {
        return document.getElementById(el);
    };
    /**
 *
 * @param {HTMLElement} obj Tabla que va a contener los apendices
 * @param {Array} arr Todos los datos
 */
    DOMtools.prototype.Tabla = function (arr) {
        var tabla = this.Create("table");
        var headTable = Object.keys(arr[0]);
        console.log(headTable);
        tabla.appendChild(this.THeaders(headTable));
        tabla.appendChild(this.TBody(arr));
        this.divTabla.appendChild(tabla);
    };
    /**
     * Cabezales de las tablas
     * @param {Array} heads
     * @returns Cabecera de tablas
     */
    DOMtools.prototype.THeaders = function (heads) {
        var thead = this.Create("thead");
        for (var j = 0; j < heads.length; j++) {
            var th = this.Create("th");
            th.className = "col";
            th.id = heads[j];
            th.appendChild(this.TxtNode(heads[j]));
            thead.appendChild(th);
        }
        return thead;
    };
    /**
     * Crea un cuerpo de una tabla con todas las lineas
     * @param {Array} arr
     * @returns
     */
    DOMtools.prototype.TBody = function (arr) {
        var _this = this;
        var tbody = this.Create("tbody");
        tbody.id = "tbody";
        var _loop_1 = function (i) {
            var trow = this_1.Create("tr");
            trow.className = "row";
            var data = Object.keys(arr[i]);
            data.forEach(function (el) {
                trow.appendChild(_this.Td(arr[i][el], el));
            });
            tbody.appendChild(trow);
        };
        var this_1 = this;
        for (var i = 0; i < arr.length; i++) {
            _loop_1(i);
        }
        return tbody;
    };
    /**
     * texto en la linea
     * @param {string} el
     * @returns
     */
    DOMtools.prototype.Td = function (el, id) {
        var td = this.Create("td");
        td.id = id;
        td.appendChild(this.TxtNode(el));
        return td;
    };
    /**
     * Crea el texto del nodo a ser apendizado
     * @param {string} el
     * @returns
     */
    DOMtools.prototype.TxtNode = function (el) {
        return document.createTextNode(el);
    };
    /**
     * Crear etiqueta html
     * @param {string} el
     * @returns etiqueta html
     */
    DOMtools.prototype.Create = function (el) {
        return document.createElement(el);
    };
    return DOMtools;
}());
