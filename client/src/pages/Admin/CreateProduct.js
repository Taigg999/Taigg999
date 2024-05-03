import FooterOnly from '../../components/Layout/FooterOnly/FooterOnly';
import AdminMenu from '../../components/Layout/AdminMenu';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

function CreateProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [shipping, setShipping] = useState('');

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Loi category');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            productData.append('photo', photo);
            productData.append('category', category);
            const { data } = axios.post('/api/v1/product/create-product', productData);
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success('Đã thêm sản phẩm thành công');
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error('Lỗi sản phẩm');
        }
    };

    return (
        <FooterOnly title={'Thêm sản phẩm | Sopi VN'}>
            <div className="container-fluid m-5 p-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3 h-100">
                            <h1 className="d-flex justify-content-center text-uppercase text-success">Thêm sản phẩm</h1>
                            <div className="m-1 w-75">
                                <Select
                                    bordered={false}
                                    placeholder="Chọn danh mục"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setCategory(value);
                                    }}
                                >
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                                <div className="mb-3">
                                    <label className="btn btn-outline-secondary col-md-12">
                                        {photo ? photo.name : 'Tải hình ảnh'}
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            onChange={(e) => setPhoto(e.target.files[0])}
                                            hidden
                                        />
                                    </label>
                                </div>
                                <div className="mb-3">
                                    {photo && (
                                        <div className="text-center">
                                            <img
                                                src={URL.createObjectURL(photo)}
                                                alt="product_photo"
                                                height={'200px'}
                                                className="img img-responsive"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Nhập tên sản phẩm"
                                        className="form-control"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        type="text"
                                        value={description}
                                        placeholder="Mô tả"
                                        className="form-control"
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="number"
                                        value={price}
                                        placeholder="Giá"
                                        className="form-control"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="number"
                                        value={quantity}
                                        placeholder="Số lượng"
                                        className="form-control"
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <Select
                                        bordered={false}
                                        placeholder="Chọn vận chuyển"
                                        size="large"
                                        showSearch
                                        className="form-select mb-3"
                                        onChange={(value) => {
                                            setShipping(value);
                                        }}
                                    >
                                        <Option value="0">Không</Option>
                                        <Option value="1">Có</Option>
                                    </Select>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" onClick={handleCreate}>
                                        Thêm sản phẩm mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FooterOnly>
    );
}

export default CreateProduct;
