const { Transaction } = require("../../models/transaction")

const addTransaction = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Transaction.create({...req.body, owner});
    res.status(201).json(result)

   
}

module.exports = addTransaction;