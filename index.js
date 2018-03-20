(function() {
  let fadeFlag = true;
  function Fade(selector) {
    this.elem = typeof selector == 'Object' ? selector : document.getElementById(selector);
  }
  Fade.prototype = {
   constructor: Fade,
    setOpacity: (elem, opacity) => { // 兼容ie10—
      elem.filters ? elem.style.filter = 'alpha(opacity = '+ opacity +')':  elem.style.opacity = opacity / 100;
      return true;
   },
   setOpacity: function(num) {
      this.elem.style.opacity !== undefined ? this.elem.style.opacity = num / 100 : this.elem.style.filter = 'alpha(opacity = '+ num +')';
   },
    fadeIn: function(speed, opacity){
   /*
   speed ==>淡入的速度，正整数（可选）;
   opacity ==>淡入到指定的透明度，0～100（可选）;
      */
      speed = speed || 2;
      opacity = opacity || 100;
      let num = 0; // 初始化透明度变化值为0
      if (fadeFlag) {
        let time = setInterval(() => {
          num += speed;
          fadeFlag = false;
          this.setOpacity(num);
          this.elem.style.opacity !== undefined ? this.elem.style.opacity = num / 100 : this.elem.style.filter = 'alpha(opacity = '+ num +')';
          if (num >= opacity) {
            clearInterval(time);
            fadeFlag = true;
          }
        }, 20);
      }
    },
    fadeOut: function(speed, opacity) {
   /*
   speed ==>淡入的速度，正整数（可选）;
   opacity ==>淡入到指定的透明度，0～100（可选）;
   */
      speed = speed || 2;
      opacity = opacity || 0;
      let num = 100; // 初始化透明度变化值为0
      if (fadeFlag) {
        let time = setInterval(() => {
          num -= speed;
          fadeFlag = false;
          this.set(num);
          this.elem.style.opacity !== undefined ? this.elem.style.opacity = num / 100 : this.elem.style.filter = 'alpha(opacity = '+ num +')';
          if (num <= opacity) {
          clearInterval(time);
          fadeFlag = true;
          }
        }, 20);
      }
    }
  };
window.Fade = Fade;
})();



//测试使用
let btn = document.getElementsByTagName('button')[0];
 let btn2 = document.getElementsByTagName('button')[1];
 btn.onclick = () => {
  let fade = new Fade('div1');
 fade.fadeIn();
 };
 btn2.onclick = () => {
  let fade = new Fade('div1');
  fade.fadeOut();
 }
