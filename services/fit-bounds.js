"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FitBoundsService = exports.FitBoundsAccessor = void 0;

var _core = require("@angular/core");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _mapsApiLoader = require("./maps-api-loader/maps-api-loader");

/**
 * Class to implement when you what to be able to make it work with the auto fit bounds feature
 * of AGM.
 */
var FitBoundsAccessor =
/** @class */
function () {
  function FitBoundsAccessor() {}

  return FitBoundsAccessor;
}();

exports.FitBoundsAccessor = FitBoundsAccessor;

/**
 * The FitBoundsService is responsible for computing the bounds of the a single map.
 */
var FitBoundsService =
/** @class */
function () {
  function FitBoundsService(loader) {
    var _this = this;

    this._boundsChangeSampleTime$ = new _rxjs.BehaviorSubject(200);
    this._includeInBounds$ = new _rxjs.BehaviorSubject(new Map());
    this.bounds$ = (0, _rxjs.from)(loader.load()).pipe((0, _operators.flatMap)(function () {
      return _this._includeInBounds$;
    }), (0, _operators.sample)(this._boundsChangeSampleTime$.pipe((0, _operators.switchMap)(function (time) {
      return (0, _rxjs.timer)(0, time);
    }))), (0, _operators.map)(function (includeInBounds) {
      return _this._generateBounds(includeInBounds);
    }), (0, _operators.shareReplay)(1));
  }

  FitBoundsService.prototype._generateBounds = function (includeInBounds) {
    var bounds = new google.maps.LatLngBounds();
    includeInBounds.forEach(function (b) {
      return bounds.extend(b);
    });
    return bounds;
  };

  FitBoundsService.prototype.addToBounds = function (latLng) {
    var id = this._createIdentifier(latLng);

    if (this._includeInBounds$.value.has(id)) {
      return;
    }

    var map = this._includeInBounds$.value;
    map.set(id, latLng);

    this._includeInBounds$.next(map);
  };

  FitBoundsService.prototype.removeFromBounds = function (latLng) {
    var map = this._includeInBounds$.value;
    map.delete(this._createIdentifier(latLng));

    this._includeInBounds$.next(map);
  };

  FitBoundsService.prototype.changeFitBoundsChangeSampleTime = function (timeMs) {
    this._boundsChangeSampleTime$.next(timeMs);
  };

  FitBoundsService.prototype.getBounds$ = function () {
    return this.bounds$;
  };

  FitBoundsService.prototype._createIdentifier = function (latLng) {
    return latLng.lat + "+" + latLng.lng;
  };

  FitBoundsService.decorators = [{
    type: _core.Injectable
  }];
  /** @nocollapse */

  FitBoundsService.ctorParameters = function () {
    return [{
      type: _mapsApiLoader.MapsAPILoader
    }];
  };

  return FitBoundsService;
}();

exports.FitBoundsService = FitBoundsService;