'use strict';

import Marionette from 'backbone.marionette';
import template from '../templates/root.hbs';
import HeaderView from './header';

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
    template: template,

    regions: {
        header: '#header'
    },

    onRender: function () {
        this.showChildView('header', new HeaderView());
    }
});
