var $ = (function () {
    'use strict';
    /**
     * Create the constructor
     * @param {String} selector The selector to use
     */
    var Constructor = function (s,context) {
        /*if (!selector) return;
        if (selector === 'document') {
            this.elems = [document];
        } else if (selector === 'window') {
            this.elems = [window];
        } else {
            this.elems = document.querySelectorAll(selector);
        }*/
        if(typeof s!='string') {
            this.elems = s;
            this.single = this.elems instanceof HTMLElement;
            return;
        }
        var c = {
            '#': 'ById',
            '.': 'sByClassName',
            '@': 'sByName',
            '=': 'sByTagName'}[s[0]];
            var s = (c) ? s.slice(1) : s;
            if(!context) context = document;
            this.elems = context[c?'getElement'+c:'querySelectorAll'](s);
            this.single = this.elems instanceof HTMLElement;
    };
    
    /**
     * Do ajax stuff
     * @param  {String} url The URL to get
     */
    Constructor.prototype.ajax = function (url) {
        // Do some XHR/Fetch thing here
        console.log(url);
    };
    
    /**
     * Run a callback on each item
     * @param  {Function} callback The callback function to run
     */
    Constructor.prototype.each = function (callback) {
        //if(!this.elems.length) return callback(this.elems);
        if (!callback || typeof callback !== 'function') return;
        if(Object.prototype.toString.call(this.elems) === '[object Object]') {
            for (var i in this.elems) {
                var call = callback.bind(this.elems[i]);
                call(i,this.elems[i]);
            }
        } else {
            for (var i = 0; i < this.elems.length; i++) {
                var call = callback.bind(this.elems[i]);
                call(i,this.elems[i]);
            }
        }
        
        return this.elems;
    };
    Constructor.prototype.find = function (s) {
        this.elems = (this.single) ? this.elems.querySelector(s): this.elems[0].querySelector(s);
        this.single = this.elems instanceof HTMLElement;
        return this;
    };
    Constructor.prototype.parent = function (s) {
        this.elems = (this.single) ? this.elems.parentElement : this.elems[0].parentElement;
        return this;
    };
    /**
     * Add a class to elements
     * @param {String} className The class name
     */
    Constructor.prototype.addClass = function (className) {
        this.each(function () {
            this.classList.add(className);
        });
        return this;
    };
    
    /**
     * Remove a class to elements
     * @param {String} className The class name
     */
    Constructor.prototype.removeClass = function (className) {
        this.each(function () {
            this.classList.remove(className);
        });
        return this;
    };
    
    /**
     * Get / set the innerHTML
     * @param {String} html The html
     */
     Constructor.prototype.html = function (html) {
        if(this.single){
            if(html) this.elems.innerHTML = html;
            return this.elems.innerHTML;
        } else {
           
            if(html){
                 this.each(function () {
                    this.innerHTML = html;
                });
            }
            return this.elems[0].innerHTML;
        }
    };
    /**
     * Hide
     */
     Constructor.prototype.hide = function () {
        this.elems.style.display = "none";
        return this;
    };
    /**
     * Show
     */
     Constructor.prototype.show = function (display) {
        if(!display) display="block";
        this.elems.style.display = display;
        return this;
    };
    
    /**
     * Attr
     */
     Constructor.prototype.attr = function (attr,string) {
        if(string) {
            this.elems.setAttribute(attr, string);
            return this;
        }
        return this.elems.getAttribute(attr);
    };
    /**
     * Attr
     */
     Constructor.prototype.hasAttr = function (attr) {
        return this.elems.hasAttribute(attr);
    };
    Constructor.prototype.append = function (html) {
        if(this.single) {
            this.elems.innerHTML = this.elems.innerHTML+html;
        } else {
            this.each(function () {
                this.innerHTML = this.innerHTML+html;
            });
        }
        return this;
    };
    Constructor.prototype.prepend = function (html) {
        if(this.single) {
            this.elems.innerHTML = html+this.elems.innerHTML;
        } else {
            this.each(function () {
                this.innerHTML = html+this.innerHTML;
            });
        }
        return this;
    };
    Constructor.prototype.val = function (val) {
        if(this.single){
                if(val || val=='') {
                    this.elems.value = val;
                    return this;
                }
            } else {
                if(val || val=='') {
                    this.each(function () {
                        this.value = val;
                    });
                    return this;
                }
            }
        return (this.single) ?  this.elems.value :  this.elems[0].value;
    };
    Constructor.prototype.on = function (eventType,call) {
        eventType = eventType.split(' ');
        for (var i = 0; i < eventType.length; i++) {
            if(this.single){
                this.elems.addEventListener(eventType[i], call);
            } else {
                this.each(function () {
                    this.addEventListener(eventType[i], call);
                });
            }
        }
        return this;
    };
    
    /**
     * Instantiate a new constructor
     */
    var instantiate = function (selector) {
        return new Constructor(selector);
    };
    
    /**
     * Return the constructor instantiation
     */
    return instantiate;
    
    })();