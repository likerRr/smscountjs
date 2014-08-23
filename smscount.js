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
     * @param {number} [options._7bit]
     * @param {number} [options._8bit]
     * @param {number} [options._16bit]
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
            // Default 7-bit GSM char set
            // http://en.wikipedia.org/wiki/GSM_03.38#GSM_7_bit_default_alphabet_and_extension_table_of_3GPP_TS_23.038_.2F_GSM_03.38
            _7bit = /^[@£\$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'\(\)\*\+,-\.\/0123456789:;<=>\?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f\^\{\}\\\[~\]|€]*$/g,
            // 7-bit mask + 8-bit mask
            _8bit = /^[ÀÂâçÈÊêËëÎîÏïÔôŒœÙÛû«»₣„“”°@£\$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'\(\)\*\+,-\.\/0123456789:;<=>\?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà\f\^\{\}\\\[~\]|€]*$/g,
            limit;

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
         * Limits to _7bit, _8bit & _16bit chars count
         * @type {{_7bit: number, _8bit: number, _16bit: number}}
         */
        self.options = {
            // latin as usual
            _7bit: 160,
            // french, german (specific symbols, not in utf-8)
            _8bit: 140,
            // cyrillic and other
            _16bit: 70
        };

        limit = self.options._7bit;

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
         * function with 4 params: totalSms, charsLeft, parts, limit
         * @param text - source string
         * @param [cb] - callback(totalSms, charsLeft, parts, limit)
         * @return {SMS|window.SMS|{totalSms: number, charsLeft: number, parts: Array, limit: number}}
         */
        self.count = function(text, cb) {
            var is7bit = _7bit.test(text),
                is8bit = _8bit.test(text),
                textLen = text.length;

            limit = is7bit ? self.options['_7bit'] : (is8bit ? self.options['_8bit'] : self.options['_16bit']);
            parts = [];

            totalSms = Math.ceil(textLen / limit);
            charsLeft = limit - (textLen % limit);
            sliceStr(text, limit);

            if (typeof cb == 'function') {
                cb(totalSms, charsLeft, parts, limit)
            }
            else if (cb === undefined) {
                return {
                    totalSms: totalSms,
                    charsLeft: charsLeft,
                    parts: parts,
                    limit: limit
                }
            }

            return this;
        };

        /**
         * Returns characters left to next sms
         * @returns {number}
         */
        self.charsLeft = function() {
            return charsLeft;
        };

        /**
         * Returns total sms count
         * @returns {number}
         */
        self.total = function() {
            return totalSms;
        };

        /**
         * Returns current limit according to charset
         * @returns {number}
         */
        self.limit = function() {
            return limit;
        };

        /**
         * Returns message parts, separated by `limit` count
         * @returns {Array}
         */
        self.parts = function() {
            return parts;
        };

        return self;
    };

    /**
     * Calculate and pass sms count, characters left to next sms, source in callback. If no options passed,
     * callback will be called as first parameter
     * @param {object} [options]
     * @param {number} options._16bit
     * @param {number} options._7bit
     * @param [cb] - will call after counting with 4 params: totalSms, charsLeft, parts, limit
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