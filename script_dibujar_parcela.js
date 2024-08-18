const factorAumento = 500;
const parcela = JSON.parse(localStorage.getItem('nombreParcela'));
let anchoCanvas = parcela._parcelaAncho * factorAumento;
let altoCanvas = parcela._parcelaAlto * factorAumento;

// Obtiene el contenedor del stage
const container = document.getElementById('dibujo-parcela');

// Función para ajustar el tamaño del stage al tamaño del contenedor
function adjustStageSize() {
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  // Ajustar el tamaño del stage
  stage.width(width);
  stage.height(height);
}

// Crear el stage
let stage = new Konva.Stage({
  container: 'dibujo-parcela',
  width: container.offsetWidth,
  height: container.offsetHeight,
  draggable: true,
});

// Ajustar el tamaño del stage al tamaño del contenedor al cargar la página
adjustStageSize();

// Ajustar el tamaño del stage cuando la ventana cambia de tamaño
window.addEventListener('resize', adjustStageSize);


let baseLayer = new Konva.Layer();
stage.add(baseLayer);

let layer = new Konva.Layer();
stage.add(layer);



let superficieParcela = new Konva.Rect({
    x: container.offsetWidth/2 - anchoCanvas/2,
    y: container.offsetHeight/2 - altoCanvas/2,
    width: anchoCanvas,
    height: altoCanvas,
    fill: '#C4A98A',
    stroke: '#C4A98A',
    strokeWidth: 20,
  });
  // añadir la parcela a la capa
  baseLayer.add(superficieParcela);


for(let j = 0; j < (20 * parcela._parcelaAlto); j++){
    for(let i = 0; i < (20 * parcela._parcelaAncho); i++){
        let slotParcela = new Konva.Rect({
            x: container.offsetWidth/2 - anchoCanvas/2 +2 + (i*25)  ,
            y: container.offsetHeight/2 - altoCanvas/2 +2 + (j*25),
            width: 20,
            height: 20,
            fill: 'white',
            stroke: 'transparent',
            opacity: 0.5,
            cornerRadius: 3,
            draggable: false,
          });
        layer.add(slotParcela);
        }
}

let tempLayer = new Konva.Layer();
stage.add(tempLayer);

let text = new Konva.Text({
  fill: 'black',
});
layer.add(text);







// ZOOM IN Y ZOOM OUT DE LA PARCELA  ---------------------------------------------------------------------------------------------------------------
let scaleBy = 1.06;
stage.on('wheel', (e) => {
  // detiene el scroll por defecto
  e.evt.preventDefault();

  let oldScale = stage.scaleX();
  let pointer = stage.getPointerPosition();

  let mousePointTo = {
    x: (pointer.x - stage.x()) / oldScale,
    y: (pointer.y - stage.y()) / oldScale,
  };

  // Fórmula para calcular el cambio de zoom in y out
  let direction = e.evt.deltaY > 0 ? 1 : -1;

  if (e.evt.ctrlKey) {
    direction = -direction;
  }

  let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

  stage.scale({ x: newScale, y: newScale });

  let newPos = {
    x: pointer.x - mousePointTo.x * newScale,
    y: pointer.y - mousePointTo.y * newScale,
  };
  stage.position(newPos);
});

// -------------------------------------------------------------------------------------------------------------------------------------------------