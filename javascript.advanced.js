/**
 * Advanced functions for JS.
 * Copyright (c) 2014 Evgeniy Blinov (https://evgeniyblinov.ru)
 * 
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 * 
 * @link       https://github.com/EvgeniyBlinov/JS for the canonical source repository
 * @author     Evgeniy Blinov <evgeniy_blinov@mail.ru>
 * @copyright  Copyright (c) 2014 Evgeniy Blinov
 * @license    http://www.opensource.org/licenses/mit-license.php MIT License
 */
(function(){
    'use strict';

    if (!String.prototype.trim) {
        String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
    }

    if (!String.prototype.ltrim) {
        String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
    }

    if (!String.prototype.rtrim) {
        String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
    }

    if (!String.prototype.fulltrim) {
        String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
    }

    if (!String.prototype.toDOM) {
        String.prototype.toDOM = function(){
            var d = document,
                i,
                a = d.createElement("div"),
                b = d.createDocumentFragment();
            a.innerHTML = this;
            while ( i = a.firstChild ) b.appendChild(i);
            return b;
        };
    }

    this.getType = function( object ) {
        return Object.prototype.toString.call( object ).slice(8, -1);
    };

    this.randomString = function (len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    };

}).call(this);
