module.exports = {
  bind: function (app) {
    app.get('/', function (req, res) {
      res.render('index')
    });
    app.get('/login', function (req, res) {
      res.render('login')
    })
    app.get('/user-profile-access-request', function (req, res) {
      res.render('user-profile-access-request')
    })
    app.get('/change-password-current', function (req, res) {
      res.render('change-password-current')
    })
    app.get('/change-password-new', function (req, res) {
      res.render('change-password-new')
    })
    app.post('/change-password-new', function (req, res) {
      res.render('change-password-new')
    })
    app.get('/user-profile', function (req, res) {
      res.render('user-profile')
    })
    app.get('/concepts/password/strength', function (req, res) {
      res.render('concepts/password/strength')
    })
    app.get('/concepts/portal/services', function (req, res) {
      res.render('concepts/portal/services')
    })
    app.get('/concepts/portal/services-v2', function (req, res) {
      res.render('concepts/portal/services-v2')
    })
  }
}
