import Scroller from '../src/components/scroller';

let assert = require('assert');
let scroller = new Scroller({
    threshold: 300,
    itemsPerPage: 10,
    maxItemsVisible: 30,
    scrollTimeout: 100,
    maxTotalItems: 100
});

describe('Scroller', () => {
    it('state from and to range should be 1 and 10', () => {
        assert.equal(scroller.state.from, 1);
        assert.equal(scroller.state.to, 10);
    });

    it('there should be 0 hidden items', () => {
        assert.equal(scroller.state.itemsHidden.length, 0);
    });

    it('state from should increase to 20', () => {
        scroller.add();
        assert.equal(scroller.state.from, 1);
        assert.equal(scroller.state.to, 20);
    });
});