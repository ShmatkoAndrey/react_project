class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.boolean :public
      t.boolean :anonim

      t.timestamps
    end
  end
end
