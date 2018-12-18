"use strict";

var _core = require("@angular/core");

var _testing = require("@angular/core/testing");

var _polyline = require("../../directives/polyline");

var _googleMapsApiWrapper = require("../../services/google-maps-api-wrapper");

var _polylineManager = require("../../services/managers/polyline-manager");

describe('PolylineManager', function () {
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _core.NgZone,
        useFactory: function useFactory() {
          return new _core.NgZone({
            enableLongStackTrace: true
          });
        }
      }, _polylineManager.PolylineManager, {
        provide: _googleMapsApiWrapper.GoogleMapsAPIWrapper,
        useValue: {
          createPolyline: jest.fn()
        }
      }]
    });
  });
  describe('Create a new polyline', function () {
    it('should call the mapsApiWrapper when creating a new polyline', (0, _testing.inject)([_polylineManager.PolylineManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (polylineManager, apiWrapper) {
      var newPolyline = new _polyline.AgmPolyline(polylineManager);
      polylineManager.addPolyline(newPolyline);
      expect(apiWrapper.createPolyline).toHaveBeenCalledWith({
        clickable: true,
        draggable: false,
        editable: false,
        geodesic: false,
        strokeColor: undefined,
        strokeOpacity: undefined,
        strokeWeight: undefined,
        visible: true,
        zIndex: undefined,
        path: []
      });
    }));
  });
  describe('Delete a polyline', function () {
    it('should set the map to null when deleting a existing polyline', (0, _testing.inject)([_polylineManager.PolylineManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (polylineManager, apiWrapper) {
      var newPolyline = new _polyline.AgmPolyline(polylineManager);
      var polylineInstance = {
        setMap: jest.fn()
      };
      apiWrapper.createPolyline.mockReturnValue(Promise.resolve(polylineInstance));
      polylineManager.addPolyline(newPolyline);
      polylineManager.deletePolyline(newPolyline).then(function () {
        expect(polylineInstance.setMap).toHaveBeenCalledWith(null);
      });
    }));
  });
});