"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmRectangle = void 0;

var _core = require("@angular/core");

var _rectangleManager = require("../services/managers/rectangle-manager");

var AgmRectangle =
/** @class */
function () {
  function AgmRectangle(_manager) {
    this._manager = _manager;
    /**
     * Indicates whether this Rectangle handles mouse events. Defaults to true.
     */

    this.clickable = true;
    /**
     * If set to true, the user can drag this rectangle over the map. Defaults to false.
     */
    // tslint:disable-next-line:no-input-rename

    this.draggable = false;
    /**
     * If set to true, the user can edit this rectangle by dragging the control points shown at
     * the center and around the circumference of the rectangle. Defaults to false.
     */

    this.editable = false;
    /**
     * The stroke position. Defaults to CENTER.
     * This property is not supported on Internet Explorer 8 and earlier.
     */

    this.strokePosition = 'CENTER';
    /**
     * The stroke width in pixels.
     */

    this.strokeWeight = 0;
    /**
     * Whether this rectangle is visible on the map. Defaults to true.
     */

    this.visible = true;
    /**
     * This event is fired when the rectangle's is changed.
     */

    this.boundsChange = new _core.EventEmitter();
    /**
     * This event emitter gets emitted when the user clicks on the rectangle.
     */

    this.rectangleClick = new _core.EventEmitter();
    /**
     * This event emitter gets emitted when the user clicks on the rectangle.
     */

    this.rectangleDblClick = new _core.EventEmitter();
    /**
     * This event is repeatedly fired while the user drags the rectangle.
     */

    this.drag = new _core.EventEmitter();
    /**
     * This event is fired when the user stops dragging the rectangle.
     */

    this.dragEnd = new _core.EventEmitter();
    /**
     * This event is fired when the user starts dragging the rectangle.
     */

    this.dragStart = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mousedown event is fired on the rectangle.
     */

    this.mouseDown = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mousemove event is fired on the rectangle.
     */

    this.mouseMove = new _core.EventEmitter();
    /**
     * This event is fired on rectangle mouseout.
     */

    this.mouseOut = new _core.EventEmitter();
    /**
     * This event is fired on rectangle mouseover.
     */

    this.mouseOver = new _core.EventEmitter();
    /**
     * This event is fired when the DOM mouseup event is fired on the rectangle.
     */

    this.mouseUp = new _core.EventEmitter();
    /**
     * This event is fired when the rectangle is right-clicked on.
     */

    this.rightClick = new _core.EventEmitter();
    this._rectangleAddedToManager = false;
    this._eventSubscriptions = [];
  }
  /** @internal */


  AgmRectangle.prototype.ngOnInit = function () {
    this._manager.addRectangle(this);

    this._rectangleAddedToManager = true;

    this._registerEventListeners();
  };
  /** @internal */


  AgmRectangle.prototype.ngOnChanges = function (changes) {
    if (!this._rectangleAddedToManager) {
      return;
    }

    if (changes['north'] || changes['east'] || changes['south'] || changes['west']) {
      this._manager.setBounds(this);
    }

    if (changes['editable']) {
      this._manager.setEditable(this);
    }

    if (changes['draggable']) {
      this._manager.setDraggable(this);
    }

    if (changes['visible']) {
      this._manager.setVisible(this);
    }

    this._updateRectangleOptionsChanges(changes);
  };

  AgmRectangle.prototype._updateRectangleOptionsChanges = function (changes) {
    var options = {};
    var optionKeys = Object.keys(changes).filter(function (k) {
      return AgmRectangle._mapOptions.indexOf(k) !== -1;
    });
    optionKeys.forEach(function (k) {
      options[k] = changes[k].currentValue;
    });

    if (optionKeys.length > 0) {
      this._manager.setOptions(this, options);
    }
  };

  AgmRectangle.prototype._registerEventListeners = function () {
    var _this = this;

    var events = new Map();
    events.set('bounds_changed', this.boundsChange);
    events.set('click', this.rectangleClick);
    events.set('dblclick', this.rectangleDblClick);
    events.set('drag', this.drag);
    events.set('dragend', this.dragEnd);
    events.set('dragStart', this.dragStart);
    events.set('mousedown', this.mouseDown);
    events.set('mousemove', this.mouseMove);
    events.set('mouseout', this.mouseOut);
    events.set('mouseover', this.mouseOver);
    events.set('mouseup', this.mouseUp);
    events.set('rightclick', this.rightClick);
    events.forEach(function (eventEmitter, eventName) {
      _this._eventSubscriptions.push(_this._manager.createEventObservable(eventName, _this).subscribe(function (value) {
        switch (eventName) {
          case 'bounds_changed':
            _this._manager.getBounds(_this).then(function (bounds) {
              return eventEmitter.emit({
                north: bounds.getNorthEast().lat(),
                east: bounds.getNorthEast().lng(),
                south: bounds.getSouthWest().lat(),
                west: bounds.getSouthWest().lng()
              });
            });

            break;

          default:
            eventEmitter.emit({
              coords: {
                lat: value.latLng.lat(),
                lng: value.latLng.lng()
              }
            });
        }
      }));
    });
  };
  /** @internal */


  AgmRectangle.prototype.ngOnDestroy = function () {
    this._eventSubscriptions.forEach(function (s) {
      s.unsubscribe();
    });

    this._eventSubscriptions = null;

    this._manager.removeRectangle(this);
  };
  /**
   * Gets the LatLngBounds of this Rectangle.
   */


  AgmRectangle.prototype.getBounds = function () {
    return this._manager.getBounds(this);
  };

  AgmRectangle._mapOptions = ['fillColor', 'fillOpacity', 'strokeColor', 'strokeOpacity', 'strokePosition', 'strokeWeight', 'visible', 'zIndex', 'clickable'];
  AgmRectangle.decorators = [{
    type: _core.Directive,
    args: [{
      selector: 'agm-rectangle'
    }]
  }];
  /** @nocollapse */

  AgmRectangle.ctorParameters = function () {
    return [{
      type: _rectangleManager.RectangleManager
    }];
  };

  AgmRectangle.propDecorators = {
    north: [{
      type: _core.Input
    }],
    east: [{
      type: _core.Input
    }],
    south: [{
      type: _core.Input
    }],
    west: [{
      type: _core.Input
    }],
    clickable: [{
      type: _core.Input
    }],
    draggable: [{
      type: _core.Input,
      args: ['rectangleDraggable']
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
    strokeColor: [{
      type: _core.Input
    }],
    strokeOpacity: [{
      type: _core.Input
    }],
    strokePosition: [{
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
    boundsChange: [{
      type: _core.Output
    }],
    rectangleClick: [{
      type: _core.Output
    }],
    rectangleDblClick: [{
      type: _core.Output
    }],
    drag: [{
      type: _core.Output
    }],
    dragEnd: [{
      type: _core.Output
    }],
    dragStart: [{
      type: _core.Output
    }],
    mouseDown: [{
      type: _core.Output
    }],
    mouseMove: [{
      type: _core.Output
    }],
    mouseOut: [{
      type: _core.Output
    }],
    mouseOver: [{
      type: _core.Output
    }],
    mouseUp: [{
      type: _core.Output
    }],
    rightClick: [{
      type: _core.Output
    }]
  };
  return AgmRectangle;
}();

exports.AgmRectangle = AgmRectangle;