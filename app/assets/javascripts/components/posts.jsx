var PostList = React.createClass({
    getInitialState: function() {
        this.webSocket();
        return {posts: this.props.posts};
    },
    webSocket: function() {
        _this_create = this;
        _this_destroy = this;
        var faye = new Faye.Client('http://' + window.location.hostname + ':9292/faye');
        faye.subscribe("/posts/create", function(data) {
            var posts = _this_create.state.posts;
            _this_create.setState({posts: [data].concat(posts)});
        });
        faye.subscribe("/posts/destroy", function(data) {
            var posts = _this_destroy.state.posts;
            posts.forEach(function(e, i) {
                if(posts[i].post.id == data.post.id) {
                    posts.splice(i, 1);
                }
            });
            _this_destroy.setState({posts: posts});
        });
    },
    render: function() {
        var postsNode = this.state.posts.map(function(post) {
            return (
                <div className="posts">
                    <Post post = { post.post } user = { post.user } > </Post>
                </div>
            );
        });
        return (
          <div>
              { postsNode }
          </div>
        );
    }
});

var Post = React.createClass({
    render: function() {
        return (
            <div className="post">
                <div className="author-post"> {this.props.user.email} </div>
                <div className="delete-post" onClick={this.handleDelete}>x</div>
                <br />
                {this.props.post.content}
            </div>
        );
    },
    handleDelete: function() {
        $.ajax({
            url: '/posts/' + this.props.post.id,
            dataType: 'json',
            type: 'DELETE',
            success: function(data) {
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
});

var PostForm = React.createClass({
    getInitialState: function() {
        return {content: ''}
    },
    handleContentChange: function(e) {
        this.setState({content: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = {content: this.state.content.trim()};
        if (!data.content) return;

        $.ajax({
            url: '/posts',
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data) {
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });

        this.setState({content: ''});
    },
    componentDidMount: function() {
        $('#textareaPost').keydown(function (e) {
            if (!e.shiftKey && e.keyCode == 13) {
                $('#submitPost').click();
                e.preventDefault();
            }
        });
    },
    render: function() {
       return (
           <div className="post-form-block">
               <form className="postForm" onSubmit={this.handleSubmit} >
                    <textarea
                        id="textareaPost"
                        placeholder="Content"
                        rows="6"
                        value={this.state.content}
                        onChange={this.handleContentChange}
                    />
                   <input id="submitPost" type="submit" value="Post" />
               </form>
           </div>
       );
    }
});