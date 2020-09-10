(function (window) {
  var $ = window.$;
  var Cookies = window.Cookies;
  if (!Cookies || !$) {
    return;
  }

  var COOKIE_NAMES = {
    PREFERENCES_SET: 'cookies_preferences_set',
    POLICY: 'cookies_policy'
  };
  
  var DEFAULT_POLICY = {
    essential: true,
    settings: false,
    usage: false
  };

  var GovUKCookie = {
    get: function (name) {
      var value = Cookies.get(name);
      if (value) {
        return JSON.parse(value);
      }
      return value;
    },
    set: function (name, value) {
      var GOVUK_COOKIE_OPTIONS = {
        expires: 365 // days
      };
    
      return Cookies.set(
        name,
        value,
        GOVUK_COOKIE_OPTIONS
      );
    }
  };

  GovUKCookie.set(
    COOKIE_NAMES.POLICY,
    DEFAULT_POLICY
  );

  var $cookieBanner = $('.global-cookie-message-dfe-sign-in');
  var $cookieAcceptButton = $cookieBanner.find('button.cookie-accept');

  var getAcceptedAllPolicy = function () {
    var acceptedPolicy = $.extend(DEFAULT_POLICY, {}); // deep copy

    $.each(acceptedPolicy, function (key) {
      acceptedPolicy[key] = true;
    });
  };

  var onCookieAccept = function (event, newPolicy) {
    var acceptedPolicy = newPolicy || getAcceptedAllPolicy();

    GovUKCookie.set(
      COOKIE_NAMES.POLICY,
      acceptedPolicy
    );

    GovUKCookie.set(
      COOKIE_NAMES.PREFERENCES_SET,
      true
    );

    if (event.target === $cookieAcceptButton[0]) {
      $cookieBanner.slideUp();
    }
  };

  if (!GovUKCookie.get(COOKIE_NAMES.PREFERENCES_SET)) {
    $cookieBanner.slideDown(function () {
      $cookieAcceptButton.click(onCookieAccept);
    });
  }
  
  var $preferencesForm = $('.cookies-page-dfe-sign-in__preferences-form');
  var $submitPrefsButton = $('#dsi-set-cookie-preferences');

  $submitPrefsButton.on('click', function (event) {
    event.preventDefault();
    var newPolicy = {
      settings: !!$preferencesForm.find("input[name='cookie.settings']:checked").val(),
      usage: !!$preferencesForm.find("input[name='cookie.usage']:checked").val()
    }

    var acceptedPolicy = $.extend(DEFAULT_POLICY, newPolicy);
    onCookieAccept(event, acceptedPolicy);

    if (window.history) {
      window.history.back();
    } else {
      window.location.pathname = '/';
    }
    return false;
  });

})(window);