const { Transaction } = require("../../models/transaction")
const RequestError = require("../../helpers/RequestError")
const isValidCategory = require("../transactions/listCategories")

const addTransaction = async (req, res) => {
    const { _id: owner } = req.user;

    const { transactionType, category } = req.body;
   
    console.log(transactionType, category);

    if (transactionType === "expense") {
        if (!category) {
            throw RequestError(400, "Category have to be added for Expense")
        }

        isValidCategory(category, transactionType);
        
    }
    const result = await Transaction.create({...req.body, owner});
    res.status(201).json(result)

   
}

module.exports = addTransaction;