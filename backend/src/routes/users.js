import express from 'express';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.js';


const router = express.Router();

//Update
router.put("/:id", updateUser);

//Delete
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getAllUser);

export default  router;