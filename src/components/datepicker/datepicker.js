import $ from 'jquery';
import 'air-datepicker/dist/js/datepicker.min';
import Cleave from 'cleave.js';
import Datepicker from './datepicker-class';

$('.js-form_datepicker, .js-form_datepicker_separated, .js-form_datepicker_inline').each(function addDatepicker() {
  // config datepicker's language
  $.fn.datepicker.language['my-lang'] = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вос', 'Пон', 'Вто', 'Сре', 'Чет', 'Пят', 'Суб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    today: 'Сегодня',
    clear: 'Очистить',
    dateFormat: 'dd.mm.yyyy',
    timeFormat: 'hh:ii',
    firstDay: 1,
  };

  const options = {
    language: 'my-lang',
    range: true,
    toggleSelected: false,
    multipleDatesSeparator: ' - ',
    dateFormat: 'd M',
    clearButton: true,
    // minDate: new Date('2019-08-19'),
    offset: 15,
    navTitles: {
      days: 'MM yyyy',
    },
  };

  const datepicker = new Datepicker(this, options);

  return datepicker;
});

// Add a mask to enter the date
$('.js-datepicker_masked').toArray().forEach((field) => {
  const maskedInput = new Cleave(field, {
    date: true,
    datePattern: ['d', 'm', 'Y'],
    delimiters: ['.', '.'],
  });

  return maskedInput;
});