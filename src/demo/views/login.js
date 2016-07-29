'use strict';

import { ItemView } from 'backbone.marionette';
import template from '../templates/login.hbs';
import jquery from 'jquery';
import Backbone from 'backbone';
import 'backbone-validation';

export default ItemView.extend({
    template,

    initialize: function () {
        Backbone.Validation.bind(this);
    },

    events: {
        'click #submit': 'doValidateSubmitLoginAction',
        'blur input': 'doValidateInput'
    },

    /**
    * @TODO - Validate input
    *
    **/
    doValidateInput: function (ev) {
        let el = jquery(ev.currentTarget),
            name = el.attr('name'),
            value = el.val();

        let validationError = this.model.preValidate(name, value);
        let errorField = this.$el.find(`#error-${name}`);
        errorField.empty();

        if (validationError !== '') {
            errorField.append(validationError);
            this.model.set(name, '');
            return false;
        }

        this.model.set(name, value);
        return true;
    },

    /**
    * After submission rechecks the username and password for validation
    * This is mainly seperated from the save function to allow easier unit testing
    * @param {Object} ev Event that triggered the action
    */
    doValidateSubmitLoginAction: function (ev) {
        ev.preventDefault();
        this.doSubmitLoginAction(this.model.toJSON());
    },

    /**
    * Make the POST to the login endpoint. This is mainly seperated for unit testing
    * @param {Object} ev Event that triggered the action
    */
    doSubmitLoginAction: function (loginObject) {
        this.model.save(loginObject);
    }
});
