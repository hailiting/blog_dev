module.exports = function (templateParams, cssList) {
  var _files = templateParams.htmlWebpackPlugin.files;
  var _regChunk = templateParams.htmlWebpackPlugin.options.chunks;
  var _regCss = cssList;
  var _scripts = "";
  var _styles = "";
  for (var i = 0; i < _regChunk.length; i++) {
    _scripts += "<script type='text/javascript' src='" + _files.js[i].replace("/public", "") + "'></script>";
  }
  for (var k = 0; k < _regCss.length; k++) {
    var _cssitem = _regCss[k],
      _cssitems = new RegExp("^" + _cssitem),
      _cssiteme = new RegExp(".css$");
    (_files.css).map(function (filename) {
      var _filearr = filename.split('/'),
        filrdata = _filearr[_filearr.length - 1];
      if (_cssitems.test(filrdata) && _cssiteme.test(filrdata)) {
        _styles += "<link rel='stylesheet' type='text/css' href='" + filename.replace("/public", "") + "'/>";
      }
    })
  }
  return {
    scripts: _scripts,
    styles: _styles,
  }
}