"use strict";

var _core = require("@angular/core");

var _testing = require("@angular/core/testing");

var _rectangle = require("./../../directives/rectangle");

var _googleMapsApiWrapper = require("./../google-maps-api-wrapper");

var _rectangleManager = require("./../managers/rectangle-manager");

describe('RectangleManager', function () {
  beforeEach(function () {
    _testing.TestBed.configureTestingModule({
      providers: [{
        provide: _core.NgZone,
        useFactory: function useFactory() {
          return new _core.NgZone({
            enableLongStackTrace: true
          });
        }
      }, _rectangleManager.RectangleManager, {
        provide: _googleMapsApiWrapper.GoogleMapsAPIWrapper,
        useValue: {
          createRectangle: jest.fn()
        }
      }]
    });
  });
  describe('Create a new rectangle', function () {
    it('should call the mapsApiWrapper when creating a new rectangle', (0, _testing.inject)([_rectangleManager.RectangleManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (rectangleManager, apiWrapper) {
      var newRectangle = new _rectangle.AgmRectangle(rectangleManager);
      newRectangle.north = 12.7;
      newRectangle.east = 56.6;
      newRectangle.south = 89.2;
      newRectangle.west = 52.6;
      rectangleManager.addRectangle(newRectangle);
      expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
        bounds: {
          north: 12.7,
          east: 56.6,
          south: 89.2,
          west: 52.6
        },
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: undefined,
        fillOpacity: undefined,
        strokeColor: undefined,
        strokeOpacity: undefined,
        strokePosition: 'CENTER',
        strokeWeight: 0,
        visible: true,
        zIndex: undefined
      });
    }));
  });
  describe('Delete a rectangle', function () {
    it('should set the map to null when deleting a existing rectangle', (0, _testing.inject)([_rectangleManager.RectangleManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (rectangleManager, apiWrapper) {
      var newRectangle = new _rectangle.AgmRectangle(rectangleManager);
      newRectangle.north = 12.7;
      newRectangle.east = 56.6;
      newRectangle.south = 89.2;
      newRectangle.west = 52.6;
      var rectangleInstance = {
        setMap: jest.fn()
      };
      apiWrapper.createRectangle.mockReturnValue(Promise.resolve(rectangleInstance));
      rectangleManager.addRectangle(newRectangle);
      rectangleManager.removeRectangle(newRectangle).then(function () {
        expect(rectangleInstance.setMap).toHaveBeenCalledWith(null);
      });
    }));
  });
  describe('Set bounds option', function () {
    it('should update that rectangle via setBounds method when the bounds changes', (0, _testing.async)((0, _testing.inject)([_rectangleManager.RectangleManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (rectangleManager, apiWrapper) {
      var newRectangle = new _rectangle.AgmRectangle(rectangleManager);
      newRectangle.north = 12.7;
      newRectangle.east = 56.6;
      newRectangle.south = 89.2;
      newRectangle.west = 52.6;
      var rectangleInstance = {
        setMap: jest.fn(),
        setBounds: jest.fn()
      };
      apiWrapper.createRectangle.mockReturnValue(Promise.resolve(rectangleInstance));
      rectangleManager.addRectangle(newRectangle);
      expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
        bounds: {
          north: 12.7,
          east: 56.6,
          south: 89.2,
          west: 52.6
        },
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: undefined,
        fillOpacity: undefined,
        strokeColor: undefined,
        strokeOpacity: undefined,
        strokePosition: 'CENTER',
        strokeWeight: 0,
        visible: true,
        zIndex: undefined
      });
      newRectangle.north = 15.6;
      newRectangle.east = 45.2;
      newRectangle.south = 12.6;
      newRectangle.west = 41.3;
      var bounds = {
        north: 15.6,
        east: 45.2,
        south: 12.6,
        west: 41.3
      };
      return rectangleManager.setBounds(newRectangle).then(function () {
        expect(rectangleInstance.setBounds).toHaveBeenCalledWith(bounds);
      });
    })));
  });
  describe('Set fill/stroke opacity option', function () {
    it('should update that rectangle via setOptions method when the options changes', (0, _testing.async)((0, _testing.inject)([_rectangleManager.RectangleManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (rectangleManager, apiWrapper) {
      var newRectangle = new _rectangle.AgmRectangle(rectangleManager);
      newRectangle.north = 12.7;
      newRectangle.east = 56.6;
      newRectangle.south = 89.2;
      newRectangle.west = 52.6;
      newRectangle.fillOpacity = 0.4;
      newRectangle.strokeOpacity = 0.4;
      var rectangleInstance = {
        setMap: jest.fn(),
        setOptions: jest.fn()
      };
      apiWrapper.createRectangle.mockReturnValue(Promise.resolve(rectangleInstance));
      rectangleManager.addRectangle(newRectangle);
      expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
        bounds: {
          north: 12.7,
          east: 56.6,
          south: 89.2,
          west: 52.6
        },
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: undefined,
        fillOpacity: 0.4,
        strokeColor: undefined,
        strokeOpacity: 0.4,
        strokePosition: 'CENTER',
        strokeWeight: 0,
        visible: true,
        zIndex: undefined
      });
      newRectangle.fillOpacity = 0.6;
      newRectangle.strokeOpacity = 0.6;
      var options = {
        fillOpacity: 0.6,
        strokeOpacity: 0.6
      };
      return rectangleManager.setOptions(newRectangle, options).then(function () {
        expect(rectangleInstance.setOptions).toHaveBeenCalledWith(options);
      });
    })));
  });
  describe('Set fill/stroke color option', function () {
    it('should update that rectangle via setOptions method when the options changes', (0, _testing.async)((0, _testing.inject)([_rectangleManager.RectangleManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (rectangleManager, apiWrapper) {
      var newRectangle = new _rectangle.AgmRectangle(rectangleManager);
      newRectangle.north = 12.7;
      newRectangle.east = 56.6;
      newRectangle.south = 89.2;
      newRectangle.west = 52.6;
      newRectangle.fillColor = '#FF7F50';
      newRectangle.strokeColor = '#FF7F50';
      var rectangleInstance = {
        setMap: jest.fn(),
        setOptions: jest.fn()
      };
      apiWrapper.createRectangle.mockReturnValue(Promise.resolve(rectangleInstance));
      rectangleManager.addRectangle(newRectangle);
      expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
        bounds: {
          north: 12.7,
          east: 56.6,
          south: 89.2,
          west: 52.6
        },
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: '#FF7F50',
        fillOpacity: undefined,
        strokeColor: '#FF7F50',
        strokeOpacity: undefined,
        strokePosition: 'CENTER',
        strokeWeight: 0,
        visible: true,
        zIndex: undefined
      });
      newRectangle.fillColor = '#00008B';
      newRectangle.strokeColor = '#00008B';
      var options = {
        fillColor: '#00008B',
        strokeColor: '#00008B'
      };
      return rectangleManager.setOptions(newRectangle, options).then(function () {
        expect(rectangleInstance.setOptions).toHaveBeenCalledWith(options);
      });
    })));
  });
  describe('Set visible option', function () {
    it('should update that rectangle via setVisible method when the visible changes', (0, _testing.async)((0, _testing.inject)([_rectangleManager.RectangleManager, _googleMapsApiWrapper.GoogleMapsAPIWrapper], function (rectangleManager, apiWrapper) {
      var newRectangle = new _rectangle.AgmRectangle(rectangleManager);
      newRectangle.north = 12.7;
      newRectangle.east = 56.6;
      newRectangle.south = 89.2;
      newRectangle.west = 52.6;
      newRectangle.visible = false;
      var rectangleInstance = {
        setMap: jest.fn(),
        setVisible: jest.fn()
      };
      apiWrapper.createRectangle.mockReturnValue(Promise.resolve(rectangleInstance));
      rectangleManager.addRectangle(newRectangle);
      expect(apiWrapper.createRectangle).toHaveBeenCalledWith({
        bounds: {
          north: 12.7,
          east: 56.6,
          south: 89.2,
          west: 52.6
        },
        clickable: true,
        draggable: false,
        editable: false,
        fillColor: undefined,
        fillOpacity: undefined,
        strokeColor: undefined,
        strokeOpacity: undefined,
        strokePosition: 'CENTER',
        strokeWeight: 0,
        visible: false,
        zIndex: undefined
      });
      newRectangle.visible = true;
      return rectangleManager.setVisible(newRectangle).then(function () {
        expect(rectangleInstance.setVisible).toHaveBeenCalledWith(true);
      });
    })));
  });
});