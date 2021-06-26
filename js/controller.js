"use strict";
var Manejadora = /** @class */ (function () {
    function Manejadora() {
    }
    Manejadora.prototype.handleEvent = function (evt) {
        throw new Error("Method not implemented.");
    };
    return Manejadora;
}());
window.addEventListener('load', function (event) {
    event.preventDefault();
    var filt = document.getElementsByName('filtros');
    console.log(filt);
});
