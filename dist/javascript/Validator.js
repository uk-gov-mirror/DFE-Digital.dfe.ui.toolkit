
var DfE = DfE || {};
var input;


DfE.validator = {
  init : function () {

    var form = document.getElementById('form-current-password');

    form.onsubmit = function (e) {
      console.log(this.checkValidity());
      return false;
    }
  }
};

window.onload = function () {

  input = document.getElementById('current-password');

  input.onblur = function () {
    if (!this.validity.valid) {
      // Error
      var $parent = $(this).parent('.form-group'),
      $errorHolder = $parent.find('.error-message');

      $errorHolder.html($(this).data('validation'));
      $parent.addClass('form-group-error');
    } else {
      $(this).parent('.form-group').removeClass('form-group-error');
    }
  }

  DfE.validator.init();

}


