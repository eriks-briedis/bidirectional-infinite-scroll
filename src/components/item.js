export default class Item {

    /**
     * @param {Number} index
     */
    constructor (index) {
        this.index = index;
        this.height = 115;
    }

    /**
     * @return {Item}
     */
    render () {
        this.node = document.createElement('div');
        this.node.className = 'scroller__item';
        this.node.innerHTML = 'Element ' + this.index;

        return this;
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