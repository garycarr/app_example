'use strict';

import './style.scss'; // https://github.com/webpack/style-loader
import $        from 'jquery';
import Backbone from 'backbone';
import App      from './app';

/**
 * The applications main start point.
 *
 * @module main
 */
$(document).ready(function () {
    var app = new App();
    app.loadInitialData().then(function () {
        app.start();
    });
});
