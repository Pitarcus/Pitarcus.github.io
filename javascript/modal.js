// Get the modal
var modal = document.getElementById("myModal");

// Get all modals by order
let modals = document.getElementsByClassName("modal");

// Get the button that opens each modal add to the array in order of appearance
var btn_everything = document.getElementsByClassName("everything-modal-button");
var btn_grass = document.getElementsByClassName("grass-modal-button");
var btn_substance = document.getElementsByClassName("substance-textures");
var btn_pitarcus = document.getElementsByClassName("pitarcus-modal-button");

// Button should be added in the order of appeareance in the page
let buttons = [btn_everything, btn_substance, btn_grass, btn_pitarcus];  


// Get the <span> element that closes the modal
var closeButtons = document.getElementsByClassName("close");


// When the user clicks on the button, open the needed modal
buttons.forEach( ( button, index ) =>
{
  for (var j = 0; j < button.length; j++) {
    button[j].onclick = function() {
      modals[index].style.display = "block";
      }
    }
});


// When the user clicks on <span> (x), close the modal
for(var i = 0; i < closeButtons.length; i++)
{
  closeButtons[i].onclick = function() {
    for (var j = 0; j < modals.length; j++) {
      modals[j].style.display = "none";
    };
  }
};


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    for (var j = 0; j < modals.length; j++) {
      if (event.target == modals[j]) {
      modals[j].style.display = "none";
    };
  }
}


// Slideshow inside the modal
let slideIndex = [];
let slideNumber = 4;
let slideId = [];
let dotsId = [];

InitSlideIds();
/* showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2); */

function InitSlideIds() {
  slideNumber = modals.length -1;
  console.log(slideNumber);
  for(let i = 0; i < slideNumber; i++) 
  {
    let id = i + 1;
    slideIndex.push(1);
    slideId.push("mySlides".concat(id.toString()));
    //console.log(slideId);
    dotsId.push("slideDots".concat(id.toString()));

    showSlides(1, i);
  }
}

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  let dots = document.getElementsByClassName(dotsId[no]);
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "flex";  

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex[no]-1].className += " active";
}


var modelImages = document.getElementsByClassName("img-modal")

for (var i = 0; i < modelImages.length; i++) {
  modelImages[i].addEventListener("click", function(event) {
    var target = event.target;
    if(target.className.includes("active")) {
      target.className = target.className.replace(" active", "");
      
    }
    else {
      target.className += " active";
    }
  })
};


// -- 3D MODEL VIEWER MODAL PAGE FUNCTIONALITY --
var modelViewer = document.getElementsByClassName("model-viewer")[0];

var dirtModel = document.getElementById("substance-model-dirt");
var snowModel = document.getElementById("substance-model-snow");
var sandModel = document.getElementById("substance-model-sand");
var jaraModel = document.getElementById("substance-model-jaraflower");
var bridgeModel = document.getElementById("substance-model-bridge");
var tileswithgrassModel = document.getElementById("substance-model-tileswithgrass");

let models = [dirtModel, snowModel, sandModel, tileswithgrassModel, jaraModel, bridgeModel];

// -- MODEL SELECTION BUTTONS --
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
tileswithgrassModel.onclick = function() {
  modelViewer.src = "./assets/models/Tileswithgrass.glb"
}

models.forEach(element => {
  element.addEventListener("click", setModelViewer)
  element.addEventListener("click", SwitchActiveModelButton)
    
});

function SwitchActiveModelButton(event) {
  if(!event.target.classList.contains(".active")){
    var currentActive = modal.querySelector(".active");
    if(currentActive != null) {
      currentActive.classList.remove("active");
    }

    event.target.classList.add("active");
  }
}

function setModelViewer() {
  modelViewer.dismissPoster();
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



// Progress Bar logic
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.model-preview-progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    updatingBar.style.width = `${0}%`;
  } else {
    progressBar.classList.remove('hide');
  }
};
modelViewer.addEventListener('progress', onProgress);
  