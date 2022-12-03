const { Transaction } = require("../../models/transaction")
const RequestError = require("../../helpers/RequestError")

const updateTransaction = async(req, res)=> {
    const { transactionId } = req.params;
    const { _id: owner } = req.user;
    const result = await Transaction.findByIdAndUpdate(transactionId, req.body, { new: true });
    
    if (!result.owner.equals(owner)) {
        throw RequestError(403, "Access denied")
    }
    if(!result){
        throw RequestError(404, "Not found")
    }
    res.json(result)
}

module.exports = updateTransaction;