var RoomBox = React.createClass({
    getInitialState: function() { return {rooms: this.loadRooms(), active_room: 1}; },
    loadRooms: function() {
        var rooms_load = [];
        $.ajax({
            url: '/rooms', dataType: 'json', type: 'GET', async: false,
            success: function(data) { rooms_load = data.rooms; }
        });
        return rooms_load;
    },
    changeActiveRoom: function(active_room) { this.setState({ active_room: active_room }); },
    render: function() {
        return (
            <div className="room-box">
                { this.props.current_user != null ? <div id="post-form-main"> <PostForm room = { this.state.active_room } /> </div> : '' }
                <div className="room-posts">
                    <div className="col-md-4">
                        <RoomList rooms = { this.state.rooms } changeRoom = {this.changeActiveRoom} room = { this.state.active_room } active_room = { this.state.active_room } />
                    </div>
                    <div className="col-md-6">
                        <PostList current_user = { this.props.current_user } room = { this.state.active_room } />
                    </div>
                </div>
            </div>
        );
    }
});

var RoomList = React.createClass({
    handleChangeRoom: function(room_id) { this.props.changeRoom(room_id) },
    render: function() {
        var roomsNode = this.props.rooms.map(function(room) {
            return <li className= {room.id == this.props.active_room ? "active-room room-name" :  "room-name"}
                       onClick={() => this.handleChangeRoom(room.id) }> { room.name } </li>
        }.bind(this));
        return <ul className="room-list"> { roomsNode } </ul> ;
    }
});