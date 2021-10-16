const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlearray = [];
let hue = 0;

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = 'white';
    // ctx.fillRect(10 , 30 , 120 , 50);

});
const mouse = {
    x:undefined,
    y:undefined,
}

canvas.addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // circlefun();
    // init();
});

canvas.addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // circlefun();
    init();
})

class Particles{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 +1;
        this.speedX = Math.random() *3 -1.5;
        this.speedY = Math.random() *3 -1.5;
        this.color = 'hsl('+hue+ ',100% , 50%)'
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -=0.1;
        
    }
    draw(){
        ctx.fillStyle = this.color ;
        // ctx.strokeStyle = 'red';
        // ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x , this.y , this.size , 0 , Math.PI *2);
        ctx.fill();
    }
}

function init(){
    for(let i=0;i<5;i++){
        particlearray.push(new Particles());
    }
}

function handleparticles(){
    for(let i=0;i<particlearray.length ;i++){
        particlearray[i].update();
        particlearray[i].draw();
        for(let j=i ;j<particlearray.length ;j++){
            const dx = particlearray[i].x - particlearray[j].x;
            const dy = particlearray[i].y - particlearray[j].y;
            const distance = Math.sqrt(dx*dx +dy*dy);
            if (distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlearray[i].color;
                ctx.lineWidth = 1;
                ctx.moveTo(particlearray[i].x , particlearray[i].y);
                ctx.lineTo(particlearray[j].x , particlearray[j].y);
                ctx.stroke();
            }
        }
        if(particlearray[i].size <=0.2){
            particlearray.splice(i , 1);
            //console.log(particlearray.length)
            i--;
        } 
    }
}

// function circlefun(){
    // ctx.fillStyle = 'pink';
    // ctx.strokeStyle = 'red';
    // ctx.lineWidth = 5;
    // ctx.beginPath();
    // ctx.arc(mouse.x , mouse.y , 50 , 0 , Math.PI *2);
    // ctx.fill();
// }

function animate(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // circlefun();
    //ctx.fillStyle = 'rgba(0,0,0,0.01)';
    //ctx.fillRect(0,0,canvas.width , canvas.height);
    handleparticles();
    hue++;
    requestAnimationFrame(animate);
}

animate()
