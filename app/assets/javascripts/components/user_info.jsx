var UserInfo = React.createClass({
    logOut: function(e) {
        e.preventDefault();
        $.ajax({
            url: "/users/sign_out", method: "DELETE",
            success: function() {
                this.props.setCurrentUser_ui(null)
            }.bind(this)
        });
    },
   render: function() {
       return(
           <div>
               <input className="form-control btn btn-danger" type="button" value="LogOut" onClick={this.logOut} />
           </div>
       )
   }
});