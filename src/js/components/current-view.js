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
$(document).on('change', '[data-radio-group] [data-radio-view]', function () {
  const $group = $(this).closest('[data-radio-group]');
  const view = $(this).attr('data-radio-view');

  $group.find('[data-form-view]').each(function () {
    const $el = $(this);
    const formView = $el.attr('data-form-view');

    if (formView === view) {
      $el.removeClass('d-none');
    } else {
      $el.addClass('d-none');
    }
  });
});

$(document).ready(function () {
  $('[data-radio-group]').each(function () {
    $(this).find('[data-radio-view]:checked').trigger('change');
  });
});
