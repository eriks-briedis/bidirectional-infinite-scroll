import Scroller from './components/scroller';

let scroller = new Scroller({
    threshold: 300,
    itemsPerPage: 10,
    maxItemsVisible: 30,
    scrollTimeout: 200
});
scroller.appendTo(document.getElementById('app'));