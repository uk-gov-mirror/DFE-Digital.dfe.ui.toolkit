$(function() {
  c1.validator.init(c1.appForm);
  c1.validator.insertAllAttributes();
  errorJump();

  var form = document.querySelector('form[id$=smart-search-app]') ||
              document.querySelector('form[id$=dm-optout-form]'),
    $form = $(form);

    $form.find('select').on('change', function(e) {
      c1.validator.showValidity(e.target, 'field');
    });

    $form.find('input').on('change', function(e) {
      c1.validator.showValidity(e.target, 'field');
    });

    $form.attr('novalidate', 'novalidate').on('submit', function () {
      $(this).find('select').each(function() {
        c1.validator.showValidity(this, 'form');
      });
      $(this).find('input').each(function() {
        c1.validator.showValidity(this, 'form');
      });
      var isFormValid = form.checkValidity();

      if (isFormValid) {
        return true;
      }
      else
      {
        errorJump();
        errorHandlerForAccessibility();
        return false;
      }
    });

    if ( $('#main').data('addresssearch') ) {
      $(this).find('select').each(function()
        {
          if ($(this).find('option:selected').index() > 0) {
            c1.validator.showValidity(this, 'form');
          }
        });
      $(this).find('input').each(function() {
        if ( $(this).val() ) {
          c1.validator.showValidity(this, 'form'); } }); } }); errorJump = function () { if ($('.about-you').css('float') != 'left') { var errorField = $('.qc-form-row.error'), missingField = $('.qc-form-row.missing'); if (errorField.length > 0 || missingField.length > 0) { var scrollPosition = 0, body = $('html, body'), issueField; if (errorField.length < 1) { scrollPosition = missingField.offset().top; issueField = missingField; } else if (missingField.length < 1) { scrollPosition = errorField.offset().top; issueField = errorField; } else if (errorField.offset().top < missingField.offset().top) { scrollPosition = errorField.offset().top; issueField = errorField; } else { scrollPosition = missingField.offset().top; issueField = missingField; } // check to see if error field has select element (dropdown list) - voiceover bug workaround if (issueField.first().find('select').length) { var fieldElem = issueField.first().find('select'); var errorMsgElem = issueField.first().find('.error-message').first(); // check if error element had already been wrapped with label element if (!errorMsgElem.parent('label').length) { errorMsgElem.wrap($('').attr('for', fieldElem.attr('id'))); } errorMsgElem.attr('tabindex','-1').focus(); } else { issueField.first().find('input, select, textarea').first().focus(); } body.scrollTop(scrollPosition); } }	}
