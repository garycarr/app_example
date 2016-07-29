/* global sinon */
// sinon, expect
'use strict';

import RootLayoutView from '../../views/root';

let env = {};

describe('Root View', function () {

    beforeEach(function () {
        env.sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        env.sandbox.restore();
    });

    describe('Testing show child view', function () {
        it('should call showChildView onRender', function () {
            let view = new RootLayoutView();

            env.sandbox.stub(view, 'showChildView');

            view.onRender();

            view.showChildView.should.have.callCount(2);
        });
    });

});
