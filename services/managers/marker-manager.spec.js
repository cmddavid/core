"use strict";

var _core = require("@angular/core");

var _testing = require("@angular/core/testing");

var _marker = require("./../../directives/marker");

var _googleMapsApiWrapper = require("./../google-maps-api-wrapper");

var _markerManager = require("./../managers/marker-manager");

describe('MarkerManager', function () {
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _core.NgZone,
        useFactory: function useFactory() {
          return new _core.NgZone({
            enableLongStackTrace: true
          });
        }
      }, _markerManager.MarkerManager, {
        provide: _googleMapsApiWrapper.GoogleMapsAPIWrapper,
        useValue: {
          createMarker: jest.fn()
        }
      }]
    });
  });
  describe('Create a new marker', function () {
    it('should call the mapsApiWrapper when creating a new marker', (0, _testing.inject)([_markerManager.MarkerManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
      var newMarker = new _marker.AgmMarker(markerManager);
      newMarker.latitude = 34.4;
      newMarker.longitude = 22.3;
      newMarker.label = 'A';
      markerManager.addMarker(newMarker);
      expect(apiWrapper.createMarker).toHaveBeenCalledWith({
        position: {
          lat: 34.4,
          lng: 22.3
        },
        label: 'A',
        draggable: false,
        icon: undefined,
        opacity: 1,
        visible: true,
        zIndex: 1,
        title: undefined,
        clickable: true,
        animation: undefined
      });
    }));
  });
  describe('Delete a marker', function () {
    it('should set the map to null when deleting a existing marker', (0, _testing.inject)([_markerManager.MarkerManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
      var newMarker = new _marker.AgmMarker(markerManager);
      newMarker.latitude = 34.4;
      newMarker.longitude = 22.3;
      newMarker.label = 'A';
      var markerInstance = {
        setMap: jest.fn()
      };
      apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
      markerManager.addMarker(newMarker);
      markerManager.deleteMarker(newMarker).then(function () {
        expect(markerInstance.setMap).toHaveBeenCalledWith(null);
      });
    }));
  });
  describe('set marker icon', function () {
    it('should update that marker via setIcon method when the markerUrl changes', (0, _testing.async)((0, _testing.inject)([_markerManager.MarkerManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
      var newMarker = new _marker.AgmMarker(markerManager);
      newMarker.latitude = 34.4;
      newMarker.longitude = 22.3;
      newMarker.label = 'A';
      var markerInstance = {
        setMap: jest.fn(),
        setIcon: jest.fn()
      };
      apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
      markerManager.addMarker(newMarker);
      expect(apiWrapper.createMarker).toHaveBeenCalledWith({
        position: {
          lat: 34.4,
          lng: 22.3
        },
        label: 'A',
        draggable: false,
        icon: undefined,
        opacity: 1,
        visible: true,
        zIndex: 1,
        title: undefined,
        clickable: true,
        animation: undefined
      });
      var iconUrl = 'http://angular-maps.com/icon.png';
      newMarker.iconUrl = iconUrl;
      return markerManager.updateIcon(newMarker).then(function () {
        expect(markerInstance.setIcon).toHaveBeenCalledWith(iconUrl);
      });
    })));
  });
  describe('set marker opacity', function () {
    it('should update that marker via setOpacity method when the markerOpacity changes', (0, _testing.async)((0, _testing.inject)([_markerManager.MarkerManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
      var newMarker = new _marker.AgmMarker(markerManager);
      newMarker.latitude = 34.4;
      newMarker.longitude = 22.3;
      newMarker.label = 'A';
      var markerInstance = {
        setMap: jest.fn(),
        setOpacity: jest.fn()
      };
      apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
      apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
      markerManager.addMarker(newMarker);
      expect(apiWrapper.createMarker).toHaveBeenCalledWith({
        position: {
          lat: 34.4,
          lng: 22.3
        },
        label: 'A',
        draggable: false,
        icon: undefined,
        visible: true,
        opacity: 1,
        zIndex: 1,
        title: undefined,
        clickable: true,
        animation: undefined
      });
      var opacity = 0.4;
      newMarker.opacity = opacity;
      return markerManager.updateOpacity(newMarker).then(function () {
        expect(markerInstance.setOpacity).toHaveBeenCalledWith(opacity);
      });
    })));
  });
  describe('set visible option', function () {
    it('should update that marker via setVisible method when the visible changes', (0, _testing.async)((0, _testing.inject)([_markerManager.MarkerManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
      var newMarker = new _marker.AgmMarker(markerManager);
      newMarker.latitude = 34.4;
      newMarker.longitude = 22.3;
      newMarker.label = 'A';
      newMarker.visible = false;
      var markerInstance = {
        setMap: jest.fn(),
        setVisible: jest.fn()
      };
      apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
      markerManager.addMarker(newMarker);
      expect(apiWrapper.createMarker).toHaveBeenCalledWith({
        position: {
          lat: 34.4,
          lng: 22.3
        },
        label: 'A',
        draggable: false,
        icon: undefined,
        visible: false,
        opacity: 1,
        zIndex: 1,
        title: undefined,
        clickable: true,
        animation: undefined
      });
      newMarker.visible = true;
      return markerManager.updateVisible(newMarker).then(function () {
        expect(markerInstance.setVisible).toHaveBeenCalledWith(true);
      });
    })));
  });
  describe('set zIndex option', function () {
    it('should update that marker via setZIndex method when the zIndex changes', (0, _testing.async)((0, _testing.inject)([_markerManager.MarkerManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (markerManager, apiWrapper) {
      var newMarker = new _marker.AgmMarker(markerManager);
      newMarker.latitude = 34.4;
      newMarker.longitude = 22.3;
      newMarker.label = 'A';
      newMarker.visible = false;
      var markerInstance = {
        setMap: jest.fn(),
        setZIndex: jest.fn()
      };
      apiWrapper.createMarker.mockReturnValue(Promise.resolve(markerInstance));
      markerManager.addMarker(newMarker);
      expect(apiWrapper.createMarker).toHaveBeenCalledWith({
        position: {
          lat: 34.4,
          lng: 22.3
        },
        label: 'A',
        draggable: false,
        icon: undefined,
        visible: false,
        opacity: 1,
        zIndex: 1,
        title: undefined,
        clickable: true,
        animation: undefined
      });
      var zIndex = 10;
      newMarker.zIndex = zIndex;
      return markerManager.updateZIndex(newMarker).then(function () {
        expect(markerInstance.setZIndex).toHaveBeenCalledWith(zIndex);
      });
    })));
  });
});