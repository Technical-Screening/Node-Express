/** upload files working as a middleware in express */
import multer from 'multer';

class MulterFileUpload {
  /** get uploaded file by using response. eg: res.file */
  async uploadedFile() {
    const storage = await multer.diskStorage({
      filename(req, file, cb) {
        if (file.originalname.length > 6) {
          cb(null, `${file.fieldname}-${Date.now()}${file.originalname.substr(file.originalname.length - 6, file.originalname.length)}`);
        } else {
          cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
        }
      },
      destination(req, file, cb) {
        cb(null, '../public/uploads');
      },
    });
    const upload = multer({ storage });
    return upload;
  }
}

export default new MulterFileUpload();
