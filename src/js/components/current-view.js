import $ from 'jquery';

$(document).on('click', '[data-button-view]', function () {
  const view = $(this).data('button-view');

  const $container = $(this)
    .closest('.section')
    .find('[data-current-view]')
    .first();

  if ($container.length) {
    $container.attr('data-current-view', view);
  }
});

// Логика переключения блоков по data-radio-view
$(document).on('change', '[data-radio-view]', function () {
  const view = $(this).data('radio-view');

  $('[data-form-view]').each(function () {
    const $el = $(this);
    const formView = $el.data('form-view');

    if (formView == view) {
      $el.removeClass('d-none');
    } else {
      $el.addClass('d-none');
    }
  });
});

$(document).ready(function () {
  $('[data-radio-view]:checked').trigger('change');
});
