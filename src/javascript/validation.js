var forms = $('#content form');
var inputs = forms.find('.form-group input');

forms.attr('novalidate', 'novalidate');

forms.on('submit', function () {
  inputs.each(function () {
    var result = this.checkValidity();
    if (!result) {
      showValidationMessage(this);
    } else {
      hideValidationMessage(this);
    }
  });
  return this.checkValidity();
});

inputs.on('blur', function () {
  var result = this.checkValidity();
  if (!result) {
    showValidationMessage(this);
  } else {
    hideValidationMessage(this);
  }
});

var showValidationMessage = function (field) {
  var field = field,
    $field = $(field);

  if (!$field.parents('form-group').hasClass('form-group-error')) {

    var labelText = $("label[for='" + $field.attr('id') + "']").text(),
      errorMessageText = 'Enter a valid ' + labelText,
      errorMessage = $('<p>')
        .html(errorMessageText)
        .prop('class', 'error-message')
        .prop('id', 'validation-' + slugify(labelText));

    $field.before(errorMessage);
    $field.parents('form-group').addClass('form-group-error');
    $field.attr({
      'aria-describedby' : 'validation-' + slugify(labelText),
      'aria-invalid': 'true'
    });
  }
}

var hideValidationMessage = function (field) {
  var field = field,
    $field = $(field);

  $field.parents('form-group').removeClass('form-group-error').find('p.error-message').remove();
  $field.removeAttr('aria-describedby').removeAttr('aria-invalid');
}

var slugify = function (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
