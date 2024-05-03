import React, { useEffect, useState } from 'react';

import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Layout/Form/CategoryForm';
import { Modal } from 'antd';
import FooterOnly from '../../components/Layout/FooterOnly/FooterOnly';
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState('');
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    // handle Form
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {
                name: updatedName,
            });
            if (data?.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName('');
                setIsModalVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/category/create-category', {
                name,
            });
            if (data?.success) {
                toast.success(`Đã thêm danh mục ${name}`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //get all cat
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something wwent wrong in getting catgeory');
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${pId}`);
            if (data.success) {
                toast.success(`Đã xóa danh mục thành công`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Lỗi');
        }
    };
    return (
        <FooterOnly title={'Thêm danh mục | Sopi VN'}>
            <div className="container-fluid m-5 p-5 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="d-flex justify-content-center text-uppercase text-primary">Quản lý Danh mục</h1>
                        <div className="p-3 w-80">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Tên danh mục</th>
                                        <th className="ms-3" scope="col">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td className="d-flex justify-content-around">
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {
                                                            setIsModalVisible(true);
                                                            setUpdatedName(c.name);
                                                            setSelected(c);
                                                        }}
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-2"
                                                        onClick={() => {
                                                            handleDelete(c._id);
                                                        }}
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}>
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>
                    </div>
                </div>
            </div>
        </FooterOnly>
    );
};

export default CreateCategory;
