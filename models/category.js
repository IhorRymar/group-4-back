const { Schema, model } = require('mongoose');

const { handleSaveErr } = require('../helpers');

const categorySchema = new Schema({
      category_id: {
        type: Number,
        required: true,
        },
      category_type: {
      type: String,
        required: true,
        enum: ['income', 'expense'],
        },
      category_name: {
        type: String,
        required: true,
        },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post('save', handleSaveErr);

const Category = model('category', categorySchema);

module.exports = {
    Category,
};
