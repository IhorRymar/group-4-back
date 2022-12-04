const { Transaction } = require("../../models/transaction")
const RequestError = require("../../helpers/RequestError")
const { isValidCategory } = require("../transactions/listCategories")

const updateTransaction = async(req, res)=> {
    const { transactionId } = req.params;
    const { transactionType, category } = req.body;
    const { _id: owner } = req.user;
    const currentTransaction = await Transaction.findById(transactionId);

    
    if (!currentTransaction.owner.equals(owner)) {
        throw RequestError(403, "Access denied")
    }

    // if (!(await isValidCategory(transactionType, category))) {
    //         throw RequestError(400, "Category not found")
    //     }
       
    //  if (transactionType && (currentTransaction.transactionType !== transactionType)) {
    //     throw RequestError(400, "You can't change transaction type")
    // }
  
    const result = await Transaction.findByIdAndUpdate(transactionId, req.body, { new: true });
    
    if(!result){
        throw RequestError(404, "Not found")
    }
    
    res.json(result)
}

module.exports = updateTransaction;