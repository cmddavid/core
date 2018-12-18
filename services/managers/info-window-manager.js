"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoWindowManager = void 0;

var _rxjs = require("rxjs");

var _core = require("@angular/core");

var _googleMapsApiWrapper = require("../google-maps-api-wrapper");

var _markerManager2 = require("./marker-manager");

var InfoWindowManager =
/** @class */
function () {
  function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
    this._mapsWrapper = _mapsWrapper;
    this._zone = _zone;
    this._markerManager = _markerManager;
    this._infoWindows = new Map();
  }

  InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
    var _this = this;

    var iWindow = this._infoWindows.get(infoWindow);

    if (iWindow == null) {
      // info window already deleted
      return Promise.resolve();
    }

    return iWindow.then(function (i) {
      return _this._zone.run(function () {
        i.close();

        _this._infoWindows.delete(infoWindow);
      });
    });
  };

  InfoWindowManager.prototype.setPosition = function (infoWindow) {
    return this._infoWindows.get(infoWindow).then(function (i) {
      return i.setPosition({
        lat: infoWindow.latitude,
        lng: infoWindow.longitude
      });
    });
  };

  InfoWindowManager.prototype.setZIndex = function (infoWindow) {
    return this._infoWindows.get(infoWindow).then(function (i) {
      return i.setZIndex(infoWindow.zIndex);
    });
  };

  InfoWindowManager.prototype.open = function (infoWindow) {
    var _this = this;

    return this._infoWindows.get(infoWindow).then(function (w) {
      if (infoWindow.hostMarker != null) {
        return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
          return _this._mapsWrapper.getNativeMap().then(function (map) {
            return w.open(map, marker);
          });
        });
      }

      return _this._mapsWrapper.getNativeMap().then(function (map) {
        return w.open(map);
      });
    });
  };

  InfoWindowManager.prototype.close = function (infoWindow) {
    return this._infoWindows.get(infoWindow).then(function (w) {
      return w.close();
    });
  };

  InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
    return this._infoWindows.get(infoWindow).then(function (i) {
      return i.setOptions(options);
    });
  };

  InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
    var options = {
      content: infoWindow.content,
      maxWidth: infoWindow.maxWidth,
      zIndex: infoWindow.zIndex,
      disableAutoPan: infoWindow.disableAutoPan
    };

    if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
      options.position = {
        lat: infoWindow.latitude,
        lng: infoWindow.longitude
      };
    }

    var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);

    this._infoWindows.set(infoWindow, infoWindowPromise);
  };
  /**
   * Creates a Google Maps event listener for the given InfoWindow as an Observable
   */


  InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
    var _this = this;

    return new _rxjs.Observable(function (observer) {
      _this._infoWindows.get(infoWindow).then(function (i) {
        i.addListener(eventName, function (e) {
          return _this._zone.run(function () {
            return observer.next(e);
          });
        });
      });
    });
  };

  InfoWindowManager.decorators = [{
    type: _core.Injectable
  }];
  /** @nocollapse */

  InfoWindowManager.ctorParameters = function () {
    return [{
      type: _googleMapsApiWrapper.GoogleMapsAPIWrapper
    }, {
      type: _core.NgZone
    }, {
      type: _markerManager2.MarkerManager
    }];
  };

  return InfoWindowManager;
}();

exports.InfoWindowManager = InfoWindowManager;