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
    app.post('/user-profile', function (req, res) {
      res.render('user-profile')
    })
  }
}
