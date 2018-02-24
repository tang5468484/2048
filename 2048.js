var constants = {
    canvasWidth: 800,
    canvasHeight: 800,
    rectSize: 200,
    colorMap: ["#FFFFCC",
            "#CCFFFF",
            "#FFCCCC",
            "#FFCC99",
            "#CCFF99",
            "#CCCCCC",
            "#99CC99",
            "#FF9966",
            "#FF6666",
            "#666633",
            "#99CCCC"],
    leftArrow: 37,
    upArrow: 38,
    rightArrow: 39,
    downArrow: 40
};

var points = [];
var score = 0;
var status1 = 0;

function intiRect()
{
    var len = 2;//parseInt(16/(rand(100)+0.9)+1);
    var i;

    for (i=0;i<16;i++) {
        points[i] = 0;
    }
    for(i=0;i<len;i++){
        var a, b;
        a = rand(16);
        b = parseInt(Math.random() < 0.9 ? 2 : 4); //Math.pow(2,parseInt(1/(rand(100)+0.1)+1));
        points[a] = b;
    }
}

function rand(a)
{
    return parseInt(Math.random()*500%a);
}

function draw()
{
    var mycanvas = document.getElementById('mycanvas');
    var ctx = mycanvas.getContext("2d");


    ctx.textAlign = "center";
    ctx.strokeStyle = "#000";
    ctx.font = "30px Arial";
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);

    for (var i = 0;i<4;i++)
    {
        for (var j = 0;j<4;j++)
        {
            ctx.fillStyle = "#000";
            ctx.rect(i*200,j*200,200,200);
            ctx.stroke();
            if (points[i*4+j] !== 0)
            {   ctx.fillStyle = constants.colorMap[Math.log(points[i*4+j])/Math.log(2)-1];
                ctx.fillRect(i*200,j*200, 200,200);
                ctx.fillStyle = "#000";
                ctx.fillText(points[i*4+j], (i+1)*200-100, (j+1)*200-100);
            }
        }
    }

    if (status1 === 1) {
        ctx.fillStyle = "#4aff40";
        ctx.fillRect(200, 300, 400, 200);
        ctx.fillStyle = "#000";
        ctx.fillText("YOU ARE WIN!", 400, 400);
    }
}
/*
      n
   w     e
      s
*/
function sum(mode)
{
    var i = 0;
    switch(mode)
    {
        case constants.upArrow:
            for (i=0;i<4;i++){
                [points[i*4],
                points[i*4+1],
                points[i*4+2],
                points[i*4+3]] = plus(points[i*4],
                                        points[i*4+1],
                                        points[i*4+2],
                                        points[i*4+3])
            }
            break;
        case constants.downArrow:
            for (i=0;i<4;i++){
                [points[i*4+3],
                    points[i*4+2],
                    points[i*4+1],
                    points[i*4]] = plus(points[i*4+3],
                                            points[i*4+2],
                                            points[i*4+1],
                                            points[i*4])
            }
            break;
        case constants.leftArrow:
            for (i=0;i<4;i++){
                [points[i],
                    points[4+i],
                    points[2*4+i],
                    points[3*4+i]] = plus(points[i],
                        points[4+i],
                        points[2*4+i],
                        points[3*4+i])
            }
            break;
        case constants.rightArrow:
            for (i=0;i<4;i++){
                [points[3*4+i],
                    points[2*4+i],
                    points[4+i],
                    points[i]] = plus(points[3*4+i],
                                        points[2*4+i],
                                        points[4+i],
                                        points[i])
            }
            break;
        default:
            break;
    }

}

function plus(a, b, c, d)
{
    var temp = [a, b, c, d];
    var i, k = -1;

    for (i=0;i<4;i++) {
        if (temp[i] === 0)
            continue;
        if (k === -1) {
            k = i;
        } else {
            if (temp[k] === temp[i]){
                temp[k] = temp[k] + temp[i];
                temp[i] = 0;
                if (temp[k] === 16){
                    document.removeEventListener('keydown', processKeyDown, false);
                    status1  = 1;
                }
                score++;
                k = -1;
            } else {
                k = i;
            }
        }
    }

    for (i=0;i<4;i++){
        if (temp[i] === 0) {
            for (k = i; k < 4; k++) {
                if (temp[k] !== 0) {
                    temp[i] = temp[k];
                    temp[k] = 0;
                    break;
                }
            }
        }
    }
    return temp;
}

function appendCanvas()
{
    var canvasElement = document.createElement('canvas');

    canvasElement.id = "mycanvas";
    canvasElement.width = constants.canvasWidth;
    canvasElement.height = constants.canvasHeight;
    document.body.appendChild(canvasElement);
}

function processKeyDown(evt)
{

    sum(evt.keyCode);
    randRect();
    draw();
}

function randRect()
{
    var c, kb = [];

    for (var j=0;j<16;j++)
        if (points[j] === 0)
            kb.push(j);

    c = kb[rand(kb.length)];
    points[c] = parseInt(Math.random() < 0.9 ? 2 : 4);

}

document.addEventListener('keydown', processKeyDown, false);
intiRect();
appendCanvas();
draw();
