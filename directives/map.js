"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmMap = void 0;

var _core = require("@angular/core");

var _googleMapsApiWrapper = require("../services/google-maps-api-wrapper");

var _circleManager = require("../services/managers/circle-manager");

var _rectangleManager = require("../services/managers/rectangle-manager");

var _infoWindowManager = require("../services/managers/info-window-manager");

var _markerManager = require("../services/managers/marker-manager");

var _polygonManager = require("../services/managers/polygon-manager");

var _polylineManager = require("../services/managers/polyline-manager");

var _kmlLayerManager = require("./../services/managers/kml-layer-manager");

var _dataLayerManager = require("./../services/managers/data-layer-manager");

var _fitBounds = require("../services/fit-bounds");

/**
 * AgmMap renders a Google Map.
 * **Important note**: To be able see a map in the browser, you have to define a height for the
 * element `agm-map`.
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
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmMap =
/** @class */
function () {
  function AgmMap(_elem, _mapsWrapper, _fitBoundsService) {
    this._elem = _elem;
    this._mapsWrapper = _mapsWrapper;
    this._fitBoundsService = _fitBoundsService;
    /**
     * The longitude that defines the center of the map.
     */

    this.longitude = 0;
    /**
     * The latitude that defines the center of the map.
     */

    this.latitude = 0;
    /**
     * The zoom level of the map. The default zoom level is 8.
     */

    this.zoom = 8;
    /**
     * Enables/disables if map is draggable.
     */
    // tslint:disable-next-line:no-input-rename

    this.draggable = true;
    /**
     * Enables/disables zoom and center on double click. Enabled by default.
     */

    this.disableDoubleClickZoom = false;
    /**
     * Enables/disables all default UI of the Google map. Please note: When the map is created, this
     * value cannot get updated.
     */

    this.disableDefaultUI = false;
    /**
     * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
     */

    this.scrollwheel = true;
    /**
     * If false, prevents the map from being controlled by the keyboard. Keyboard shortcuts are
     * enabled by default.
     */

    this.keyboardShortcuts = true;
    /**
     * The enabled/disabled state of the Zoom control.
     */

    this.zoomControl = true;
    /**
     * Styles to apply to each of the default map types. Note that for Satellite/Hybrid and Terrain
     * modes, these styles will only apply to labels and geometry.
     */

    this.styles = [];
    /**
     * When true and the latitude and/or longitude values changes, the Google Maps panTo method is
     * used to
     * center the map. See: https://developers.google.com/maps/documentation/javascript/reference#Map
     */

    this.usePanning = false;
    /**
     * The initial enabled/disabled state of the Street View Pegman control.
     * This control is part of the default UI, and should be set to false when displaying a map type
     * on which the Street View road overlay should not appear (e.g. a non-Earth map type).
     */

    this.streetViewControl = true;
    /**
     * Sets the viewport to contain the given bounds.
     * If this option to `true`, the bounds get automatically computed from all elements that use the {@link AgmFitBounds} directive.
     */

    this.fitBounds = false;
    /**
     * The initial enabled/disabled state of the Scale control. This is disabled by default.
     */

    this.scaleControl = false;
    /**
     * The initial enabled/disabled state of the Map type control.
     */

    this.mapTypeControl = false;
    /**
     * The initial enabled/disabled state of the Pan control.
     */

    this.panControl = false;
    /**
     * The initial enabled/disabled state of the Rotate control.
     */

    this.rotateControl = false;
    /**
     * The initial enabled/disabled state of the Fullscreen control.
     */

    this.fullscreenControl = false;
    /**
     * The map mapTypeId. Defaults to 'roadmap'.
     */

    this.mapTypeId = 'roadmap';
    /**
     * When false, map icons are not clickable. A map icon represents a point of interest,
     * also known as a POI. By default map icons are clickable.
     */

    this.clickableIcons = true;
    /**
     * This setting controls how gestures on the map are handled.
     * Allowed values:
     * - 'cooperative' (Two-finger touch gestures pan and zoom the map. One-finger touch gestures are not handled by the map.)
     * - 'greedy'      (All touch gestures pan or zoom the map.)
     * - 'none'        (The map cannot be panned or zoomed by user gestures.)
     * - 'auto'        [default] (Gesture handling is either cooperative or greedy, depending on whether the page is scrollable or not.
     */

    this.gestureHandling = 'auto';
    this._observableSubscriptions = [];
    /**
     * This event emitter gets emitted when the user clicks on the map (but not when they click on a
     * marker or infoWindow).
     */

    this.mapClick = new _core.EventEmitter();
    /**
     * This event emitter gets emitted when the user right-clicks on the map (but not when they click
     * on a marker or infoWindow).
     */

    this.mapRightClick = new _core.EventEmitter();
    /**
     * This event emitter gets emitted when the user double-clicks on the map (but not when they click
     * on a marker or infoWindow).
     */

    this.mapDblClick = new _core.EventEmitter();
    /**
     * This event emitter is fired when the map center changes.
     */

    this.centerChange = new _core.EventEmitter();
    /**
     * This event is fired when the viewport bounds have changed.
     */

    this.boundsChange = new _core.EventEmitter();
    /**
     * This event is fired when the mapTypeId property changes.
     */

    this.mapTypeIdChange = new _core.EventEmitter();
    /**
     * This event is fired when the map becomes idle after panning or zooming.
     */

    this.idle = new _core.EventEmitter();
    /**
     * This event is fired when the zoom level has changed.
     */

    this.zoomChange = new _core.EventEmitter();
    /**
     * This event is fired when the google map is fully initialized.
     * You get the google.maps.Map instance as a result of this EventEmitter.
     */

    this.mapReady = new _core.EventEmitter();
  }
  /** @internal */


  AgmMap.prototype.ngOnInit = function () {
    // todo: this should be solved with a new component and a viewChild decorator
    var container = this._elem.nativeElement.querySelector('.agm-map-container-inner');

    this._initMapInstance(container);
  };

  AgmMap.prototype._initMapInstance = function (el) {
    var _this = this;

    this._mapsWrapper.createMap(el, {
      center: {
        lat: this.latitude || 0,
        lng: this.longitude || 0
      },
      zoom: this.zoom,
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      disableDefaultUI: this.disableDefaultUI,
      disableDoubleClickZoom: this.disableDoubleClickZoom,
      scrollwheel: this.scrollwheel,
      backgroundColor: this.backgroundColor,
      draggable: this.draggable,
      draggableCursor: this.draggableCursor,
      draggingCursor: this.draggingCursor,
      keyboardShortcuts: this.keyboardShortcuts,
      styles: this.styles,
      zoomControl: this.zoomControl,
      zoomControlOptions: this.zoomControlOptions,
      streetViewControl: this.streetViewControl,
      streetViewControlOptions: this.streetViewControlOptions,
      scaleControl: this.scaleControl,
      scaleControlOptions: this.scaleControlOptions,
      mapTypeControl: this.mapTypeControl,
      mapTypeControlOptions: this.mapTypeControlOptions,
      panControl: this.panControl,
      panControlOptions: this.panControlOptions,
      rotateControl: this.rotateControl,
      rotateControlOptions: this.rotateControlOptions,
      fullscreenControl: this.fullscreenControl,
      fullscreenControlOptions: this.fullscreenControlOptions,
      mapTypeId: this.mapTypeId,
      clickableIcons: this.clickableIcons,
      gestureHandling: this.gestureHandling
    }).then(function () {
      return _this._mapsWrapper.getNativeMap();
    }).then(function (map) {
      return _this.mapReady.emit(map);
    }); // register event listeners


    this._handleMapCenterChange();

    this._handleMapZoomChange();

    this._handleMapMouseEvents();

    this._handleBoundsChange();

    this._handleMapTypeIdChange();

    this._handleIdleEvent();
  };
  /** @internal */


  AgmMap.prototype.ngOnDestroy = function () {
    // unsubscribe all registered observable subscriptions
    this._observableSubscriptions.forEach(function (s) {
      return s.unsubscribe();
    }); // remove all listeners from the map instance


    this._mapsWrapper.clearInstanceListeners();

    if (this._fitBoundsSubscription) {
      this._fitBoundsSubscription.unsubscribe();
    }
  };
  /* @internal */


  AgmMap.prototype.ngOnChanges = function (changes) {
    this._updateMapOptionsChanges(changes);

    this._updatePosition(changes);
  };

  AgmMap.prototype._updateMapOptionsChanges = function (changes) {
    var options = {};
    var optionKeys = Object.keys(changes).filter(function (k) {
      return AgmMap._mapOptionsAttributes.indexOf(k) !== -1;
    });
    optionKeys.forEach(function (k) {
      options[k] = changes[k].currentValue;
    });

    this._mapsWrapper.setMapOptions(options);
  };
  /**
   * Triggers a resize event on the google map instance.
   * When recenter is true, the of the google map gets called with the current lat/lng values or fitBounds value to recenter the map.
   * Returns a promise that gets resolved after the event was triggered.
   */


  AgmMap.prototype.triggerResize = function (recenter) {
    var _this = this;

    if (recenter === void 0) {
      recenter = true;
    } // Note: When we would trigger the resize event and show the map in the same turn (which is a
    // common case for triggering a resize event), then the resize event would not
    // work (to show the map), so we trigger the event in a timeout.


    return new Promise(function (resolve) {
      setTimeout(function () {
        return _this._mapsWrapper.triggerMapEvent('resize').then(function () {
          if (recenter) {
            _this.fitBounds != null ? _this._fitBounds() : _this._setCenter();
          }

          resolve();
        });
      });
    });
  };

  AgmMap.prototype._updatePosition = function (changes) {
    if (changes['latitude'] == null && changes['longitude'] == null && !changes['fitBounds']) {
      // no position update needed
      return;
    } // we prefer fitBounds in changes


    if ('fitBounds' in changes) {
      this._fitBounds();

      return;
    }

    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }

    this._setCenter();
  };

  AgmMap.prototype._setCenter = function () {
    var newCenter = {
      lat: this.latitude,
      lng: this.longitude
    };

    if (this.usePanning) {
      this._mapsWrapper.panTo(newCenter);
    } else {
      this._mapsWrapper.setCenter(newCenter);
    }
  };

  AgmMap.prototype._fitBounds = function () {
    switch (this.fitBounds) {
      case true:
        this._subscribeToFitBoundsUpdates();

        break;

      case false:
        if (this._fitBoundsSubscription) {
          this._fitBoundsSubscription.unsubscribe();
        }

        break;

      default:
        this._updateBounds(this.fitBounds);

    }
  };

  AgmMap.prototype._subscribeToFitBoundsUpdates = function () {
    var _this = this;

    this._fitBoundsSubscription = this._fitBoundsService.getBounds$().subscribe(function (b) {
      return _this._updateBounds(b);
    });
  };

  AgmMap.prototype._updateBounds = function (bounds) {
    if (this._isLatLngBoundsLiteral(bounds) && google && google.maps) {
      var newBounds = new google.maps.LatLngBounds();
      newBounds.union(bounds);
      bounds = newBounds;
    }

    if (this.usePanning) {
      this._mapsWrapper.panToBounds(bounds);

      return;
    }

    this._mapsWrapper.fitBounds(bounds);
  };

  AgmMap.prototype._isLatLngBoundsLiteral = function (bounds) {
    return bounds != null && bounds.extend === undefined;
  };

  AgmMap.prototype._handleMapCenterChange = function () {
    var _this = this;

    var s = this._mapsWrapper.subscribeToMapEvent('center_changed').subscribe(function () {
      _this._mapsWrapper.getCenter().then(function (center) {
        _this.latitude = center.lat();
        _this.longitude = center.lng();

        _this.centerChange.emit({
          lat: _this.latitude,
          lng: _this.longitude
        });
      });
    });

    this._observableSubscriptions.push(s);
  };

  AgmMap.prototype._handleBoundsChange = function () {
    var _this = this;

    var s = this._mapsWrapper.subscribeToMapEvent('bounds_changed').subscribe(function () {
      _this._mapsWrapper.getBounds().then(function (bounds) {
        _this.boundsChange.emit(bounds);
      });
    });

    this._observableSubscriptions.push(s);
  };

  AgmMap.prototype._handleMapTypeIdChange = function () {
    var _this = this;

    var s = this._mapsWrapper.subscribeToMapEvent('maptypeid_changed').subscribe(function () {
      _this._mapsWrapper.getMapTypeId().then(function (mapTypeId) {
        _this.mapTypeIdChange.emit(mapTypeId);
      });
    });

    this._observableSubscriptions.push(s);
  };

  AgmMap.prototype._handleMapZoomChange = function () {
    var _this = this;

    var s = this._mapsWrapper.subscribeToMapEvent('zoom_changed').subscribe(function () {
      _this._mapsWrapper.getZoom().then(function (z) {
        _this.zoom = z;

        _this.zoomChange.emit(z);
      });
    });

    this._observableSubscriptions.push(s);
  };

  AgmMap.prototype._handleIdleEvent = function () {
    var _this = this;

    var s = this._mapsWrapper.subscribeToMapEvent('idle').subscribe(function () {
      _this.idle.emit(void 0);
    });

    this._observableSubscriptions.push(s);
  };

  AgmMap.prototype._handleMapMouseEvents = function () {
    var _this = this;

    var events = [{
      name: 'click',
      emitter: this.mapClick
    }, {
      name: 'rightclick',
      emitter: this.mapRightClick
    }, {
      name: 'dblclick',
      emitter: this.mapDblClick
    }];
    events.forEach(function (e) {
      var s = _this._mapsWrapper.subscribeToMapEvent(e.name).subscribe(function (event) {
        var value = {
          coords: {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
        };
        e.emitter.emit(value);
      });

      _this._observableSubscriptions.push(s);
    });
  };
  /**
   * Map option attributes that can change over time
   */


  AgmMap._mapOptionsAttributes = ['disableDoubleClickZoom', 'scrollwheel', 'draggable', 'draggableCursor', 'draggingCursor', 'keyboardShortcuts', 'zoomControl', 'zoomControlOptions', 'styles', 'streetViewControl', 'streetViewControlOptions', 'zoom', 'mapTypeControl', 'mapTypeControlOptions', 'minZoom', 'maxZoom', 'panControl', 'panControlOptions', 'rotateControl', 'rotateControlOptions', 'fullscreenControl', 'fullscreenControlOptions', 'scaleControl', 'scaleControlOptions', 'mapTypeId', 'clickableIcons', 'gestureHandling'];
  AgmMap.decorators = [{
    type: _core.Component,
    args: [{
      selector: 'agm-map',
      providers: [_googleMapsApiWrapper.GoogleMapsAPIWrapper, _markerManager.MarkerManager, _infoWindowManager.InfoWindowManager, _circleManager.CircleManager, _rectangleManager.RectangleManager, _polylineManager.PolylineManager, _polygonManager.PolygonManager, _kmlLayerManager.KmlLayerManager, _dataLayerManager.DataLayerManager, _dataLayerManager.DataLayerManager, _fitBounds.FitBoundsService],
      host: {
        // todo: deprecated - we will remove it with the next version
        '[class.sebm-google-map-container]': 'true'
      },
      styles: ["\n    .agm-map-container-inner {\n      width: inherit;\n      height: inherit;\n    }\n    .agm-map-content {\n      display:none;\n    }\n  "],
      template: "\n    <div class='agm-map-container-inner sebm-google-map-container-inner'></div>\n    <div class='agm-map-content'>\n      <ng-content></ng-content>\n    </div>\n  "
    }]
  }];
  /** @nocollapse */

  AgmMap.ctorParameters = function () {
    return [{
      type: _core.ElementRef
    }, {
      type: _googleMapsApiWrapper.GoogleMapsAPIWrapper
    }, {
      type: _fitBounds.FitBoundsService
    }];
  };

  AgmMap.propDecorators = {
    longitude: [{
      type: _core.Input
    }],
    latitude: [{
      type: _core.Input
    }],
    zoom: [{
      type: _core.Input
    }],
    minZoom: [{
      type: _core.Input
    }],
    maxZoom: [{
      type: _core.Input
    }],
    draggable: [{
      type: _core.Input,
      args: ['mapDraggable']
    }],
    disableDoubleClickZoom: [{
      type: _core.Input
    }],
    disableDefaultUI: [{
      type: _core.Input
    }],
    scrollwheel: [{
      type: _core.Input
    }],
    backgroundColor: [{
      type: _core.Input
    }],
    draggableCursor: [{
      type: _core.Input
    }],
    draggingCursor: [{
      type: _core.Input
    }],
    keyboardShortcuts: [{
      type: _core.Input
    }],
    zoomControl: [{
      type: _core.Input
    }],
    zoomControlOptions: [{
      type: _core.Input
    }],
    styles: [{
      type: _core.Input
    }],
    usePanning: [{
      type: _core.Input
    }],
    streetViewControl: [{
      type: _core.Input
    }],
    streetViewControlOptions: [{
      type: _core.Input
    }],
    fitBounds: [{
      type: _core.Input
    }],
    scaleControl: [{
      type: _core.Input
    }],
    scaleControlOptions: [{
      type: _core.Input
    }],
    mapTypeControl: [{
      type: _core.Input
    }],
    mapTypeControlOptions: [{
      type: _core.Input
    }],
    panControl: [{
      type: _core.Input
    }],
    panControlOptions: [{
      type: _core.Input
    }],
    rotateControl: [{
      type: _core.Input
    }],
    rotateControlOptions: [{
      type: _core.Input
    }],
    fullscreenControl: [{
      type: _core.Input
    }],
    fullscreenControlOptions: [{
      type: _core.Input
    }],
    mapTypeId: [{
      type: _core.Input
    }],
    clickableIcons: [{
      type: _core.Input
    }],
    gestureHandling: [{
      type: _core.Input
    }],
    mapClick: [{
      type: _core.Output
    }],
    mapRightClick: [{
      type: _core.Output
    }],
    mapDblClick: [{
      type: _core.Output
    }],
    centerChange: [{
      type: _core.Output
    }],
    boundsChange: [{
      type: _core.Output
    }],
    mapTypeIdChange: [{
      type: _core.Output
    }],
    idle: [{
      type: _core.Output
    }],
    zoomChange: [{
      type: _core.Output
    }],
    mapReady: [{
      type: _core.Output
    }]
  };
  return AgmMap;
}();

exports.AgmMap = AgmMap;