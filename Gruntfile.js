'use strict';

var webpackConf = require('./webpack.config.js');
var _           = require('lodash');

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-webpack');

    var appConfig = {
        src: webpackConf.context,
        dist: webpackConf.output.path
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: appConfig,

        clean: {
            dist: '<%= app.dist %>'
        },

        webpack: {
            // configuration for all builds
            options: webpackConf,
            build: {

            }
        },

        open: {
            server: {
                path: 'http://localhost:8080'
            }
        },

        'webpack-dev-server': {
            app: {
                /*
                    Here we extend the webpack config to add source maps in dev
                    and the middle-ware settings below to enable hot module
                    reload
                 */
                webpack: _.extend({}, webpackConf, {
                    devtool: 'source-map' // when in dev server mode enable source maps
                }),
                contentBase: 'dist', // web server root
                keepalive: true,     // don't stop the task when the server has started (runs forever)
                host: 'localhost',   // needed for hot reload as its undefined by default
                hot: true,           // enable hot module reload
                inline: true         // hot module reload only starts if in inline mode
            }
        }

    });

    ///////////
    // Tasks //
    ///////////

    // Default task(s).
    grunt.registerTask('default', function () {
        grunt.task.run([
            // 'clean:dist',         // clear-down old files in dist
            'open',        // open a browser window for the app
            'webpack-dev-server', // start webpack-dev-server to serve and hot module replace
        ]);
    });

    grunt.registerTask('serve', ['default']);

    grunt.registerTask('build', function () {
        grunt.task.run([
            'webpack',      // bundle our source files and move to dist
        ]);
    });
};
