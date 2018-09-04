class CreateDiaries < ActiveRecord::Migration[5.2]
  def change
    create_table :diaries do |t|
      t.string :name
      t.timestamp :disclose_date
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
