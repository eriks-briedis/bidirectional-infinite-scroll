export default class Item {

    /**
     * @param {Number} index
     */
    constructor (index) {
        this.index = index;
        this.height = 115;
        this.node = this.render();
    }

    /**
     * @return {Element}
     */
    render () {
        let elem = document.createElement('div');
        elem.className = 'scroller__item';
        elem.innerHTML = 'Element ' + this.index;

        return elem;
    }

    /**
     * @param {Element} parentNode
     * @public
     */
    appendTo(parentNode) {
        parentNode.appendChild(this.node);
    }

    /**
     * TODO Height is hard-coded for now.
     * @return {number}
     * @public
     */
    getHeight() {
        return this.height;
    }
}