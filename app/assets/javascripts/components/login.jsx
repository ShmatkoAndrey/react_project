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
            <div>
                <LoginRegSwitch switchLoginReg={this.switchLoginReg_sw} />
                <div class="panel-body">
                    <div class="col-lg-12">
                        { this.state.login_red_switch ? <Login change_current_user = {this.set_current_user} /> : <Registration /> }
                    </div>
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
                <hr/>
            </div>
        )
    }
});

var Login = React.createClass({
    getInitialState: function() {
        return {email: '', password: ''}
    },
    handleEmail: function(e) {
        this.setState({email: e.target.value});
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
                email: this.state.email,
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
                    <input className="form-control" id="email" placeholder="Email" type="text"
                           value = {this.state.email} onChange={this.handleEmail} />
                </div>
                <div className="form-group">
                    <input className="form-control" id="password" placeholder="Password"  type="password"
                           value = {this.state.password} onChange={this.handlePassword} />
                </div>
                <div className="form-group text-center">
                    <input id="remember" type="checkbox" />
                    <label for="remember">Remember Me</label>
                </div>
                <div className="form-group">
                    <div className="col-sm-6 col-sm-offset-3">
                        <input className="form-control btn btn-login" id="login-submit" name="login-submit" type="submit" value="Log In" />
                    </div>
                </div>
            </form>

        )
    }
});

var Registration = React.createClass({
    getInitialState: function() {
        return {email: '', password: '', password_confirmation: ''}
    },
    handleEmail: function(e) {
        this.setState({email: e.target.value});
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
                email: this.state.email,
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
                    <input className="form-control" id="email" name="email" placeholder="Email" tabindex="1" type="email"
                           value = {this.state.email} onChange={this.handleEmail} />
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
                    <div className="col-sm-6 col-sm-offset-3">
                        <input className="form-control btn btn-register" id="register-submit" name="register-submit" type="submit" value="Register Now" />
                    </div>
                </div>
            </form>

        )
    }
});