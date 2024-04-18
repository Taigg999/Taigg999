import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';
export const categoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: false,
                message: 'Danh mục này đã tồn tại',
            });
        }
        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: 'Đã thêm danh mục mới thành công',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Lỗi tại danh mục',
        });
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            messsage: 'Đã cập nhật danh mục thành công!',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Lỗi khi cập nhật danh mục',
        });
    }
};

export const categoryGetAllController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: 'Tất cả danh mục',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Lỗi khi tải tất cả các danh mục',
        });
    }
};

// single category
export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'Nhận danh mục đơn thành công!',
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Lỗi khi nhận được một danh mục',
        });
    }
};

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Đã xóa danh mục thành công',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Lỗi khi xóa danh mục',
            error,
        });
    }
};
