import { Router } from 'express';
import { registerUser , loginUser , getUserProfile, getUserById, getAllUsers, updateUser , deleteUser  } from '../controllers/UserController'; 

const router = Router();

router.post('/register', registerUser );
router.post('/login', loginUser );
router.get('/profile', getUserProfile);
router.get('/getUserById/:id', getUserById);
router.get('/getAllUsers', getAllUsers); 
router.put('/updateUser/:id', updateUser ); 
router.delete('/deleteUser/:id', deleteUser ); 

export default router;