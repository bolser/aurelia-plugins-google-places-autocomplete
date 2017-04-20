define(['exports'], function (exports) {
  'use strict';

  exports.__esModule = true;
  let Config = exports.Config = class Config {
    constructor() {
      this._config = {
        apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded',
        key: '',
        language: 'en',
        libraries: 'places',
        loadApiScript: true,
        options: { types: ['geocode'] }
      };
    }

    get(key) {
      return this._config[key];
    }

    options(obj) {
      Object.assign(this._config, obj);
    }

    set(key, value) {
      this._config[key] = value;
      return this._config[key];
    }
  };
});