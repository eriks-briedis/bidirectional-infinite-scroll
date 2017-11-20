import Scroller from '../src/components/scroller';

let assert = require('assert');
let scroller = new Scroller({
    threshold: 300,
    itemsPerPage: 10,
    maxItemsVisible: 30,
    scrollTimeout: 100,
    maxTotalItems: 100
});
scroller.setItems();

describe('Scroller', () => {
    it('state from and to range should be 1 and 10', () => {
        assert.equal(scroller.state.from, 1);
        assert.equal(scroller.state.to, 10);
    });

    it('there should be 0 hidden items', () => {
        assert.equal(scroller.state.itemsHidden.length, 0);
    });

    it('state to should increase to 20', () => {
        scroller.add();
        scroller.setItems();
        assert.equal(scroller.state.from, 1);
        assert.equal(scroller.state.to, 20);
    });

    it('state to should increase to 30', () => {
        scroller.add();
        scroller.setItems();
        assert.equal(scroller.state.from, 1);
        assert.equal(scroller.state.to, 30);
    });

    it('state from and to should increase to 11 and 40', () => {
        scroller.add();
        scroller.setItems();
        assert.equal(scroller.state.from, 11);
        assert.equal(scroller.state.to, 40);
    });

    it('there should be 10 hidden items and 30 visible', () => {
        assert.equal(scroller.state.itemsHidden.length, 10);
        assert.equal(scroller.state.itemsVisible.length, 30);
    });

    it('there should be 0 hidden items and 30 visible', () => {
        scroller.subtract();
        scroller.setItems();
        assert.equal(scroller.state.itemsHidden.length, 0);
        assert.equal(scroller.state.itemsVisible.length, 30);
    })
});