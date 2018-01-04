class CategoriesController < ApplicationController
  def index
    @categories = Category.select("id, name as text").order(id: :desc)
    respond_to do |format|
      # format.html
      format.json { render :json => @categories }
    end
  end
end