/* global sinon, expect */
'use strict';

import LoginView from '../../views/login';
import LoginModel from '../../models/login';
// import Backbone from 'backbone';
import jquery from 'jquery';

let env = {};

describe('Root View', function () {

    beforeEach(function () {
        env.sandbox = sinon.sandbox.create();
        env.sandbox.fakeServer = env.sandbox.useFakeServer();
    });

    afterEach(function () {
        env.sandbox.restore();
        env.sandbox.fakeServer.restore();
    });

    describe('Running doValidateSubmitLoginAction tests', function () {

        it('should attempt to call doSubmitLoginAction', function () {
            let loginForm = {
                username: 'tester',
                password: 'correct_pass'
            };

            let view = new LoginView({
                model: new LoginModel({
                    username: loginForm.username,
                    password: loginForm.password
                })
            });

            let callCount = 0;
            let ev = {
                preventDefault: function () {
                    callCount += 1;
                }
            };

            env.sandbox.stub(view, 'doSubmitLoginAction');
            view.doValidateSubmitLoginAction(ev);

            // Check the function was called with the correct parameters
            view.doSubmitLoginAction.should.have.been.calledWith(loginForm);
            view.doSubmitLoginAction.should.have.been.callCount(1);
            expect(callCount).to.equal(1);
        });
    });


    describe('Running doSubmitLoginAction tests', function () {
        it('should make a succesful login to the endpoint', function () {
            let expectedURL = '/login';
            let expectedStatus = 204;
            let expectedMethod = 'POST';

            env.sandbox.fakeServer.respondWith(expectedMethod, expectedURL,
                [expectedStatus, { 'Content-Type': 'application/json' },
                '[]']);

            let loginForm = {
                username: 'tester',
                password: 'correct_pass'
            };

            let view = new LoginView({
                model: new LoginModel({
                    username: loginForm.username,
                    password: loginForm.password
                })
            });

            let spy = sinon.spy(jquery, 'ajax');
            view.doSubmitLoginAction(view.model.toJSON);
            env.sandbox.fakeServer.respond();
            expect(spy.getCall(0).returnValue.status).to.equal(expectedStatus);
            expect(spy.getCall(0).args[0].url).to.equal(expectedURL);
            expect(spy.getCall(0).args[0].type).to.equal(expectedMethod);
            expect(spy.getCall(0).args[0].data).to.deep.equal(JSON.stringify(loginForm));
            jquery.ajax.restore();
        });

        it('should make an unsuccesful login to the endpoint', function () {
            let expectedURL = '/login';
            let expectedStatus = 400;
            let expectedMethod = 'POST';

            env.sandbox.fakeServer.respondWith(expectedMethod, expectedURL,
                [expectedStatus, { 'Content-Type': 'application/json' },
                '[]']);

            let loginForm = {
                username: 'tester',
                password: 'incorrect_pass'
            };

            let view = new LoginView({
                model: new LoginModel({
                    username: loginForm.username,
                    password: loginForm.password
                })
            });

            let spy = sinon.spy(jquery, 'ajax');
            view.doSubmitLoginAction(view.model.toJSON);
            env.sandbox.fakeServer.respond();
            expect(spy.getCall(0).returnValue.status).to.equal(expectedStatus);
            expect(spy.getCall(0).args[0].url).to.equal(expectedURL);
            expect(spy.getCall(0).args[0].type).to.equal(expectedMethod);
            expect(spy.getCall(0).args[0].data).to.deep.equal(JSON.stringify(loginForm));
            jquery.ajax.restore();
        });
    });


    describe('Running doValidateInput setting model tests', function () {

        it('should validate true for valid username', function () {
            let username = 'tester';

            let view = new LoginView({
                model: new LoginModel()
            });

            view.render();

            expect(view.doValidateInput({
                currentTarget: $(`<input name="username" value=${username} />`)[0]
            })).to.equal(true);
            expect(view.model.get('username')).to.equal(username);
        });

        it('should validate false for invalid username', function () {
            let username = 'a';

            let view = new LoginView({
                model: new LoginModel({
                    username: 'tester'
                })
            });

            view.render();

            expect(view.doValidateInput({
                currentTarget: $(`<input name="username" value=${username} />`)[0]
            })).to.equal(false);
            expect(view.model.get('username')).to.equal('');
        });


        it('should validate true for valid password', function () {
            let password = 'abc123';

            let view = new LoginView({
                model: new LoginModel()
            });

            view.render();

            expect(view.doValidateInput({
                currentTarget: $(`<input name="password" value=${password} />`)[0]
            })).to.equal(true);
            expect(view.model.get('password')).to.equal(password);
        });

        it('should validate false for invalid password', function () {
            let password = 'a';

            let view = new LoginView({
                model: new LoginModel({
                    password: 'abc123'
                })
            });

            view.render();

            expect(view.doValidateInput({
                currentTarget: $(`<input name="password" value=${password} />`)[0]
            })).to.equal(false);
        });
    });

    describe('Running doValidateInput setting view error tests', function () {

        it('should validate populate error section for username', function () {
            let validUsername = 'tester';
            let invalidUsername = 'a';

            let view = new LoginView({
                model: new LoginModel()
            });

            view.render();

            // Make sure there is no error to start with
            expect(view.$el.find('#error-username').text()).to.equal('');

            view.doValidateInput({
                currentTarget: $(`<input name="username" value=${invalidUsername} />`)[0]
            });

            // Now there should be an error sure there is no error to start with
            expect(view.$el.find('#error-username').text()).to.equal('Username must be at least 2 characters');

            view.doValidateInput({
                currentTarget: $(`<input name="username" value=${validUsername} />`)[0]
            });

            // The error should be clear
            expect(view.$el.find('#error-username').text()).to.equal('');

        });

        it('should validate populate error section for password', function () {
            let validPassword = 'abc123';
            let invalidPassword = 'a';

            let view = new LoginView({
                model: new LoginModel()
            });

            view.render();

            // Make sure there is no error to start with
            expect(view.$el.find('#error-password').text()).to.equal('');

            view.doValidateInput({
                currentTarget: $(`<input name="password" value=${invalidPassword} />`)[0]
            });

            // Now there should be an error sure there is no error to start with
            expect(view.$el.find('#error-password').text()).to.equal('Password must be at least 2 characters');

            view.doValidateInput({
                currentTarget: $(`<input name="password" value=${validPassword} />`)[0]
            });

            // The error should be clear
            expect(view.$el.find('#error-password').text()).to.equal('');

        });
    });

    // @TODO work out why the stubbing does not work on these tests
    // describe('Running events tests', function () {
        //
        // it('should trigger doValidateInput on input blur', function () {
        //     let username = 'testesssssr';
        //
        //     let view = new LoginView({
        //         model: new LoginModel()
        //     });
        //
        //     view.render();
        //     env.sandbox.stub(view, 'doValidateInput');
        //
        //     view.$el.find('#username').val(username).blur();
        //
        //     // Check the function was called with the correct parameters
        //     view.doValidateInput.should.have.been.callCount(1);
        //     view.doValidateInput.should.have.been.calledWith($(`<input name="username" value=${username} />`)[0]);
        // });
        //
        // it('should trigger doValidateSubmitLoginAction on submit', function () {
        //
        //     let view = new LoginView({
        //         model: new LoginModel()
        //     });
        //
        //     view.render();
        //     env.sandbox.stub(view, 'doValidateSubmitLoginAction');
        //
        //     view.$el.find('#username').val('tester').blur();
        //     view.$el.find('#password').val('abc12345').blur();
        //     view.$el.find('#submit').click();
        //
        //     // Check the function was called with the correct parameters
        //     view.doValidateSubmitLoginAction.should.have.been.callCount(1);
        //     view.doValidateSubmitLoginAction.should.have.been.calledWith('summit');
        // });
    // });
});
