"use strict";

var NSA = NSA || {};

NSA.signin = {
  form: $('#form-signin'),
  init: function () {
    this.setupEvents();
  },
  setupEvents: function () {
    this.form.on('submit', this, this.handleSubmit);
  },
  handleSubmit: function (e) {

    var $form = $(this);
    var $inputs = $form.find('input').not(':checkbox'), postData = {}, $submitButtons = $(this).find('button:submit');

    $submitButtons.attr('disabled', 'disabled');

    $inputs.each(function() {
      postData[this.name] = $(this).val();
    });

    $.ajax({
      type: 'POST',
      data: postData,
      url: $form.attr('action'),
      context: e.data,
      dataType: 'json',
      success: function (data) {
        console.log(data);
        if (data.isFailedLogin) {
          this.resetValidation($form);
          this.showValidationMessage(data.validationMessages);
          this.showInlineValidation(data.validationMessages);
          $submitButtons.removeAttr('disabled');
        } else {
          this.buildFormAndSubmit(data);
        }
      },
    });
    e.preventDefault();
  },
  resetValidation: function ($form) {

    var $formGroups = $form.find('.form-group');

    $('.error-summary').remove();

    $formGroups.each(function () {
      var $field = $(this).find('input').eq(0);
      if ($(this).hasClass('form-group-error')) {
        $(this).removeClass('form-group-error');
        $(this).find('p.error-message').remove();
        $field.removeAttr('aria-describedby').removeAttr('aria-invalid');
      }
    });
  },
  showValidationMessage: function (messages) {

    var $div = $('<div />').attr('class', 'error-summary').attr('role', 'alert').attr('tabindex', '-1');
    var $h2 = $('<h2 />').attr('class', 'heading-medium error-summary-heading').attr('id', 'error-summary').text('Information missing or incorrect');
    var $ul = $('<ul />').attr('class', 'error-summary-list');

    $.each(messages, function( index, value ) {
      var $a = $('<a />').attr('href', '#' + index).text(value);
      var $li = $('<li />').attr('class', '').append($a);
      $ul.append($li);
    });

    $div.append($h2).append($ul);
    $('main').prepend($div);

  },
  showInlineValidation: function(messages) {

    $.each(messages, function( index, value ) {
      var $field = $('input[name=' + index + ']'),
        $parent = $field.parent();

      if ($parent.hasClass('show-password')) {
        $parent = $parent.parent();
      }

      var $label = $parent.find('label').first();

      if (!$parent.hasClass('form-group-error')) {

        var errorMessage = $('<p>')
          .html(value)
          .prop('class', 'error-message')
          .prop('id', 'validation-' + index);
      }

      $label.after(errorMessage);
      $parent.addClass('form-group-error');
      $field.attr({
        'aria-describedby' : 'validation-' + index,
        'aria-invalid': 'true'
      });

    });

  },
  buildFormAndSubmit: function (data) {

    var $form = $('<form />').attr({
      method: 'post',
      action: data.destination
    });

    $.each(data.postbackData, function( index, value ) {
      var $field = $('<input />').attr({
        type: 'hidden',
        name: index,
        value: value
      });
      $form.append($field);
    });

    $('body').append($form);
    $form.submit();
  }
};

if ($('#form-signin').length > 0) {
  NSA.signin.init();
}
