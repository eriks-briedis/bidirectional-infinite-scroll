import Item from './item';
import {EVENT_TYPE_ADD, EVENT_TYPE_SUBTRACT, ScrollListener} from "./scroll-listener";

export default class Scroller {

    /**
     * @param {{itemsPerPage, maxItemsVisible, maxTotalItems, threshold, scrollTimeout}} params
     * @constructor
     * @return {Element}
     */
    constructor(params) {
        this.params = params;

        this.state = {
            itemsVisible: [],
            itemsHidden: [],
            from: 1,
            to: this.params.itemsPerPage
        };

        this.scrollListener = new ScrollListener(
            this.params.scrollTimeout,
            this.params.threshold,
            this.onModify.bind(this)
        );

        this._render();
    }

    /**
     * @private
     */
    _render() {
        let itemsNode = document.createElement('div');
        itemsNode.className = 'scroller';
        itemsNode.id = 'scroller';
        this.itemsNode = itemsNode;
        this._renderList();
    }

    /**
     * @private
     */
    _renderList() {
        this._setItems();
        this.itemsNode.innerHTML = '';
        this.state.itemsVisible.map(this._renderItem.bind(this));
        this._recalculateOffsetFromTop();
    }

    /**
     * @param {Item} item
     * @private
     */
    _renderItem(item) {
        this.itemsNode.appendChild(item.render());
    }

    /**
     * @param {string} type
     */
    onModify(type) {
        switch (type) {
            case EVENT_TYPE_ADD:
                this._add();
                break;
            case EVENT_TYPE_SUBTRACT:
                this._subtract();
                break;
        }

        this._renderList();
    }

    /**
     * @return {boolean}
     * @private
     */
    _subtract() {
        if (this.state.from - this.params.itemsPerPage <= 0) {
            this.setState('from', 1);
            this.setState('to', 1 + this.params.itemsPerPage);
            return false;
        }

        this.setState('from', this.state.from - this.params.itemsPerPage);
        this.setState('to', this.state.to - this.params.itemsPerPage);
    }

    /**
     * @return {boolean}
     * @private
     */
    _add() {
        if (this.state.to >= this.params.maxTotalItems) {
            return false;
        }

        this.setState('to', this.state.to + this.params.itemsPerPage);

        if (this.state.to - this.params.maxItemsVisible > this.state.from) {
            this.setState('from', this.state.from + this.params.itemsPerPage);
        }
    }

    /**
     * @private
     */
    _recalculateOffsetFromTop() {
        let offset = this.state.itemsHidden.length * 115;
        this.scrollListener.setOffsetFromTop(offset);
        this.itemsNode.style.top = offset + 'px';
    }

    /**
     * @private
     */
    _setItems() {
        let itemsVisible = [];
        let itemsHidden = [];
        let index = 0;

        while (index < this.state.to) {
            index++;
            let item = new Item(index);
            (this.state.from === 1 || index >= this.state.from) ? itemsVisible.push(item) : itemsHidden.push(item);
        }

        this.setState('itemsVisible', itemsVisible);
        this.setState('itemsHidden', itemsHidden);
    }

    /**
     * @param {String} key
     * @param {String|Number|Object} value
     */
    setState(key, value) {
        let state = {};
        state[key] = value;
        this.state = Object.assign({}, this.state, state);
    }

    /**
     * @param {Element} node
     */
    appendTo(node) {
        node.appendChild(this.itemsNode);
    }
}