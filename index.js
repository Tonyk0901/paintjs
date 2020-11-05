const body = document.getElementsByTagName("body")[0];
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');
const input = document.getElementById("myRange");
const colors = [...document.getElementsByClassName("color")];
const buttonFill = document.getElementById("buttonFill");
const buttonReset = document.getElementById("buttonReset");
const buttonSave = document.getElementById("buttonSave");


let painting = false;
let onLeave = false; // 커서가 눌린 상태에서 캔버스를 벗어났는지 대한 정보를 담는다.
let inputVal = input.value;
let color = "black";
let filling = false;


ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function mouseMove (event) {
    const xCoord = event.offsetX;
    const yCoord = event.offsetY;
    ctx.lineWidth = inputVal;
    ctx.strokeStyle = color;
    
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(xCoord, yCoord);
    } else {
        ctx.lineTo(xCoord, yCoord);
        ctx.stroke();
    }
}

function startPainting () {
    painting = true;
    if (filling === true) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 700, 700);
    }
}

function stopPainting () {
    painting = false;
    onLeave = false;
}

function mouseLeave () {
    if (painting === true) {
        onLeave = true;
    } 
}

function mouseEnter(event) {
    if (onLeave === true) {
        onleave = false;
        painting = true;
        const xCoord = event.offsetX;
        const yCoord = event.offsetY;
        ctx.moveTo(xCoord, yCoord); // 커서가 캔버스 밖에서 다시 들어왔다면, 새로운 드로잉 시작점을 설정해준다.
    }
}

function onCM (event) {
    event.preventDefault();
}


function updateValue(event) {
    inputVal = input.value;
}

function changeColor(event) {
    color = event.target.style.backgroundColor;
}

function fillCanvas() {
    if (filling === true) {
        filling = false;
        buttonFill.innerText = "FILL";
    } else {
        filling = true;
        buttonFill.innerText = "PAINT";
    }
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const image = canvas.toDataURL("image/jpeg");
    const fakeLink = document.createElement("a");
    fakeLink.href = image;
    fakeLink.download = "yourPainting";
    fakeLink.click();
}

canvas.addEventListener("mousemove", mouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", mouseLeave);
canvas.addEventListener("mouseenter", mouseEnter);
canvas.addEventListener("contextmenu", onCM);
body.addEventListener("mouseup", stopPainting); // 캔버스 밖에서 커서가 띄어졌다면, onLeave 변수를 다시 false 로 바꾼다.
input.addEventListener('input', updateValue);
colors.forEach(color => color.addEventListener("click", changeColor));
buttonFill.addEventListener("click", fillCanvas);
buttonReset.addEventListener("click", resetCanvas);
buttonSave.addEventListener("click", saveCanvas);

