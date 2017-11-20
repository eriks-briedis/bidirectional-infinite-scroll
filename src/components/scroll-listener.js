export default class ScrollListener {

    /**
     * @param {Number} timeout
     * @param {Number} threshold
     * @param {function} callback
     */
    constructor(timeout, threshold, callback) {
        this.timeout = timeout;
        this.threshold = threshold;
        this.timer = 0;
        this.callback = callback;
        window.addEventListener('scroll', this._timer.bind(this, this._onScroll));
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
        let doc = document.documentElement;
        let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        if (top + doc.clientHeight + this.threshold >= doc.scrollHeight) {
            this.callback();
        }
    }
}