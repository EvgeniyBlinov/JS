/**
 * Backbone validator.
 * Copyright (c) 2014 Evgeniy Blinov (http://blinov.in.ua/)
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
     if (!('utilities' in Backbone)) {
        Backbone.utilities = {};
    }

    var Validator = Backbone.utilities.Validator = function( value, options ){
        switch (options.validator) {
            case 'match':
                var regExp = (getType(options.pattern) != 'RegExp') ? eval(options.pattern) : options.pattern;
                if (getType(regExp) == 'RegExp') {
                    return regExp.test( value );
                }
                return true;
            case 'required':
                return !/^[\s\t]*$/.test( value );
            default:
                return false;
        }
    };

    return Validator;
}).call(this);
