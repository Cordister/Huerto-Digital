// Clase Parcela
class Parcela {
    constructor() {
        // Inicializa las diferentes propiedades de la Parcela
        this._parcelaName = '';
        this._parcelaAncho = '';
        this._parcelaAlto = '';
        this._parcelaOrientacion = '';
        this._parcelaPH = '';
        this._parcelaTerreno = '';
    }

    // Getters para obtener los valores de la parcela
    get parcelaName() {
        return this._parcelaName;
    }
    get parcelaAncho() {
        return this._parcelaAncho;
    }
    get parcelaAlto() {
        return this._parcelaAlto;
    }
    get parcelaOrientacion() {
        return this._parcelaOrientacion;
    }
    get parcelaPH() {
        return this._parcelaPH;
    }
    get parcelaTerreno() {
        return this._parcelaTerreno;
    }

    // Setters para establecer los valores de la parcela
    set parcelaName(value) {
        this._parcelaName = value;
    }
    set parcelaAncho(value) {
        this._parcelaAncho = value;
    }
    set parcelaAlto(value) {
        this._parcelaAlto = value;
    }
    set parcelaOrientacion(value) {
        this._parcelaOrientacion = value;
    }
    set parcelaPH(value) {
        this._parcelaPH = value;
    }
    set parcelaTerreno(value) {
        this._parcelaTerreno = value;
    }
}
function crearParcela() {
    const nuevaParcela = new Parcela();
    nuevaParcela.parcelaName = document.forms["myForm"]["pname"].value;
    nuevaParcela.parcelaAncho = document.forms["myForm"]["anchoParcela"].value;
    nuevaParcela.parcelaAlto = document.forms["myForm"]["altoParcela"].value;
    nuevaParcela.parcelaOrientacion = document.forms["myForm"]["orientacionParcela"].value;
    nuevaParcela.parcelaPH = document.forms["myForm"]["phParcela"].value;
    nuevaParcela.parcelaTerreno = document.forms["myForm"]["tipoDeTerreno"].value;

    return nuevaParcela; // Devuelve la instancia de nuevaParcela
}
function validateForm(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    if (validarNombreParcela()) { // Valida el nombre de la parcela
        const nuevaParcela = crearParcela();
        // Guarda la nueva parcela en localStorage
        localStorage.setItem('nombreParcela', JSON.stringify(nuevaParcela));
        
        // Confirmación de que los datos se han guardado
        console.log("Nueva parcela guardada en localStorage:", JSON.parse(localStorage.getItem('nombreParcela')));
        
        alert("Parcela creada correctamente");
        window.location.href = 'main.html'; // Redirige a 'main.html'
    } else {
        return false; // Si la validación falla, retorna false
    }
}
function validarNombreParcela() {
    let pnameVar = document.forms["myForm"]["pname"].value; // Obtiene el valor del campo 'pname'
    if (pnameVar === "") { // Verifica si el campo está vacío
        alert("El nombre de la parcela debe completarse"); // Muestra un alert si el campo está vacío
        return false; // Retorna false si el campo está vacío
    } else {
        console.log("Nombre de parcela válido"); // Muestra un mensaje en la consola si el campo no está vacío
        return true; // Retorna true si el campo no está vacío
    }
}

function validarAnchoParcela() {
    let panchoVar = document.forms["myForm"]["anchoParcela"].value; 
    if (panchoVar === "") { 
        alert("El ancho de la parcela debe completarse"); 
        return false; 
    } else {
        console.log("Ancho de parcela válido"); 
        return true; 
    }
}