class PostsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @posts = Post.preload(:user).reverse.map {|p| {post: p, user: get_user(p)}}
    respond_to do |format|
      format.html { }
      format.json {render json: {posts: @posts}}
    end
  end

  def create
    @post = current_user.posts.build(post_params)
    @post.save! unless params[:anonim] == 'true'
    broadcast '/posts/create', { post: @post, user: get_user(@post)}
    render json: { post: @post, user: get_user(@post)}
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
    {email: u.email, id: u.id}
  end

end