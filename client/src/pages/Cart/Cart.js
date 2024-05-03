import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAngleDown, faAngleRight, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const cx = classNames.bind(styles);

function Cart({ productsToRemove, setProductsToRemove }) {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(productsToRemove) && productsToRemove.length > 0) {
            const updatedCart = cart.filter((product) => !productsToRemove.includes(product._id));
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }, [productsToRemove, cart, setCart, setProductsToRemove]);
    const [quantities, setQuantities] = useState({});

    const decreaseQuantity = (productId) => {
        if (quantities[productId] && quantities[productId] > 1) {
            // Đảm bảo số lượng không nhỏ hơn 1
            setQuantities({ ...quantities, [productId]: quantities[productId] - 1 });
        }
    };

    const increaseQuantity = (productId) => {
        const currentQuantity = quantities[productId] || 0;
        setQuantities({ ...quantities, [productId]: currentQuantity + 1 });
    };

    const handleChange = (event, productId) => {
        const value = event.target.value;
        // Kiểm tra nếu value không phải là số hoặc trống
        if (!/^\d*$/.test(value)) {
            // Nếu không phải là số hoặc trống, không làm gì cả
            return;
        }
        // Nếu là số, cập nhật state
        setQuantities({ ...quantities, [productId]: parseInt(value) || 1 });
    };

    const handleChangeCheckbox = (productId) => {
        setSelectedProducts((prevSelectedProducts) => {
            // Nếu sản phẩm đã được chọn, loại bỏ nó ra khỏi danh sách
            if (prevSelectedProducts.includes(productId)) {
                return prevSelectedProducts.filter((id) => id !== productId);
            } else {
                // Nếu sản phẩm chưa được chọn, thêm nó vào danh sách
                return [...prevSelectedProducts, productId];
            }
        });
    };

    const handleSelectAllCheckbox = () => {
        if (!selectAllChecked) {
            // Nếu chưa chọn tất cả, thêm tất cả các sản phẩm vào danh sách selectedProducts
            const allProductIds = cart.map((p) => p._id);
            setSelectedProducts(allProductIds);
        } else {
            // Nếu đã chọn tất cả, xóa tất cả các sản phẩm khỏi danh sách selectedProducts
            setSelectedProducts([]);
        }
        // Cập nhật trạng thái của ô checkbox "Chọn tất cả"
        setSelectAllChecked((prevSelectAllChecked) => !prevSelectAllChecked);
    };

    useEffect(() => {
        const updatedQuantities = {};
        // Duyệt qua các sản phẩm được chọn và cập nhật quantities cho chúng
        selectedProducts.forEach((productId) => {
            // Nếu quantities[productId] không tồn tại, gán giá trị mặc định là 1
            updatedQuantities[productId] = quantities[productId] || 1;
        });
        setQuantities(updatedQuantities);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProducts]);

    const totalPrice = cart.reduce((total, product) => {
        if (selectedProducts.includes(product._id)) {
            return total + product.price * (quantities[product._id] || 1);
        }
        return total;
    }, 0);

    const calculateSelectedQuantity = () => {
        return selectedProducts.length;
    };

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    const selectedQuantity = calculateSelectedQuantity();

    const selectedProductsInfo = cart
        .filter((p) => selectedProducts.includes(p._id)) // Lọc ra những sản phẩm đã được chọn
        .map((p) => ({
            name: p.name,
            image: `/api/v1/product/product-photo/${p._id}`,
            price: p.price,
            quantity: quantities[p._id] || 1,
            totalPrice: p.price * (quantities[p._id] || 1),
        }));

    const handleCheckout = () => {
        if (selectedProducts.length > 0) {
            // Điều hướng tới trang checkout nếu có ít nhất một mặt hàng được chọn

            navigate('/checkout', { state: { totalPrice, selectedQuantity, selectedProducts: selectedProductsInfo } });
        } else {
            // Hiển thị thông báo lỗi nếu không có mặt hàng nào được chọn
            toast.error('Vui lòng chọn ít nhất một mặt hàng để tiến hành thanh toán.');
        }
    };

    return (
        <DefaultLayout title={'Giỏ hàng | Sopi VN'}>
            <div className={cx('app')}>
                <div className={cx('app__container')}>
                    <div className={cx('grid')}>
                        <div className={cx('container-title')}>
                            <div className={cx('container-title__item')}>
                                <img
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/cart/d9e992985b18d96aab90.png"
                                    alt="ctntt"
                                    className={cx('title-logo')}
                                />
                                <span>Nhấn vào mục Mã giảm giá ở cuối trang để hưởng miễn phí vận chuyển bạn nhé!</span>
                            </div>
                        </div>
                        <div className={cx('cart-describe')}>
                            <div className={cx('cart-describe__sp')}>
                                <input
                                    className={cx('checkbox')}
                                    type="checkbox"
                                    onChange={handleSelectAllCheckbox}
                                    checked={selectAllChecked}
                                />
                                <span>Sản Phẩm</span>
                            </div>
                            <div className={cx('cart-describe__item')}>
                                <div className={cx('cart-describe__text')}>Số Lượng</div>
                                <div className={cx('cart-describe__text')}>Số Tiền</div>
                                <div className={cx('cart-describe__text')}>Thao Tác</div>
                            </div>
                        </div>
                        <div className="has--cart">
                            {cart?.map((p) => (
                                <div className={cx('cart-order')}>
                                    <div className={cx('cart-order__check')}>
                                        <svg
                                            className={cx('cart__icon-liked')}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="62"
                                            height="16"
                                            fill="none"
                                        >
                                            <path
                                                fill="#EE4D2D"
                                                fillRule="evenodd"
                                                d="M0 2C0 .9.9 0 2 0h58a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
                                                clipRule="evenodd"
                                            ></path>
                                            <g clipPath="url(#clip0)">
                                                <path
                                                    fill="#fff"
                                                    d="M8.7 13H7V8.7L5.6 6.3A828.9 828.9 0 004 4h2l2 3.3a1197.3 1197.3 0 002-3.3h1.6L8.7 8.7V13zm7.9-1.7h1.7c0 .3-.2.6-.5 1-.2.3-.5.5-1 .7l-.6.2h-.8c-.5 0-1 0-1.5-.2l-1-.8a4 4 0 01-.9-2.4c0-1 .3-1.9 1-2.6a3 3 0 012.4-1l.8.1a2.8 2.8 0 011.3.7l.4.6.3.8V10h-4.6l.2 1 .4.7.6.5.7.1c.4 0 .7 0 .9-.2l.2-.6v-.1zm0-2.3l-.1-1-.3-.3c0-.2-.1-.2-.2-.3l-.8-.2c-.3 0-.6.2-.9.5l-.3.5a4 4 0 00-.3.8h3zm-1.4-4.2l-.7.7h-1.4l1.5-2h1.1l1.5 2h-1.4l-.6-.7zm8.1 1.6H25V13h-1.7v-.5.1H23l-.7.5-.9.1-1-.1-.7-.4c-.3-.2-.4-.5-.6-.8l-.2-1.3V6.4h1.7v3.7c0 1 0 1.6.3 1.7.2.2.5.3.7.3h.4l.4-.2.3-.3.3-.5.2-1.4V6.4zM34.7 13a11.2 11.2 0 01-1.5.2 3.4 3.4 0 01-1.3-.2 2 2 0 01-.5-.3l-.3-.5-.2-.6V7.4h-1.2v-1h1.1V5h1.7v1.5h1.9v1h-2v3l.2 1.2.1.3.2.2h.3l.2.1c.2 0 .6 0 1.3-.3v1zm2.4 0h-1.7V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.4.4.2.7V13h-1.6V9.3 8.1l-.4-.6-.6-.2a1 1 0 00-.4.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.1.5-.1.9V13zm5.4-6.6H44V13h-1.6V6.4zm-.8-.9l1.8-2h1.8l-2.1 2h-1.5zm7.7 5.8H51v.5l-.4.5a2 2 0 01-.4.4l-.6.3-1.4.2c-.5 0-1 0-1.4-.2l-1-.7c-.3-.3-.5-.7-.6-1.2-.2-.4-.3-.9-.3-1.4 0-.5.1-1 .3-1.4a2.6 2.6 0 011.6-1.8c.4-.2.9-.3 1.4-.3.6 0 1 .1 1.5.3.4.1.7.4 1 .6l.2.5.1.5h-1.6c0-.3-.1-.5-.3-.6-.2-.2-.4-.3-.8-.3s-.8.2-1.2.6c-.3.4-.4 1-.4 2 0 .9.1 1.5.4 1.8.4.4.8.6 1.2.6h.5l.3-.2.2-.3v-.4zm4 1.7h-1.6V3.5h1.7v3.4a3.7 3.7 0 01.2-.1 2.8 2.8 0 013.4 0l.3.4.3.7V13h-1.6V9.3L56 8.1c-.1-.3-.2-.5-.4-.6l-.6-.2a1 1 0 00-.3.1 2 2 0 00-.4.2l-.3.3a3 3 0 00-.3.5l-.2.5V13z"
                                                ></path>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0">
                                                    <path fill="#fff" d="M0 0h55v16H0z" transform="translate(4)"></path>
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        <span className={cx('cart-name-shop')}>GG Official</span>

                                        <svg viewBox="0 0 16 16" className={cx('shopee-svg-icon', 'bTa6Yo')}>
                                            <g fillRule="evenodd">
                                                <path
                                                    fill="#ee4d2d"
                                                    d="M15 4a1 1 0 01.993.883L16 5v9.932a.5.5 0 01-.82.385l-2.061-1.718-8.199.001a1 1 0 01-.98-.8l-.016-.117-.108-1.284 8.058.001a2 2 0 001.976-1.692l.018-.155L14.293 4H15zm-2.48-4a1 1 0 011 1l-.003.077-.646 8.4a1 1 0 01-.997.923l-8.994-.001-2.06 1.718a.5.5 0 01-.233.108l-.087.007a.5.5 0 01-.492-.41L0 11.732V1a1 1 0 011-1h11.52zM3.646 4.246a.5.5 0 000 .708c.305.304.694.526 1.146.682A4.936 4.936 0 006.4 5.9c.464 0 1.02-.062 1.608-.264.452-.156.841-.378 1.146-.682a.5.5 0 10-.708-.708c-.185.186-.445.335-.764.444a4.004 4.004 0 01-2.564 0c-.319-.11-.579-.258-.764-.444a.5.5 0 00-.708 0z"
                                                ></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <div className={cx('cart-order__product')}>
                                        <div className={cx('cart-order__head')}>
                                            <span className={cx('mua-kem')}>Mua Kèm</span>
                                            <span className={cx('mua-nhieu')}>
                                                Mua nhiều hơn ₫10.000 và nhận được 1 quà tặng
                                            </span>
                                            <span className={cx('plus')}>
                                                <a href="hhh" className={cx('cart-plus')}>
                                                    Thêm
                                                    <FontAwesomeIcon className={cx('plus__icon')} icon={faAngleRight} />
                                                </a>
                                            </span>
                                        </div>
                                        <div className={cx('cart-order__main')}>
                                            <div className={cx('cart-order__main-left')}>
                                                <input
                                                    id={`checkbox-${p._id}`}
                                                    className={cx('checkbox')}
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(p._id)}
                                                    onChange={(e) => {
                                                        handleChangeCheckbox(p._id);
                                                    }}
                                                />
                                                <div className={cx('cart-order__describe')}>
                                                    <div className={cx('cart-order__img-price')}>
                                                        <img
                                                            alt="s"
                                                            className={cx('cart-order__img')}
                                                            src={`/api/v1/product/product-photo/${p._id}`}
                                                        ></img>
                                                        <div className={cx('cart-order__price')}>₫ {p.price}</div>
                                                    </div>
                                                    <div
                                                        className={cx('cart-order__name')}
                                                        onClick={() => navigate(`/product/${p.slug}`)}
                                                    >
                                                        <div
                                                            style={{ cursor: 'pointer' }}
                                                            className={cx('cart-order__name-link')}
                                                        >
                                                            {p.name}
                                                        </div>
                                                        <img
                                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-8eda068bbd70ec5f60170af0853afcfc"
                                                            alt="hhas"
                                                            className={cx('cart-order__name-img')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={cx('cart-order__classify')}>
                                                    <span className={cx('cart-order__classify-item')}>
                                                        Phân Loại Hàng:
                                                        <FontAwesomeIcon
                                                            className={cx('plus__icon')}
                                                            icon={faAngleDown}
                                                        ></FontAwesomeIcon>
                                                    </span>
                                                    <span className={cx('cart-order__classify-item')}>DEMO</span>
                                                </div>
                                            </div>
                                            <div className={cx('cart-order__main-right')}>
                                                <div className={cx('cart-order__quantity')}>
                                                    <button
                                                        className={cx('cart-order__quantity-btn')}
                                                        onClick={() => decreaseQuantity(p._id)}
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        className={cx('cart-order__quantity-inp')}
                                                        value={quantities[p._id] || 1}
                                                        onChange={(event) => handleChange(event, p._id)}
                                                    />
                                                    <button
                                                        className={cx('cart-order__quantity-btn')}
                                                        onClick={() => increaseQuantity(p._id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className={cx(' cart-order__total-money', 'cart-order__money')}>
                                                    ₫ {p.price * (quantities[p._id] || 1)}
                                                </div>
                                                <div className={cx('cart-order__operation')}>
                                                    <div
                                                        style={{ cursor: 'pointer' }}
                                                        className={cx(
                                                            'cart-order__total-money',
                                                            'cart-order__operation-delete',
                                                        )}
                                                        onClick={() => removeCartItem(p._id)}
                                                    >
                                                        Xóa
                                                    </div>
                                                    <div className={cx('cart-order__operation-search')}>
                                                        Tìm kiếm sản phẩm
                                                        <br /> tương tự
                                                        <FontAwesomeIcon
                                                            className={cx('plus__icon')}
                                                            icon={faAngleDown}
                                                        ></FontAwesomeIcon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('cart-voucher', 'cart-voucher-2')}>
                                        <svg
                                            enableBackground="new 0 0 15 15"
                                            viewBox="0 0 15 15"
                                            x="0"
                                            y="0"
                                            className={cx('shopee-svg-icon', 'MS9XQD', 'icon-free-shipping-line')}
                                        >
                                            <g>
                                                <line
                                                    fill="none"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                    x1="8.6"
                                                    x2="4.2"
                                                    y1="9.8"
                                                    y2="9.8"
                                                ></line>
                                                <circle
                                                    cx="3"
                                                    cy="11.2"
                                                    fill="none"
                                                    r="2"
                                                    strokeMiterlimit="10"
                                                ></circle>
                                                <circle
                                                    cx="10"
                                                    cy="11.2"
                                                    fill="none"
                                                    r="2"
                                                    strokeMiterlimit="10"
                                                ></circle>
                                                <line
                                                    fill="none"
                                                    strokeMiterlimit="10"
                                                    x1="10.5"
                                                    x2="14.4"
                                                    y1="7.3"
                                                    y2="7.3"
                                                ></line>
                                                <polyline
                                                    fill="none"
                                                    points="1.5 9.8 .5 9.8 .5 1.8 10 1.8 10 9.1"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                ></polyline>
                                                <polyline
                                                    fill="none"
                                                    points="9.9 3.8 14 3.8 14.5 10.2 11.9 10.2"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                ></polyline>
                                            </g>
                                        </svg>
                                        <span className={cx('cart-voucher-text')}>
                                            Giảm ₫70.000 phí vận chuyển đơn tối thiểu ₫0
                                        </span>
                                        <span>
                                            <a href="hhh" className={cx('cart-voucher-link')}>
                                                Tìm hiểu thêm
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div className={cx('cart-buy')}>
                                <div className={cx('cart-buy__head')}>
                                    <div className={cx('cart-voucher', 'cart-buy__top')}>
                                        <span>
                                            <a href="hhh" className={cx('cart-buy-link')}>
                                                Chọn Hoặc Nhập Mã
                                            </a>
                                        </span>
                                        <span className={cx('cart-buy-text')}>Shopee Voucher</span>
                                        <svg
                                            fill="none"
                                            viewBox="0 -2 23 22"
                                            className={cx('shopee-svg-icon', 'L-deCr', 'icon-voucher-line')}
                                        >
                                            <g filter="url(#voucher-filter0_d)">
                                                <mask id="a" fill="#fff">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M1 2h18v2.32a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75v.65a1.5 1.5 0 000 2.75V16H1v-2.12a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75v-.65a1.5 1.5 0 000-2.75V2z"
                                                    ></path>
                                                </mask>
                                                <path
                                                    d="M19 2h1V1h-1v1zM1 2V1H0v1h1zm18 2.32l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zm0 .65l.4.92.6-.26v-.66h-1zm0 2.75h1v-.65l-.6-.26-.4.91zM19 16v1h1v-1h-1zM1 16H0v1h1v-1zm0-2.12l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zm0-.65l-.4-.92-.6.26v.66h1zm0-2.75H0v.65l.6.26.4-.91zM19 1H1v2h18V1zm1 3.32V2h-2v2.32h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zm.6 1.56v-.65h-2v.65h2zm-.9 1.38c0-.2.12-.38.3-.46l-.8-1.83a2.5 2.5 0 00-1.5 2.29h2zm.3.46a.5.5 0 01-.3-.46h-2c0 1.03.62 1.9 1.5 2.3l.8-1.84zM20 16v-2.13h-2V16h2zM1 17h18v-2H1v2zm-1-3.12V16h2v-2.12H0zm1.4.91a2.5 2.5 0 001.5-2.29h-2a.5.5 0 01-.3.46l.8 1.83zm1.5-2.29a2.5 2.5 0 00-1.5-2.3l-.8 1.84c.18.08.3.26.3.46h2zM0 10.48v.65h2v-.65H0zM.9 9.1a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 9.1h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 8.65zM0 7.08v.65h2v-.65H0zM.9 5.7a.5.5 0 01-.3.46l.8 1.83A2.5 2.5 0 002.9 5.7h-2zm-.3-.46c.18.08.3.26.3.46h2a2.5 2.5 0 00-1.5-2.3L.6 5.25zM0 2v2.33h2V2H0z"
                                                    mask="url(#a)"
                                                ></path>
                                            </g>
                                            <path
                                                clipRule="evenodd"
                                                d="M6.49 14.18h.86v-1.6h-.86v1.6zM6.49 11.18h.86v-1.6h-.86v1.6zM6.49 8.18h.86v-1.6h-.86v1.6zM6.49 5.18h.86v-1.6h-.86v1.6z"
                                            ></path>
                                            <defs>
                                                <filter
                                                    id="voucher-filter0_d"
                                                    x="0"
                                                    y="1"
                                                    width="20"
                                                    height="16"
                                                    filterUnits="userSpaceOnUse"
                                                    colorInterpolationFilters="sRGB"
                                                >
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                    <feColorMatrix
                                                        in="SourceAlpha"
                                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                    ></feColorMatrix>
                                                    <feOffset></feOffset>
                                                    <feGaussianBlur stdDeviation=".5"></feGaussianBlur>
                                                    <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix>
                                                    <feBlend
                                                        in2="BackgroundImageFix"
                                                        result="effect1_dropShadow"
                                                    ></feBlend>
                                                    <feBlend
                                                        in="SourceGraphic"
                                                        in2="effect1_dropShadow"
                                                        result="shape"
                                                    ></feBlend>
                                                </filter>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <div className={cx('cart-buy__main')}>
                                    <div className={cx('div')}></div>
                                    <div className={cx('cart-buy__coin')}>
                                        <svg
                                            fill="none"
                                            viewBox="0 0 18 18"
                                            className={cx('shopee-svg-icon', 'hpZGIt', 'icon-coin-line')}
                                        >
                                            <path
                                                stroke="#FFA600"
                                                strokeWidth="1.3"
                                                d="M17.35 9A8.35 8.35 0 11.65 9a8.35 8.35 0 0116.7 0z"
                                            ></path>
                                            <path
                                                fill="#FFA600"
                                                fillRule="evenodd"
                                                stroke="#FFA600"
                                                strokeWidth=".2"
                                                d="M6.86 4.723c-.683.576-.998 1.627-.75 2.464.215.725.85 1.258 1.522 1.608.37.193.77.355 1.177.463.1.027.2.051.3.08.098.03.196.062.294.096.06.021.121.044.182.067.017.006.107.041.04.014-.07-.028.071.03.087.037.286.124.56.27.82.44.114.076.045.024.151.111a2.942 2.942 0 01.322.303c.087.093.046.042.114.146.18.275.245.478.235.8-.01.328-.14.659-.325.867-.47.53-1.232.73-1.934.696a4.727 4.727 0 01-1.487-.307c-.45-.182-.852-.462-1.242-.737-.25-.176-.643-.04-.788.197-.17.279-.044.574.207.75.753.532 1.539.946 2.474 1.098.885.144 1.731.124 2.563-.224.78-.326 1.416-.966 1.607-1.772.198-.838-.023-1.644-.61-2.29-.683-.753-1.722-1.17-2.706-1.43a4.563 4.563 0 01-.543-.183c.122.048-.044-.02-.078-.035a4.77 4.77 0 01-.422-.212c-.594-.338-.955-.722-.872-1.369.105-.816.757-1.221 1.555-1.28.808-.06 1.648.135 2.297.554.614.398 1.19-.553.58-.947-1.33-.86-3.504-1.074-4.77-.005z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className={cx('cart-buy__text-1')}>Shopee Xu</span>
                                        <div className={cx('cart-buy__text-2')}>
                                            Bạn chưa chọn sản phẩm
                                            <FontAwesomeIcon
                                                className={cx('cart-buy__icon', 'shopee-svg-icon')}
                                                icon={faCircleQuestion}
                                            ></FontAwesomeIcon>
                                            <div className={cx('cart-buy__help')}>
                                                <div className={cx('cart-buy__help-text')}>
                                                    Vui lòng chọn sản phẩm để tính toán số Xu có thể dùng cho đơn hàng
                                                </div>
                                                <div>
                                                    <div>
                                                        <a href="hhh" className={cx('cart-voucher-link')}>
                                                            Tìm hiểu thêm
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('cart-buy__text-3')}>-₫0</div>
                                    </div>
                                </div>
                                <div className={cx('cart-buy__bot')}>
                                    <div className={cx('cart-buy__operation')}>
                                        <input
                                            id="checkbox-1"
                                            className={cx('checkbox')}
                                            type="checkbox"
                                            onChange={handleSelectAllCheckbox}
                                            checked={selectAllChecked}
                                        />
                                        <div className={cx('cart-buy__operation-item')}>
                                            Chọn Tất Cả ({cart?.length})
                                        </div>
                                        <div className={cx('cart-buy__operation-item')}>Xóa</div>
                                        <div className={cx('cart-buy__operation-item')}>
                                            Lưu vào thư mục Đã thanh toán
                                        </div>
                                    </div>
                                    <div className={cx('cart-buy__pay')}>
                                        <button
                                            className={cx('cart-buy__btn', 'btn', 'btn--primary')}
                                            onClick={handleCheckout}
                                        >
                                            Mua Hàng
                                        </button>
                                        <span className={cx('cart-buy__pay-item')}>
                                            <span>₫ {totalPrice}</span>
                                        </span>
                                        <span className={cx('cart-buy__pay-item')}>
                                            Tổng thanh toán ({calculateSelectedQuantity()} Sản phẩm):
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Cart;
