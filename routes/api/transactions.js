const express = require('express')

const ctrl = require("../../controllers/transactions/index")

const { ctrlWrapp } = require("../../helpers")

const {schemas} = require("../../models/transaction")

const {validBody, isValidId, authenticate} = require("../../middlewares")

const router = express.Router()


router.post('/', authenticate, validBody(schemas.addSchema), ctrlWrapp(ctrl.addTransaction))

router.get('/', authenticate, ctrlWrapp(ctrl.listTransactions))  

router.delete('/:transactionId', authenticate, isValidId, ctrlWrapp(ctrl.removeTransaction))

router.put('/:transactionId', authenticate, isValidId, validBody(schemas.updateTransactionSchema), ctrlWrapp(ctrl.updateTransaction))  

router.get('/categories', ctrlWrapp(ctrl.listCategories)) 

// router.get('/:contactId', authenticate, isValidId, ctrlWrapp(ctrl.getContactById))



module.exports = router;