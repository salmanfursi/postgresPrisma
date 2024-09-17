import { createUser, updateUser, fetchUser, showUser, deleteUser } from '../Controller/UserController.js';

import express from 'express';
const router = express.Router();

router.get('/', fetchUser);
router.get('/:id', showUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;