// "SMS count" JavaScript library v1.0.0
// (c) Lizurchik Alexey - https://github.com/likerRr/smscountjs
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function(window) {
    /**
     * (0, eval)('this')
     * @see http://stackoverflow.com/questions/14119988/return-this-0-evalthis/14120023#14120023
     */
    window = this || (0, eval)('this');
    /**
     * Object to work with sms count and characters left to next sms
     * @constructor
     * @param {object} [options]
     * @param {number} options.cyrillic
     * @param {number} options.latin
     * @returns {SMS|window.SMS}
     */
    window.SMS = function(options) {
        /**
         * Create instance anyway
         */
        if (this instanceof SMS === false) {
            return new SMS(options);
        }

        var self = this,
            totalSms = 0,
            charsLeft = 0,
            parts = [],
            cyrillicReg = /[а-яА-Я]+/ig;

        var sliceStr = function(str, limit) {
            var end = str.slice(limit),
                begin = str.slice(0, limit);

            if (begin.length > 0) {
                parts.push(str.slice(0, limit));
            }
            if (end.length > 0) {
                sliceStr(end, limit);
            }
        };

        /**
         * Limits to latin & cyrillic chars count
         * @type {{latin: number, cyrillic: number}}
         */
        self.options = {
            latin: 160,
            cyrillic: 70
        };

        // extend options if passed
        if ((options !== 'undefined') && (typeof options == 'object')) {
            for (var p in options) {
                if (options.hasOwnProperty(p)) {
                    self.options[p] = options[p];
                }
            }
        }

        /**
         * Calculate sms count, characters left to next sms and call callback
         * function with 3 params: totalSms, charsLeft, source text
         * @param text - source string
         * @param cb - callback(totalSms, charsLeft, text)
         * @return {SMS|window.SMS}
         */
        self.count = function(text, cb) {
            var isCyrillic = cyrillicReg.test(text),
                limit = isCyrillic ? self.options['cyrillic'] : self.options['latin'],
                textLen = text.length;

            parts = [];

            totalSms = Math.floor(textLen / limit);
            charsLeft = limit - (textLen % limit);
            sliceStr(text, limit);

            if (typeof cb == 'function') {
                cb(totalSms, charsLeft, parts)
            }

            return this;
        };

        /**
         * Return characters left to next sms
         * @returns {number}
         */
        self.charsLeft = function() {
            return charsLeft;
        };

        /**
         * Return total sms count
         * @returns {number}
         */
        self.total = function() {
            return totalSms;
        };

        return self;
    };

    /**
     * Calculate and pass sms count, characters left to next sms, source in callback. If no options passed,
     * callback will be called as first parameter
     * @param {object} [options]
     * @param {string} options.cyrillic
     * @param {string} options.latin
     * @param cb - will call after counting with 3 params: totalSms, charsLeft, text
     * @returns {String}
     */
    String.prototype.smsCount = function(options, cb) {
        var sms,
            str = this.concat();

        if (arguments.length == 0) {
            return this.concat();
        }

        if (arguments.length === 1) {
            sms = new SMS();
            sms.count(str, options);
        }
        else {
            sms = new SMS(options);
            sms.count(str, cb)
        }

        return this.concat();
    };
}(window));
/**
 * Pass window as parameter is a hack for allowing autocomplete
 */