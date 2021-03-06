'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var HighlightValueConverter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('HighlightValueConverter', HighlightValueConverter = function () {
        function HighlightValueConverter() {
          _classCallCheck(this, HighlightValueConverter);
        }

        HighlightValueConverter.prototype.toView = function toView(array) {
          array.forEach(function (item) {
            if (!item.matched_substrings || !item.matched_substrings.length) return;
            item.innerHTML = item.description;
            for (var i = 0, j = item.matched_substrings.length; i < j; i++) {
              var offset = item.matched_substrings[i].offset + i * 17;
              var length = item.matched_substrings[i].length + offset;
              item.innerHTML = [item.innerHTML.slice(0, offset), '<strong>', item.innerHTML.slice(offset, length), '</strong>', item.innerHTML.slice(length)].join('');
            }
          });
          return array;
        };

        return HighlightValueConverter;
      }());

      _export('HighlightValueConverter', HighlightValueConverter);
    }
  };
});