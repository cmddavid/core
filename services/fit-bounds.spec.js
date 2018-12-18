"use strict";

var _testing = require("@angular/core/testing");

var _fitBounds = require("./fit-bounds");

var _mapsApiLoader = require("./maps-api-loader/maps-api-loader");

var _operators = require("rxjs/operators");

describe('FitBoundsService', function () {
  var loader;
  var fitBoundsService;
  var latLngBoundsConstructs;
  var latLngBoundsExtend;
  beforeEach((0, _testing.fakeAsync)(function () {
    loader = {
      load: jest.fn().mockReturnValue(Promise.resolve())
    };
    latLngBoundsConstructs = 0;
    latLngBoundsExtend = jest.fn();
    window.google = {
      maps: {
        LatLngBounds:
        /** @class */
        function () {
          function LatLngBounds() {
            this.extend = latLngBoundsExtend;
            latLngBoundsConstructs += 1;
          }

          return LatLngBounds;
        }()
      }
    };

    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _mapsApiLoader.MapsAPILoader,
        useValue: loader
      }, _fitBounds.FitBoundsService]
    });

    fitBoundsService = _testing.TestBed.get(_fitBounds.FitBoundsService);
    (0, _testing.tick)();
  }));
  it('should wait for the load event', function () {
    expect(loader.load).toHaveBeenCalledTimes(1);
    expect(latLngBoundsConstructs).toEqual(0);
  });
  it('should emit empty bounds when API finished loaded but the are not entries in the includeInBounds$ map', (0, _testing.fakeAsync)(function () {
    var success = jest.fn();
    fitBoundsService.getBounds$().pipe((0, _operators.first)()).subscribe(success);
    (0, _testing.tick)();
    expect(success).toHaveBeenCalledTimes(1);
    (0, _testing.discardPeriodicTasks)();
  }));
  it('should emit the new bounds every 200ms by default', (0, _testing.fakeAsync)(function () {
    var success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    (0, _testing.tick)(1);
    fitBoundsService.addToBounds({
      lat: 2,
      lng: 2
    });
    fitBoundsService.addToBounds({
      lat: 2,
      lng: 2
    });
    fitBoundsService.addToBounds({
      lat: 3,
      lng: 3
    });
    expect(success).toHaveBeenCalledTimes(1);
    (0, _testing.tick)(150);
    expect(success).toHaveBeenCalledTimes(1);
    (0, _testing.tick)(200);
    expect(success).toHaveBeenCalledTimes(2);
    (0, _testing.discardPeriodicTasks)();
  }));
  it('should provide all latLng to the bounds', (0, _testing.fakeAsync)(function () {
    var success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    (0, _testing.tick)(1);
    var latLngs = [{
      lat: 2,
      lng: 2
    }, {
      lat: 3,
      lng: 3
    }, {
      lat: 4,
      lng: 4
    }];
    fitBoundsService.addToBounds(latLngs[0]);
    fitBoundsService.addToBounds(latLngs[1]);
    fitBoundsService.addToBounds(latLngs[2]);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(0);
    (0, _testing.tick)(200);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(3);
    expect(latLngBoundsExtend).toHaveBeenCalledWith(latLngs[0]);
    expect(latLngBoundsExtend).toHaveBeenCalledWith(latLngs[1]);
    expect(latLngBoundsExtend).toHaveBeenCalledWith(latLngs[2]);
    (0, _testing.discardPeriodicTasks)();
  }));
  it('should remove latlng from bounds and emit the new bounds after the sample time', (0, _testing.fakeAsync)(function () {
    var success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    (0, _testing.tick)(1);
    fitBoundsService.addToBounds({
      lat: 2,
      lng: 2
    });
    fitBoundsService.addToBounds({
      lat: 3,
      lng: 3
    });
    (0, _testing.tick)(200);
    latLngBoundsExtend.mockReset();
    fitBoundsService.removeFromBounds({
      lat: 2,
      lng: 2
    });
    fitBoundsService.removeFromBounds({
      lat: 3,
      lng: 3
    });
    (0, _testing.tick)(150);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(0);
    (0, _testing.tick)(200);
    expect(latLngBoundsExtend).toHaveBeenCalledTimes(0);
    (0, _testing.discardPeriodicTasks)();
  }));
  it('should use the new _boundsChangeSampleTime$ for all next bounds', (0, _testing.fakeAsync)(function () {
    var success = jest.fn();
    fitBoundsService.getBounds$().subscribe(success);
    (0, _testing.tick)(1);
    fitBoundsService.addToBounds({
      lat: 2,
      lng: 2
    });
    fitBoundsService.addToBounds({
      lat: 3,
      lng: 3
    });
    (0, _testing.tick)(200);
    success.mockReset();
    fitBoundsService.changeFitBoundsChangeSampleTime(100);
    fitBoundsService.removeFromBounds({
      lat: 2,
      lng: 2
    });
    fitBoundsService.removeFromBounds({
      lat: 3,
      lng: 3
    });
    (0, _testing.tick)(100);
    expect(success).toHaveBeenCalledTimes(1);
    (0, _testing.discardPeriodicTasks)();
  }));
});