"use strict";

var _core = require("@angular/core");

var _testing = require("@angular/core/testing");

var _polygon = require("../../directives/polygon");

var _googleMapsApiWrapper = require("../google-maps-api-wrapper");

var _polygonManager = require("./polygon-manager");

describe('PolygonManager', function () {
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _core.NgZone,
        useFactory: function useFactory() {
          return new _core.NgZone({
            enableLongStackTrace: true
          });
        }
      }, _polygonManager.PolygonManager, _polygon.AgmPolygon, {
        provide: _googleMapsApiWrapper.GoogleMapsAPIWrapper,
        useValue: {
          createPolygon: jest.fn()
        }
      }]
    });
  });
  describe('Create a new polygon', function () {
    it('should call the mapsApiWrapper when creating a new polygon', (0, _testing.inject)([_polygonManager.PolygonManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (polygonManager, apiWrapper) {
      var newPolygon = new _polygon.AgmPolygon(polygonManager);
      polygonManager.addPolygon(newPolygon);
      expect(apiWrapper.createPolygon).toHaveBeenCalledWith({
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: undefined,
        fillOpacity: undefined,
        geodesic: false,
        paths: [],
        strokeColor: undefined,
        strokeOpacity: undefined,
        strokeWeight: undefined,
        visible: undefined,
        zIndex: undefined
      });
    }));
  });
  describe('Delete a polygon', function () {
    it('should set the map to null when deleting a existing polygon', (0, _testing.inject)([_polygonManager.PolygonManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (polygonManager, apiWrapper) {
      var newPolygon = new _polygon.AgmPolygon(polygonManager);
      var polygonInstance = {
        setMap: jest.fn()
      };
      apiWrapper.createPolygon.mockReturnValue(Promise.resolve(polygonInstance));
      polygonManager.addPolygon(newPolygon);
      polygonManager.deletePolygon(newPolygon).then(function () {
        expect(polygonInstance.setMap).toHaveBeenCalledWith(null);
      });
    }));
  });
});