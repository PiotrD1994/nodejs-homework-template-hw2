import express from 'express'
import controllersContacts from '../../controllers/contact-controllers.js'
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from '../../schemas/contact-schemas.js'
import { isValidId } from '../../middleWares/validId.js'
import {isEmptyBody}  from '../../middleWares/emptyBody.js'
import { isEmptyFavorite } from '../../middleWares/emptyFavorite.js'
import validateBody from '../../decorations/validBody.js'

const router = express.Router()

router.get("/", controllersContacts.getContactsAll)

router.get("/:contactId", isValidId,  controllersContacts.getById)

router.post("/", validateBody(contactAddSchema), controllersContacts.add)

router.delete("/:contactId", isValidId, controllersContacts.deleteById)

router.put("/:contactId", isValidId, isEmptyBody, validateBody(contactUpdateSchema), controllersContacts.updateContactById)

router.patch("/:contactId/favorite", isValidId, isEmptyFavorite, validateBody(contactFavoriteSchema), controllersContacts.updateStatusContact)

export default router
