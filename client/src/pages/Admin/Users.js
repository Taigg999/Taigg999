import AdminMenu from '../../components/Layout/AdminMenu';

function Users() {
    return (
        <div className="container-fluid m-5 p-5">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <div className="card w-75 p-3 h-100">
                        <h1 className="d-flex justify-content-center text-uppercase text-success">Người dùng</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;
