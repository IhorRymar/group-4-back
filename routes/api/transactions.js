const express = require('express')

const ctrl = require("../../controllers/transactions/index")

const { ctrlWrapp } = require("../../helpers")

const {schemas} = require("../../models/transaction")

const {validBody, isValidId, authenticate} = require("../../middlewares")

const router = express.Router()

router.get('/categories', ctrlWrapp(ctrl.listCategories)) 

router.get('/balance', authenticate, ctrlWrapp(ctrl.getBalance))  

router.post('/', authenticate, validBody(schemas.addSchema), ctrlWrapp(ctrl.addTransaction))

router.get('/', authenticate, ctrlWrapp(ctrl.listTransactions))  

router.get('/:transactionId', authenticate, isValidId, ctrlWrapp(ctrl.getTransactionById))

router.delete('/:transactionId', authenticate, isValidId, ctrlWrapp(ctrl.removeTransaction))

router.put('/:transactionId', authenticate, isValidId, validBody(schemas.updateTransactionSchema), ctrlWrapp(ctrl.updateTransaction))  

router.post('/statistics', authenticate, ctrlWrapp(ctrl.transactionStatistics))  



module.exports = router;