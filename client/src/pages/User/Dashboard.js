import React from 'react';

import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from './Orders.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Dashboard = () => {
    const [auth] = useAuth();
    return (
        <DefaultLayout>
            <div className={cx('app_container')}>
                <div className="container-flui m-3 p-3 dashboard">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="card w-75 p-3">
                                <h3>{auth?.user?.username}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Dashboard;
