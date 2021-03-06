(function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector){
    if(!selector){
      throw new Error ('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0){
      throw new Error('Couuld not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);
      console.log('Processing payment for ' + data.title + data.username);
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
