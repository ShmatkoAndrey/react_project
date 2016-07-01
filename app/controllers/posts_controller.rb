class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    cnt_load = 10
    if params[:start]
      @posts = Post.preload(:user).order(created_at: :desc).where('id < ?', params[:start]).limit(cnt_load).map {|post| {post: post, user: get_user(post)}}
    else
      @posts = Post.preload(:user).order(created_at: :desc).limit(cnt_load).map {|p| {post: p, user: get_user(p)}}
    end

    respond_to do |format|
      format.html { }
      format.json {render json: {posts: @posts}}
    end
  end

  def create
    @post = current_user.posts.build(post_params)
    if params[:anonim] == 'true' || @post.save
      broadcast '/posts/create', { post: @post, user: get_user(@post)}
      render json: { post: @post, user: get_user(@post)}
    else
      render json: { errors: @post.errors.full_messages}
    end
  end

  def destroy
    @post = Post.find(params[:id]).destroy
    broadcast '/posts/destroy', { post: @post }
    render json: { post: @post}
  end

  private

  def post_params
    {content: params[:content]}
  end

  def get_user(post)
    u = post.user
    {username: u.username, id: u.id}
  end

end