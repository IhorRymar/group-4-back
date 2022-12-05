const { Transaction } = require("../../models/transaction")
const { Category } = require("../../models/category")
const RequestError = require("../../helpers/RequestError")
const { isValidCategory } = require("../transactions/listCategories")

const addTransaction = async (req, res) => {
    const { _id: owner } = req.user;

    const { transactionType, category } = req.body;
   
    console.log(transactionType, category);

    if (transactionType === "expense") {
        if (!category) {
            throw RequestError(400, "Category have to be added for Expense")
        }

        if (!(await isValidCategory(transactionType, category))) {
            throw RequestError(430, "Category not found")
        }
       
    } else if (category && (!(await isValidCategory(transactionType, category)))) {
            throw RequestError(430, "Category not found")
        }
    const result = await Transaction.create({...req.body, owner});
    res.status(201).json(result)

   
}

module.exports = addTransaction;