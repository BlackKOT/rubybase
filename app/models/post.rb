require 'previewer'
require 'syntaxer'
require 'cleaner'

class Post < ActiveRecord::Base
  belongs_to :category
  has_many :taggables, as: :tagged, dependent: :destroy
  has_many :tags, through: :taggables

  validates :name, :body, :category_id, presence: true

  #TODO enable after changing code to pretty_preview integer
  after_validation :unescape_and_prepare

  def as_json(options = {})
    # this example ignores the user's options
    super(only: [:name, :body, :category_id], methods: [:path])
  end

  def path
    Rails.application.routes.url_helpers.post_path(self)
  end

  def pretty_preview_text
    pretty_body[0..pretty_preview]
  end

  private

  def unescape_and_prepare
    self.body = Cleaner.prepare_text(CGI.unescape(self.body))

    if errors.empty?
      self.pretty_preview = Syntaxer.prepare_html(Previewer.prepare_preview(self.body), false).length  # .gsub(/<img[^>]*>/, '')
      self.pretty_body = Syntaxer.prepare_html(self.body)  # .gsub(/<img[^>]*>/, '')
      i=0
    end
  end
end