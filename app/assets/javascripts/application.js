// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require components
//= require_self
//= require_tree .


//Да, именно в application.js, потому что мне дальше нужен current_user
var current_user = null;

$(document).ready(function() {
    $.ajax({
        url: "/users/current_user",
        method: "GET",
        async: false,
        success: function(data) {
            current_user = data.current_user;
        },
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }});
    update_current_user();
});

var update_current_user = function() {
    if(current_user != null) {
        $('#post-form-main').show();
        $('#user-info').show();
    } else {
        $('#login-form-main').show();
    }
};