/**
 * Advanced functions for backbone.js.
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
    'use strict';
    /*****************MODEL ADVANCED FUNCTIONS*************************/
    /**
     * Init
     * @return void
     */
    Backbone.Model.prototype.initialize = function(options){
        if (options) {
            if (options._rules) {
                this._rules = _.extend(this._rules, options._rules);
            }
        }
    };

    /**
     * Validate
     * @param {object} attributes
     * @param {object} options
     * @return mixed
     */
    Backbone.Model.prototype.validate = function(attributes, options){
        var self   = this,
            errors = {};

        _.each( attributes, function( value, attribute ) {
            var rule = self._rules[attribute];
            if (rule) {
                if (getType(rule) == 'Array') {
                    _.each(rule, function(currentRule){
                        if (!Backbone.utilities.Validator( value, currentRule )) {
                            var message = currentRule.message || 'Ошибка валидации данных!';
                            errors[attribute] = errors[attribute] || [];
                            errors[attribute].push(message);
                        }
                    });
                } else {
                    if (!Backbone.utilities.Validator( value, rule )) {
                        var message = rule.message || 'Ошибка валидации данных!';
                        errors[attribute] = errors[attribute] || [];
                        errors[attribute].push(message);
                    }
                }
            }
        });


        if ( _.keys(errors).length > 0 ) {
            return errors;
        }
    };
    /*****************MODEL ADVANCED FUNCTIONS*************************/


    /******************VIEW ADVANCED FUNCTIONS*************************/
    /**
     * Get form data
     * @return object
     */
    Backbone.View.prototype.getFormData = function(){
        var self     = this,
            defaults = this.entity.defaults;

        _.each(defaults, function(value, attribute){
            defaults[attribute] = $(self.formSlctr + ' input[name="' + attribute + '"]').val().trim();
        });

        return defaults;
    };

    /**
     * Get error block selector
     * @return string
     */
    Backbone.View.prototype.getErrorBlockSlctr = function(){
        return (this.formErrorBlockOptions && this.formErrorBlockOptions.slctr) ? this.formErrorBlockOptions.slctr : 'error';
    };

    /**
     * Create error block
     * @return object of jQuery DOM element
     */
    Backbone.View.prototype.createErrorBlock = function(){
        if (this.formErrorBlockOptions) {
            var EBOptions = this.formErrorBlockOptions;
            var EBClass = (EBOptions.class) ? EBOptions.class : 'error';
            var EBAttributes  = (EBOptions.attributes) ? EBOptions.attributes.join(' ') : '';
            return $('<div class="' + EBClass + '" ' + EBAttributes + '></div>');
        } else {
            return $('<div class="error"></div>');
        }
    };

    /**
     * Clear error block
     * @return void
     */
    Backbone.View.prototype.clearErrorBlock = function(){
        $(this.formSlctr).find(this.getErrorBlockSlctr()).remove();
    };

    /**
     * Create error message
     * @param {string} message
     * @return string
     */
    Backbone.View.prototype.createErrorMessage = function( message ){
        if (this.formErrorBlockOptions && this.formErrorBlockOptions.hasOwnProperty('template')) {
            return this.formErrorBlockOptions.template({ message: message });
        } else {
            return '<p>' + message + '</p>';
        }
    };

    /**
     * Put error block
     * @param {string} errorBlock
     * @return void
     */
    Backbone.View.prototype.putErrorBlock = function(errorBlock){
        $(this.formSlctr).find('div.title').after(errorBlock);
    };

    /**
     * Is error block active
     * @return boolean
     */
    Backbone.View.prototype.isErrorBlockActive = function(){
        return !!$(this.formSlctr).find(this.getErrorBlockSlctr()).length;
    };

    /**
     * Render errors
     * @param {boolean} holdErrorBlock
     * @return void
     */
    Backbone.View.prototype.renderErrors = function(holdErrorBlock){
        var self = this;
        // if form has server errors
        if (!holdErrorBlock) {
            this.clearErrorBlock();
        }

        if (this.entity.validationError) {
            var errorBlock = this.createErrorBlock();
            _.each(this.entity.validationError, function( message, attribute ){
                var errorMessage = self.createErrorMessage( message );
                errorBlock.append(errorMessage);
            });
            this.putErrorBlock(errorBlock);
        }
    };

    /**
     * Render
     * @param {boolean} holdErrorBlock
     * @return void
     */
    Backbone.View.prototype.render = function(holdErrorBlock){
        holdErrorBlock = holdErrorBlock || false;
        this.renderErrors(holdErrorBlock);
    };
    /******************VIEW ADVANCED FUNCTIONS*************************/
}).call(this);
