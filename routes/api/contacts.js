const express = require('express')
const router = express.Router()
const ctrlContact = require('../../controllers/contacts')

router.get('/', ctrlContact.getAll)

router.get('/:contactId', ctrlContact.getById)

router.post('/', ctrlContact.add)

router.delete('/:contactId', ctrlContact.remove)

router.put('/:contactId', ctrlContact.update)

router.patch('/:contactId/favorite', ctrlContact.updateStatus)

module.exports = router
