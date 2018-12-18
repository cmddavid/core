"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolylineManager = void 0;

var _core = require("@angular/core");

var _rxjs = require("rxjs");

var _googleMapsApiWrapper = require("../google-maps-api-wrapper");

var PolylineManager =
/** @class */
function () {
  function PolylineManager(_mapsWrapper, _zone) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    this._polylines = new Map();
  }

  PolylineManager._convertPoints = function (line) {
    var path = line._getPoints().map(function (point) {
      return {
        lat: point.latitude,
        lng: point.longitude
      };
    });

    return path;
  };

  PolylineManager.prototype.addPolyline = function (line) {
    var path = PolylineManager._convertPoints(line);

    var polylinePromise = this._mapsWrapper.createPolyline({
      clickable: line.clickable,
      draggable: line.draggable,
      editable: line.editable,
      geodesic: line.geodesic,
      strokeColor: line.strokeColor,
      strokeOpacity: line.strokeOpacity,
      strokeWeight: line.strokeWeight,
      visible: line.visible,
      zIndex: line.zIndex,
      path: path
    });

    this._polylines.set(line, polylinePromise);
  };

  PolylineManager.prototype.updatePolylinePoints = function (line) {
    var _this = this;

    var path = PolylineManager._convertPoints(line);

    var m = this._polylines.get(line);

    if (m == null) {
      return Promise.resolve();
    }

    return m.then(function (l) {
      return _this._zone.run(function () {
        l.setPath(path);
      });
    });
  };

  PolylineManager.prototype.setPolylineOptions = function (line, options) {
    return this._polylines.get(line).then(function (l) {
      l.setOptions(options);
    });
  };

  PolylineManager.prototype.deletePolyline = function (line) {
    var _this = this;

    var m = this._polylines.get(line);

    if (m == null) {
      return Promise.resolve();
    }

    return m.then(function (l) {
      return _this._zone.run(function () {
        l.setMap(null);

        _this._polylines.delete(line);
      });
    });
  };

  PolylineManager.prototype.createEventObservable = function (eventName, line) {
    var _this = this;

    return new _rxjs.Observable(function (observer) {
      _this._polylines.get(line).then(function (l) {
        l.addListener(eventName, function (e) {
          return _this._zone.run(function () {
            return observer.next(e);
          });
        });
      });
    });
  };

  PolylineManager.decorators = [{
    type: _core.Injectable
  }];
  /** @nocollapse */

  PolylineManager.ctorParameters = function () {
    return [{
      type: _googleMapsApiWrapper.GoogleMapsAPIWrapper
    }, {
      type: _core.NgZone
    }];
  };

  return PolylineManager;
}();

exports.PolylineManager = PolylineManager;