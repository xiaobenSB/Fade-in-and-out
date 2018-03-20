<!DOCTYPE html>
<html>
<meta http-equiv="content-type" content="text/html;charset=UTF-8" >
<meta charset="utf-8" >
<head>
    <style>
        div {
         width: 100px;
         height: 100px;
         background-color: #1d7db1;
         opacity:0;
        }
        </style>       
</head>
<body>
<div id="div1"></div>
<span id="span1">123</span>
<button>fadein</button>
<button>fadeOut</button>
<script>
(function(){
let fadeFlag = false;
function Fade(selector){
    this.elem = typeof selector == "Object" ? selector : document.getElementById(selector);
}
Fade.prototype={
    constructor: Fade,
    setOpacity: (elem,opacity)=>{
      elem.filters ? elem.style.filter = "alpha(opacity="+opacity+")" : elem.style.opacity =opacity / 100;
      return true;
    },
    setOpacity:function(num){
       this.elem.style.opacity !== undefined ? this.elem.style.opacity = num /100 : this.elem.style.filter = "alpha(opacity="+num+")";
    },
    fadeIn:function(speed,opacity){
       speed = speed || 2;
       opacity = opacity || 100;
       let num = 0;
       if(!fadeFlag){
         let time = setInterval(()=>{
             num += speed;
             fadeFlag = false ;
             this.setOpacity(num);
         /*配合css样式处理-->>*/this.elem.style.opacity !== undefined ? this.elem.style.opacity = num/100 : this.elem.style.filter = "alpha(opacity="+num+")";
             if(num >= opacity){
                 clearInterval(time);
                 fadeFlag = true;
             }
         },20);
       }
    },
    fadeOut:function(speed,opacity){
        speed = speed || 2;
        opacity = opacity || 0;
        let num = 100;
        if(fadeFlag){
            let time = setInterval(()=>{
            num -= speed;
            fadeFlag = true;
            this.setOpacity(num);
            this.elem.style.opacity !== undefined ? this.elem.style.opacity = num / 100 : this.elem.style.filter = "alpha(opacity="+num+")";
            if(num <= opacity){
                clearInterval(time);
                fadeFlag = false;
            }
            },20);
        }
    }
}
window.Fade = Fade;
})();

var btn = document.getElementsByTagName("button")[0];
var btn2 = document.getElementsByTagName("button")[1];

btn.onclick = ()=>{
 let fade = new Fade("div1");
 fade.fadeIn();
};
btn2.onclick = ()=>{
 let fade = new Fade("div1");
 fade.fadeOut();    
}
</script>
</body>

</html>
