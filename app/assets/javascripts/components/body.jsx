var BodyBox = React.createClass({
    getInitialState: function() {
        return { current_user: this.props.current_user};
    },
    setCurrentUser: function(current_user) { this.setState({current_user: current_user}) },
    render: function() {
        var { current_user } = this.state;
        return (
            <div>
                {current_user == null ? <div id="login-form-main"> <LoginRegBox setCurrentUser_lb = { this.setCurrentUser } /> </div> : ''}
                {current_user != null ? <div id="user-info"> <UserInfo setCurrentUser_ui = { this.setCurrentUser } /> </div> : ''}
                {current_user != null ? <RoomBox current_user = {current_user} /> : ''}
            </div>
        )
    }
});