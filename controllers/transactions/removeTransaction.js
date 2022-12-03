const { Transaction } = require("../../models/transaction")
const RequestError = require("../../helpers/RequestError")

const removeTransaction = async(req, res)=> {
    const { transactionId } = req.params;
    const { _id: owner } = req.user;
    const result = await Transaction.findByIdAndRemove(transactionId);
    
    if (!result.owner.equals(owner)) {
        throw RequestError(403, "Access denied")
    }
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = removeTransaction