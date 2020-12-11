var gaEvent = $('#ga-event');

if (gaEvent.length > 0) {
  var category = gaEvent.data('category'),
    label = gaEvent.data('label'),
    event = gaEvent.data('event');

  if (event !== '' && label !== '' && category !== '') {
    ga('send', 'event', category, event, label);
  }
}

$('.notification a').on('click', function () {
  if ($(this).data('clientid')) {
    ga('send', 'event', 'migration-help-pdf', 'download', $(this).data('clientid'));
  }
});
