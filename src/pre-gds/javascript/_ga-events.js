var gaEvent = $('#ga-event');

if (gaEvent.length > 0) {
  var category = gaEvent.data('category'),
    label = gaEvent.data('label'),
    event = gaEvent.data('event');

  if (event !== '' && label !== '' && category !== '') {
    gtag('event', event, {
      event_category: category,
      event_label: label,
    });
  }
}

$('.notification a').on('click', function () {
  if ($(this).data('clientid')) {
    gtag('event', 'download', {
      event_category: 'migration-help-pdf',
      event_label: $(this).data('clientid'),
    });
  }
});
