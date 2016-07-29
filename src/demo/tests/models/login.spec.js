/* global expect, sinon */
'use strict';

import LoginModel from '../../models/login.js';

let env = {};

describe('Login Model', function () {

    beforeEach(() => {
        env.model = new LoginModel();
        env.sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        // Restore all the things made through the sandbox
        env.sandbox.restore();
    });

    it('should return the correct URL', () => {
        expect(env.model.url()).to.equal('/login');
    });
});
