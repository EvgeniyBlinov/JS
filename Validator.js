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
