"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmPolyline = void 0;

var _core = require("@angular/core");

var _polylineManager2 = require("../services/managers/polyline-manager");

var _polylinePoint = require("./polyline-point");

var polylineId = 0;
/**
 * AgmPolyline renders a polyline on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polyline>
 *          <agm-polyline-point [latitude]="latA" [longitude]="lngA">
 *          </agm-polyline-point>
 *          <agm-polyline-point [latitude]="latB" [longitude]="lngB">
 *          </agm-polyline-point>
 *      </agm-polyline>
 *    </agm-map>
 *  `
 * })
 * ```
 */

var AgmPolyline =
/** @class */
function () {
  function AgmPolyline(_polylineManager) {
    this._polylineManager = _polylineManager;
    /**
     * Indicates whether this Polyline handles mouse events. Defaults to true.
     */

    this.clickable = true;
    /**
     * If set to true, the user can drag this shape over the map. The geodesic property defines the
     * mode of dragging. Defaults to false.
     */
    // tslint:disable-next-line:no-input-rename

    this.draggable = false;
    /**
     * If set to true, the user can edit this shape by dragging the control points shown at the
     * vertices and on each segment. Defaults to false.
     */

    this.editable = false;
    /**
     * When true, edges of the polygon are interpreted as geodesic and will follow the curvature of
     * the Earth. When false, edges of the polygon are rendered as straight lines in screen space.
     * Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     */

    this.geodesic = false;
    /**
     * Whether this polyline is visible on the map. Defaults to true.
     */

    this.visible = true;
    /**
     * This event is fired when the DOM click event is fired on the Polyline.
     */

    this.lineClick = new _core.EventEmitter();
    /**
     * This event is fired when the DOM dblclick event is fired on the Polyline.
     */

    this.lineDblClick = new _core.EventEmitter();
    /**
     * This event is repeatedly fired while the user drags the polyline.
     */

    this.lineDrag = new _core.EventEmitter();
    /**
     * This event is fired when the user stops dragging the polyline.
     */

    this.lineDragEnd = new _core.EventEmitter();
    /**
     * This event is fired when the user starts dragging the polyline.
     */

    this.lineDragStart = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mousedown event is fired on the Polyline.
     */

    this.lineMouseDown = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mousemove event is fired on the Polyline.
     */

    this.lineMouseMove = new _core.EventEmitter();
    /**
     * This event is fired on Polyline mouseout.
     */

    this.lineMouseOut = new _core.EventEmitter();
    /**
     * This event is fired on Polyline mouseover.
     */

    this.lineMouseOver = new _core.EventEmitter();
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polyline
     */

    this.lineMouseUp = new _core.EventEmitter();
    /**
     * This even is fired when the Polyline is right-clicked on.
     */

    this.lineRightClick = new _core.EventEmitter();
    this._polylineAddedToManager = false;
    this._subscriptions = [];
    this._id = (polylineId++).toString();
  }
  /** @internal */


  AgmPolyline.prototype.ngAfterContentInit = function () {
    var _this = this;

    if (this.points.length) {
      this.points.forEach(function (point) {
        var s = point.positionChanged.subscribe(function () {
          _this._polylineManager.updatePolylinePoints(_this);
        });

        _this._subscriptions.push(s);
      });
    }

    if (!this._polylineAddedToManager) {
      this._init();
    }

    var s = this.points.changes.subscribe(function () {
      return _this._polylineManager.updatePolylinePoints(_this);
    });

    this._subscriptions.push(s);

    this._polylineManager.updatePolylinePoints(this);
  };

  AgmPolyline.prototype.ngOnChanges = function (changes) {
    if (!this._polylineAddedToManager) {
      this._init();

      return;
    }

    var options = {};
    var optionKeys = Object.keys(changes).filter(function (k) {
      return AgmPolyline._polylineOptionsAttributes.indexOf(k) !== -1;
    });
    optionKeys.forEach(function (k) {
      return options[k] = changes[k].currentValue;
    });

    this._polylineManager.setPolylineOptions(this, options);
  };

  AgmPolyline.prototype._init = function () {
    this._polylineManager.addPolyline(this);

    this._polylineAddedToManager = true;

    this._addEventListeners();
  };

  AgmPolyline.prototype._addEventListeners = function () {
    var _this = this;

    var handlers = [{
      name: 'click',
      handler: function handler(ev) {
        return _this.lineClick.emit(ev);
      }
    }, {
      name: 'dblclick',
      handler: function handler(ev) {
        return _this.lineDblClick.emit(ev);
      }
    }, {
      name: 'drag',
      handler: function handler(ev) {
        return _this.lineDrag.emit(ev);
      }
    }, {
      name: 'dragend',
      handler: function handler(ev) {
        return _this.lineDragEnd.emit(ev);
      }
    }, {
      name: 'dragstart',
      handler: function handler(ev) {
        return _this.lineDragStart.emit(ev);
      }
    }, {
      name: 'mousedown',
      handler: function handler(ev) {
        return _this.lineMouseDown.emit(ev);
      }
    }, {
      name: 'mousemove',
      handler: function handler(ev) {
        return _this.lineMouseMove.emit(ev);
      }
    }, {
      name: 'mouseout',
      handler: function handler(ev) {
        return _this.lineMouseOut.emit(ev);
      }
    }, {
      name: 'mouseover',
      handler: function handler(ev) {
        return _this.lineMouseOver.emit(ev);
      }
    }, {
      name: 'mouseup',
      handler: function handler(ev) {
        return _this.lineMouseUp.emit(ev);
      }
    }, {
      name: 'rightclick',
      handler: function handler(ev) {
        return _this.lineRightClick.emit(ev);
      }
    }];
    handlers.forEach(function (obj) {
      var os = _this._polylineManager.createEventObservable(obj.name, _this).subscribe(obj.handler);

      _this._subscriptions.push(os);
    });
  };
  /** @internal */


  AgmPolyline.prototype._getPoints = function () {
    if (this.points) {
      return this.points.toArray();
    }

    return [];
  };
  /** @internal */


  AgmPolyline.prototype.id = function () {
    return this._id;
  };
  /** @internal */


  AgmPolyline.prototype.ngOnDestroy = function () {
    this._polylineManager.deletePolyline(this); // unsubscribe all registered observable subscriptions


    this._subscriptions.forEach(function (s) {
      return s.unsubscribe();
    });
  };

  AgmPolyline._polylineOptionsAttributes = ['draggable', 'editable', 'visible', 'geodesic', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'zIndex'];
  AgmPolyline.decorators = [{
    type: _core.Directive,
    args: [{
      selector: 'agm-polyline'
    }]
  }];
  /** @nocollapse */

  AgmPolyline.ctorParameters = function () {
    return [{
      type: _polylineManager2.PolylineManager
    }];
  };

  AgmPolyline.propDecorators = {
    clickable: [{
      type: _core.Input
    }],
    draggable: [{
      type: _core.Input,
      args: ['polylineDraggable']
    }],
    editable: [{
      type: _core.Input
    }],
    geodesic: [{
      type: _core.Input
    }],
    strokeColor: [{
      type: _core.Input
    }],
    strokeOpacity: [{
      type: _core.Input
    }],
    strokeWeight: [{
      type: _core.Input
    }],
    visible: [{
      type: _core.Input
    }],
    zIndex: [{
      type: _core.Input
    }],
    lineClick: [{
      type: _core.Output
    }],
    lineDblClick: [{
      type: _core.Output
    }],
    lineDrag: [{
      type: _core.Output
    }],
    lineDragEnd: [{
      type: _core.Output
    }],
    lineDragStart: [{
      type: _core.Output
    }],
    lineMouseDown: [{
      type: _core.Output
    }],
    lineMouseMove: [{
      type: _core.Output
    }],
    lineMouseOut: [{
      type: _core.Output
    }],
    lineMouseOver: [{
      type: _core.Output
    }],
    lineMouseUp: [{
      type: _core.Output
    }],
    lineRightClick: [{
      type: _core.Output
    }],
    points: [{
      type: _core.ContentChildren,
      args: [_polylinePoint.AgmPolylinePoint]
    }]
  };
  return AgmPolyline;
}();

exports.AgmPolyline = AgmPolyline;