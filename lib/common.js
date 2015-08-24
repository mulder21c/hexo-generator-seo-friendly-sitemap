'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    fs = Promise.promisifyAll(require('fs'));

var getPostUpdated = function (post) {
    return post.updated.toDate();
};

var common = {
    setItemLastUpdate: function (item) {
        var posts = item.posts.toArray();
        item.updated = _.max(posts, getPostUpdated).updated.toDate();
        return item;
    },
    getFileContent: function (filePath) {
        return fs.readFileAsync(filePath, {encoding: 'utf8'});
    },
    isDefined: _.negate(_.isUndefined)
};

module.exports = common;