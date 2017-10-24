var NSA = NSA || {};

NSA = {
  showPassword: function () {
    var $showPassword = $('.show-password');

    $showPassword.each(function (i) {

      var $that = $(this),
        $pwdFld = $that.find('input:password'),
        $checkLbl = $('<label />').prop({ for: 'show-password-' + i }).html('Show'),
        $checkBox = $('<input />').prop({ type: 'checkbox', id: 'show-password-' + i }).on('change', function () {
          var $that = $(this);
          $pwdFld.prop('type', function () {
            return $that.prop('checked') ? 'text' : 'password';
          });
          $checkLbl.html(function () {
            return $that.prop('checked') ? 'Hide' : 'Show';
          });
        }),
        $cbWrap = $('<div />').prop('class', 'show-password-control').append($checkBox, $checkLbl);

      $pwdFld.after($cbWrap);

    });
  }
};

if ($('.show-password').length > 0) {
  NSA.showPassword();
}
