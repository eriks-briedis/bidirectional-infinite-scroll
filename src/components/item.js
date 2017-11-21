export default class Item {

    /**
     * @param {Number} index
     */
    constructor (index) {
        this.index = index;
        this.height = 155;
    }

    /**
     * @return {Item}
     */
    render () {
        this.node = document.createElement('div');
        this.node.className = 'scroller__item';
        this.node.style.height = this.height + 'px';

        let text = document.createElement('h5');
        text.innerHTML = 'Element ' + this.index;
        this.node.appendChild(text);

        let image = document.createElement('img');
        image.src = 'http://via.placeholder.com/350x100';
        image.style.height = '100px';
        this.node.appendChild(image);

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