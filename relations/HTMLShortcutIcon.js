/*global require, exports*/
var util = require('util'),
    _ = require('underscore'),
    Base = require('./Base').Base;

function HTMLShortcutIcon(config) {
    Base.call(this, config);
}

util.inherits(HTMLShortcutIcon, Base);

_.extend(HTMLShortcutIcon.prototype, {
    setUrl: function (url) {
        this.node.setAttribute('href', url);
    }
});

HTMLShortcutIcon.createNodeForAsset = function (document, asset) {
    var node = document.createElement('link');
    node.rel = 'shortcut icon'; // Hmm, how to handle apple-touch-icon?
    return node;
};

exports.HTMLShortcutIcon = HTMLShortcutIcon;
