var $=function(){"use strict";var e=function(e,t){if("string"!=typeof e)return this.elems=e,void(this.single=this.elems instanceof HTMLElement);var s={"#":"ById",".":"sByClassName","@":"sByName","=":"sByTagName"}[e[0]];e=s?e.slice(1):e;t||(t=document),this.elems=t[s?"getElement"+s:"querySelectorAll"](e),this.single=this.elems instanceof HTMLElement};e.prototype.ajax=function(e){console.log(e)},e.prototype.each=function(e){if(e&&"function"==typeof e){if("[object Object]"===Object.prototype.toString.call(this.elems))for(var t in this.elems){e.bind(this.elems[t])(t,this.elems[t])}else for(t=0;t<this.elems.length;t++){e.bind(this.elems[t])(t,this.elems[t])}return this.elems}},e.prototype.find=function(e){return this.elems=this.single?this.elems.querySelector(e):this.elems[0].querySelector(e),this.single=this.elems instanceof HTMLElement,this},e.prototype.parent=function(e){return this.elems=this.single?this.elems.parentElement:this.elems[0].parentElement,this},e.prototype.addClass=function(e){return this.each(function(){this.classList.add(e)}),this},e.prototype.removeClass=function(e){return this.each(function(){this.classList.remove(e)}),this},e.prototype.html=function(e){return this.single?(e&&(this.elems.innerHTML=e),this.elems.innerHTML):(e&&this.each(function(){this.innerHTML=e}),this.elems[0].innerHTML)},e.prototype.hide=function(){return this.elems.style.display="none",this},e.prototype.show=function(e){return e||(e="block"),this.elems.style.display=e,this},e.prototype.attr=function(e,t){return t?(this.elems.setAttribute(e,t),this):this.elems.getAttribute(e)},e.prototype.hasAttr=function(e){return this.elems.hasAttribute(e)},e.prototype.append=function(e){return this.single?this.elems.innerHTML=this.elems.innerHTML+e:this.each(function(){this.innerHTML=this.innerHTML+e}),this},e.prototype.prepend=function(e){return this.single?this.elems.innerHTML=e+this.elems.innerHTML:this.each(function(){this.innerHTML=e+this.innerHTML}),this},e.prototype.val=function(e){if(this.single){if(e||""==e)return this.elems.value=e,this}else if(e||""==e)return this.each(function(){this.value=e}),this;return this.single?this.elems.value:this.elems[0].value},e.prototype.on=function(e,t){e=e.split(" ");for(var s=0;s<e.length;s++)this.single?this.elems.addEventListener(e[s],t):this.each(function(){this.addEventListener(e[s],t)});return this};return function(t){return new e(t)}}();