'use strict';

let webpackConf = require('./webpack.config.js');
// let _           = require('lodash');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let processEnv = process.env;  // eslint-disable-line


module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    let appConfig = {
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

            options: {
                webpack: webpackConf
            },

            dev: {
                contentBase: 'http://localhost/',        // web server root
                host: 'localhost',          // needed for hot reload as its undefined by default
                hot: true,                  // enable hot module reload
                inline: true,               // hot module reload only starts if in inline mode
                historyApiFallback: true,   // push state! http://jaketrent.com/post/pushstate-webpack-dev-server/
                proxy: {
                    '/api*': {
                        target: `${processEnv.API_HOST}:${processEnv.API_PORT}`,
                        secure: false,
                        bypass: function (req) {
                            // remove the "api" path part before we send it to the API server
                            req.url = req.url.replace('/api', processEnv.API_PATH);
                        }
                    }
                },
                webpack: {
                    devtool: 'source-map',
                    debug: true,
                    plugins: webpackConf.plugins.concat([
                        new BrowserSyncPlugin({
                            host: 'localhost',
                            port: 8081,
                            proxy: 'localhost:8080'
                        }, { reload: false })
                    ])
                }
            }
        },

        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },

        watch: {
            // when source files change run tasks
            source: {
                files: [
                    '<%= app.src %>/{,**/}*.js'
                ],
                tasks: ['karma:unit']
            }
        },

        connect: {
            coverage: {
                options: {
                    port: 8083,
                    base: 'reports/coverage/html'
                }
            }
        }

    });

    // /////////
    // Tasks //
    // /////////

    // Default task(s).
    grunt.registerTask('default', function () {
        grunt.task.run([
            'clean:dist',             // clear-down old files in dist
            'webpack-dev-server',     // start webpack-dev-server to serve and hot module replace
            'karma:unit',             // run unit tests to get reports
            'connect:coverage',       // serve coverage report on 8082
            'watch'                   // watch source files for other tasks such as test
        ]);
    });

    grunt.registerTask('serve', ['default']);

    grunt.registerTask('build', function () {
        grunt.task.run([
            'webpack' // bundle our source files and move to dist
        ]);
    });

    /**
     * 'test' task to the run unit tests
     */
    grunt.registerTask('test', ['karma:unit']);
};
