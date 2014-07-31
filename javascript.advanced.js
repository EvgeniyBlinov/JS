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
