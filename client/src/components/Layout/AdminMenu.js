import { NavLink } from 'react-router-dom';

function AdminMenu() {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h3>Admin</h3>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
                        Quản lý danh mục
                    </NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
                        Thêm sản phẩm
                    </NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">
                        Tất cả sản phẩm
                    </NavLink>

                    <NavLink to="/login" className="list-group-item list-group-item-action">
                        <button className="btn btn-danger">Đăng xuất</button>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default AdminMenu;
