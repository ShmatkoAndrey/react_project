var PostForm = React.createClass({
    getInitialState: function() { return {content: '', anonim: false} },
    handleContentChange: function(e) { this.setState({content: e.target.value}); },
    handleAnonimChange: function() { this.setState({anonim: !this.state.anonim}); },
    handleSubmit: function(e) {
        e.preventDefault();
        var data = { content: this.state.content.trim(), anonim: this.state.anonim , room: this.props.room};
        if (data.content) {
            $.ajax({
                url: '/posts', dataType: 'json', type: 'POST', data: data,
                success: function (data) {
                    if (data.errors) { console.log(data.errors); }
                    this.setState({content: ''});
                }.bind(this)
            });
        }
    },
    handleKeyDown: function(e) {
        if (!e.shiftKey && e.keyCode == 13) {
            $(this.refs.submit_login).click();
            e.preventDefault();
        }
    },
    render: function() {
        return (
            <div className="post-form-block">
                <form className="postForm" onSubmit={this.handleSubmit} >
                    <input type="checkbox" onChange={this.handleAnonimChange} /> Anonim (Не сохраняет в БД)
                   <textarea id="textareaPost" placeholder="Content" rows="6"
                       value={this.state.content} onChange={this.handleContentChange} onKeyDown = {this.handleKeyDown} />
                    <input ref = "submit_login" id="submitPost" type="submit" value="Post"/>
                </form>
            </div>
        );
    }
});