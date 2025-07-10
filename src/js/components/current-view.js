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
