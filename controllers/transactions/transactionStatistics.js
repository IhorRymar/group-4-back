const { Transaction } = require("../../models/transaction")
// const RequestError = require("../../helpers/RequestError")
const moment = require('moment')
// const { getCategoryName } = require("../transactions/listCategories")

const transactionStatistics = async (req, res) => {
    const { _id: owner } = req.user;
    const { startMonth = 1, endMonth, startYear, endYear } = req.body;

    // console.log(startMonth, startYear);
    // console.log(endMonth, endYear);

    if ((!endYear) || (!endMonth)) {
        endYearChanged = startYear;
        endMonthChanged = startMonth;
    } else {
        endYearChanged = endYear;
        endMonthChanged = endMonth;
    }

    let tempDate = new Date(startYear, (startMonth - 1), 1);
    const startPoint = new Date(moment(tempDate).startOf('month'));
    let tempDateEnd = new Date(endYearChanged, (endMonthChanged - 1), 1);
    const endPoint = new Date(moment(tempDateEnd).endOf('month'));

    // console.log(startPoint.toString());
    // console.log(endPoint.toString());
    // console.log(await getCategoryName("expense", 3));
   

    const result =  await Transaction.aggregate([
        {
        $match: {
            owner: owner,
            transactionType: 'expense',
            date : 
                { $gte: startPoint,
                $lt: endPoint, 
                },
        },
        },

        {
        $group: {
            _id: "$category",
            totalSum: { $sum: "$amount" },
        },
        },

        {
        $project: { _id: 0, category: "$_id", totalSum: "$totalSum" },
        },
    ]);
    
    
    res.json(result);
}

module.exports = transactionStatistics;