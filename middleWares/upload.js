import multer from "multer"
import path from "path"

const pathImg = path.join('../', 'temp')

const storage = multer.diskStorage({
    destination: pathImg,
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({
    storage,
})

export default upload



