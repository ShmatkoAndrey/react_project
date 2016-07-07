var PostList = React.createClass({
    getInitialState: function() { return {posts: this.props.posts, current_user: this.props.current_user}; },
    render: function() {
        var postsNode = this.props.posts.map(function(post) {
            return <Post post = { post.post } user = { post.user } current_user = {this.props.current_user}> </Post>
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