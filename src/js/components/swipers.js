import $ from 'jquery';
import Swiper from 'swiper';
import { Thumbs, EffectFade } from 'swiper/modules';

$('.product-swiper').each(function () {
  const $parent = $(this);

  const $main = $parent.find('.product-swiper-main')[0];
  const $thumb = $parent.find('.product-swiper-thumb')[0];

  if ($main && $thumb) {
    const thumbSwiper = new Swiper($thumb, {
      spaceBetween: 20,
      slidesPerView: 4,
      watchSlidesProgress: true,
    });

    const mainSwiper = new Swiper($main, {
      modules: [ Thumbs, EffectFade ],
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      spaceBetween: 8,
      thumbs: {
        swiper: thumbSwiper,
      },
    });
  }
});

$('.other-swiper').each(function () {
  const $wrapper = $(this);
  const $swiper = $wrapper.find('.swiper')[0];

  if (!$swiper) return;
  new Swiper($swiper, {
    slidesPerView: 'auto',
    spaceBetween: 12,
    breakpoints: {
      0: {
        slidesPerView: 'auto',
      },
      992: {
        slidesPerView: 4,
      },
    }
  });
});
