var NSA = NSA || {};

NSA = {
  showPassword : function () {
    var $showPassword = $('.show-password');
    $showPassword.each(function (i) {
      var $that = $(this);
      var $pwdFld = $that.find('input:password');
      var $checkLbl = $('<label />').prop({ for: 'show-password-' + i }).html('Show');
      var $checkBox = $('<input />').prop({ type: 'checkbox', id: 'show-password-' + i }).on('change', function () {
        var $that = $(this);
        $pwdFld.prop('type', function () {
          return $that.prop('checked') ? 'text' : 'password';
        });
        $checkLbl.html(function () {
          return $that.prop('checked') ? 'Hide' : 'Show';
        });
        $that.parent().removeClass('type-password');
        if ($that.prop('checked')) {
          $that.parent().addClass('type-password');
        }
      });
      var $cbWrap = $('<div />').prop('class', 'show-password-control').append($checkBox, $checkLbl);
      $pwdFld.after($cbWrap);
    });
  },
  backLink: function () {
    var backLink = $('<a>')
      .attr({ 'href': '#', 'class': 'link-back' })
      .text('Back')
      .on('click', function (e) { window.history.back(); e.preventDefault(); });
    $('.js-back-link').html(backLink);
  },
};


if ($('select.select2').length > 0) {
  $('select.select2').select2();
}

if ($('.show-password').length > 0) {
  NSA.showPassword();
}

if ($('.js-back-link')) {
  NSA.backLink();
}

$('.under-construction').on('click', function (e) {
  alert('This functionality is not available yet');
  e.preventDefault();
});

if ($('.notification span.icon').length > 0) {
  $('.notification span.icon').on('click', function () {
    $(this).parent().hide();
  });
}

if ($('article.organisation-services').length > 0) {

  $('.information').on('click', function (e) {
    var info = $(this).parent().parent().find('.service-description');
    e.preventDefault();
    info.toggle();
  });

  $('.info-link').on('click', function (e) {
    var meta = $(this).parent().next();
    e.preventDefault();
    meta.toggle();
  });
}

var showHideContent = new GOVUK.ShowHideContent()
showHideContent.init()

GOVUK.details.init()

