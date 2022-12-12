const { Transaction } = require("../../models/transaction")

const   getTransactionsYears = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Transaction.aggregate([
        {
            $match: {
                owner: owner,
            },
        },

        {
            $group: {
                _id: { $dateToString: { format: "%Y", date: "$date" } },
                count: { $sum: 1 }
            },
        },

        {
            $project: { _id: 0, year: "$_id", transactionsQuantity: "$count" },
        },
    ]).sort({year: 1});

    res.json(result);
}

module.exports = getTransactionsYears;
