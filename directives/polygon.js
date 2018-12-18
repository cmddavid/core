"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmPolygon = void 0;

var _core = require("@angular/core");

var _polygonManager2 = require("../services/managers/polygon-manager");

/**
 * AgmPolygon renders a polygon on a {@link AgmMap}
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    agm-map {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-polygon [paths]="paths">
 *      </agm-polygon>
 *    </agm-map>
 *  `
 * })
 * export class MyMapCmp {
 *   lat: number = 0;
 *   lng: number = 0;
 *   zoom: number = 10;
 *   paths: Array<LatLngLiteral> = [
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ]
 *   // Nesting paths will create a hole where they overlap;
 *   nestedPaths: Array<Array<LatLngLiteral>> = [[
 *     { lat: 0,  lng: 10 },
 *     { lat: 0,  lng: 20 },
 *     { lat: 10, lng: 20 },
 *     { lat: 10, lng: 10 },
 *     { lat: 0,  lng: 10 }
 *   ], [
 *     { lat: 0, lng: 15 },
 *     { lat: 0, lng: 20 },
 *     { lat: 5, lng: 20 },
 *     { lat: 5, lng: 15 },
 *     { lat: 0, lng: 15 }
 *   ]]
 * }
 * ```
 */
var AgmPolygon =
/** @class */
function () {
  function AgmPolygon(_polygonManager) {
    this._polygonManager = _polygonManager;
    /**
     * Indicates whether this Polygon handles mouse events. Defaults to true.
     */

    this.clickable = true;
    /**
     * If set to true, the user can drag this shape over the map. The geodesic
     * property defines the mode of dragging. Defaults to false.
     */
    // tslint:disable-next-line:no-input-rename

    this.draggable = false;
    /**
     * If set to true, the user can edit this shape by dragging the control
     * points shown at the vertices and on each segment. Defaults to false.
     */

    this.editable = false;
    /**
     * When true, edges of the polygon are interpreted as geodesic and will
     * follow the curvature of the Earth. When false, edges of the polygon are
     * rendered as straight lines in screen space. Note that the shape of a
     * geodesic polygon may appear to change when dragged, as the dimensions
     * are maintained relative to the surface of the earth. Defaults to false.
     */

    this.geodesic = false;
    /**
     * The ordered sequence of coordinates that designates a closed loop.
     * Unlike polylines, a polygon may consist of one or more paths.
     *  As a result, the paths property may specify one or more arrays of
     * LatLng coordinates. Paths are closed automatically; do not repeat the
     * first vertex of the path as the last vertex. Simple polygons may be
     * defined using a single array of LatLngs. More complex polygons may
     * specify an array of arrays. Any simple arrays are converted into Arrays.
     * Inserting or removing LatLngs from the Array will automatically update
     * the polygon on the map.
     */

    this.paths = [];
    /**
     * This event is fired when the DOM click event is fired on the Polygon.
     */

    this.polyClick = new _core.EventEmitter();
    /**
     * This event is fired when the DOM dblclick event is fired on the Polygon.
     */

    this.polyDblClick = new _core.EventEmitter();
    /**
     * This event is repeatedly fired while the user drags the polygon.
     */

    this.polyDrag = new _core.EventEmitter();
    /**
     * This event is fired when the user stops dragging the polygon.
     */

    this.polyDragEnd = new _core.EventEmitter();
    /**
     * This event is fired when the user starts dragging the polygon.
     */

    this.polyDragStart = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mousedown event is fired on the Polygon.
     */

    this.polyMouseDown = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mousemove event is fired on the Polygon.
     */

    this.polyMouseMove = new _core.EventEmitter();
    /**
     * This event is fired on Polygon mouseout.
     */

    this.polyMouseOut = new _core.EventEmitter();
    /**
     * This event is fired on Polygon mouseover.
     */

    this.polyMouseOver = new _core.EventEmitter();
    /**
     * This event is fired whe the DOM mouseup event is fired on the Polygon
     */

    this.polyMouseUp = new _core.EventEmitter();
    /**
     * This even is fired when the Polygon is right-clicked on.
     */

    this.polyRightClick = new _core.EventEmitter();
    this._polygonAddedToManager = false;
    this._subscriptions = [];
  }
  /** @internal */


  AgmPolygon.prototype.ngAfterContentInit = function () {
    if (!this._polygonAddedToManager) {
      this._init();
    }
  };

  AgmPolygon.prototype.ngOnChanges = function (changes) {
    if (!this._polygonAddedToManager) {
      this._init();

      return;
    }

    this._polygonManager.setPolygonOptions(this, this._updatePolygonOptions(changes));
  };

  AgmPolygon.prototype._init = function () {
    this._polygonManager.addPolygon(this);

    this._polygonAddedToManager = true;

    this._addEventListeners();
  };

  AgmPolygon.prototype._addEventListeners = function () {
    var _this = this;

    var handlers = [{
      name: 'click',
      handler: function handler(ev) {
        return _this.polyClick.emit(ev);
      }
    }, {
      name: 'dblclick',
      handler: function handler(ev) {
        return _this.polyDblClick.emit(ev);
      }
    }, {
      name: 'drag',
      handler: function handler(ev) {
        return _this.polyDrag.emit(ev);
      }
    }, {
      name: 'dragend',
      handler: function handler(ev) {
        return _this.polyDragEnd.emit(ev);
      }
    }, {
      name: 'dragstart',
      handler: function handler(ev) {
        return _this.polyDragStart.emit(ev);
      }
    }, {
      name: 'mousedown',
      handler: function handler(ev) {
        return _this.polyMouseDown.emit(ev);
      }
    }, {
      name: 'mousemove',
      handler: function handler(ev) {
        return _this.polyMouseMove.emit(ev);
      }
    }, {
      name: 'mouseout',
      handler: function handler(ev) {
        return _this.polyMouseOut.emit(ev);
      }
    }, {
      name: 'mouseover',
      handler: function handler(ev) {
        return _this.polyMouseOver.emit(ev);
      }
    }, {
      name: 'mouseup',
      handler: function handler(ev) {
        return _this.polyMouseUp.emit(ev);
      }
    }, {
      name: 'rightclick',
      handler: function handler(ev) {
        return _this.polyRightClick.emit(ev);
      }
    }];
    handlers.forEach(function (obj) {
      var os = _this._polygonManager.createEventObservable(obj.name, _this).subscribe(obj.handler);

      _this._subscriptions.push(os);
    });
  };

  AgmPolygon.prototype._updatePolygonOptions = function (changes) {
    return Object.keys(changes).filter(function (k) {
      return AgmPolygon._polygonOptionsAttributes.indexOf(k) !== -1;
    }).reduce(function (obj, k) {
      obj[k] = changes[k].currentValue;
      return obj;
    }, {});
  };
  /** @internal */


  AgmPolygon.prototype.id = function () {
    return this._id;
  };
  /** @internal */


  AgmPolygon.prototype.ngOnDestroy = function () {
    this._polygonManager.deletePolygon(this); // unsubscribe all registered observable subscriptions


    this._subscriptions.forEach(function (s) {
      return s.unsubscribe();
    });
  };

  AgmPolygon._polygonOptionsAttributes = ['clickable', 'draggable', 'editable', 'fillColor', 'fillOpacity', 'geodesic', 'icon', 'map', 'paths', 'strokeColor', 'strokeOpacity', 'strokeWeight', 'visible', 'zIndex', 'draggable', 'editable', 'visible'];
  AgmPolygon.decorators = [{
    type: _core.Directive,
    args: [{
      selector: 'agm-polygon'
    }]
  }];
  /** @nocollapse */

  AgmPolygon.ctorParameters = function () {
    return [{
      type: _polygonManager2.PolygonManager
    }];
  };

  AgmPolygon.propDecorators = {
    clickable: [{
      type: _core.Input
    }],
    draggable: [{
      type: _core.Input,
      args: ['polyDraggable']
    }],
    editable: [{
      type: _core.Input
    }],
    fillColor: [{
      type: _core.Input
    }],
    fillOpacity: [{
      type: _core.Input
    }],
    geodesic: [{
      type: _core.Input
    }],
    paths: [{
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
    polyClick: [{
      type: _core.Output
    }],
    polyDblClick: [{
      type: _core.Output
    }],
    polyDrag: [{
      type: _core.Output
    }],
    polyDragEnd: [{
      type: _core.Output
    }],
    polyDragStart: [{
      type: _core.Output
    }],
    polyMouseDown: [{
      type: _core.Output
    }],
    polyMouseMove: [{
      type: _core.Output
    }],
    polyMouseOut: [{
      type: _core.Output
    }],
    polyMouseOver: [{
      type: _core.Output
    }],
    polyMouseUp: [{
      type: _core.Output
    }],
    polyRightClick: [{
      type: _core.Output
    }]
  };
  return AgmPolygon;
}();

exports.AgmPolygon = AgmPolygon;