/**
 * Created by linqiaojuan on 17-6-28.
 */
var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/400;
function drawBackground(){
    ctx.save();
    ctx.translate(r,r);//坐标原点转换
    ctx.beginPath();//绘画开始
    ctx.lineWidth=10*rem;
    ctx.arc(0,0,r-5,0,2*Math.PI,false);
    ctx.stroke();//定义绘制的路径fill()为填充
    var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font='18*rem'+'px';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    hourNumbers.forEach(function(number,i){
        var rad=2*Math.PI/12*i;
        var x=(r-30*rem)*Math.cos(rad);
        var y=(r-30*rem)*Math.sin(rad);
        ctx.fillText(number,x,y);
    });
    for(var i=0;i<60;i++){
        var rad=2*Math.PI/60*i;
        var x=(r-18*rem)*Math.cos(rad);
        var y=(r-18*rem)*Math.sin(rad);
        ctx.beginPath();//绘画开始
        if(i % 5===0){
            ctx.fillStyle="#000";
            ctx.arc(x,y,2*rem,0,2*Math.PI,false);
        }else{
            ctx.fillStyle="#ccc";
            ctx.arc(x,y,2*rem,0,2*Math.PI,false);
        }
        ctx.fill();
    }
}

function drawHour(hour,minute){
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/12*hour;
    var mrad=2*Math.PI/12/60*minute;
    ctx.rotate(rad+mrad);
    ctx.lineWidth=5*rem;
    ctx.lineCap='round';
    ctx.moveTo(0,5*rem);
    ctx.lineTo(0,-r/2+10*rem);
    ctx.stroke();
    ctx.restore();
}
function drawMinute(minute){
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*minute;
    ctx.rotate(rad);
    ctx.lineWidth=3*rem;
    ctx.lineCap='round';
    ctx.moveTo(0,5*rem);
    ctx.lineTo(0,-r/2+10*rem);
    ctx.stroke();
    ctx.restore();
}
function drawSecond(second){
    ctx.save();//保存画布当前的状态
    ctx.beginPath();
    ctx.fillStyle='#c14543';
    var rad=2*Math.PI/60*second;
    ctx.rotate(rad);
    ctx.moveTo(-2*rem,20*rem);
    ctx.lineTo(2*rem,20*rem);
    ctx.lineTo(1,-r+30*rem);
    ctx.lineTo(-1,-r+30*rem);
    ctx.fill();
    ctx.restore();//恢复 canvas 状态的
}
function drawDot(){
    ctx.beginPath();
    ctx.fillStyle="#fff";
    ctx.arc(0,0,3*rem,0,2*Math.PI,false);
    ctx.fill();
}
function draw(){
    ctx.clearRect(0,0,width,height);
    drawBackground();
    var oDate = new Date(); //实例一个时间对象；
    var hour=oDate.getHours(); //获取系统时，
    var minute=oDate.getMinutes(); //分
    var second=oDate.getSeconds(); //秒
    drawHour(hour,minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot();
    ctx.restore();
}
setInterval(function(){
    draw();
},1000);

