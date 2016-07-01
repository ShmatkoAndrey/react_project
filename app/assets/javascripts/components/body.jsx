var BodyBox = React.createClass({
    getInitialState: function() { return {posts: this.props.posts, current_user: this.props.current_user, inProgressLoad: false}; },
    setCurrentUser: function(current_user) { this.setState({current_user: current_user}) },
    setPosts: function(posts) { this.setState({posts: posts}) },
    scrollPosts: function() {
        if(($(this.refs.posts_box).scrollTop() >= $(this.refs.posts_box)[0].scrollHeight - $(this.refs.posts_box)[0].clientHeight - 200) && !this.state.inProgressLoad) {
            $.ajax({
                url: '/posts', dataType: 'json', type: 'GET',
                data: {start: this.state.posts[this.state.posts.length - 1].post.id},
                beforeSend: function() { this.setState({inProgressLoad: true}); }.bind(this),
                success: function(data) {
                    if(data.errors) { console.log(data.errors); }
                    else {
                        new_posts = {posts: this.state.posts.concat(data.posts)};
                        this.setState(new_posts);
                        this.setState({inProgressLoad: false});
                    }
                }.bind(this)
            });
        }
    },
    render: function() {
        var {posts, current_user } = this.state;
        return (
            <div>
                {current_user == null ? <div id="login-form-main"> <LoginRegBox setCurrentUser_lb = { this.setCurrentUser } /> </div> : ''}
                <div className="col-md-3" >
                    {current_user != null ? <div id="user-info"> <UserInfo setCurrentUser_ui = { this.setCurrentUser } /> </div> : ''}
                    {current_user != null ? <div id="post-form-main"> <PostForm /> </div> : ''}
                </div>
                {current_user != null ? <div onScroll={this.scrollPosts} ref="posts_box" id="posts" className="col-md-5">
                    <PostList posts={posts} setPosts_pl = {this.setPosts} current_user = {current_user} /> </div> : ''}
            </div>
        )
    }
});