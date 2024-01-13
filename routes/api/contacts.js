import express from 'express'
import controllersContacts from '../../controllers/contact-controllers.js'
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../schemas/contact-schemas.js'
const router = express.Router()

router.get("/", controllersContacts.getContactsAll)

router.get("/:contactId", controllersContacts.getById)

router.post("/", controllersContacts.add)

router.delete("/:contactId", controllersContacts.deleteById)

router.put("/:contactId", controllersContacts.updateContactById)

export default router
