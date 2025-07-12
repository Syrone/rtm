import $ from 'jquery';

$('[data-counter]').each(function () {
  const $counter = $(this);
  const $input = $counter.find('[data-counter-current]');
  const $increment = $counter.find('[data-counter-increment]');
  const $decrement = $counter.find('[data-counter-decrement]');

  // Функция обновления ширины input
  function updateInputWidth() {
    const length = $input.val().length || 1;
    $input.css('width', `${length}ch`);
  }

  // Изначально установить ширину
  updateInputWidth();

  // Клик по "+" (инкремент)
  $increment.on('click', function () {
    let value = parseInt($input.val(), 10) || 0;
    value++;
    $input.val(value);
    updateInputWidth();
  });

  // Клик по "-" (декремент)
  $decrement.on('click', function () {
    let value = parseInt($input.val(), 10) || 0;
    value = Math.max(0, value - 1); // не даем уйти в минус
    $input.val(value);
    updateInputWidth();
  });

  // Изменение вручную в input
  $input.on('input', function () {
    updateInputWidth();
  });
});
