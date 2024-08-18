document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos el elemento con id 'nombre-parcela' del DOM
    const nombreParcelaElem = document.querySelector('#nombre-parcela');
    const anchoParcelaElem = document.querySelector('#ancho-parcela');
    const altoParcelaElem = document.querySelector('#alto-parcela');
    const orientacionParcelaElem = document.querySelector('#orientacion-parcela');
    const phParcelaElem = document.querySelector('#ph-parcela');
    const tipoTerrenoParcelaElem = document.querySelector('#tipo-de-terreno-parcela');

    // Recuperamos el valor de 'nombreParcela' del localStorage y lo parseamos como objeto JSON
    const parcela = JSON.parse(localStorage.getItem('nombreParcela'));
    
    // Verificamos si el objeto 'parcela' existe y si tiene la propiedad '_parcelaName'
    if (parcela && parcela._parcelaName) {
        // Si ambos existen, establecemos el contenido de texto del elemento 'nombre-parcela' con el valor de '_parcelaName'
        nombreParcelaElem.textContent = parcela._parcelaName;
        anchoParcelaElem.textContent = parcela._parcelaAncho;
        altoParcelaElem.textContent = parcela._parcelaAlto;
        orientacionParcelaElem.textContent = parcela._parcelaOrientacion;
        phParcelaElem.textContent = parcela._parcelaPH;
        tipoTerrenoParcelaElem.textContent = parcela._parcelaTerreno;
        // Mostramos en la consola el objeto 'parcela' cargado desde localStorage para confirmación
        console.log("Parcela cargada desde localStorage:", parcela);
    } else {
        // Si no se encontró el objeto 'parcela' o no tiene la propiedad '_parcelaName', mostramos un mensaje en la consola
        console.log("No se encontró ninguna parcela en localStorage.");
    }
});
