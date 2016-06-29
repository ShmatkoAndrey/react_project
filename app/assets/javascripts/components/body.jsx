var BodyBox = React.createClass({
    getInitialState: function() {
        return {posts: this.props.posts, current_user: this.props.current_user};
    },
    set_current_user: function(current_user) {
      this.setState({current_user: current_user})
    },
    render: function() {
        var {posts, current_user } = this.state;
        return (
            <div>
                <div className="col-md-3" >
                    {current_user != null ? <div id="user-info">  </div> : ''}
                    {current_user != null ? <div id="post-form-main"> <PostForm /> </div> : ''}
                    {current_user == null ?
                        <div id="login-form-main">
                            <LoginRegBox set_current_user_lb = { this.set_current_user } />
                        </div>
                        : ''}
                </div>
                <div className="col-md-5">
                    <PostList posts={posts} current_user = {current_user} />
                </div>
            </div>
        )
    }
});