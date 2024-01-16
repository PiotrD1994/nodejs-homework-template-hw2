import Contact from '../models/contacts.js'
import httpError from '../error/httpError.js'

const optionsUpdate = {
    new: true,
    runValidators: true
}

const getContactsAll = async (req, res, next) => {
    const result = await Contact.find()
    res.json(result)
}

const getById = async(req, res, next) => {
  const {contactId} = req.params
  const result = await Contact.findById(contactId)
  if(!result) {
    return next(httpError(404, 'Not found'))
  }
  res.json(result)
}

const add = async(req, res) => {
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

const deleteById = async(req, res, next) => {
  const {contactId} = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if(!result) {
    return next(httpError(404, 'Not found'))
  }
  res.json({messsage: 'contact deleted'})
}

const updateContactById = async(req, res, next) => {
  const {contactId} = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if(!result) {
    return next(httpError(404, 'Not found'))
  }
  res.json(result)
}

const updateStatusContact = async(req, res, next) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body)
    if(!result) {
        return next(httpError(404, `${contactId} not found`))
    }
    res.json(result)
}

export default {
    getContactsAll,
    getById,
    add,
    deleteById,
    updateContactById,
    updateStatusContact,
}