var PostList = React.createClass({
    getInitialState: function() {
        this.webSocket();
        return {posts: this.props.posts, current_user: this.props.current_user};
    },
    webSocket: function() {
        var faye = new Faye.Client('http://' + window.location.hostname + ':9292/faye');
        faye.subscribe("/posts/create", function(data) {
            var posts = this.props.posts;
            this.props.setPosts_pl([data].concat(posts));
        }.bind(this));
        faye.subscribe("/posts/destroy", function(data) {
            var posts = this.props.posts;
            posts.forEach(function(e, i) {
                if(posts[i].post.id == data.post.id) {
                    posts.splice(i, 1);
                }
            });
            this.props.setPosts_pl(posts);
        }.bind(this));
    },
    render: function() {
        var postsNode = this.props.posts.map(function(post) {
            return <Post key = {post.post.id} post = { post.post } user = { post.user } current_user = {this.props.current_user}> </Post>
        }.bind(this));
        return (
          <div  className="posts">
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