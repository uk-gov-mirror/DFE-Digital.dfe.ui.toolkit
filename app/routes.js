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
  }
}
