"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexController = require("./indexController");

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllerInit = {
  init: function init(app, router) {
    app.use(router(function (_) {
      _.get("/index/index", _indexController2.default.index());
      _.get("/index/update", _indexController2.default.update());
      _.get("/index/star", _indexController2.default.star());
      _.get("/index/thumb", _indexController2.default.thumb());
      _.get("/index/adv", _indexController2.default.advertisement());
    }));
  }
};
exports.default = controllerInit;