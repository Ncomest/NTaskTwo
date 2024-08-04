const canvas = document.getElementById("canvas");
const fileInput = document.getElementById("fileInput");
const rotateButton = document.getElementById("rotateBtn");
const saveButton = document.getElementById("saveBtn");
const context = canvas.getContext("2d");

let image = new Image();
let angle = 0;

//file listener +load
fileInput.addEventListener("change", (e) => {
 const file = e.target.files[0];
 const reader = new FileReader();
 reader.onload = function (event) {
  image.onload = function () {
   canvas.width = image.width;
   canvas.height = image.height;
   context.drawImage(image, 0, 0);
  };
  image.src = event.target.result;
 };
 reader.readAsDataURL(file);
});

//btn for rotate
rotateButton.addEventListener("click", () => {
 angle = (angle + 90) % 360;
 const tmpCanvas = document.createElement("canvas");
 const tmpContext = tmpCanvas.getContext("2d");

 if (angle % 180 === 90) {
  tmpCanvas.width = canvas.height;
  tmpCanvas.height = canvas.width;
 } else {
  tmpCanvas.width = canvas.width;
  tmpCanvas.height = canvas.height;
 }

 tmpContext.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
 tmpContext.translate(tmpCanvas.width / 2, tmpCanvas.height / 2);
 tmpContext.rotate((angle * Math.PI) / 180);
 tmpContext.drawImage(image, -image.width / 2, -image.height / 2);

 canvas.width = tmpCanvas.width;
 canvas.height = tmpCanvas.height;
 context.clearRect(0, 0, canvas.width, canvas.height);
 context.drawImage(tmpCanvas, 0, 0);
});

//save btn
saveButton.addEventListener("click", () => {
 const link = document.createElement("a");
 link.href = canvas.toDataURL();
 link.download = "rotated-image.png";
 link.click();
});
