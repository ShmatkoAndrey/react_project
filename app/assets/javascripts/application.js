//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require components
//= require_self
//= require_tree .

var current_user = null; //Да, именно в application.js, потому что мне дальше нужен current_user
$.ajax({
    url: "/users/current_user",
    method: "GET",
    async: false,
    success: function(data) {
        current_user = data.current_user;
    },
    error: function(xhr, status, err) {
        console.error(status, err.toString());
    }
});