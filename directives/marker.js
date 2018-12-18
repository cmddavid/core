"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmMarker = void 0;

var _core = require("@angular/core");

var _rxjs = require("rxjs");

var _fitBounds = require("../services/fit-bounds");

var _markerManager2 = require("../services/managers/marker-manager");

var _infoWindow = require("./info-window");

var markerId = 0;
/**
 * AgmMarker renders a map marker inside a {@link AgmMap}.
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
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */

var AgmMarker =
/** @class */
function () {
  function AgmMarker(_markerManager) {
    this._markerManager = _markerManager;
    /**
     * If true, the marker can be dragged. Default value is false.
     */
    // tslint:disable-next-line:no-input-rename

    this.draggable = false;
    /**
     * If true, the marker is visible
     */

    this.visible = true;
    /**
     * Whether to automatically open the child info window when the marker is clicked.
     */

    this.openInfoWindow = true;
    /**
     * The marker's opacity between 0.0 and 1.0.
     */

    this.opacity = 1;
    /**
     * All markers are displayed on the map in order of their zIndex, with higher values displaying in
     * front of markers with lower values. By default, markers are displayed according to their
     * vertical position on screen, with lower markers appearing in front of markers further up the
     * screen.
     */

    this.zIndex = 1;
    /**
     * If true, the marker can be clicked. Default value is true.
     */
    // tslint:disable-next-line:no-input-rename

    this.clickable = true;
    /**
     * This event emitter gets emitted when the user clicks on the marker.
     */

    this.markerClick = new _core.EventEmitter();
    /**
     * This event is fired when the user rightclicks on the marker.
     */

    this.markerRightClick = new _core.EventEmitter();
    /**
     * This event is fired when the user stops dragging the marker.
     */

    this.dragEnd = new _core.EventEmitter();
    /**
     * This event is fired when the user mouses over the marker.
     */

    this.mouseOver = new _core.EventEmitter();
    /**
     * This event is fired when the user mouses outside the marker.
     */

    this.mouseOut = new _core.EventEmitter();
    /**
     * @internal
     */

    this.infoWindow = new _core.QueryList();
    this._markerAddedToManger = false;
    this._observableSubscriptions = [];
    this._fitBoundsDetails$ = new _rxjs.ReplaySubject(1);
    this._id = (markerId++).toString();
  }
  /* @internal */


  AgmMarker.prototype.ngAfterContentInit = function () {
    var _this = this;

    this.handleInfoWindowUpdate();
    this.infoWindow.changes.subscribe(function () {
      return _this.handleInfoWindowUpdate();
    });
  };

  AgmMarker.prototype.handleInfoWindowUpdate = function () {
    var _this = this;

    if (this.infoWindow.length > 1) {
      throw new Error('Expected no more than one info window.');
    }

    this.infoWindow.forEach(function (marker) {
      marker.hostMarker = _this;
    });
  };
  /** @internal */


  AgmMarker.prototype.ngOnChanges = function (changes) {
    if (typeof this.latitude === 'string') {
      this.latitude = Number(this.latitude);
    }

    if (typeof this.longitude === 'string') {
      this.longitude = Number(this.longitude);
    }

    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }

    if (!this._markerAddedToManger) {
      this._markerManager.addMarker(this);

      this._updateFitBoundsDetails();

      this._markerAddedToManger = true;

      this._addEventListeners();

      return;
    }

    if (changes['latitude'] || changes['longitude']) {
      this._markerManager.updateMarkerPosition(this);

      this._updateFitBoundsDetails();
    }

    if (changes['title']) {
      this._markerManager.updateTitle(this);
    }

    if (changes['label']) {
      this._markerManager.updateLabel(this);
    }

    if (changes['draggable']) {
      this._markerManager.updateDraggable(this);
    }

    if (changes['iconUrl']) {
      this._markerManager.updateIcon(this);
    }

    if (changes['opacity']) {
      this._markerManager.updateOpacity(this);
    }

    if (changes['visible']) {
      this._markerManager.updateVisible(this);
    }

    if (changes['zIndex']) {
      this._markerManager.updateZIndex(this);
    }

    if (changes['clickable']) {
      this._markerManager.updateClickable(this);
    }

    if (changes['animation']) {
      this._markerManager.updateAnimation(this);
    }
  };
  /**
   * @internal
   */


  AgmMarker.prototype.getFitBoundsDetails$ = function () {
    return this._fitBoundsDetails$.asObservable();
  };

  AgmMarker.prototype._updateFitBoundsDetails = function () {
    this._fitBoundsDetails$.next({
      latLng: {
        lat: this.latitude,
        lng: this.longitude
      }
    });
  };

  AgmMarker.prototype._addEventListeners = function () {
    var _this = this;

    var cs = this._markerManager.createEventObservable('click', this).subscribe(function () {
      if (_this.openInfoWindow) {
        _this.infoWindow.forEach(function (infoWindow) {
          return infoWindow.open();
        });
      }

      _this.markerClick.emit(_this);
    });

    this._observableSubscriptions.push(cs);

    var rc = this._markerManager.createEventObservable('rightclick', this).subscribe(function () {
      _this.markerRightClick.emit(null);
    });

    this._observableSubscriptions.push(rc);

    var ds = this._markerManager.createEventObservable('dragend', this).subscribe(function (e) {
      _this.dragEnd.emit({
        coords: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      });
    });

    this._observableSubscriptions.push(ds);

    var mover = this._markerManager.createEventObservable('mouseover', this).subscribe(function (e) {
      _this.mouseOver.emit({
        coords: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      });
    });

    this._observableSubscriptions.push(mover);

    var mout = this._markerManager.createEventObservable('mouseout', this).subscribe(function (e) {
      _this.mouseOut.emit({
        coords: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        }
      });
    });

    this._observableSubscriptions.push(mout);
  };
  /** @internal */


  AgmMarker.prototype.id = function () {
    return this._id;
  };
  /** @internal */


  AgmMarker.prototype.toString = function () {
    return 'AgmMarker-' + this._id.toString();
  };
  /** @internal */


  AgmMarker.prototype.ngOnDestroy = function () {
    this._markerManager.deleteMarker(this); // unsubscribe all registered observable subscriptions


    this._observableSubscriptions.forEach(function (s) {
      return s.unsubscribe();
    });
  };

  AgmMarker.decorators = [{
    type: _core.Directive,
    args: [{
      selector: 'agm-marker',
      providers: [{
        provide: _fitBounds.FitBoundsAccessor,
        useExisting: (0, _core.forwardRef)(function () {
          return AgmMarker;
        })
      }],
      inputs: ['latitude', 'longitude', 'title', 'label', 'draggable: markerDraggable', 'iconUrl', 'openInfoWindow', 'opacity', 'visible', 'zIndex', 'animation'],
      outputs: ['markerClick', 'dragEnd', 'mouseOver', 'mouseOut']
    }]
  }];
  /** @nocollapse */

  AgmMarker.ctorParameters = function () {
    return [{
      type: _markerManager2.MarkerManager
    }];
  };

  AgmMarker.propDecorators = {
    latitude: [{
      type: _core.Input
    }],
    longitude: [{
      type: _core.Input
    }],
    title: [{
      type: _core.Input
    }],
    label: [{
      type: _core.Input
    }],
    draggable: [{
      type: _core.Input,
      args: ['markerDraggable']
    }],
    iconUrl: [{
      type: _core.Input
    }],
    visible: [{
      type: _core.Input
    }],
    openInfoWindow: [{
      type: _core.Input
    }],
    opacity: [{
      type: _core.Input
    }],
    zIndex: [{
      type: _core.Input
    }],
    clickable: [{
      type: _core.Input,
      args: ['markerClickable']
    }],
    markerClick: [{
      type: _core.Output
    }],
    markerRightClick: [{
      type: _core.Output
    }],
    dragEnd: [{
      type: _core.Output
    }],
    mouseOver: [{
      type: _core.Output
    }],
    mouseOut: [{
      type: _core.Output
    }],
    infoWindow: [{
      type: _core.ContentChildren,
      args: [_infoWindow.AgmInfoWindow]
    }]
  };
  return AgmMarker;
}();

exports.AgmMarker = AgmMarker;