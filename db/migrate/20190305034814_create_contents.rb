class CreateContents < ActiveRecord::Migration[5.2]
  def change
    create_table :contents do |t|
      t.text :body
      t.text :subject
      t.text :receipient
      t.text :attachment

      t.timestamps
    end
  end
end
