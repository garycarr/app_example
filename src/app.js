'use strict';

import Marionette from 'backbone.marionette';
import RootLayoutView from './demo/views/root';

/**
 * The applications class used in @see module:main to start. This module sets up
 * everything needed to start the app.
 *
 * @module application
 */
export default Marionette.Application.extend({
    loadInitialData: function () {
        return Promise.resolve();
    },

    onStart: function () {
        // create and render the root view
        var appRootLayoutView = new RootLayoutView();
        appRootLayoutView.render();
    }
});
