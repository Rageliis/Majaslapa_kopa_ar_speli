const mansZimejums = document.getElementById("mansZimejums");
const ctx = mansZimejums.getContext("2d");

let koferis_x = 0;
let koferis_y = 0;
const koferisWidth = 50;
const koferisHeight = 50;

let pase_x = 0;
let pase_y = 0;
const paseWidth = 20;
const paseHeight = 20;

let punktuSkaits = 0;
let taimeris = 30;
let apturSpeli;

const koferisAtt = new Image();
koferisAtt.src = "koferis.png";  // Attēla fails "koferis.png" jābūt tavā projektā

const paseAtt = new Image();
paseAtt.src = "pase.png";  // Attēla fails "pase.png" jābūt tavā projektā

function atteluSaskare(x1, y1, koferisWidth, koferisHeight, x2, y2, paseWidth, paseHeight) {
    if (x1 >= x2 + paseWidth || x1 + koferisWidth <= x2) return false;
    if (y1 >= y2 + paseHeight || y1 + koferisHeight <= y2) return false;
    return true;
}

function MyKeyDownHandler(MyEvent) {
    if (MyEvent.keyCode == 37 && koferis_x > 0) {
        koferis_x = koferis_x - 10;
    }
    if (MyEvent.keyCode == 39 && koferis_x + koferisWidth < mansZimejums.width) {
        koferis_x = koferis_x + 10;
    }
}

addEventListener("keydown", MyKeyDownHandler);

function Laukums() {
    ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height);
    ctx.fillStyle = "green";
    ctx.font = "15px Arial";
    ctx.fillText("Punktu skaits: " + punktuSkaits, 0, 20);
    ctx.fillText("Laiks: " + Math.round(taimeris), 0, 45);

    if (taimeris <= 0) {
        ctx.fillStyle = "red";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Spēles beigas", mansZimejums.width / 2, mansZimejums.height / 2);
        ctx.textAlign = "left";
        clearInterval(apturSpeli);
        return;
    }

    taimeris -= 1 / 40;

    koferis_y = mansZimejums.height - koferisHeight;
    ctx.drawImage(koferisAtt, koferis_x, koferis_y, koferisWidth, koferisHeight);

    pase_y = pase_y + 3;
    if (pase_y > mansZimejums.height) {
        pase_y = 0;
        pase_x = Math.random() * (mansZimejums.width - paseWidth);
    }
    ctx.drawImage(paseAtt, pase_x, pase_y, paseWidth, paseHeight);

    if (atteluSaskare(koferis_x, koferis_y, koferisWidth, koferisHeight, pase_x, pase_y, paseWidth, paseHeight)) {
        punktuSkaits++;
        pase_x = -paseWidth;
        pase_y = 0;
    }
}

apturSpeli = setInterval(Laukums, 25)
