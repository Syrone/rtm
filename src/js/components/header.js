import $ from 'jquery';

import { getHeaderHeight } from '../functions/header-height.js'
import { throttle } from '../functions/throttle.js';

getHeaderHeight()
$(window).on('resize', throttle(getHeaderHeight));

function updateHeaderFixedClass() {
  if ($(window).scrollTop() > 0) {
    $('.header').addClass('header--fixed');
  } else {
    $('.header').removeClass('header--fixed');
  }
}

$(window).on('scroll', updateHeaderFixedClass);

// Вызов сразу при загрузке
updateHeaderFixedClass();
