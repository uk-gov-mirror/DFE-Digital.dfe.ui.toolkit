(function (window) {
  var $ = window.$;
  var Cookies = window.Cookies;

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
  
  if (!Cookies.get(COOKIE_NAMES.PREFERENCES_SET)) {
    Cookies.set(
      COOKIE_NAMES.POLICY,
      DEFAULT_POLICY,
      GOVUK_COOKIE_OPTIONS
    );
  
    $cookieBanner.slideDown(function () {
      $cookieAcceptButton.click(function () {
        var acceptedPolicy = $.extend(DEFAULT_POLICY, {}); // deep copy
  
        $.each(acceptedPolicy, function (key) {
          acceptedPolicy[key] = true;
        });
  
        Cookies.set(
          COOKIE_NAMES.POLICY,
          acceptedPolicy,
          GOVUK_COOKIE_OPTIONS
        );
  
        Cookies.set(
          COOKIE_NAMES.PREFERENCES_SET,
          true,
          GOVUK_COOKIE_OPTIONS
        );
  
        $cookieBanner.slideUp();
      });
    
    });
    
  }
})(window);