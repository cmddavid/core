"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmPolylinePoint = void 0;

var _core = require("@angular/core");

/**
 * AgmPolylinePoint represents one element of a polyline within a  {@link
 * SembGoogleMapPolyline}
 */
var AgmPolylinePoint =
/** @class */
function () {
  function AgmPolylinePoint() {
    /**
     * This event emitter gets emitted when the position of the point changed.
     */
    this.positionChanged = new _core.EventEmitter();
  }

  AgmPolylinePoint.prototype.ngOnChanges = function (changes) {
    if (changes['latitude'] || changes['longitude']) {
      var position = {
        lat: changes['latitude'].currentValue,
        lng: changes['longitude'].currentValue
      };
      this.positionChanged.emit(position);
    }
  };

  AgmPolylinePoint.decorators = [{
    type: _core.Directive,
    args: [{
      selector: 'agm-polyline-point'
    }]
  }];
  /** @nocollapse */

  AgmPolylinePoint.ctorParameters = function () {
    return [];
  };

  AgmPolylinePoint.propDecorators = {
    latitude: [{
      type: _core.Input
    }],
    longitude: [{
      type: _core.Input
    }],
    positionChanged: [{
      type: _core.Output
    }]
  };
  return AgmPolylinePoint;
}();

exports.AgmPolylinePoint = AgmPolylinePoint;