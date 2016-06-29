var UserInfo = React.createClass({
    logOut: function(e) {
        e.preventDefault();

        $.ajax({
            url: "/users/sign_out",
            method: "DELETE",
            success: function(data) {
                this.props.set_current_user_ui(null)
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
   render: function() {
       return(
           <div>
               <input className="form-control btn btn-danger" id="logout-submit" name="register-submit" type="button" value="LogOut"
                      onClick={this.logOut} />
           </div>
       )
   }
});