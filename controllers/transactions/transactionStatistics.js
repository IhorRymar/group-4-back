const { Transaction } = require("../../models/transaction")
// const RequestError = require("../../helpers/RequestError")
const moment = require('moment')
const { getCategoryName } = require("../transactions/listCategories")

const transactionStatistics = async (req, res) => {
    const { _id: owner } = req.user;
    const { startMonth = 1, endMonth, startYear, endYear } = req.body;

    let endYearChanged;
    let endMonthChanged;

    if ((!endYear) || (!endMonth)) {
        endYearChanged = startYear;
        endMonthChanged = startMonth;
    } else {
        endYearChanged = endYear;
        endMonthChanged = endMonth;
    }

    const tempDate = new Date(startYear, (startMonth - 1), 1);
    const startPoint = new Date(moment(tempDate).startOf('month'));
    const tempDateEnd = new Date(endYearChanged, (endMonthChanged - 1), 1);
    const endPoint = new Date(moment(tempDateEnd).endOf('month'));

    const resultTemp = await Transaction.aggregate([
        {
            $match: {
                owner: owner,
                transactionType: 'expense',
                date:
                {
                    $gte: startPoint,
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
    
    const incomeStatistics = await Transaction.aggregate([
        {
            $match: {
                owner: owner,
                transactionType: 'income',
                date:
                {
                    $gte: startPoint,
                    $lt: endPoint,
                },
            },
        },

        {
            $group: {
                _id: null,
                totalSum: { $sum: "$amount" },
            },
        },

        {
            $project: { _id: 0, totalSum: "$totalSum" },
        },
    ]);

    const expenseStatistics = await Promise.all(resultTemp.map(async (item) => {
        const categoryName = await getCategoryName("expense", item.category);
        return ({...item, categoryName });
            
    }));
     
    res.json({expenseStatistics, incomeStatistics});
}

module.exports = transactionStatistics;