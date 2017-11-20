export class ScrollListener {

    /**
     * @param {Number} timeout
     * @param {Number} threshold
     * @param {function} callback
     */
    constructor(timeout, threshold, callback) {
        this.timeout = timeout;
        this.threshold = threshold;
        this.offsetFromTop = 0;
        this.timer = 0;
        this.callback = callback;

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this._timer.bind(this, this._onScroll));
        }
    }

    /**
     * @param {function} callback
     * @private
     */
    _timer(callback) {
        clearTimeout(this.timer);
        this.timer = setTimeout(callback.bind(this), this.timeout);
    }

    /**
     * @private
     */
    _onScroll() {
        let document = document.documentElement;
        let scrollFromTop = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
        if (this._isBottomThresholdReached(scrollFromTop)) {
            this.callback(EVENT_TYPE_ADD);
        } else if (this._isTopThresholdReached(scrollFromTop)) {
            this.callback(EVENT_TYPE_SUBTRACT);
        }
    }

    /**
     * @param {Number} scrollFromTop
     * @return {boolean}
     * @private
     */
    _isBottomThresholdReached(scrollFromTop) {
        let document = document.documentElement;
        return (scrollFromTop + document.clientHeight + this.threshold >= document.scrollHeight);
    }

    /**
     * @param {Number} scrollFromTop
     * @return {boolean}
     * @private
     */
    _isTopThresholdReached(scrollFromTop) {
        return (scrollFromTop - this.offsetFromTop <= this.threshold);
    }

    /**
     * @param {Number} offset
     * @public
     */
    setOffsetFromTop(offset) {
        this.offsetFromTop = offset;
    }
}

export const EVENT_TYPE_ADD = 'add';
export const EVENT_TYPE_SUBTRACT = 'subtract';
