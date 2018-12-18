"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgmKmlLayer = void 0;

var _core = require("@angular/core");

var _kmlLayerManager = require("./../services/managers/kml-layer-manager");

var layerId = 0;

var AgmKmlLayer =
/** @class */
function () {
  function AgmKmlLayer(_manager) {
    this._manager = _manager;
    this._addedToManager = false;
    this._id = (layerId++).toString();
    this._subscriptions = [];
    /**
     * If true, the layer receives mouse events. Default value is true.
     */

    this.clickable = true;
    /**
     * By default, the input map is centered and zoomed to the bounding box of the contents of the
     * layer.
     * If this option is set to true, the viewport is left unchanged, unless the map's center and zoom
     * were never set.
     */

    this.preserveViewport = false;
    /**
     * Whether to render the screen overlays. Default true.
     */

    this.screenOverlays = true;
    /**
     * Suppress the rendering of info windows when layer features are clicked.
     */

    this.suppressInfoWindows = false;
    /**
     * The URL of the KML document to display.
     */

    this.url = null;
    /**
     * The z-index of the layer.
     */

    this.zIndex = null;
    /**
     * This event is fired when a feature in the layer is clicked.
     */

    this.layerClick = new _core.EventEmitter();
    /**
     * This event is fired when the KML layers default viewport has changed.
     */

    this.defaultViewportChange = new _core.EventEmitter();
    /**
     * This event is fired when the KML layer has finished loading.
     * At this point it is safe to read the status property to determine if the layer loaded
     * successfully.
     */

    this.statusChange = new _core.EventEmitter();
  }

  AgmKmlLayer.prototype.ngOnInit = function () {
    if (this._addedToManager) {
      return;
    }

    this._manager.addKmlLayer(this);

    this._addedToManager = true;

    this._addEventListeners();
  };

  AgmKmlLayer.prototype.ngOnChanges = function (changes) {
    if (!this._addedToManager) {
      return;
    }

    this._updatePolygonOptions(changes);
  };

  AgmKmlLayer.prototype._updatePolygonOptions = function (changes) {
    var options = Object.keys(changes).filter(function (k) {
      return AgmKmlLayer._kmlLayerOptions.indexOf(k) !== -1;
    }).reduce(function (obj, k) {
      obj[k] = changes[k].currentValue;
      return obj;
    }, {});

    if (Object.keys(options).length > 0) {
      this._manager.setOptions(this, options);
    }
  };

  AgmKmlLayer.prototype._addEventListeners = function () {
    var _this = this;

    var listeners = [{
      name: 'click',
      handler: function handler(ev) {
        return _this.layerClick.emit(ev);
      }
    }, {
      name: 'defaultviewport_changed',
      handler: function handler() {
        return _this.defaultViewportChange.emit();
      }
    }, {
      name: 'status_changed',
      handler: function handler() {
        return _this.statusChange.emit();
      }
    }];
    listeners.forEach(function (obj) {
      var os = _this._manager.createEventObservable(obj.name, _this).subscribe(obj.handler);

      _this._subscriptions.push(os);
    });
  };
  /** @internal */


  AgmKmlLayer.prototype.id = function () {
    return this._id;
  };
  /** @internal */


  AgmKmlLayer.prototype.toString = function () {
    return "AgmKmlLayer-" + this._id.toString();
  };
  /** @internal */


  AgmKmlLayer.prototype.ngOnDestroy = function () {
    this._manager.deleteKmlLayer(this); // unsubscribe all registered observable subscriptions


    this._subscriptions.forEach(function (s) {
      return s.unsubscribe();
    });
  };

  AgmKmlLayer._kmlLayerOptions = ['clickable', 'preserveViewport', 'screenOverlays', 'suppressInfoWindows', 'url', 'zIndex'];
  AgmKmlLayer.decorators = [{
    type: _core.Directive,
    args: [{
      selector: 'agm-kml-layer'
    }]
  }];
  /** @nocollapse */

  AgmKmlLayer.ctorParameters = function () {
    return [{
      type: _kmlLayerManager.KmlLayerManager
    }];
  };

  AgmKmlLayer.propDecorators = {
    clickable: [{
      type: _core.Input
    }],
    preserveViewport: [{
      type: _core.Input
    }],
    screenOverlays: [{
      type: _core.Input
    }],
    suppressInfoWindows: [{
      type: _core.Input
    }],
    url: [{
      type: _core.Input
    }],
    zIndex: [{
      type: _core.Input
    }],
    layerClick: [{
      type: _core.Output
    }],
    defaultViewportChange: [{
      type: _core.Output
    }],
    statusChange: [{
      type: _core.Output
    }]
  };
  return AgmKmlLayer;
}();

exports.AgmKmlLayer = AgmKmlLayer;