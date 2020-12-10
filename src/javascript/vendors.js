window.Cookies = require('js-cookie');

//GA Utils
window.dataLayer = window.dataLayer || [];
window.gtag = function () {
    dataLayer.push(arguments);
}

