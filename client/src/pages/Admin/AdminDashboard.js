import FooterOnly from '../../components/Layout/FooterOnly/FooterOnly';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

function AdminDashboard() {
    const [auth] = useAuth();
    return (
        <FooterOnly title={'Admin Dashboard | Sopi VN'}>
            <div className="container-fluid m-5 p-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3 h-100">
                            <h1 className="d-flex justify-content-center text-uppercase text-primary">
                                {auth?.user?.username}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </FooterOnly>
    );
}

export default AdminDashboard;
