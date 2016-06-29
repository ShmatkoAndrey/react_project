var check_current_user = function() {
    if (current_user != null) {
        $('#post-form-main').show();
        $('#user-info').show();
        $('#login-form-main').hide();
    } else {
        $('#post-form-main').hide();
        $('#user-info').hide();
        $('#login-form-main').show();
    }
   if(postList) {
       postList.forceUpdate();
   }
};

$(function() {

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('#register-submit').click(function(e) {
        $.ajax({
            url: "/users",
            method: "POST",
            data:{ user: {
                email: $('#register-form #email').val(),
                password: $('#register-form #password').val(),
                password_confirmation: $('#register-form #password_confirmation').val()
            }},
            success: function(data) {
                current_user = data.current_user;
                check_current_user();
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    });

    $('#login-submit').click(function(e) {
        $.ajax({
            url: "/users/sign_in",
            method: "POST",
            data: {user: {
                email: $('#login-form #email').val(),
                password: $('#login-form #password').val()
            }},
            success: function(data) {
                current_user = data.current_user;
                check_current_user();
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    });

    $('#logout-submit').click(function(e) {
        $.ajax({
            url: "/users/sign_out",
            method: "DELETE",
            success: function(data) {
                current_user = null;
                check_current_user();
            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    });
});