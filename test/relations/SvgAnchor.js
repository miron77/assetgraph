const pathModule = require('path');
/*global describe, it*/
const expect = require('../unexpected-with-plugins');
const AssetGraph = require('../../lib/AssetGraph');

describe('relations/SvgAnchor', function() {
  it('should handle a test case with <a xlink:href=...> referencing an external file', async function() {
    const assetGraph = new AssetGraph({
      root: pathModule.resolve(
        __dirname,
        '../../testdata/relations/SvgAnchor/xlinkhref'
      )
    });
    await assetGraph.loadAssets('image.svg');
    await assetGraph.populate();

    expect(assetGraph, 'to contain relation', 'SvgAnchor');
    expect(assetGraph, 'to contain asset', 'Svg');
    expect(assetGraph, 'to contain asset', 'Png');
    assetGraph.findAssets({ fileName: 'foo.png' })[0].fileName = 'bar.png';
    expect(
      assetGraph.findAssets({ fileName: 'image.svg' })[0].text,
      'to contain',
      '<a xlink:href="bar.png">'
    );
  });

  it('should handle a test case with <a href=...> referencing an external file', async function() {
    const assetGraph = new AssetGraph({
      root: pathModule.resolve(
        __dirname,
        '../../testdata/relations/SvgAnchor/href/'
      )
    });
    await assetGraph.loadAssets('image.svg');
    await assetGraph.populate();

    expect(assetGraph, 'to contain relation', 'SvgAnchor');
    expect(assetGraph, 'to contain asset', 'Svg');
    expect(assetGraph, 'to contain asset', 'Png');
    assetGraph.findAssets({ fileName: 'foo.png' })[0].fileName = 'bar.png';
    expect(
      assetGraph.findAssets({ fileName: 'image.svg' })[0].text,
      'to contain',
      '<a href="bar.png">'
    );
  });
});
