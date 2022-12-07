const { Transaction } = require("../../models/transaction")
const RequestError = require("../../helpers/RequestError")

const getBalance = async (req, res) => {
    const { _id: owner, createdAt: registrationDate } = req.user;
    const { balanceDate } = req.query;
    console.log(balanceDate);

    const resultfirstTransaction = await Transaction.find({ owner }).sort({ date: 1 }).limit(1);

    let endPoint = new Date();

    const startPoint = new Date(resultfirstTransaction[0].date);
    if (balanceDate) {
        const tempDate = Date.parse(balanceDate);
        if (tempDate === "NaN") {
            throw RequestError(400, "Balance date should to be a type of 'date'")
        }
        endPoint = new Date(balanceDate);
    } 
   
    console.log(startPoint, endPoint);


    const resultTemp = await Transaction.aggregate([
        {
            $match: {
                owner: owner,
                date:
                {
                    $gte: startPoint,
                    $lt: endPoint,
                },
            },
        },

        {
            $group: {
                _id: "$transactionType",
                totalSum: { $sum: "$amount" },
            },
        },

        {
            $project: { _id: 0, transactionType: "$_id", totalSum: "$totalSum" },
        },
    ]);

    let balance = 0;

    for (item of resultTemp) {
        if (item.transactionType === "income") {
            balance = balance + item.totalSum;
        } else {
            balance = balance - item.totalSum;
        }
    }
   
    res.json({ balance });
}

module.exports = getBalance;