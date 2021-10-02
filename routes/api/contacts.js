const express = require('express')
const router = express.Router()
const contacts = require('../../controllers/contacts')

router.get('/', contacts.getAll)

router.get('/:contactId', contacts.getById)

router.post('/', contacts.add)

router.delete('/:contactId', contacts.remove)

router.put('/:contactId', contacts.update)

module.exports = router
