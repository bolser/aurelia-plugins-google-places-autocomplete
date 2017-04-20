define(['exports', 'aurelia-binding', 'aurelia-dependency-injection', 'aurelia-event-aggregator', 'aurelia-templating', './aurelia-plugins-google-places-autocomplete-config'], function (exports, _aureliaBinding, _aureliaDependencyInjection, _aureliaEventAggregator, _aureliaTemplating, _aureliaPluginsGooglePlacesAutocompleteConfig) {
  'use strict';

  exports.__esModule = true;
  exports.GooglePlacesAutocomplete = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  let GooglePlacesAutocomplete = exports.GooglePlacesAutocomplete = (_dec = (0, _aureliaTemplating.customElement)('aup-google-places-autocomplete'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaPluginsGooglePlacesAutocompleteConfig.Config, _aureliaEventAggregator.EventAggregator), _dec3 = (0, _aureliaTemplating.bindable)({ defaultBindingMode: _aureliaBinding.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = class GooglePlacesAutocomplete {
    constructor(element, config, eventAggregator) {
      this._initialized = false;
      this._scriptPromise = null;
      this._service = null;
      this._servicePromise = null;
      this._serviceResolve = null;

      _initDefineProp(this, 'placeholder', _descriptor, this);

      _initDefineProp(this, 'selectClass', _descriptor2, this);

      _initDefineProp(this, 'value', _descriptor3, this);

      this.disabled = true;
      this.index = -1;
      this.predictions = [];
      this.selected = false;
      this.show = false;

      this._config = config;
      this._element = element;
      this._eventAggregator = eventAggregator;
      if (!this._config.get('key')) return console.error('No Google API key has been specified.');
      this._servicePromise = new Promise(resolve => {
        this._serviceResolve = resolve;
      });
      if (this._config.get('loadApiScript')) {
        this._loadApiScript();this._initialize();return;
      }
      this._eventAggregator.subscribe(this._config.get('apiScriptLoadedEvent'), scriptPromise => {
        this._scriptPromise = scriptPromise;this._initialize();
      });
    }

    valueChanged(newValue, oldValue) {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var request;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this._servicePromise;

            case 2:
              if (_this._initialized) {
                _context.next = 5;
                break;
              }

              _this._initialized = true;return _context.abrupt('return');

            case 5:
              if (newValue) {
                _context.next = 7;
                break;
              }

              return _context.abrupt('return', _this._clear());

            case 7:
              if (!_this.selected) {
                _context.next = 9;
                break;
              }

              return _context.abrupt('return', _this._clear(true));

            case 9:
              request = Object.assign({ input: newValue }, _this._config.get('options'));

              _this._service.getPlacePredictions(request, function (predictions, status) {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK) return _this._clear();
                _this.predictions = predictions;
                _this.show = true;
              });

            case 11:
            case 'end':
              return _context.stop();
          }
        }, _callee, _this);
      }))();
    }

    blur() {
      this._clear(true);
    }

    focus() {
      this._clear(true, true);
    }

    keydown(event) {
      if (this.selected) this.selected = false;
      if (!this.show) return true;
      switch (event.keyCode) {
        case 13:
          this.index !== -1 ? this.select(this.predictions[this.index], false) : this.show = false;
          setTimeout(() => this._element.firstElementChild.blur(), 100);
          break;
        case 27:
          this.show = false;break;
        case 38:
          this.index--;
          if (this.index < 0) this.index = 0;
          return false;
        case 40:
          this.index++;
          if (this.index >= this.predictions.length) this.index = this.predictions.length - 1;
          return false;
      }
      return true;
    }

    select(prediction) {
      let submit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      this.value = prediction.description;
      this.selected = true;
      if (submit) setTimeout(() => this._dispatchEvent(), 100);
      this._clear(true);
    }

    _clear() {
      let keep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      let show = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!keep) this.predictions = [];
      this.index = -1;
      this.show = show;
    }

    _dispatchEvent() {
      if (!this._element.firstElementChild.form.attributes['submit.delegate']) return;
      let customEvent;
      if (window.CustomEvent) customEvent = new CustomEvent('submit', { bubbles: true, detail: event });else {
        customEvent = document.createEvent('CustomEvent');
        customEvent.initCustomEvent('submit', true, true, { data: event });
      }
      this._element.firstElementChild.form.dispatchEvent(customEvent);
      this._element.firstElementChild.blur();
    }

    _initialize() {
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2._scriptPromise;

            case 2:
              _this2._service = new window.google.maps.places.AutocompleteService();
              _this2._serviceResolve();
              _this2.disabled = false;

            case 5:
            case 'end':
              return _context2.stop();
          }
        }, _callee2, _this2);
      }))();
    }

    _loadApiScript() {
      if (this._scriptPromise) return;
      if (window.google === undefined || window.google.maps === undefined) {
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=aureliaPluginsGooglePlacesAutocompleteCallback&key=' + this._config.get('key') + '&language=' + this._config.get('language') + '&libraries=' + this._config.get('libraries');
        script.type = 'text/javascript';
        document.body.appendChild(script);
        this._scriptPromise = new Promise((resolve, reject) => {
          window.aureliaPluginsGooglePlacesAutocompleteCallback = () => {
            this._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:api-script-loaded', this._scriptPromise);
            resolve();
          };
          script.onerror = error => reject(error);
        });
      } else if (window.google && window.google.maps) this._scriptPromise = new Promise(resolve => resolve());
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'Enter a location';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selectClass', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'bg-clouds';
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});