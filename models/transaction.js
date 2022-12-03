const { Schema, model } = require("mongoose")
const Joi = require("joi")

const {handleSaveErr} = require("../helpers")

const transactionSchema = new Schema({
    transactionType: {
        required: [true, 'Set transaction type'],
        type: String,
        default: 'income',
		enum: ['income', 'expense']
    },

    amount: {
        type: String,
        required: [true, 'Set transaction amount'],
    },

    date: {
        required: true,
        type: Date,
        default: Date.now,
    },

    category: {
        type: String,
        required: true,
        enum: ['salary', 'bonus', 'presents', 'interest'],
        enum: ['house', 'food', 'auto', 'children', 'education', 'selfcare', 'leisure', 'other'],
    },

    comment: {
        type: String,
        required: true,
    },

   owner: {
       type: Schema.Types.ObjectId,
       ref: "user",
       required: true,
    },



}, {versionKey: false, timestamps: true})

transactionSchema.post("save", handleSaveErr);

const addSchema = Joi.object({
    transactionType: Joi.string().required(),
    amount: Joi.string().required().messages({
        'string.base': `"amount" should be a type of 'string'`,
        'any.required': `"amount" is a required field`
    }),
    date: Joi.string().required().messages({
        'any.required': `"date" is a required field`
      }),
    category: Joi.string().required().messages({
        'string.base': `"category" should be a type of 'string'`,
        'any.required': `"category" is a required field`
    }),
    comment: Joi.string().required().messages({
        'string.base': `"comment" should be a type of 'string'`,
        'any.required': `"comment" is a required field`
    }),
    
});

const updateTransactionSchema = Joi.object({
    transactionType: Joi.string().optional(),
    amount: Joi.string().optional(),
    date: Joi.string().optional(),
    category: Joi.string().optional(),
    comment: Joi.string().optional(),
});


const schemas = {
    addSchema,
    updateTransactionSchema,
}

const Transaction = model("transaction", transactionSchema)

module.exports = {
    Transaction,
    schemas,
}