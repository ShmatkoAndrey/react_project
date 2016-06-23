var PostBox = React.createClass({
    getInitialState: function() {
        return {posts: this.props.posts}
    },
    render: function() {
        return (
            <div className="post-box">
                <div className="col-md-3">
                    <PostForm  onPostSubmit = {this.handlePostSubmit}/>
                </div>
                <div className="col-md-4">
                    <PostList posts = {this.state.posts} />
                </div>
            </div>
        )
    },
    handlePostSubmit: function(post) {
        $.ajax({
            url: '/posts',
            dataType: 'json',
            type: 'POST',
            data: post,
            success: function(data) {
                var posts = this.state.posts;
                this.setState({posts: [data].concat(posts)});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }.bind(this)
        });
    }
    //loadCommentsFromServer: function() {
    //    $.ajax({
    //        url: 'posts',
    //        type: 'GET',
    //        dataType: 'json',
    //        cache: false,
    //        success: function(data) {
    //            this.setState({posts: data});
    //        }.bind(this),
    //        error: function(xhr, status, err) {
    //            console.error(status, err.toString());
    //        }.bind(this)
    //    });
    //},
    //componentDidMount: function() {
    //    this.loadCommentsFromServer();
    //    setInterval(this.loadCommentsFromServer, 500);
    //}
});

var PostList = React.createClass({
    getInitialState: function() {
        return {posts: this.props.posts};
    },
    render: function() {
        var postsNode = this.props.posts.map(function(post) {
            return (
                <div className="posts">
                    <Post post = { post.post } user = { post.user }> </Post>
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
                <div className="author"> {this.props.user.email} </div>
                <br />
                {this.props.post.content}
            </div>
        );
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
        var content = this.state.content.trim();
        if (!content) return;
        this.props.onPostSubmit({content: content});

        this.setState({content: ''});
    },
    render: function() {
       return (
           <div className="post-form-block">
               <form className="postForm" onSubmit={this.handleSubmit}>
                    <textarea
                        placeholder="Content"
                        rows="6"
                        value={this.state.content}
                        onChange={this.handleContentChange}
                    />
                   <input type="submit" value="Post" />
               </form>
           </div>
       );
    }
});