var $cookieBanner = $('.global-cookie-message-dfe-sign-in');
var $cookieAcceptButton = $cookieBanner.find('button.cookie-accept');

var consentCookie = {};
consentCookie.name = 'cookies_policy';
consentCookie.payload = window.Cookies.get(consentCookie.name);

if (!consentCookie.payload) {
    $cookieBanner.slideDown();
}
// var consentCookie = {
//     name: 'cookies_policy',
//     payload: {
//         essential: true,
//         settings: false,
//         usage: false,
//         campaigns: false,
//     }
// };

