import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import classNames from 'classnames/bind';
import styles from './ProducDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faCartPlus,
    faCheck,
    faCircleQuestion,
    faHeart,
    faMessage,
    faStar,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';
const cx = classNames.bind(styles);

function ProductDetail() {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useAuth();
    const params = useParams();
    const [cart, updateCart] = useCart();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.slug]);
    //getProduct
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = () => {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const isProductInCart = cart.some((item) => item._id === product._id);

        // Nếu sản phẩm đã có trong giỏ hàng, thông báo cho người dùng và không thêm sản phẩm vào giỏ hàng lại
        if (isProductInCart) {
            toast.error('Sản phẩm đã có trong giỏ hàng');
            return;
        }

        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng và cập nhật state và localStorage
        const updatedCart = [...cart, product];
        updateCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        toast.success('Thêm vào giỏ hàng thành công');
    };

    const toCart = () => {
        const isProductInCart = cart.some((item) => item._id === product._id);

        // Nếu sản phẩm đã có trong giỏ hàng, thông báo cho người dùng và không thêm sản phẩm vào giỏ hàng lại
        if (isProductInCart) {
            navigate('/cart');
            toast.error('Sản phẩm đã có trong giỏ hàng');
            return;
        }

        // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm vào giỏ hàng và cập nhật state và localStorage
        const updatedCart = [...cart, product];
        updateCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        navigate('/cart');
    };
    return (
        <DefaultLayout title={'Chi tiết sản phẩm | Sopi VN'}>
            <div className={cx('app__container')}>
                <div className={cx('grid')}>
                    <div className={cx('path-linked')}>
                        <div className={cx('path-linked__list')}>
                            <div className={cx('path-linked__link')} style={{ cursor: 'pointer' }}>
                                Shopee
                                <FontAwesomeIcon className={cx('path-linked__icon')} icon={faAngleRight} />
                            </div>
                        </div>
                        <div className={cx('path-linked__list')}>
                            <div className={cx('path-linked__link')} style={{ cursor: 'pointer' }}>
                                {product?.category?.name}
                                <FontAwesomeIcon className={cx('path-linked__icon')} icon={faAngleRight} />
                            </div>
                        </div>
                        <div className={cx('path-list')}>
                            <div
                                className={cx('path-linked__link ', 'path-linked__link-ctiet')}
                                style={{ cursor: 'pointer' }}
                            >
                                {product.name}
                            </div>
                        </div>
                    </div>
                    <div className={cx('grid__row', 'san-pham-chinh')}>
                        <div className={cx('grid__column-5')}>
                            <div className={cx('main-left')}>
                                <img
                                    className={cx('main-left__img')}
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    alt={product.name}
                                />
                                <div className={cx('main-left__list-img')}>
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className={cx('main-left__img-2')}
                                    />
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className={cx('main-left__img-2')}
                                    />
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className={cx('main-left__img-2')}
                                    />
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className={cx('main-left__img-2')}
                                    />
                                    <img
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                        alt={product.name}
                                        className={cx('main-left__img-2')}
                                    />
                                    <FontAwesomeIcon
                                        className={cx('main-left__icon-left', 'main-left__icon')}
                                        icon={faAngleLeft}
                                    />
                                    <FontAwesomeIcon
                                        className={cx('main-left__icon-right', 'main-left__icon')}
                                        icon={faAngleRight}
                                    />
                                </div>
                                <div className={cx('main-left__favourite')}>
                                    <div className={cx('main-left__favourite-share')}>
                                        <div className={cx('favourite-share__text')}>Chia sẻ:</div>
                                        <div className={cx('favourite-share_link')}>
                                            <FontAwesomeIcon
                                                className={cx('share-icon')}
                                                icon={faFacebook}
                                                style={{ color: '#3B5999' }}
                                            />
                                        </div>
                                        <div className={cx('favourite-share_link')}>
                                            <FontAwesomeIcon
                                                className={cx('share-icon')}
                                                icon={faMessage}
                                                style={{ color: '#0384FF' }}
                                            />
                                        </div>
                                        <div className={cx('favourite-share_link')}>
                                            <FontAwesomeIcon
                                                className={cx('share-icon')}
                                                icon={faTwitter}
                                                style={{ color: '#10C2FF' }}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('main-left__favourite-heart')}>
                                        <div className={cx('favourite-liked')}>
                                            <FontAwesomeIcon className={cx('favourite-icon')} icon={faHeart} />
                                            <div className=""> Đã thích (1,8k)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('grid__column-7', 'product')}>
                            <div className={cx('name')}>
                                <span>{product.name}</span>
                            </div>

                            <div className={cx('rating')}>
                                <div className={cx('rating-list')}>
                                    <div className={cx('rating-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            className={cx('rating-item__c', 'rating-item__link')}
                                        >
                                            <span>4.8</span>
                                            <FontAwesomeIcon className={cx('rating-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('rating-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('rating-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('rating-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('rating-icon')} icon={faStar} />
                                        </div>
                                    </div>
                                    <div className={cx('rating-item__c', 'rating-danhgia')}>
                                        <span>164</span> Đánh giá
                                    </div>
                                    <div className={cx('rating-item__c', 'rating-sold')}>
                                        <span>1,6k Đã Bán</span>
                                        <FontAwesomeIcon icon={faCircleQuestion} />
                                    </div>
                                </div>
                                <div style={{ cursor: 'pointer' }} href="ád" className={cx('rating-report')}>
                                    Tố cáo
                                </div>
                            </div>

                            <div className={cx('sale')}>
                                <div className={cx('sale-gia')}>
                                    {/* <div className={cx('sale-gia__old')}>₫ 160.000</div> */}
                                    <div className={cx('sale-gia__new')}>
                                        {product?.price?.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </div>
                                    <div className={cx('sale-gia__percent')}>45% GIẢM</div>
                                </div>
                            </div>

                            <div className={cx('deal')}>
                                <div className={cx('deal-text')}>Mã Giảm Giá Của Shop</div>
                                <div className={cx('deal-item', 'deal-item__link')}>Giảm 5k</div>
                                <div className={cx('deal-item', 'deal-item__link')}>5% Giảm</div>
                                <div className={cx('deal-item', 'deal-item__link')}>Giảm 10k</div>
                                <div className={cx('deal-item', 'deal-item__link')}>Giảm 20k</div>
                            </div>

                            <div className={cx('deal')}>
                                <div className={cx('deal-text')}>Deal Sốc</div>
                                <div className={cx('deal-item')}>Mua để nhận quà</div>
                            </div>

                            <div className={cx('deal')}>
                                <div className={cx('pr-text')}>Bảo hiểm</div>
                                <div className={cx('pr-item')}>
                                    Bảo hiểm Thời trang <span>Mới</span>
                                </div>
                                <a href="a" className={cx('pr-link')}>
                                    Tìm hiểu thêm
                                </a>
                            </div>

                            <div className={cx('chon-size')}>
                                <div className={cx('deal', 'soluong')}>
                                    <div className={cx('pr-text')}>Màu Sắc</div>
                                    <div className={cx('pr-item', 'size-1')}>Demo</div>
                                    <div className={cx('pr-item', 'size-1')}>Demo</div>
                                    <div className={cx('pr-item', 'size-1')}>Demo</div>
                                </div>
                                <div className={cx('deal', 'chon-size-kichthuoc')}>
                                    <div className={cx('pr-text')}>Size</div>
                                    <div className={cx('pr-item', 'size-1')}>Demo</div>
                                </div>
                                <div className={cx('soluong')}>
                                    <div className={cx('soluong-text')}>Số lượng</div>
                                    <div className={cx('cart-order__quantity')}>
                                        <button className={cx('cart-order__quantity-btn')}>-</button>
                                        <input className={cx('cart-order__quantity-inp')} type="text" />
                                        <button className={cx('cart-order__quantity-btn')}>+</button>
                                    </div>
                                    <div className={cx('soluong-conlai')}>{product.quantity} sản phẩm có sẵn</div>
                                </div>
                            </div>

                            <div className={cx('muahang')}>
                                <div className={cx('them')}>
                                    <div className={cx('them-link')} style={{ cursor: 'pointer' }} onClick={addToCart}>
                                        <FontAwesomeIcon className={cx('them-icon')} icon={faCartPlus} />
                                        <span>Thêm Vào Giỏ Hàng</span>
                                    </div>
                                </div>
                                <div className={cx('mua')}>
                                    <div className={cx('mua-link')} style={{ cursor: 'pointer' }} onClick={toCart}>
                                        Mua Ngay
                                    </div>
                                </div>
                            </div>
                            <div className={cx('main-right__footer')}>
                                <img
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/511aca04cc3ba9234ab0e4fcf20768a2.png"
                                    alt="kkk"
                                    className={cx('dam-bao')}
                                />
                                <span className={cx('dam-bao__text')}>Shopee Đảm Bảo</span>
                                <span className={cx('dam-bao__text')}>3 Ngày Trả Hàng / Hoàn Tiền</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('grid__row')}>
                        <div className={cx('grid__column-10')}>
                            <div className={cx('mo-ta-sp')}>
                                <div className="mo-ta-sp__head">MÔ TẢ SẢN PHẨM</div>
                                <div className={cx('detailed-describe')}>
                                    <div className="detailel-describe__main">
                                        <p className={cx('detailed-describe__text')}>{product.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('product-review')}>
                                <div className={cx('product-review__main')}>
                                    <div className={cx('product-review__text')}>ĐÁNH GIÁ SẢN PHẨM (DEMO)</div>
                                    <div className={cx('product-review__top')}>
                                        <div className={cx('product-review__top-left')}>
                                            <div className={cx('product-review__rating')}>
                                                4.8 <span>trên 5</span>
                                            </div>
                                            <div className={cx('product-review__star')}>
                                                <FontAwesomeIcon
                                                    className={cx('product-review__star--icon')}
                                                    icon={faStar}
                                                />
                                                <FontAwesomeIcon
                                                    className={cx('product-review__star--icon')}
                                                    icon={faStar}
                                                />
                                                <FontAwesomeIcon
                                                    className={cx('product-review__star--icon')}
                                                    icon={faStar}
                                                />
                                                <FontAwesomeIcon
                                                    className={cx('product-review__star--icon')}
                                                    icon={faStar}
                                                />
                                                <FontAwesomeIcon
                                                    className={cx('product-review__star--icon')}
                                                    icon={faStar}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('product-review__top-right')}>
                                            <div className={cx('product-review__cmt')}>Tất Cả</div>
                                            <div className={cx('product-review__cmt')}>5 Sao (429)</div>
                                            <div className={cx('product-review__cmt')}>4 Sao (32)</div>
                                            <div className={cx('product-review__cmt')}>3 Sao (11)</div>
                                            <div className={cx('product-review__cmt')}>2 Sao (2)</div>
                                            <div className={cx('product-review__cmt')}>1 Sao (5)</div>
                                            <div className={cx('product-review__cmt')}>Có Bình Luận (241)</div>
                                            <div className={cx('product-review__cmt')}>Có Hình Ảnh / Video (201)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('feedback')}>
                                    <div className={cx('feedback__user')}>
                                        <div className={cx('feedback__user-avt')}>
                                            <div
                                                className={cx('feedback__user-img')}
                                                style={{
                                                    backgroundImage: `url('https://down-vn.img.susercontent.com/file/vn-11134201-23030-o0cu3tt2liov9e')`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className={cx('feedback__cmt')}>
                                        <div className={cx('feedback__quality-text', 'margin-chung')}>mylinh0507</div>
                                        <div className={cx('feedback__cmt-star', 'margin-chung')}>
                                            <FontAwesomeIcon className={cx('feedback__star-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('feedback__star-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('feedback__star-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('feedback__star-icon')} icon={faStar} />
                                            <FontAwesomeIcon className={cx('feedback__star-icon')} icon={faStar} />
                                        </div>
                                        <div className={cx('feedback__time', 'margin-chung')}>
                                            <div className={cx('feedback__time-cmt')}>2023-04-22 11:03</div>
                                            <div className={cx('feedback__time-cmt')}>
                                                Phân loại hàng: Đen, Freesize
                                            </div>
                                        </div>
                                        <div className={cx('feedback__quality', 'margin-chung')}>
                                            <div className={cx('feedback__quality-color', 'margin-chung')}>
                                                <span>Màu sắc: </span>
                                                <div className={cx('feedback__quality-text')}>đen</div>
                                            </div>
                                            <div className={cx('feedback__quality-color', 'margin-chung')}>
                                                <span>Đúng với mô tả:</span>
                                                <div className={cx('feedback__quality-text')}>đúng</div>
                                            </div>
                                            <div className={cx('feedback__quality-color', 'margin-chung')}>
                                                <span>Chất liệu: </span>
                                                <div className={cx('feedback__quality-text')}>vải thoáng mát</div>
                                            </div>
                                            <div className={cx('feedback__quality-text', 'margin-chung')}>
                                                Shop đóng gói cẩn thận, giao hàng nhanh, shipper thân thiện, hàng đẹp.
                                                Rất đáng mua nha mn 🤩🤩🤩
                                            </div>
                                        </div>
                                        <div className={cx('feedback__img', 'margin-chung')}>
                                            <div className={cx('img-vd-time')}>
                                                <img
                                                    src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhehmdwmodgyfd"
                                                    alt="kkk"
                                                    className={cx('feedback__img-1')}
                                                />
                                                <div className={cx('feedback__img-vd')}>
                                                    <svg
                                                        className={cx('feedback__img-vd-icon')}
                                                        width="23"
                                                        height="18"
                                                        viewBox="0 0 23 18"
                                                        fill="none"
                                                    >
                                                        <g filter="url(#filter0_d)">
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M5 4C4.44772 4 4 4.44772 4 5V13C4 13.5523 4.44772 14 5 14H13C13.5523 14 14 13.5523 14 13V5C14 4.44772 13.5523 4 13 4H5ZM11.5 9C11.5 10.3807 10.3807 11.5 9 11.5C7.61929 11.5 6.5 10.3807 6.5 9C6.5 7.61929 7.61929 6.5 9 6.5C10.3807 6.5 11.5 7.61929 11.5 9ZM9 10.6667C9.92047 10.6667 10.6667 9.92047 10.6667 9C10.6667 8.07952 9.92047 7.33333 9 7.33333C8.07953 7.33333 7.33333 8.07952 7.33333 9C7.33333 9.92047 8.07953 10.6667 9 10.6667ZM18.1667 4.83333L14.8333 7.33306V10.6667L18.1667 13.1667V4.83333Z"
                                                                fill="white"
                                                            ></path>
                                                        </g>
                                                        <defs>
                                                            <filter
                                                                id="filter0_d"
                                                                x="0"
                                                                y="0"
                                                                width="22.1667"
                                                                height="18"
                                                                filterUnits="userSpaceOnUse"
                                                                colorInterpolationFilters="sRGB"
                                                            >
                                                                <feFlood
                                                                    floodOpacity="0"
                                                                    result="BackgroundImageFix"
                                                                ></feFlood>
                                                                <feColorMatrix
                                                                    in="SourceAlpha"
                                                                    type="matrix"
                                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                                ></feColorMatrix>
                                                                <feOffset></feOffset>
                                                                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                                                <feColorMatrix
                                                                    type="matrix"
                                                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
                                                                ></feColorMatrix>
                                                                <feBlend
                                                                    mode="normal"
                                                                    in2="BackgroundImageFix"
                                                                    result="effect1_dropShadow"
                                                                ></feBlend>
                                                                <feBlend
                                                                    mode="normal"
                                                                    in="SourceGraphic"
                                                                    in2="effect1_dropShadow"
                                                                    result="shape"
                                                                ></feBlend>
                                                            </filter>
                                                        </defs>
                                                    </svg>
                                                    <div className={cx('feedback__img-vd-time')}>0:15</div>
                                                </div>
                                            </div>
                                            <img
                                                src="https://down-vn.img.susercontent.com/file/vn-11134201-23030-w42nczt2liov68"
                                                alt="kkk"
                                                className={cx('feedback__img-1')}
                                            />
                                            <img
                                                src="https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhehmdw2qlf796"
                                                alt="kkk"
                                                className={cx('feedback__img-1')}
                                            />
                                        </div>
                                        <div className={cx('feedback__like', 'margin-chung')}>
                                            <div className={cx('feedback__like-icon')}>
                                                <FontAwesomeIcon
                                                    className={cx('feedback__like-icon-1')}
                                                    icon={faThumbsUp}
                                                />
                                                <span>10</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <ul className={cx('pagination', 'home-product__pagination')}>
                                    <li className={cx('pagination-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            <FontAwesomeIcon
                                                className={cx('pagination-item__icon')}
                                                icon={faAngleLeft}
                                            />
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item', 'pagination-item--active')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            1
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            2
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            3
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            4
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            5
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item')}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            href="a"
                                            className={cx('pagination-item__link')}
                                        >
                                            ...
                                        </div>
                                    </li>

                                    <li className={cx('pagination-item')}>
                                        <a href="a" className={cx('pagination-item__link')}>
                                            <FontAwesomeIcon
                                                className={cx('pagination-item__icon')}
                                                icon={faAngleRight}
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('suggest')}>
                                <div className={cx('suggest__text')}>CÁC SẢN PHẨM KHÁC CỦA SHOP</div>
                                <span className={cx('plus', 'plus__link')}>
                                    <a href="a" className={cx('cart-plus')}>
                                        Xem Tất Cả
                                        <FontAwesomeIcon className={cx('plus__icon')} icon={faAngleRight} />
                                    </a>
                                </span>
                            </div>
                            <div className={cx('grid__row', 'sp-tuongtu')}>
                                {relatedProducts.length < 1 && (
                                    <div style={{ margin: ' 12px 0 0 5px' }}>Không có sản phẩm liên quan</div>
                                )}
                                {relatedProducts?.map((p) => (
                                    <div
                                        className={cx('grid__column-2-6')}
                                        key={p._id}
                                        onClick={() => {
                                            window.location.reload(navigate(`/product/${p.slug}`));
                                        }}
                                    >
                                        <div className={cx('suggest-product-item')} style={{ cursor: 'pointer' }}>
                                            <img
                                                src={`/api/v1/product/product-photo/${p._id}`}
                                                className={cx('suggest-product-item__img')}
                                                alt={p.name}
                                            />
                                            <h4 className={cx('suggest-product-item__name')}>{p.name}</h4>
                                            <span className={cx('mua-kem', 'dac-biet')}>Giảm ₫5k</span>
                                            <div className={cx('suggest-product-item__price')}>
                                                <span className={cx('suggest-product-item__price-current')}>
                                                    {p.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}
                                                </span>
                                                <span className={cx('suggest-product-item__sold')}>Đã bán 188</span>
                                            </div>
                                            <div className={cx('home-product-item__favourite')}>
                                                <FontAwesomeIcon icon={faCheck} />
                                                <span>Yêu thích</span>
                                            </div>

                                            <div className={cx('home-product-item__sale-off')}>
                                                <span className={cx('home-product-item__sale-off-percent')}>45%</span>
                                                <span className={cx('home-product-item__sale-off-label')}>GIẢM</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('grid__column-2')}>
                            <div className={cx('voucher-sp')}>
                                <div className={cx('ma-gg__head')}>Mã giảm giá của Shop</div>
                                <div tabIndex="-1" className={cx('ma-gg__list')}>
                                    <div className={cx('ma-gg__item')}>
                                        <div className={cx('ma-gg__left')}>
                                            <div className={cx('ma-gg__giam')}>
                                                Giảm <span>₫</span>5k
                                            </div>
                                            <div className={cx('ma-gg__toithieu')}>
                                                Đơn tối thiểu <span>₫</span>109k
                                            </div>
                                            <div className={cx('ma-gg__hsd')}>HSD: 30.06.2023</div>
                                        </div>
                                        <div className={cx('ma-gg__right')}>
                                            <div className={cx('ma-gg__save')}>Lưu</div>
                                        </div>
                                        <div className={cx('ma-gg__conlai')}>x 5</div>
                                    </div>
                                    <div className={cx('ma-gg__item')}>
                                        <div className={cx('ma-gg__left')}>
                                            <div className={cx('ma-gg__giam')}>Giảm 5%</div>
                                            <div className={cx('ma-gg__toithieu')}>
                                                Đơn tối thiểu <span>₫</span>99k
                                            </div>
                                            <div className={cx('ma-gg__toithieu')}>
                                                Giảm tối đa <span>₫</span>10k
                                            </div>
                                            <div className={cx('ma-gg__hsd')}>Đã dùng: 65%, HSD: 31.08.2023</div>
                                        </div>
                                        <div className={cx('ma-gg__right')}>
                                            <div className={cx('ma-gg__save')}>Lưu</div>
                                        </div>
                                    </div>
                                    <div className={cx('ma-gg__item')}>
                                        <div className={cx('ma-gg__left')}>
                                            <div className={cx('ma-gg__giam')}>
                                                Giảm <span>₫</span>10k
                                            </div>
                                            <div className={cx('ma-gg__toithieu')}>
                                                Đơn tối thiểu <span>₫</span>199k
                                            </div>
                                            <div className={cx('ma-gg__hsd')}>HSD: 30.06.2023</div>
                                        </div>
                                        <div className={cx('ma-gg__right')}>
                                            <div className={cx('ma-gg__save')}>Lưu</div>
                                        </div>
                                    </div>
                                    <div className={cx('ma-gg__item')}>
                                        <div className={cx('ma-gg__left')}>
                                            <div className={cx('ma-gg__giam')}>
                                                Giảm <span>₫</span>20k
                                            </div>
                                            <div className={cx('ma-gg__toithieu')}>
                                                Đơn tối thiểu <span>₫</span>350k
                                            </div>
                                            <div className={cx('ma-gg__hsd')}>HSD: 10.09.2023</div>
                                        </div>
                                        <div className={cx('ma-gg__right')}>
                                            <div className={cx('ma-gg__save')}>Lưu</div>
                                        </div>
                                    </div>
                                    <div className={cx('ma-gg__item')}>
                                        <div className={cx('ma-gg__left')}>
                                            <div className={cx('ma-gg__giam')}>
                                                Giảm <span>₫</span>5k
                                            </div>
                                            <div className={cx('ma-gg__toithieu')}>
                                                Đơn tối thiểu <span>₫</span>109k
                                            </div>
                                            <div className={cx('ma-gg__hsd')}>HSD: 30.06.2023</div>
                                        </div>
                                        <div className={cx('ma-gg__right')}>
                                            <div className={cx('ma-gg__save')}>Lưu</div>
                                        </div>
                                        <div className={cx('ma-gg__conlai')}>x 5</div>
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

export default ProductDetail;
