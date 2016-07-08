var PostList = React.createClass({
    getInitialState: function() {
        this.webSocket();
        return {posts: [], inProgressLoad: false};
    },
    componentDidMount: function() { this.loadPost(); },
    componentDidUpdate: function() {
        if(this.state.posts[0] && this.state.posts[0].post.room_id != this.props.room) {
            this.loadPost();
        }
    },
    webSocket: function() {
        var faye = new Faye.Client('http://socketmiamitalks.herokuapp.com/faye');
        faye.subscribe("/posts/create", function(data) {
            var posts = this.state.posts;
            if (this.props.room == data.post.room_id) this.setState({posts: [data].concat(posts)});
        }.bind(this));
        faye.subscribe("/posts/destroy", function(data) {
            if (this.props.room == data.post.room_id) {
                var posts = this.state.posts;
                posts.forEach(function (e, i) {
                    if (posts[i].post.id == data.post.id) {
                        posts.splice(i, 1);
                    }
                });
                this.setState({posts: posts})
            }
        }.bind(this));
    },
    loadPost: function() {
        $.ajax({
            url: '/posts', dataType: 'json', type: 'GET', async: false,
            data: {room: this.props.room},
            success: function(data) {
                this.setState({posts: data.posts});
            }.bind(this)
        });
    },
    scrollPosts: function() {
        if(($(this.refs.posts_box).scrollTop() >= $(this.refs.posts_box)[0].scrollHeight - $(this.refs.posts_box)[0].clientHeight - 200) && !this.state.inProgressLoad) {
            $.ajax({
                url: '/posts', dataType: 'json', type: 'GET',
                data: {start: this.state.posts[this.state.posts.length - 1].post.id, room: this.props.room},
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
        var postsNode = this.state.posts.map(function(post) {
            return <Post post = { post.post } user = { post.user } current_user = {this.props.current_user}> </Post>
        }.bind(this));
        return (

            <div onScroll={this.scrollPosts} ref="posts_box" id="posts" className="posts">
                { postsNode }
            </div>
        );
    }
});

var Post = React.createClass({
    render: function() {
        var delete_button;
        if(this.props.current_user != null && this.props.current_user.id == this.props.user.id)
            delete_button = <div className="delete-post" onClick={this.handleDelete}>x</div>;
        return (
            <div className="post">
                <div className="author-post"> {this.props.user.username} </div>
                {delete_button}
                <br />
                {this.props.post.content}
            </div>
        );
    },
    handleDelete: function() {
        $.ajax({
            url: '/posts/' + this.props.post.id, dataType: 'json', type: 'DELETE',
            success: function(data) {
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
});