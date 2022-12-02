import express, { Router } from 'express';
import { checkUserToken, getAllUsers, getUser, loginUser, createUser, updateUser, deleteUser } from '../controllers/userController';
import { isAdmin } from '../middlewares/isAdminMiddleware';
import verifyToken from '../middlewares/verifyToken';
import { userValidation } from '../middlewares/validateMiddleware';
const route = express.Router()


//===> Get All Users

route.get('/', verifyToken, isAdmin, getAllUsers)

// ===> Login
route.post('/', loginUser)
//===> verifyToken get
 route.get('/checkusertoken', checkUserToken)

 //===> Get user 
 route.get('/:id', verifyToken, isAdmin, getUser)

 //===> create user
 route.post('/', userValidation, createUser)

 //===> update user

 route.patch('/:id', verifyToken, isAdmin, updateUser)

 //===> Delete user

route.delete('/:id', verifyToken, isAdmin, deleteUser)

export default route;

