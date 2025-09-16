import $ from 'jquery';
import Choices from 'choices.js';

$('[data-choices]').each(function () {
  const extraClasses = $(this).attr('data-choices-classes') || '';

  const choice = new Choices(this, {
    allowHTML: true,
    searchEnabled: false,
    itemSelectText: null,
    shouldSort: false,
    loadingText: "Загрузка...",
    noResultsText: "Результаты не найдены",
    noChoicesText: "Нет вариантов для выбора",
  });

  if (extraClasses.trim()) {
    extraClasses.split(/\s+/).forEach(cls => {
      choice.containerOuter.element.classList.add(cls);
    });
  }

  const $inner = $(choice.containerInner.element);

  if ($inner.find('.icon').length === 0) {
    $inner.append(`
      <span class="icon">
        <svg>
          <use xlink:href="img/icons/angle-down.svg#svg-angle-down"></use>
        </svg>
      </span>
    `);
  }
});
