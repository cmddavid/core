"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectangleManager = void 0;

var _core = require("@angular/core");

var _rxjs = require("rxjs");

var _googleMapsApiWrapper = require("../google-maps-api-wrapper");

var RectangleManager =
/** @class */
function () {
  function RectangleManager(_apiWrapper, _zone) {
    this._apiWrapper = _apiWrapper;
    this._zone = _zone;
    this._rectangles = new Map();
  }

  RectangleManager.prototype.addRectangle = function (rectangle) {
    this._rectangles.set(rectangle, this._apiWrapper.createRectangle({
      bounds: {
        north: rectangle.north,
        east: rectangle.east,
        south: rectangle.south,
        west: rectangle.west
      },
      clickable: rectangle.clickable,
      draggable: rectangle.draggable,
      editable: rectangle.editable,
      fillColor: rectangle.fillColor,
      fillOpacity: rectangle.fillOpacity,
      strokeColor: rectangle.strokeColor,
      strokeOpacity: rectangle.strokeOpacity,
      strokePosition: rectangle.strokePosition,
      strokeWeight: rectangle.strokeWeight,
      visible: rectangle.visible,
      zIndex: rectangle.zIndex
    }));
  };
  /**
   * Removes the given rectangle from the map.
   */


  RectangleManager.prototype.removeRectangle = function (rectangle) {
    var _this = this;

    return this._rectangles.get(rectangle).then(function (r) {
      r.setMap(null);

      _this._rectangles.delete(rectangle);
    });
  };

  RectangleManager.prototype.setOptions = function (rectangle, options) {
    return this._rectangles.get(rectangle).then(function (r) {
      return r.setOptions(options);
    });
  };

  RectangleManager.prototype.getBounds = function (rectangle) {
    return this._rectangles.get(rectangle).then(function (r) {
      return r.getBounds();
    });
  };

  RectangleManager.prototype.setBounds = function (rectangle) {
    return this._rectangles.get(rectangle).then(function (r) {
      return r.setBounds({
        north: rectangle.north,
        east: rectangle.east,
        south: rectangle.south,
        west: rectangle.west
      });
    });
  };

  RectangleManager.prototype.setEditable = function (rectangle) {
    return this._rectangles.get(rectangle).then(function (r) {
      return r.setEditable(rectangle.editable);
    });
  };

  RectangleManager.prototype.setDraggable = function (rectangle) {
    return this._rectangles.get(rectangle).then(function (r) {
      return r.setDraggable(rectangle.draggable);
    });
  };

  RectangleManager.prototype.setVisible = function (rectangle) {
    return this._rectangles.get(rectangle).then(function (r) {
      return r.setVisible(rectangle.visible);
    });
  };

  RectangleManager.prototype.createEventObservable = function (eventName, rectangle) {
    var _this = this;

    return _rxjs.Observable.create(function (observer) {
      var listener = null;

      _this._rectangles.get(rectangle).then(function (r) {
        listener = r.addListener(eventName, function (e) {
          return _this._zone.run(function () {
            return observer.next(e);
          });
        });
      });

      return function () {
        if (listener !== null) {
          listener.remove();
        }
      };
    });
  };

  RectangleManager.decorators = [{
    type: _core.Injectable
  }];
  /** @nocollapse */

  RectangleManager.ctorParameters = function () {
    return [{
      type: _googleMapsApiWrapper.GoogleMapsAPIWrapper
    }, {
      type: _core.NgZone
    }];
  };

  return RectangleManager;
}();

exports.RectangleManager = RectangleManager;