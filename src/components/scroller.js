import Item from './item';
import ScrollListener from "./scroll-listener";

export default class Scroller {

    /**
     * @param {{itemsPerPage, maxItemsVisible, threshold, scrollTimeout}} params
     * @constructor
     * @return {Element}
     */
    constructor(params) {
        this.params = params;
        this.items = [];
        this.subTest = 0;

        this.from = 1;
        this.to = this.from + this.params.itemsPerPage;

        this.items = this._setItems(this.from, this.to);

        new ScrollListener(this.params.scrollTimeout, this.params.threshold, this.add.bind(this));

        this.render();
    }

    /**
     * @public
     */
    render() {
        let itemsNode = document.createElement('div');
        itemsNode.className = 'scroller';
        this.itemsNode = itemsNode;
        this.renderList();
    }

    renderList() {
        this.itemsNode.innerHTML = '';
        this.items.map(this._renderItem.bind(this));
    }

    /**
     * @param {Item} item
     * @private
     */
    _renderItem(item) {
        this.itemsNode.appendChild(item.render());
    }

    /**
     * @private
     */
    _subtract() {
        if (this.from - this.params.itemsPerPage <= 0) {
            return false;
        }

        this.from = this.from - this.params.itemsPerPage;
        this.to = this.to - this.params.itemsPerPage;

        this.items = this._setItems(this.from, this.to);
        this.renderList();
        this.itemsNode.style.marginTop = this.subTest * 117 + 'px';
    }

    add() {
        this.from = this.from + this.params.itemsPerPage;
        this.to = this.to + this.params.itemsPerPage;

        this.items = this._setItems(this.from, this.to);
        this.renderList();
    }

    /**
     * @param {Number} from
     * @param {Number} to
     * @private
     */
    _setItems(from, to) {
        let items = this.items;
        while (from < to) {
            items.push(new Item(from));
            from++;
        }

        if (this.items.length > this.params.maxItemsVisible) {
            this.subTest = this.subTest + items.length - this.params.maxItemsVisible;
            return items.slice(items.length - this.params.maxItemsVisible, items.length)
        }

        return items;
    }

    /**
     * @param {Element} node
     */
    appendTo(node) {
        node.appendChild(this.itemsNode);
    }
}