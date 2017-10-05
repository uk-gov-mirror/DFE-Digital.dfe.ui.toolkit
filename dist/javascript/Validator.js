
var DfE = DfE || {};
var input;


DfE.validator = {
  init : function () {

    var form = document.getElementById('form-current-password');

    form.onsubmit = function (e) {
      console.log(e);
      return false;
    }
  }
};

window.onload = function () {

  input = document.getElementById('current-password');
  input.setCustomValidity(this.value ? '' : 'My message');

  input.onchange = function () {
    console.log(this.validity.valid);
  }

  DfE.validator.init();

}


