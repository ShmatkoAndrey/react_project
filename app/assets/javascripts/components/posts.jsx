var postList;
var PostList = React.createClass({
    getInitialState: function() {
        this.webSocket();
        postList = this;
        return {posts: this.props.posts, current_user: this.props.current_user};
    },
    webSocket: function() {
        var faye = new Faye.Client('http://' + window.location.hostname + ':9292/faye');
        faye.subscribe("/posts/create", function(data) {
            var posts = this.state.posts;
            this.setState({posts: [data].concat(posts)});
        }.bind(this));
        faye.subscribe("/posts/destroy", function(data) {
            var posts = this.state.posts;
            posts.forEach(function(e, i) {
                if(posts[i].post.id == data.post.id) {
                    posts.splice(i, 1);
                }
            });
            this.setState({posts: posts});
        }.bind(this));
    },
    render: function() {
        var postsNode = this.state.posts.map(function(post) {
            return (
                <div className="posts">
                    <Post post = { post.post } user = { post.user } current_user = {this.props.current_user}> </Post>
                </div>
            );
        }.bind(this));
        return (
          <div>
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
                <div className="author-post"> {this.props.user.email} </div>
                {delete_button}
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
        return {content: '', anonim: false}
    },
    handleContentChange: function(e) {
        this.setState({content: e.target.value});
    },
    handleAnonimChange: function() {
        this.setState({anonim: !this.state.anonim});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = {content: this.state.content.trim(), anonim: this.state.anonim};
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
                   <input type="checkbox" onChange={this.handleAnonimChange} /> Anonim (Не сохраняет в БД)
                   <textarea
                        id="textareaPost"
                        placeholder="Content"
                        rows="6"
                        value={this.state.content}
                        onChange={this.handleContentChange}
                    />
                   <input id="submitPost" type="submit" value="Post"/>
               </form>
           </div>
       );
    }
});