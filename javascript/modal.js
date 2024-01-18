// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("substance-textures");

var modelViewer = document.getElementsByClassName("model-viewer")[0];

var dirtModel = document.getElementById("substance-model-dirt");
var snowModel = document.getElementById("substance-model-snow");
var sandModel = document.getElementById("substance-model-sand");
var jaraModel = document.getElementById("substance-model-jaraflower");
var bridgeModel = document.getElementById("substance-model-bridge");

// Get the <span> element that closes the modal
var closeButton = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
for (var i = 0; i < btn.length; i++) {
    btn.item(i).onclick = function() {
        modal.style.display = "block";
      }
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// User clicks one of the model selection buttons
dirtModel.onclick = function() {
    modelViewer.src = "./assets/models/Dirt_ground.glb"
}
snowModel.onclick = function() {
    modelViewer.src = "./assets/models/Snow_ground.glb"
}
sandModel.onclick = function() {
    modelViewer.src = "./assets/models/Sand_ground.glb"
}
jaraModel.onclick = function() {
    modelViewer.src = "./assets/models/Jara_flower.glb"
}
bridgeModel.onclick = function() {
  modelViewer.src = "./assets/models/Bridge.glb"
}


// Let the user control the environment
  let lastX;
  let panning = false;
  let skyboxAngle = 0;
  let radiansPerPixel;
      
  const startPan = () => {
    const orbit = modelViewer.getCameraOrbit();
    const { radius } = orbit;
    radiansPerPixel = -1 * radius / modelViewer.getBoundingClientRect().height;
    modelViewer.interactionPrompt = 'none';
  };
  
  const updatePan = (thisX) => {      
    const delta = (thisX - lastX) * radiansPerPixel;
    lastX = thisX;
    skyboxAngle += delta;
    const orbit = modelViewer.getCameraOrbit();
    orbit.theta += delta;
    modelViewer.cameraOrbit = orbit.toString();
    modelViewer.resetTurntableRotation(skyboxAngle);
    modelViewer.jumpCameraToGoal();
  }
  
  modelViewer.addEventListener('mousedown', (event) => {
    panning = event.button === 2 || event.ctrlKey || event.metaKey || event.shiftKey;
    if (!panning)
      return;

    lastX = event.clientX;
    startPan();
    event.stopPropagation();
  }, true);

  modelViewer.addEventListener('touchstart', (event) => {
    const {targetTouches, touches} = event;
    panning = targetTouches.length === 2 && targetTouches.length === touches.length;
    if (!panning)
      return;

    lastX = 0.5 * (targetTouches[0].clientX + targetTouches[1].clientX);
    startPan();
  }, true);

  self.addEventListener('mousemove', (event) => {
    if (!panning)
      return;

    updatePan(event.clientX);
    event.stopPropagation();
  }, true);

  modelViewer.addEventListener('touchmove', (event) => {
    if (!panning || event.targetTouches.length !== 2)
      return;

    const {targetTouches} = event;
    const thisX = 0.5 * (targetTouches[0].clientX + targetTouches[1].clientX);
    updatePan(thisX);
  }, true);

  self.addEventListener('mouseup', (event) => {
    panning = false;
  }, true);
  
  modelViewer.addEventListener('touchend', (event) => {
    panning = false;
  }, true);
