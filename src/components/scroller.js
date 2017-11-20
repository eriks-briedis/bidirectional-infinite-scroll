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
    }

    render() {
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
        this.setItems();
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
                this.add();
                break;
            case EVENT_TYPE_SUBTRACT:
                this.subtract();
                break;
        }
        this._renderList();
    }

    /**
     * @public
     */
    subtract() {
        let from = this.state.from - this.params.itemsPerPage;
        this.setState('from', Math.max(1, from));
        this.setState('to', this.state.to - this.params.itemsPerPage);
    }

    /**
     * @return {boolean}
     * @public
     */
    add() {
        if (this.state.to >= this.params.maxTotalItems) {
            return false;
        }

        this.setState('to', this.state.to + this.params.itemsPerPage);

        if (this.state.to - this.state.from >= this.params.maxItemsVisible) {
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
     * Render items as hidden or visible depending on visible range
     */
    setItems() {
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