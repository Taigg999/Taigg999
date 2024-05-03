import UserMenu from '../../components/Layout/UserMenu';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './Orders.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Profile() {
    const [auth, setAuth] = useAuth();
    //state
    const [username, setName] = useState('');

    const [password, setPassword] = useState('');

    useEffect(() => {
        const { username } = auth?.user;
        setName(username);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/v1/auth/profile', {
                username,

                password,
            });
            if (data?.errro) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    return (
        <DefaultLayout>
            <div className={cx('app_container')}>
                <div className="container-fluid m-3 p-3 dashboard" style={{ marginTop: '120px' }}>
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-8">
                            <div className="form-container" style={{ marginTop: '-40px' }}>
                                <form onSubmit={handleSubmit}>
                                    <h4 className="title">Thông tin tài khoản</h4>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            placeholder="Enter Your Name"
                                            autoFocus
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Enter Your Password"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Cập nhật
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Profile;
