var LoginRegBox = React.createClass({
    getInitialState: function() {
        return { login_red_switch: true };
    },
    set_current_user: function(current_user) {
        this.props.set_current_user_lb(current_user)
    },
    switchLoginReg_sw: function(flag) {
        this.setState({login_red_switch: flag});
    },
   render: function() {
        return (
            <div id="login-box">
                <LoginRegSwitch switchLoginReg={this.switchLoginReg_sw} />
                <div className="panel-body">
                    { this.state.login_red_switch ? <Login change_current_user = {this.set_current_user} /> : <Registration /> }
                </div>
            </div>
        )
   }
});

var LoginRegSwitch = React.createClass({
    handleSwitchLogin: function(e) {
        e.preventDefault();
        $(this.reg_a).removeClass('active');
        $(this.login_a).addClass('active');
        this.props.switchLoginReg(true)
    },
    handleSwitchReg: function(e) {
        e.preventDefault();
        $(this.login_a).removeClass('active');
        $(this.reg_a).addClass('active');
        this.props.switchLoginReg(false)
    },
    render: function() {
        return(
            <div className="panel panel-login">
                <div className="panel-heading">
                    <div className="col-xs-6">
                        <a className="active" id="login-form-link" onClick={this.handleSwitchLogin} ref={(c) => this.login_a = c} >Login</a>
                    </div>
                    <div className="col-xs-6">
                        <a id="register-form-link" onClick={this.handleSwitchReg} ref={(c) => this.reg_a = c}>Register</a>
                    </div>
                </div>
            </div>
        )
    }
});

var Login = React.createClass({
    getInitialState: function() {
        return {username: '', password: ''}
    },
    handleUsername: function(e) {
        this.setState({username: e.target.value});
    },
    handlePassword: function(e){
        this.setState({password: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        $.ajax({
            url: "/users/sign_in",
            method: "POST",
            data: {user: {
                username: this.state.username,
                password: this.state.password
            }},
            success: function(data) {
                this.props.change_current_user(data.current_user);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    render: function() {
        return (
            <form id="login-form" role="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" id="username" placeholder="Username" type="username"
                           value = {this.state.username} onChange={this.handleUsername} />
                </div>
                <div className="form-group">
                    <input className="form-control" id="password" placeholder="Password"  type="password"
                           value = {this.state.password} onChange={this.handlePassword} />
                </div>

                <div className="form-group">
                    <label className="custom-check">
                        <input type="checkbox" name="onOff" />
                        <i> </i>
                        <span> </span>
                    </label>
                </div>
                <div className="form-group">
                    <input className="form-control btn btn-login" id="login-submit" name="login-submit" type="submit" value="Log In" />
                </div>
            </form>

        )
    }
});

var Registration = React.createClass({
    getInitialState: function() {
        return {username: '', password: '', password_confirmation: ''}
    },
    handleUsername: function(e) {
        this.setState({username: e.target.value});
    },
    handlePassword: function(e){
        this.setState({password: e.target.value});
    },
    handlePasswordConfirm(e){
        this.setState({password_confirmation: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        $.ajax({
            url: "/users",
            method: "POST",
            data:{ user: {
                username: this.state.username,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }},
            success: function(data) {
                this.props.change_current_user(data.current_user);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    render: function() {
        return (
            <form id="register-form" role="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input className="form-control" id="username" name="username" placeholder="Username" tabindex="1" type="username"
                           value = {this.state.username} onChange={this.handleUsername} />
                </div>
                <div className="form-group">
                    <input className="form-control" id="password" name="password" placeholder="Password" tabindex="2" type="password"
                           value = {this.state.password} onChange={this.handlePassword} />
                </div>
                <div className="form-group">
                    <input className="form-control" id="confirm-password" name="confirm-password" placeholder="Confirm Password" tabindex="2" type="password"
                           value = {this.state.password_confirmation} onChange={this.handlePasswordConfirm} />
                </div>
                <div className="form-group">

                        <input className="form-control btn btn-register" id="register-submit" name="register-submit" type="submit" value="Register Now" />

                </div>
            </form>

        )
    }
});