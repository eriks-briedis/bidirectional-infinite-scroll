import Scroller from './components/scroller';

let scroller = new Scroller({
    threshold: 500,
    itemsPerPage: 10,
    maxItemsVisible: 30,
    scrollTimeout: 50,
    maxTotalItems: 1000
});
scroller.render().appendTo(document.getElementById('app'));