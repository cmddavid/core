"use strict";

var _testing = require("@angular/core/testing");

var _browserGlobals = require("../../utils/browser-globals");

var _lazyMapsApiLoader = require("./lazy-maps-api-loader");

var _mapsApiLoader = require("./maps-api-loader");

describe('Service: LazyMapsAPILoader', function () {
  var documentRef;
  var doc;
  var windowRef;
  var windowObj;
  beforeEach(function () {
    doc = {
      createElement: jest.fn(),
      getElementById: jest.fn().mockReturnValue(null),
      body: {
        appendChild: jest.fn()
      }
    };
    documentRef = {
      getNativeDocument: jest.fn().mockReturnValue(doc)
    };
    windowObj = {};
    windowRef = {
      getNativeWindow: jest.fn().mockReturnValue(windowObj)
    };

    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _mapsApiLoader.MapsAPILoader,
        useClass: _lazyMapsApiLoader.LazyMapsAPILoader
      }, {
        provide: _browserGlobals.WindowRef,
        useValue: windowRef
      }, {
        provide: _browserGlobals.DocumentRef,
        useValue: documentRef
      }]
    });
  });
  it('should create the default script URL', (0, _testing.inject)([_mapsApiLoader.MapsAPILoader], function (loader) {
    var scriptElem = {};
    doc.createElement.mockReturnValue(scriptElem);
    loader.load();
    expect(doc.createElement).toHaveBeenCalledWith('script');
    expect(scriptElem.type).toEqual('text/javascript');
    expect(scriptElem.async).toEqual(true);
    expect(scriptElem.defer).toEqual(true);
    expect(scriptElem.src).toBeDefined();
    expect(scriptElem.id).toEqual('agmGoogleMapsApiScript');
    expect(scriptElem.src).toContain('https://maps.googleapis.com/maps/api/js');
    expect(scriptElem.src).toContain('v=3');
    expect(scriptElem.src).toContain('callback=agmLazyMapsAPILoader');
    expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
  }));
  it('should not append a second script to body when theres already one with the fixed ID', (0, _testing.inject)([_mapsApiLoader.MapsAPILoader], function (loader) {
    doc.getElementById.mockReturnValue(document.createElement('script'));
    loader.load();
    expect(doc.body.appendChild).not.toHaveBeenCalledWith();
  }));
  it('should not append a second script to body when window.google.maps is defined', (0, _testing.inject)([_mapsApiLoader.MapsAPILoader], function (loader) {
    windowObj.google = {
      maps: {}
    };
    loader.load();
    expect(doc.body.appendChild).not.toHaveBeenCalledWith();
  }));
  it('should load the script via http when provided', function () {
    var lazyLoadingConf = {
      protocol: _lazyMapsApiLoader.GoogleMapsScriptProtocol.HTTP
    };

    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _mapsApiLoader.MapsAPILoader,
        useClass: _lazyMapsApiLoader.LazyMapsAPILoader
      }, {
        provide: _browserGlobals.WindowRef,
        useValue: windowRef
      }, {
        provide: _browserGlobals.DocumentRef,
        useValue: documentRef
      }, {
        provide: _lazyMapsApiLoader.LAZY_MAPS_API_CONFIG,
        useValue: lazyLoadingConf
      }]
    });

    (0, _testing.inject)([_mapsApiLoader.MapsAPILoader], function (loader) {
      var scriptElem = {};
      doc.createElement.mockReturnValue(scriptElem);
      loader.load();
      expect(doc.createElement).toHaveBeenCalled();
      expect(scriptElem.src).toContain('http://maps.googleapis.com/maps/api/js');
      expect(doc.body.appendChild).toHaveBeenCalledWith(scriptElem);
    });
  });
});