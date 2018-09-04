class CreateDailyContents < ActiveRecord::Migration[5.2]
  def change
    create_table :daily_contents do |t|
      t.string :title
      t.string :content
      t.belongs_to :diary, foreign_key: true

      t.timestamps
    end
  end
end
