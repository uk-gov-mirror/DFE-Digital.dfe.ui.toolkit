var NSA = NSA || {};

NSA = {
  showPassword() {
    const $showPassword = $('.show-password');

    $showPassword.each(function (i) {
      const $that = $(this);
      const $pwdFld = $that.find('input:password');
      const $checkLbl = $('<label />').prop({ for: `show-password-${i}` }).html('Show');
      const $checkBox = $('<input />').prop({ type: 'checkbox', id: `show-password-${i}` }).on('change', function () {
          const $that = $(this);
          $pwdFld.prop('type', () => ($that.prop('checked') ? 'text' : 'password'));
          $checkLbl.html(() => ($that.prop('checked') ? 'Hide' : 'Show'));
        }),
        $cbWrap = $('<div />').prop('class', 'show-password-control').append($checkBox, $checkLbl);

      $pwdFld.after($cbWrap);
    });
  },
};

if ($('.show-password').length > 0) {
  NSA.showPassword();
}
