export default class Item {

    /**
     * @param {Number} index
     */
    constructor (index) {
        this.index = index;
    }

    /**
     * @return {Element}
     */
    render () {
        let elem = document.createElement('div');
        elem.className = 'scroller__item';
        elem.innerHTML = 'Test ' + this.index;

        return elem;
    }
}