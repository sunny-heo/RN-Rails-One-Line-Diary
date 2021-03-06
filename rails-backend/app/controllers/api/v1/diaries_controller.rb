class Api::V1::DiariesController < Api::ApplicationController
  before_action :find_diary, only: [:update, :destroy]

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

  def update
    if @diary.update diary_params
      render json: @diary
    else
      render json: { error: @diary.errors }
    end
  end

  def destroy
    if @diary.destroy
      render json: @diary
    else
      render json: {error: @diary.errros}
    end
  end


  private

  def find_diary
    @diary = Diary.find params[:id]
  end
  
  def diary_params
    params.require(:diary).permit(:name, :disclose_date)
  end

end
