import 'paginationjs/dist/pagination.min.js'
import "paginationjs/dist/pagination.css";

$('.js-pagination').pagination({
  dataSource: function(done){
    const numberOfPages = $('.js-pagination')[0].dataset.pages;
    let result = [];
    for (var i = 1; i <= numberOfPages; i++) {
        result.push(i);
    }
    done(result);
  },
  pageSize: 1,
  pageRange: 1,
  autoHidePrevious: true,
  autoHideNext: true,
})