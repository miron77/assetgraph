/**
 *  Implementation of https://www.w3.org/TR/resource-hints/#preconnect
 */

const HtmlRelation = require('./HtmlRelation');

function getLinkNode(relation, htmlAsset) {
    var node = htmlAsset.parseTree.createElement('link');
    node.setAttribute('rel', 'preconnect');

    return node;
}

class HtmlPreconnectLink extends HtmlRelation {
    constructor(config) {
        super(config);

        if (!this.to || !this.to.url) {
            throw new Error('HtmlPreconnectLink: The `to` asset must have a url');
        }
    }

    get href() {
        return this.node.getAttribute('href');
    }

    set href(href) {
        this.node.setAttribute('href', href);
    }

    attach(asset, position, adjacentRelation) {
        this.node = getLinkNode(this, asset);

        this.attachNodeBeforeOrAfter(position, adjacentRelation);
        return super.attach(asset, position, adjacentRelation);
    }

    attachToHead(asset, position, adjacentNode) {
        this.node = getLinkNode(this, asset);

        super.attachToHead(asset, position, adjacentNode);
    }

    inline() {
        throw new Error('HtmlPreconnectLink: Inlining of resource hints is not allowed');
    }
};

module.exports = HtmlPreconnectLink;