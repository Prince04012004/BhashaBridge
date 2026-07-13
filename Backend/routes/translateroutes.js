import express from 'express';

import {translatetext,gethistory} from '../Controller/translate.js';

const router=express.Router();

router.post('/',translatetext);
router.get('/history',gethistory);

export default router;