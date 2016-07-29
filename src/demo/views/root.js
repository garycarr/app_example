'use strict';

import Marionette from 'backbone.marionette';
import Template from '../templates/root.hbs';
import HeaderView from './header';
import LoginView from './login';
import LoginModel from '../models/login.js';

export default Marionette.LayoutView.extend({
    /**
     * Element selector the view is attached to.
     * @type {String}
     * @instance
     */
    el: 'body',

    /**
     * Template used for the root layout view. Contains the elements for the
     * view regions.
     * @type {String}
     * @instance
     */
    template: Template,

    regions: {
        header: '#header',
        content: '#content'
    },

    onRender: function () {
        this.showChildView('header', new HeaderView());
        this.showChildView('content', new LoginView({
            model: new LoginModel()
        }));
    }
});
