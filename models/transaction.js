const { Schema, model } = require("mongoose")
const Joi = require("joi")

const {handleSaveErr} = require("../helpers")

const transactionSchema = new Schema({
    transactionType: {
        required: [true, 'Set transaction type'],
        type: String,
		enum: ['income', 'expense']
    },
    amount: {
        type: Number,
        required: [true, 'Set transaction amount'],
    },
    date: {
        required: true,
        type: Date,
        default: Date.now,
    },
    category: {
        type: Number,
    },
    comment: {
        type: String,
        maxlenght: 50,
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
    amount: Joi.number().required().messages({
        'number.base': `"amount" should be a type of 'number'`,
        'any.required': `"amount" is a required field`
    }),
    date: Joi.string().required().messages({
        'any.required': `"date" is a required field`
      }),
    category: Joi.number().messages({
        'number.base': `"category" should be a type of 'number'`
    }),
    comment: Joi.string().max(50).messages({
        'string.base': `"comment" should be a type of 'string'`
    }),
    
});

const updateTransactionSchema = Joi.object({
    transactionType: Joi.string().optional(),
    amount: Joi.number().optional(),
    date: Joi.string().optional(),
    category: Joi.number().optional(),
    comment: Joi.string().max(50).optional(),
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