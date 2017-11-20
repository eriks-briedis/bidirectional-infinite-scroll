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
        this.scrollListener = new ScrollListener(
            this.params.scrollTimeout,
            this.params.threshold,
            this.onModify.bind(this)
        );
        this.initState();
    }

    /**
     * @return {Scroller}
     * @public
     */
    render() {
        let itemsNode = document.createElement('div');
        itemsNode.className = 'scroller';
        itemsNode.id = 'scroller';
        this.itemsNode = itemsNode;
        this._renderList();

        return this;
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
        item.render().appendTo(this.itemsNode);
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
        this.setState('from', Math.max(1, this.state.from - this.params.itemsPerPage));
        this.setState('to', Math.max(this.params.itemsPerPage, this.state.to - this.params.itemsPerPage));
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
        let offset = this._getOffsetFromHiddenItems();
        this.scrollListener.setOffsetFromTop(offset);
        this.itemsNode.style.top = offset + 'px';
    }

    /**
     * @return {number}
     * @private
     */
    _getOffsetFromHiddenItems() {
        return this.state.itemsHidden.reduce((prevVal, item) => prevVal + item.getHeight(), 0);
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

    initState() {
        this.state = {
            itemsVisible: [],
            itemsHidden: [],
            from: 1,
            to: this.params.itemsPerPage
        };
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