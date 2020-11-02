'use strict';

const {Router} = require(`express`);
const offersRouter = new Router();
const {getEditOffer, getAddOffer, getPostAddOffer} = require(`../controllers/offers`);

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {UPLOAD_DIR} = require(`../../constants`);
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, getAddOffer);
offersRouter.post(`/add`, upload.single(`avatar`), getPostAddOffer);
offersRouter.get(`/edit/:id`, getEditOffer);
offersRouter.get(`/:id`, (req, res) => res.render(`ticket`));

module.exports = offersRouter;
