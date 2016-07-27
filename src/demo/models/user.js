'use strict';

import Backbone from 'backbone';

export default Backbone.Model.extend({
    /**
     * Method that returns the root of the API endpoint URL used by Backbone.
     * @return {String} Backbone model API root
     */
    urlRoot: function () {
        return '/user';
    }
});
