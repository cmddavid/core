"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmFitBounds = void 0;

var _core = require("@angular/core");

var _fitBounds = require("../services/fit-bounds");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

/**
 * Adds the given directive to the auto fit bounds feature when the value is true.
 * To make it work with you custom AGM component, you also have to implement the {@link FitBoundsAccessor} abstract class.
 * @example
 * <agm-marker [agmFitBounds]="true"></agm-marker>
 */
var AgmFitBounds =
/** @class */
function () {
  function AgmFitBounds(_fitBoundsAccessor, _fitBoundsService) {
    this._fitBoundsAccessor = _fitBoundsAccessor;
    this._fitBoundsService = _fitBoundsService;
    /**
     * If the value is true, the element gets added to the bounds of the map.
     * Default: true.
     */

    this.agmFitBounds = true;
    this._destroyed$ = new _rxjs.Subject();
    this._latestFitBoundsDetails = null;
  }
  /**
   * @internal
   */


  AgmFitBounds.prototype.ngOnChanges = function (changes) {
    this._updateBounds();
  };
  /**
   * @internal
   */


  AgmFitBounds.prototype.ngOnInit = function () {
    var _this = this;

    this._fitBoundsAccessor.getFitBoundsDetails$().pipe((0, _operators.distinctUntilChanged)(function (x, y) {
      return x.latLng.lat === y.latLng.lng;
    }), (0, _operators.takeUntil)(this._destroyed$)).subscribe(function (details) {
      return _this._updateBounds(details);
    });
  };

  AgmFitBounds.prototype._updateBounds = function (newFitBoundsDetails) {
    if (newFitBoundsDetails) {
      this._latestFitBoundsDetails = newFitBoundsDetails;
    }

    if (!this._latestFitBoundsDetails) {
      return;
    }

    if (this.agmFitBounds) {
      this._fitBoundsService.addToBounds(this._latestFitBoundsDetails.latLng);
    } else {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
    }
  };
  /**
   * @internal
   */


  AgmFitBounds.prototype.ngOnDestroy = function () {
    this._destroyed$.next();

    this._destroyed$.complete();

    if (this._latestFitBoundsDetails !== null) {
      this._fitBoundsService.removeFromBounds(this._latestFitBoundsDetails.latLng);
    }
  };

  AgmFitBounds.decorators = [{
    type: _core.Directive,
    args: [{
      selector: '[agmFitBounds]'
    }]
  }];
  /** @nocollapse */

  AgmFitBounds.ctorParameters = function () {
    return [{
      type: _fitBounds.FitBoundsAccessor,
      decorators: [{
        type: _core.Self
      }]
    }, {
      type: _fitBounds.FitBoundsService
    }];
  };

  AgmFitBounds.propDecorators = {
    agmFitBounds: [{
      type: _core.Input
    }]
  };
  return AgmFitBounds;
}();

exports.AgmFitBounds = AgmFitBounds;