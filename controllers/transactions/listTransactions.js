const { Transaction } = require("../../models/transaction")

const listTransactions = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
  
    const skip = ((page < 1 ? 1 : page) - 1) * limit;
    let result = await Transaction.find({ owner }, "-createdAt -updatedAt").sort({ date: -1, createdAt: -1 }).populate("owner", "name email");

    const transactionsTotalQuantity = result.length;

     if (result.length > skip) {
        result.splice(0, skip);
    }

    let balance = 0;

    for (i = (result.length - 1); i >= 0; i = i - 1) {
        if (result[i].transactionType === "income") {
            balance = balance + result[i].amount;
        } else {
            balance = balance - result[i].amount;
        }

        result[i] = { ...result[i]._doc, balance};
    }

    if (result.length > limit) {
        result.splice(limit, (result.length - limit));
    }

    res.json({ transactionsTotalQuantity, result} )
}



module.exports = listTransactions;