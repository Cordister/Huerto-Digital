// CARGAR BASE DE DATOS CULTIVOS

const url = './data.json';

async function fetchData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);
        
        const container = document.querySelector('#listado-cultivos');
        
        data.forEach(cultivo => {
            const li = document.createElement('li');
            li.classList.add('detalles-cultivo' +  '-' + cultivo.nombre);
            li.setAttribute('ficha-cultivo', cultivo.nombre);
            li.addEventListener("click", fichaCultivoOculta);
            container.appendChild(li);
            
            const nombreCultivo = document.createElement('h3');
            nombreCultivo.classList.add('nombre-cultivo');
            nombreCultivo.textContent = cultivo.nombre;
            li.appendChild(nombreCultivo);
 
            const imagenCultivo = document.createElement('img');
            imagenCultivo.classList.add('imagen-cultivo');
            imagenCultivo.src = cultivo.imagen;
            imagenCultivo.draggable = true;
            li.appendChild(imagenCultivo);

            const cultivoDetalladoDIV = document.createElement('div');
            cultivoDetalladoDIV.classList.add('cultivo-detallado');
            li.appendChild(cultivoDetalladoDIV);
            cultivoDetalladoDIV.style.display = "none";

            const sustratoCultivo = document.createElement('p');
            sustratoCultivo.classList.add('sustrato-cultivo');
            sustratoCultivo.textContent = "Sustrato: " + cultivo.necesidades.sustrato;
            cultivoDetalladoDIV.appendChild(sustratoCultivo);

            const aguaCultivo = document.createElement('p');
            aguaCultivo.classList.add('agua-cultivo');
            aguaCultivo.textContent = "Riego: " + cultivo.necesidades.agua;
            cultivoDetalladoDIV.appendChild(aguaCultivo);

            const phCultivo = document.createElement('p');
            phCultivo.classList.add('ph-cultivo');
            phCultivo.textContent = "PH: " + cultivo.necesidades.ph;
            cultivoDetalladoDIV.appendChild(phCultivo);
            
        });
    } catch (error) {
        console.error('Error al obtener los datos JSON:', error);
    }
}
fetchData();

// FILTRAR CULTIVOS
function filtrarCultivos() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filtro-cultivos');
    filter = input.value.toUpperCase();
    ul = document.getElementById("listado-cultivos");
    li = ul.getElementsByTagName('li');
  
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

// ARRASTRAR CULTIVOS A LA PARCELA
let itemURL = '';
document.getElementById('listado-cultivos').addEventListener('dragstart', function (e) {
    itemURL = e.target.src;
});

let con = stage.container();
con.addEventListener('dragover', function (e) {
    e.preventDefault();
});

con.addEventListener('drop', function (e) {
    e.preventDefault();
    stage.setPointersPositions(e);

    let img = new Image();
    img.src = itemURL;
    img.onload = function() {

        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        const maxWidth = 25;
        const maxHeight = 25;

        let width = naturalWidth;
        let height = naturalHeight;

        if (width > maxWidth || height > maxHeight) {
            const aspectRatio = naturalWidth / naturalHeight;
            if (width > height) {
                width = maxWidth;
                height = width / aspectRatio;
            } else {
                height = maxHeight;
                width = height * aspectRatio;
            }
        }

        Konva.Image.fromURL(itemURL, function (image) {
            image.width(width);
            image.height(height);
            image.position(stage.getPointerPosition());
            image.draggable(true);
            image.name('cultivo'); // Añadir una clase o nombre específico para cultivos
            layer.add(image);
            layer.batchDraw();
        });
    }
});

// CANVAS DROP EVENTS

// Se activa cuando un objeto empieza a ser arrastrado
stage.on('dragstart', function (e) {
    if (e.target instanceof Konva.Image) { // Solo afecta a imágenes
        e.target.moveTo(tempLayer);
        layer.draw();
        text.text('Moving ' + e.target.name());
    }
});

var previousShape; // Variable para rastrear la forma anterior

// Se activa cuando un objeto está siendo arrastrado (se mueve mientras es arrastrado)
stage.on('dragmove', function (evt) {
    if (evt.target instanceof Konva.Image) { // Solo afecta a imágenes
        let pos = stage.getPointerPosition(); // Obtiene la posición actual del puntero
        let shape = layer.getIntersection(pos); // Obtiene la forma en la que el puntero está actualmente situado

        if (previousShape && shape) {
            if (previousShape !== shape) {
                previousShape.fire('dragleave', { evt: evt.evt }, true);
                shape.fire('dragenter', { evt: evt.evt }, true);
                previousShape = shape;
            } else {
                previousShape.fire('dragover', { evt: evt.evt }, true);
            }
        } else if (!previousShape && shape) {
            previousShape = shape;
            shape.fire('dragenter', { evt: evt.evt }, true);
        } else if (previousShape && !shape) {
            previousShape.fire('dragleave', { evt: evt.evt }, true);
            previousShape = undefined;
        }
    }
});

// Se activa cuando un objeto deja de ser arrastrado
stage.on('dragend', function (e) {
    if (e.target instanceof Konva.Image) { // Solo afecta a imágenes
        var pos = stage.getPointerPosition(); // Obtiene la posición final del puntero
        var shape = layer.getIntersection(pos); // Obtiene la forma en la que el puntero está situado al finalizar el arrastre

        if (shape) {
            previousShape.fire('drop', { evt: e.evt }, true);
        }
        previousShape = undefined; // Restablece previousShape a undefined
        e.target.moveTo(layer); // Mueve el objeto arrastrado de vuelta a su capa original
    }
});

// Se activa cuando un objeto arrastrado entra en una nueva forma
stage.on('dragenter', function (e) {
    if (e.target instanceof Konva.Image) { // Solo afecta a imágenes
        e.target.fill('green');
        text.text('dragenter ' + e.target.name());
    }
});

// Se activa cuando un objeto arrastrado deja una forma
stage.on('dragleave', function (e) {
    if (e.target instanceof Konva.Image) { // Solo afecta a imágenes
        e.target.fill('blue');
        text.text('dragleave ' + e.target.name());
    }
});

// Se activa cuando un objeto arrastrado está sobre una forma
stage.on('dragover', function (e) {
    if (e.target instanceof Konva.Image) { // Solo afecta a imágenes
        text.text('dragover ' + e.target.name());
    }
});

// Se activa cuando un objeto arrastrado se suelta sobre una forma
stage.on('drop', function (e) {
    if (e.target instanceof Konva.Image) { // Solo afecta a imágenes
        e.target.fill('red');
        text.text('drop ' + e.target.name());
    }
});

// CONTROL VISIBILIDAD DE LA FICHA DE CADA CULTIVO
function fichaCultivoOculta() {
    let detalles = this.querySelector(".cultivo-detallado");
    if (detalles.style.display === "none") {
        detalles.style.display = "block";
    } else {
        detalles.style.display = "none";
    }
}

// ELIMINAR CULTIVOS AÑADIDOS A LA PARCELA
let currentShape;
var menuNode = document.getElementById('menu');

document.getElementById('delete-button').addEventListener('click', () => {
    currentShape.destroy();
});

window.addEventListener('click', () => {
    menuNode.style.display = 'none';
});

stage.on('contextmenu', function (e) {
    e.evt.preventDefault();
    if (e.target === stage) {
        return;
    }
    currentShape = e.target;
    menuNode.style.display = 'initial';
    var containerRect = stage.container().getBoundingClientRect();
    menuNode.style.top = containerRect.top + stage.getPointerPosition().y + 70 + 'px';
    menuNode.style.left = containerRect.left + stage.getPointerPosition().x + 'px';
});
