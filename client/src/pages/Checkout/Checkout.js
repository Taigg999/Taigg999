import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/cart';
const cx = classNames.bind(styles);

function Checkout() {
    const location = useLocation();
    const { totalPrice, selectedQuantity, selectedProducts } = location.state || {};
    const navigate = useNavigate();
    const [name, setName] = useState('Nguyễn Xuân Tài');
    const [phoneNumber, setPhoneNumber] = useState('0123456789');
    const [addressText, setAddressText] = useState('Hà Nội');

    const { cart, setCart } = useCart();
    const removeSelectedProductsFromCart = (productId) => {
        try {
            if (!Array.isArray(cart)) {
                // Nếu cart không phải là một mảng, không làm gì cả
                return;
            }

            let updatedCart = [...cart];
            selectedProducts.forEach((productId) => {
                let index = updatedCart.findIndex((item) => item._id === productId);
                if (index !== -1) {
                    updatedCart.splice(index, 1);
                }
            });
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } catch (error) {
            console.log(error);
        }
    };
    const handlePlaceOrder = () => {
        console.log('Đặt hàng được gọi!');
        // Kiểm tra xem có sản phẩm được chọn trong giỏ hàng không
        if (selectedProducts.length > 0) {
            // Kiểm tra xem thông tin địa chỉ đã được nhập đủ hay chưa
            if (name.trim() === '' || phoneNumber.trim() === '' || addressText.trim() === '') {
                // Nếu thông tin địa chỉ chưa được nhập đủ, hiển thị cảnh báo
                alert('Vui lòng nhập đầy đủ thông tin địa chỉ trước khi đặt hàng.');
                return; // Ngăn chặn việc tiếp tục đặt hàng
            }

            // Tạo địa chỉ từ thông tin nhập vào
            const address = {
                name: name,
                phoneNumber: phoneNumber,
                address: addressText,
            };

            console.log('Placing order with address:', address);

            const orderData = {
                address: address,
                products: products,
            };

            console.log('Placing order with address:', address);

            // Điều hướng tới trang đơn hàng
            navigate('/orders', { state: { orders: [orderData] } });

            // Xóa các sản phẩm đã chọn từ giỏ hàng
            removeSelectedProductsFromCart();
        }
    };

    // Lặp qua các sản phẩm đã chọn và trích xuất thông tin
    const products = [];
    selectedProducts.forEach((product) => {
        const productInfo = {
            image: product.image,
            name: product.name,
            quantity: product.quantity,
            totalPrice: product.totalPrice,
        };
        products.push(productInfo);
    });

    return (
        <DefaultLayout title={'Thanh toán | Sopi VN'}>
            <div className={cx('container')}>
                <div className={cx('grid')}>
                    <div className={cx('address')}>
                        <div className={cx('address-border')}></div>
                        <div className={cx('address-list')}>
                            <div className={cx('address-item', 'address-icon')}>
                                <svg
                                    height="16"
                                    viewBox="0 0 12 16"
                                    width="12"
                                    className={cx('shopee-svg-icon', 'icon-location-marker')}
                                >
                                    <path
                                        d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                                        fillRule="evenodd"
                                        fill="#EE4D2D"
                                    ></path>
                                </svg>
                                <span className={cx('address-label')}>Địa chỉ nhận hàng</span>
                            </div>
                            <div className={cx('address-item')}>
                                <form className={cx('address-form')}>
                                    <input
                                        className={cx('address-form__item')}
                                        placeholder="Họ và tên"
                                        style={{ minWidth: '140px' }}
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input
                                        className={cx('address-form__item')}
                                        placeholder="Số điện thoại"
                                        style={{ minWidth: '130px' }}
                                        value={phoneNumber}
                                        required
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <input
                                        className={cx('address-form__item')}
                                        placeholder="Địa chỉ"
                                        style={{ minWidth: '460px' }}
                                        value={addressText}
                                        required
                                        onChange={(e) => setAddressText(e.target.value)}
                                    />
                                    <div className={cx('address-form__label')}>Mặc định</div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product')}>
                        <div className={cx('product-head')}>
                            <div className={cx('product-head__label')}>
                                <span>Sản phẩm</span>
                            </div>
                            <div className={cx('product-head__list')}>
                                <div className={cx('product-head__item')}>Đơn giá</div>
                                <div className={cx('product-head__item')}>Số lượng</div>
                                <div className={cx('product-head__item')}>Thành tiền</div>
                            </div>
                        </div>
                        {selectedProducts &&
                            selectedProducts.map((product, index) => (
                                // Hiển thị thông tin của từng sản phẩm

                                <div key={index}>
                                    <div className={cx('product-main')}>
                                        <div className={cx('product-left')}>
                                            <img className={cx('product-img')} src={product.image} alt={product.name} />
                                            <div className={cx('product-list')}>
                                                <div className={cx('product-name')}>{product.name}</div>
                                                <div className={cx('product-item')}>Đổi ý miễn phí 15 ngày</div>
                                            </div>
                                        </div>
                                        <div className={cx('product-right')}>
                                            <div className={cx('product-price')}>₫{product.price}</div>
                                            <div className={cx('product-price')}>{product.quantity}</div>
                                            <div className={cx('product-price')}>₫{product.totalPrice}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        <div className={cx('total')}>
                            <div className={cx('total-left')}>
                                <span className={cx('total-notify__left')}>
                                    Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                                </span>
                                <span className={cx('total-notify__right')}> Điều khoản Shopee</span>
                            </div>
                            <div className={cx('total-right')}>
                                <div className={cx('total-count')}>Tổng số tiền ({selectedQuantity} sản phẩm)</div>
                                <div className={cx('total-price')}>₫{totalPrice}</div>
                                <button onClick={handlePlaceOrder} className={cx('btn', 'btn--primary', 'btn-order')}>
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Checkout;
