const { Transaction } = require("../../models/transaction")
const RequestError = require("../../helpers/RequestError")

const transactionStatistics = async (req, res) => {
    const { _id: owner } = req.user;
    const { startDate, endDate } = req.body;

    console.log(Date.parse(startDate));

    if ((Date.parse(startDate) === "NaN") || (Date.parse(endDate) === "NaN")) {
        throw RequestError(400, "startDate and endDate should be a type of 'date'")
    }

    let tempDate = new Date(startDate);
    const startPoint = new Date(tempDate.getFullYear(), tempDate.getMonth(), 1);
    let tempDateEnd = new Date(endDate);
    const endPoint = new Date(tempDateEnd.getFullYear(), tempDateEnd.getMonth() + 1, 1);

    console.log(startPoint.toString());
    console.log(endPoint.toString());
}


module.exports = transactionStatistics;