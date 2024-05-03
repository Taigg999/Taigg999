import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Category from './pages/Category/Category';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Register from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Dashboard from './pages/User/Dashboard';
import PrivateRoute from './routes/private';
import Forgot from './pages/Forgot/Forgot';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/User/Profile';
import Orders from './pages/User/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search/Search';
import Checkout from './pages/Checkout/Checkout';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="user" element={<Dashboard />} />
                    <Route path="user/profile" element={<Profile />} />
                    {/* <Route path="user/orders" element={<Orders />} /> */}
                </Route>

                <Route path="/dashboard" element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/create-category" element={<CreateCategory />} />
                    <Route path="admin/create-product" element={<CreateProduct />} />
                    <Route path="admin/product/:slug" element={<UpdateProduct />} />
                    <Route path="admin/products" element={<Products />} />
                    <Route path="admin/users" element={<Users />} />
                </Route>
                <Route path="/search" element={<Search />} />
                <Route path="/category" element={<Category />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </>
    );
}

export default App;
