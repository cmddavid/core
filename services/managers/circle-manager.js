"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CircleManager = void 0;

var _core = require("@angular/core");

var _rxjs = require("rxjs");

var _googleMapsApiWrapper = require("../google-maps-api-wrapper");

var CircleManager =
/** @class */
function () {
  function CircleManager(_apiWrapper, _zone) {
    this._apiWrapper = _apiWrapper;
    this._zone = _zone;
    this._circles = new Map();
  }

  CircleManager.prototype.addCircle = function (circle) {
    this._circles.set(circle, this._apiWrapper.createCircle({
      center: {
        lat: circle.latitude,
        lng: circle.longitude
      },
      clickable: circle.clickable,
      draggable: circle.draggable,
      editable: circle.editable,
      fillColor: circle.fillColor,
      fillOpacity: circle.fillOpacity,
      radius: circle.radius,
      strokeColor: circle.strokeColor,
      strokeOpacity: circle.strokeOpacity,
      strokePosition: circle.strokePosition,
      strokeWeight: circle.strokeWeight,
      visible: circle.visible,
      zIndex: circle.zIndex
    }));
  };
  /**
   * Removes the given circle from the map.
   */


  CircleManager.prototype.removeCircle = function (circle) {
    var _this = this;

    return this._circles.get(circle).then(function (c) {
      c.setMap(null);

      _this._circles.delete(circle);
    });
  };

  CircleManager.prototype.setOptions = function (circle, options) {
    return this._circles.get(circle).then(function (c) {
      return c.setOptions(options);
    });
  };

  CircleManager.prototype.getBounds = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.getBounds();
    });
  };

  CircleManager.prototype.getCenter = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.getCenter();
    });
  };

  CircleManager.prototype.getRadius = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.getRadius();
    });
  };

  CircleManager.prototype.setCenter = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.setCenter({
        lat: circle.latitude,
        lng: circle.longitude
      });
    });
  };

  CircleManager.prototype.setEditable = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.setEditable(circle.editable);
    });
  };

  CircleManager.prototype.setDraggable = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.setDraggable(circle.draggable);
    });
  };

  CircleManager.prototype.setVisible = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.setVisible(circle.visible);
    });
  };

  CircleManager.prototype.setRadius = function (circle) {
    return this._circles.get(circle).then(function (c) {
      return c.setRadius(circle.radius);
    });
  };

  CircleManager.prototype.createEventObservable = function (eventName, circle) {
    var _this = this;

    return new _rxjs.Observable(function (observer) {
      var listener = null;

      _this._circles.get(circle).then(function (c) {
        listener = c.addListener(eventName, function (e) {
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

  CircleManager.decorators = [{
    type: _core.Injectable
  }];
  /** @nocollapse */

  CircleManager.ctorParameters = function () {
    return [{
      type: _googleMapsApiWrapper.GoogleMapsAPIWrapper
    }, {
      type: _core.NgZone
    }];
  };

  return CircleManager;
}();

exports.CircleManager = CircleManager;