"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BROWSER_GLOBALS_PROVIDERS = exports.DocumentRef = exports.WindowRef = void 0;

var WindowRef =
/** @class */
function () {
  function WindowRef() {}

  WindowRef.prototype.getNativeWindow = function () {
    return window;
  };

  return WindowRef;
}();

exports.WindowRef = WindowRef;

var DocumentRef =
/** @class */
function () {
  function DocumentRef() {}

  DocumentRef.prototype.getNativeDocument = function () {
    return document;
  };

  return DocumentRef;
}();

exports.DocumentRef = DocumentRef;
var BROWSER_GLOBALS_PROVIDERS = [WindowRef, DocumentRef];
exports.BROWSER_GLOBALS_PROVIDERS = BROWSER_GLOBALS_PROVIDERS;