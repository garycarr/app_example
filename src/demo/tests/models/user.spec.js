/* global expect, sinon */
'use strict';

import UserModel from '../../models/user.js';

let env = {};

describe('User Model', function () {

    beforeEach(() => {
        env.model = new UserModel();
    });

    it('should return the correct URL', () => {
        expect(env.model.url()).to.equal('/user');
    });

    describe('fetch request', function () {
        beforeEach(function () {
            sinon.stub($, 'ajax')
                .yieldsTo('success')
                .returns($.Deferred().resolve());
        });

        // it('should call the correct URL with GET method', function () {
        //     env.model.fetch();
        //     $.ajax.should.have.been.calledWithMatch({
        //         type: 'GET',
        //         url: '/user'
        //     });
        // });
    });
});
