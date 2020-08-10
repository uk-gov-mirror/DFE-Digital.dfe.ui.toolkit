var $cookieBanner = $('.global-cookie-message-dfe-sign-in');
var $cookieAcceptButton = $cookieBanner.find('button.cookie-accept');

var COOKIE_NAMES = {
  PREFERENCES_SET: 'cookies_preferences_set',
  POLICY: 'cookies_policy'
};

var DEFAULT_POLICY = {
  essential: true,
  settings: false,
  usage: false,
  campaigns: false
};

var GOVUK_COOKIE_OPTIONS = {
  expires: 365, // days
};

if (!window.Cookies.get(COOKIE_NAMES.PREFERENCES_SET)) {
  window.Cookies.set(
    COOKIE_NAMES.POLICY,
    DEFAULT_POLICY,
    GOVUK_COOKIE_OPTIONS
  );

  $cookieBanner.slideDown(function () {

    $cookieAcceptButton.click(function () {
      var acceptedPolicy = $.extend(DEFAULT_POLICY, {}); // deep copy
      
      window.Cookies.set(
        COOKIE_NAMES.PREFERENCES_SET,
        true,
        GOVUK_COOKIE_OPTIONS
      );

      $.each(acceptedPolicy, function (key) {
        acceptedPolicy[key] = true;
      });


      window.Cookies.set(
        COOKIE_NAMES.POLICY,
        acceptedPolicy,
        GOVUK_COOKIE_OPTIONS
      );

      $cookieBanner.slideUp();
      
    });
  
  });
  
}
