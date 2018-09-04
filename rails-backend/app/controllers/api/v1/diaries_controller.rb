class Api::V1::DiariesController < Api::ApplicationController
  before_action :authenticate_user!
  def index
    diaries = Diary.where(:user => current_user).order(created_at: :desc)
    render json: diaries
  end

  def create
    @diary = Diary.new diary_params
    @diary.user = current_user

    if @diary.save
      render json: @diary
    else 
      render json: { error: @diary.errors }
    end

  end

  def destroy
    diary = Diary.find params[:id]
    diary.destroy
    render json: { message: "'#{diary.name}' has been removed" }
  end

  private

  
  def diary_params
    params.require(:diary).permit(:name, :disclose_date)
  end

end
