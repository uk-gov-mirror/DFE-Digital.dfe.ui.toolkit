var c1 = c1 || {};
c1.validator = {
  dataList: {},
  init: function(dataList) {
    c1.validator.dataList = dataList.datalist;
    c1.validator.errorBehaviour = dataList["errorBehaviour"];
  },
  showValidity: function(field, context) {
    var $field = $(field),
      showValidity = true;
    $field.data('clientInteraction', true);
    if (c1.validator.hasCustomValidationRules(field)) {
      c1.validator.validateCustom(field);
    }
    if (c1.validator.isGroup(field)) {
      var showValidity = false,
        shortId = $field.data('short-id'),
        groupFields = c1.validator.dataList[shortId].fields,
        allFieldsUsed = false,
        usedFields = 0;
      for (var fld in groupFields) {
        var f = document.querySelector('[id$="' + groupFields[fld] + '"]');
        var $f = $(f);
        if ($f.data('clientInteraction')) {
          usedFields++;
        }
      }
      if (usedFields == groupFields.length) {
        for (var fld in groupFields) {
          var f = document.querySelector('[id$="' + groupFields[fld] + '"]');
          if (f.validity.valid) {
            c1.validator.errorBehaviour.fieldOk(f);
          }
        }
        for (var fld in groupFields) {
          var f = document.querySelector('[id$="' + groupFields[fld] + '"]');
          if (!f.validity.valid) {
            c1.validator.errorBehaviour.fieldBad(f);
          }
        }
      }
    }
    if (field.validity.valid && showValidity) {
      c1.validator.errorBehaviour.fieldOk(field);
    } else {
      if (showValidity) c1.validator.errorBehaviour.fieldBad(field);
    }
  },
  isGroup: function(field) {
    var $field = $(field),
      shortId = $field.data('short-id');
    if (!c1.validator.dataList[shortId]) {
      return false;
    }
    if (c1.validator.dataList[shortId].fields) {
      return true;
    }
    return false;
  },
  hasCustomValidationRules: function(field) {
    var $field = $(field),
      shortId = $field.data('short-id');
    if (!c1.validator.dataList[shortId]) {
      return false;
    }
    return undefined !== c1.validator.getCustomValidationRules(field);
  },
  getCustomValidationRules: function(field) {
    var $field = $(field),
      shortId = $field.data('short-id');
    return c1.validator.dataList[shortId].customRules;
  },
  validateCustom: function(fieldName) {
    var rules = c1.validator.getCustomValidationRules(fieldName);
    for (var rule in rules) {
      for (var funcName in rules) {
        c1.validator.customRules[rule].apply(this, rules[rule]);
      }
    }
    return true;
  },
  customRules: {
    mustMatch: function(field1, field2) {
      var f1 = document.getElementById(field1),
        f2 = document.getElementById(field2);
      if (f1.value !== f2.value) {
        f1.setCustomValidity("This field must match the previous field exactly");
        return false;
      } else {
        f1.setCustomValidity("");
        return true;
      }
    },
    notEqual: function(field, notEqualTo) {
      var f1 = document.querySelector('[id$="' + field + '"]'),
        $f1 = $(f1),
        fld = document.querySelector('[id$="' + field + '"]');
      $formRow = $f1.parents(".qc-form-row");
      if (($f1.val() === notEqualTo)) {
        var fieldLabel = " for " + $formRow.find('label[for="' + fld.id + '"]').html(),
          errorMsg = "Please select an option ";
        if (fieldLabel !== null && fieldLabel.length > 0) {
          errorMsg = errorMsg.concat(fieldLabel);
        }
        f1.setCustomValidity(errorMsg);
      } else {
        f1.setCustomValidity("");
      }
      return !($f1.val() === notEqualTo);
    },
    minLength: function(field, minLength, customError) {
      var f1 = document.querySelector('[id$="' + field + '"]'),
        $f1 = $(f1),
        validationError = "Must have a minimum of " + minLength + " characters";
      if (customError !== undefined) {
        validationError = customError;
      }
      if (($f1.val().length < minLength)) {
        f1.setCustomValidity(validationError);
      } else {
        f1.setCustomValidity("");
      }
      return !($f1.val().length < minLength);
    },
    stripString: function(field, stripString) {
      var f1 = document.querySelector('[id$="' + field + '"]'),
        $f1 = $(f1),
        str = $f1.val();
      if (str.lastIndexOf(stripString) > 0) {
        $f1.val(str.replace(stripString, ''));
      }
    }
  },
  insertAttribute: function(elem, name, value) {
    if (elem) {
      elem.setAttribute(name, value);
    }
  },
  createFauxField: function(fauxFldId) {
    var $input = $('
    '); }, insertAllAttributes : function() { $.each (c1.validator.dataList, function (selector, valuesToInsert) { field = document.querySelector(' [id$ = "' + selector + '"]
    '); $field = $(field); $field.data('
    short - id ', selector); $.each (valuesToInsert, function(k,v) { if (k !== "customRules") { c1.validator.insertAttribute(field, k, v); if (k == '
    placeholder ') { //$('
    label[
    for = "' + field.id + '"]
    ').addClass('
    hidden '); } if (k == '
    fields ') { var fauxFldId = ""; for (var fld in v) { fauxFldId = fauxFldId.concat(v[fld]); } c1.validator.createFauxField(fauxFldId); } } }); }); } };
