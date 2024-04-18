import {
    categoryController,
    categoryGetAllController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController,
} from '../controllers/categoryController.js';
import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-category', requireSignIn, isAdmin, categoryController);

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

router.get('/get-category', categoryGetAllController);

//single category
router.get('/single-category/:slug', singleCategoryController);

//delete category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController);

export default router;
