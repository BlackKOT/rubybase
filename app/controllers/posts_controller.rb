class PostsController < ApplicationController
  before_action :find_post, only: [:show, :edit, :delete]
  def index
    @posts = Post.order(id: :desc)
    respond_to do |format|
      format.html
      format.json { render :json => @posts }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json {render json: {:data => render_to_string('posts/show', locals: {:@post => @post}, :formats => [:html], :layout => false)}}
    end
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create(post_params)
    unless @post.persisted?
      render :new
    else
      redirect_to posts_path
    end
  end

  private

  def find_post
    @post = Post.find_by_id(params[:id])
  end

  def post_params
    params.require(:post).permit(:name, :category_id, :body)
  end
end