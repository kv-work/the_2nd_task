import $ from 'jquery';
import 'paginationjs/dist/pagination.min';
import RoomCard from '../room-card/room-card';

class Pagination {
  constructor(node, options) {
    this.$node = $(node);
    this.$pagination = this.$node.find('.js-pagination');
    this.$description = this.$node.find('.js-pagination-block__description');
    this.roomNumbers = this.$node.data().rooms;
    this.roomsData = this.$node.data().roomsData;
    this.numOfPages = this.$pagination.data().pages;
    this.pageSize = 12;

    this.createdData = Pagination._createData(this.roomNumbers, this.roomsData, this.numOfPages);

    if (this.roomNumbers.length === 0) {
      this.options = options;
    } else {
      this.options = {
        ...options,
        dataSource: this.createdData,
        pageSize: this.pageSize,
        beforePaging: (page) => this._displayDescription(page),
        callback: (data) => Pagination._createContent(data),
      };
    }

    this._init();
  }

  _init() {
    const { $pagination, options } = this;
    $pagination.pagination(options);
  }

  _displayDescription(page) {
    const { $description, pageSize, createdData } = this;

    const totalItems = createdData.length > 100 ? '100+' : createdData.length;
    const displayItemsStart = pageSize * (page - 1) + 1;

    let displayItemsEnd;
    if ((pageSize * page) > createdData.length) {
      displayItemsEnd = totalItems.length;
    } else {
      displayItemsEnd = pageSize * page;
    }

    const displayItems = `${displayItemsStart} - ${displayItemsEnd}`;
    const descriptionString = `${displayItems} из ${totalItems} вариантов аренды`;

    $description.html(descriptionString);
  }

  static _shuffle(arr) {
    let j;
    let temp;
    const tempArr = arr;

    arr.forEach((_, index) => {
      const i = arr.length - 1 - index;
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      tempArr[j] = arr[i];
      tempArr[i] = temp;
    });

    return tempArr;
  }

  static _createData(roomNumbers, roomsData, totalPages) {
    const data = roomNumbers.map((number) => ({
      roomData: roomsData[`room${number}`],
      number,
    }));
    const newData = [...data];

    for (let i = 1; i < totalPages; i += 1) {
      const shuffledData = Pagination._shuffle(data);
      shuffledData.forEach((elem) => newData.push(elem));
    }

    return newData;
  }

  static _createContent(data) {
    const cards = data.map((roomParams) => RoomCard.template(roomParams));

    let html = '';

    cards.forEach((card) => {
      html += card;
    });

    const $dataContainer = $('.js-pagination-block__data-container');

    $dataContainer
      .html(html)
      .find('.js-room-card')
      .each(function createNewRoomCard() {
        const roomCard = new RoomCard(this);

        return roomCard;
      });
  }
}

$('.js-pagination-block').each(function createPagination() {
  const options = {
    dataSource: (done) => {
      const numberOfPages = $('.js-pagination')[0].dataset.pages;
      const result = [];
      for (let i = 1; i <= numberOfPages; i += 1) {
        result.push(i);
      }
      done(result);
    },
    pageSize: 1,
    pageRange: 1,
    autoHidePrevious: true,
    autoHideNext: true,
  };

  const pagination = new Pagination(this, options);

  return pagination;
});
