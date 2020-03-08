import './room-card.scss'
import roomsData from '../../data/data.json'
import RateButton from '../rate-button/rate-button'

class RoomCard {
  constructor(node) {
    this.$node = $(node);
    this.data = this.$node.data();

    this.$numberBlock = this.$node.find('.room_card__number_block');
    this.$imagesBlock = this.$node.find('.room_card__images_block');
    this.$priceBlock = this.$node.find('.room_card__price');
    this.$rateBlock = this.$node.find('.room_card__rate');
    this.$reviewsBlock = this.$node.find('.room_card__reviews');

    this.rateButton = new RateButton( this.$rateBlock.find('.js_rate_button')[0] );

    this._init()
  }

  _init() {
    this._getData();
    this._createRoomImageBlocks();
    this._displayPrice();
    
    if (this.roomData.isLux) {
      this._displayLuxSign();
    }
    
    this._displayRoomRate();
    this._displayNumOfReviews();
  }

  _getData() {
    this.numOfRoom = this.data.number;

    this.roomData = roomsData.rooms[this.numOfRoom]
  }

  _createRoomImageBlocks() {
    const {$imagesBlock, numOfRoom, roomData} = this;
    const imgArr = roomData.images;

    imgArr.forEach((item, idx, array) => {
      const $roomImg = $('<li>', { class: 'room_card__image_room_'+numOfRoom+'_'+idx })
      const isActive = idx === 0;

      if (isActive) $roomImg.addClass('active')

      $roomImg.css({
        'background-image': `url(${item})`
      })

      $imagesBlock.append($roomImg)
    })
  }

  _displayLuxSign() {
    const {$numberBlock} = this;

    $numberBlock.append('<span class="room_card__lux_flag">люкс</span>')
  }

  _displayPrice() {
    const {$priceBlock, roomData} = this;

    $priceBlock.prepend('<span class="room_card__price">'+roomData.price+'</span>')
  }

  _displayRoomRate() {
    const {rateButton, roomData} = this;
    const roomRate = roomData.rate;
    
    rateButton.setRate(roomRate);
  }

  _displayNumOfReviews() {
    const {$reviewsBlock, roomData} = this;
    const numOfReviews = roomData.numOfReviews;

    $reviewsBlock.prepend('<span class="room_card__number_of_reviews">'+numOfReviews+'</span>')
  }
}

$('.js_room_card').each(function() {
  new RoomCard(this);
})