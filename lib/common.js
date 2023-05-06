const _ = require('lodash'),
  Promise = require('bluebird'),
  fs = Promise.promisifyAll(require('fs'))

const getPostUpdated = function(post) {
  return (post.updated || post.date).toDate()
}

const common = {
  setItemLastUpdate: function(item) {
    const posts = item.posts.toArray()
    const max = _.maxBy(posts, getPostUpdated);
    item.updated = (max.updated || max.date).toDate()
    return item
  },
  getFileContent: function(filePath) {
    return fs.readFileAsync(filePath, { encoding: 'utf8' })
  },
  isDefined: _.negate(_.isUndefined),
  getIndexSitemapFilename: function(config) {
    if (config.sitemap && config.sitemap.path) {
      return config.sitemap.path
    }
    return config.root + 'sitemap.xml'
  }
}

module.exports = common
