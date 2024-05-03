import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import { SliderData } from './SliderData';
import ImageSlider from './ImageSlider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Home() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product`);

            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <DefaultLayout title={'Sopi VN'}>
            <div className={cx('app__container')}>
                <div className={cx('banner-and-function')}>
                    <div className={cx('banner')}>
                        <div className={cx('flex-banner')}>
                            <ImageSlider slides={SliderData} style={{ zIndex: '0' }} />
                            <div className={cx('banner-2-and-3')}>
                                <img
                                    src="https://cf.shopee.vn/file/vn-50009109-e51b4e8fbf8d35d2489a219b3dd33dcf_xxhdpi"
                                    alt="bane"
                                    className={cx('banner-2', 'banner-img')}
                                />
                                <img
                                    src="https://cf.shopee.vn/file/vn-50009109-e7a4ed9371dac474a15d25e55fc86939_xxhdpi"
                                    alt="bane"
                                    className={cx('banner-3', 'banner-img')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx('grid')}>
                        <div className={cx('grid__row', 'app__function')}>
                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="jsd"
                                            src="https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Khung Giờ Săn Sale</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="sad"
                                            src="https://cf.shopee.vn/file/vn-50009109-c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Miễn Phí Vận Chuyển</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="hha"
                                            src="https://cf.shopee.vn/file/vn-50009109-11d9732a464d895d3699ca40431d0bfd_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Voucher Giảm Đến 500.000Đ</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="kda"
                                            src="https://cf.shopee.vn/file/vn-50009109-852300c407c5e79bf5dc1854aa0cfeef_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Hàng Hiệu Outlet Giảm 50%</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="sjd"
                                            src="https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Mã Giảm Giá</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="hhh"
                                            src="https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Nạp Thẻ, Dịch Vụ & Data</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="hhh"
                                            src="https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Hàng Quốc Tế</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-1')}>
                                <div className={cx('function')}>
                                    <div className={cx('function__img')}>
                                        <img
                                            alt="hhh"
                                            src="https://cf.shopee.vn/file/vn-50009109-91399a1d3ed283d272b069fac5ca989c_xhdpi"
                                            className={cx('function__logo')}
                                        />
                                    </div>
                                    <div className={cx('function__text')}>Shopee Siêu Rẻ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Category */}
                <div className={cx('general')}>
                    <div className={cx('grid', 'general-product')}>
                        <div className={cx('general-product__category')}>DANH MỤC</div>
                        <div className={cx('grid__row', 'grid__row-unpadding')}>
                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Thời Trang Nam</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Điện Thoại & Phụ Kiện</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Thiết Bị Điện Tử</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Máy Tính & Laptop</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Máy Ảnh & Máy Quay Phim</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Đồng Hồ</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Giày Dép Nam</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Thiết Bị Điện Gia Dụng</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Thể Thao & Du Lịch</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Ô Tô, Xe Máy & Xe Đạp</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Thời Trang Nữ</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Mẹ & Bé</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Nhà Cửa & Đời Sống</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Sắc Đẹp</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Sức Khỏe</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Giày Dép Nữ</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Túi Ví Nữ</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Phụ Kiện & Trang Sức</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/c432168ee788f903f1ea024487f2c889_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Bách Hóa Online</div>
                                </div>
                            </div>

                            <div className={cx('grid__column-9', 'hover__column-9')}>
                                <div className={cx('general-product__item')}>
                                    <img
                                        alt="hhh"
                                        src="https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139_tn"
                                        className={cx('general-product__logo')}
                                    />
                                    <div className={cx('general-product__text')}>Nhà Sách Online</div>
                                </div>
                            </div>

                            <div className={cx('general-plus')}>
                                <FontAwesomeIcon icon={faAngleRight} className={cx('general-plus__icon')} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Flash sale */}
                <div className={cx('grid')}>
                    <div className={cx('fls')}>
                        <div className={cx('flash-sale')}>
                            <div className={cx('flash-sale__img-time')}>
                                <img
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png"
                                    alt="fls"
                                    className={cx('flash-sale__img')}
                                />
                                {/* fls time */}
                            </div>
                            <div className={cx('flash-sale__link')}>
                                Xem Tất Cả
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className={cx('flash-sale__icon')}
                                ></FontAwesomeIcon>
                            </div>
                        </div>

                        <div className={cx('grid__row', 'grid__row-unpadding')}>
                            <div className={cx('grid__column-2-6')}>
                                <div className={cx('flash-sale__product')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-50009109-10aff59f5695c0bdad5c4964fd6fdcb7_tn"
                                        alt="anhh"
                                        className={cx('flash-sale-product__img')}
                                    />

                                    <div className={cx('flash-sale__price')}>₫ 399.000</div>

                                    <div className={cx('flash-sale__rating')}>ĐÃ BÁN 181</div>

                                    <div className={cx('flash-sale-product__favourite')}>
                                        <span>Mall</span>
                                    </div>

                                    <div className={cx('flash-sale-product__sale-off')}>
                                        <span className={cx('flash-sale-product__sale-off-percent')}>33%</span>
                                        <span className={cx('flash-sale-product__sale-off-label')}>GIẢM</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('grid__column-2-6')}>
                                <div className={cx('flash-sale__product')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-50009109-3452d1f6f443ae973c247ddbe2e5d2f0_tn"
                                        alt="aa"
                                        className={cx('flash-sale-product__img')}
                                    />

                                    <div className={cx('flash-sale__price')}>₫ 1.099.000</div>

                                    <div className={cx('flash-sale__rating')}>ĐANG BÁN CHẠY</div>

                                    <div className={cx('flash-sale-product__favourite')}>
                                        <span>Mall</span>
                                    </div>

                                    <div className={cx('flash-sale-product__sale-off')}>
                                        <span className={cx('flash-sale-product__sale-off-percent')}>18%</span>
                                        <span className={cx('flash-sale-product__sale-off-label')}>GIẢM</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('grid__column-2-6')}>
                                <div className={cx('flash-sale__product')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ls6g2y6njrgkb9_tn"
                                        alt="aaa"
                                        className={cx('flash-sale-product__img')}
                                    />

                                    <div className={cx('flash-sale__price')}>₫ 967.000</div>

                                    <div className={cx('flash-sale__rating')}>ĐANG BÁN CHẠY</div>

                                    <div className={cx('flash-sale-product__favourite')}>
                                        <span>Mall</span>
                                    </div>

                                    <div className={cx('flash-sale-product__sale-off')}>
                                        <span className={cx('flash-sale-product__sale-off-percent')}>20%</span>
                                        <span className={cx('flash-sale-product__sale-off-label')}>GIẢM</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('grid__column-2-6')}>
                                <div className={cx('flash-sale__product')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/7e2b8c67f60b156c1cb60b3faaf2f68b_tn"
                                        alt="aaa"
                                        className={cx('flash-sale-product__img')}
                                    />

                                    <div className={cx('flash-sale__price')}>₫ 1.257.000</div>

                                    <div className={cx('flash-sale__rating')}>ĐANG BÁN CHẠY</div>

                                    <div className={cx('flash-sale-product__favourite')}>
                                        <span>Mall</span>
                                    </div>

                                    <div className={cx('flash-sale-product__sale-off')}>
                                        <span className={cx('flash-sale-product__sale-off-percent')}>15%</span>
                                        <span className={cx('flash-sale-product__sale-off-label')}>GIẢM</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('grid__column-2-6')}>
                                <div className={cx('flash-sale__product')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lthn0j910ljhfc_tn"
                                        alt="aa"
                                        className={cx('flash-sale-product__img')}
                                    />

                                    <div className={cx('flash-sale__price')}>₫ 599.000</div>

                                    <div className={cx('flash-sale__rating')}>ĐÃ BÁN 203</div>

                                    <div className={cx('flash-sale-product__favourite')}>
                                        <span>Mall</span>
                                    </div>

                                    <div className={cx('flash-sale-product__sale-off')}>
                                        <span className={cx('flash-sale-product__sale-off-percent')}>50%</span>
                                        <span className={cx('flash-sale-product__sale-off-label')}>GIẢM</span>
                                    </div>
                                </div>
                            </div>

                            <div className={cx('grid__column-2-6')}>
                                <div className={cx('flash-sale__product')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lstlfjmky9i157_tn"
                                        alt="aaaaaaa"
                                        className={cx('flash-sale-product__img')}
                                    />

                                    <div className={cx('flash-sale__price')}>₫ 399.000</div>

                                    <div className={cx('flash-sale__rating')}>ĐÃ BÁN 103</div>

                                    <div className={cx('flash-sale-product__favourite')}>
                                        <span>Mall</span>
                                    </div>

                                    <div className={cx('flash-sale-product__sale-off')}>
                                        <span className={cx('flash-sale-product__sale-off-percent')}>25%</span>
                                        <span className={cx('flash-sale-product__sale-off-label')}>GIẢM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="general-plus fls-plus">
                                <i className="general-plus__icon fa-solid fa-angle-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner-pr */}
                <div className={cx('grid')}>
                    <img
                        src="https://cf.shopee.vn/file/sg-50009109-6ee5e6f0d5992a9c61e17a181cf7d4d6"
                        alt="bnne"
                        className={cx('banner-pr')}
                    />
                </div>
                {/* Shop mall */}
                <div className={cx('grid')}>
                    <div className={cx('shop-mall')}>
                        <div className={cx('shop-mall__header')}>
                            <div className={cx('shop-mall__list')}>
                                <div className={cx('shop-mall__link')}>
                                    <a href="hhh">SHOPEE MALL</a>
                                </div>
                                <div className={cx('shop-mall__item')}>
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/6c502a2641457578b0d5f5153b53dd5d.png"
                                        alt="g"
                                        className={cx('shop-mall__function')}
                                    />
                                    <span className={cx('shop-mall__text')}>7 Ngày Miễn Phí Trả Hàng</span>
                                </div>
                                <div className={cx('shop-mall__item')}>
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/511aca04cc3ba9234ab0e4fcf20768a2.png"
                                        alt="g"
                                        className={cx('shop-mall__function')}
                                    />
                                    <span className={cx('shop-mall__text')}>Hàng Chính Hãng 100%</span>
                                </div>
                                <div className={cx('shop-mall__item')}>
                                    <img
                                        src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/16ead7e0a68c3cff9f32910e4be08122.png"
                                        alt="g"
                                        className={cx('shop-mall__function')}
                                    />
                                    <span className={cx('shop-mall__text')}>Miễn Phí Vận Chuyển</span>
                                </div>
                            </div>
                            <div className={cx('shop-mall__list')}>
                                <a href="hhh" className={cx('shop-mall__plus')}>
                                    Xem Tất Cả
                                </a>
                                <FontAwesomeIcon
                                    className={cx('shop-mall__icon')}
                                    icon={faAngleRight}
                                ></FontAwesomeIcon>
                            </div>
                        </div>

                        <div className={cx('shop-mall__container')}>
                            <div className={cx('grid__row')}>
                                <div className={cx('grid-column-4')}>
                                    <img
                                        className={cx('shop-mall__container-img')}
                                        src="https://cf.shopee.vn/file/vn-50009109-6c255422ffdb7ee0662925771c225d9c"
                                        alt="afa"
                                    />
                                </div>

                                <div className={cx('grid-column-8', 'shop-mall-plus')}>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-85797e97fb31583fb99b85283e415821_xhdpi"
                                            alt="hh"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Mua 1 được 2</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-7e80ab64bdc989f5c0862ed828f343a2_xhdpi"
                                            alt="hh"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Ưu đãi đến 50%</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/be40023a9d9cff397a470460bc7a924d_xhdpi"
                                            alt="a"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Deli siêu sale</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-7ce7d5800afb2b6c80a7242236ec7409_xhdpi"
                                            alt="aa"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Mua là có quà</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-06fb832ef52b45481158c26831cc459b_xhdpi"
                                            alt="aaa"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Thời trang -50%</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-9f9896201e1c40c747e3bd3118b68d3a_xhdpi"
                                            alt="aa"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Mua 1 được 2</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-08a87dd1e828b4bef31dafa67d5300ec_xhdpi"
                                            alt="aaaaa"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Quà mọi đơn</div>
                                    </div>
                                    <div className={cx('grid-column-2-8')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/vn-50009109-b40bffb7cc40ddfe3e234c9d72c8584f_xhdpi"
                                            alt="aaaaa"
                                            className={cx('shop-mall__container-deal')}
                                        />
                                        <div className={cx('shop-mall__container-text')}>Giảm đến 50%</div>
                                    </div>
                                    <div className="general-plus mall__hover">
                                        <i className="general-plus__icon fa-solid fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Top search */}
                <div className={cx('grid')}>
                    <div className={cx('top-search')}>
                        <div className={cx('top-search__header')}>
                            <div className={cx('top-search__header-list')}>TÌM KIẾM HÀNG ĐẦU</div>
                            <a href="hhh" className={cx('top-search__header-link')}>
                                Xem Tất Cả
                                <FontAwesomeIcon
                                    className={cx('flash-sale__icon')}
                                    icon={faAngleRight}
                                ></FontAwesomeIcon>
                            </a>
                        </div>

                        <div className={cx('top-search__product')}>
                            <div className={cx('grid__row')}>
                                <div className={cx('grid__column-2-6')}>
                                    <div className={cx('top-search__product-item')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/d872891e1ee6979885c10d89111df707"
                                            alt="ag"
                                            className={cx('top-search__product-img')}
                                        />
                                        <div className={cx('top-search__product-text')}>Bộ Đồ Nam</div>
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/rcmd/06720e49514cbd94b7552496b4de454a.png"
                                            alt="ag"
                                            className={cx('top-search__product-like')}
                                        />
                                        <div className={cx('top-search__product-rating')}>Bán 25k+ / tháng</div>
                                    </div>
                                </div>

                                <div className={cx('grid__column-2-6')}>
                                    <div className={cx('top-search__product-item')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/cf210252c48ebcc906336eaa984736e5"
                                            alt="ag"
                                            className={cx('top-search__product-img')}
                                        />
                                        <div className={cx('top-search__product-text')}>Nước Hoa Nam</div>
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/rcmd/06720e49514cbd94b7552496b4de454a.png"
                                            alt="ag"
                                            className={cx('top-search__product-like')}
                                        />
                                        <div className={cx('top-search__product-rating')}>Bán 39k+ / tháng</div>
                                    </div>
                                </div>

                                <div className={cx('grid__column-2-6')}>
                                    <div className={cx('top-search__product-item')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/1cb79cd31ef7fcb224130bc55fb57b9e"
                                            alt="ag"
                                            className={cx('top-search__product-img')}
                                        />
                                        <div className={cx('top-search__product-text')}>Sạc Dự Phòng</div>
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/rcmd/06720e49514cbd94b7552496b4de454a.png"
                                            alt="ag"
                                            className={cx('top-search__product-like')}
                                        />
                                        <div className={cx('top-search__product-rating')}>Bán 7k+ / tháng</div>
                                    </div>
                                </div>

                                <div className={cx('grid__column-2-6')}>
                                    <div className={cx('top-search__product-item')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/8d7e1b704d5d3f0fc05ddf76ff0da719"
                                            alt="ag"
                                            className={cx('top-search__product-img')}
                                        />
                                        <div className={cx('top-search__product-text')}>Dép Quai Ngang</div>
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/rcmd/06720e49514cbd94b7552496b4de454a.png"
                                            alt="ag"
                                            className={cx('top-search__product-like')}
                                        />
                                        <div className={cx('top-search__product-rating')}>Bán 2k+ / tháng</div>
                                    </div>
                                </div>

                                <div className={cx('grid__column-2-6')}>
                                    <div className={cx('top-search__product-item')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/ad15aa37523b5de343913cb79952957b"
                                            alt="ag"
                                            className={cx('top-search__product-img')}
                                        />
                                        <div className={cx('top-search__product-text')}>Thắt Lưng Nam</div>
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/rcmd/06720e49514cbd94b7552496b4de454a.png"
                                            alt="ag"
                                            className={cx('top-search__product-like')}
                                        />
                                        <div className={cx('top-search__product-rating')}>Bán 7k+ / tháng</div>
                                    </div>
                                </div>

                                <div className={cx('grid__column-2-6')}>
                                    <div className={cx('top-search__product-item')}>
                                        <img
                                            src="https://down-vn.img.susercontent.com/file/e561d5b5de63d35f66e52f172b0821d6"
                                            alt="ag"
                                            className={cx('top-search__product-img')}
                                        />
                                        <div className={cx('top-search__product-text')}>Quần Lót Nữ Cotton</div>
                                        <img
                                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/rcmd/06720e49514cbd94b7552496b4de454a.png"
                                            alt="ag"
                                            className={cx('top-search__product-like')}
                                        />
                                        <div className={cx('top-search__product-rating')}>Bán 7k+ / tháng</div>
                                    </div>
                                </div>

                                <div className="general-plus top-search__plus">
                                    <i className="general-plus__icon fa-solid fa-angle-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Suggest */}
                <div className={cx('grid')}>
                    <div className={cx('suggest')}>
                        <div className={cx('suggest__text')}>GỢI Ý HÔM NAY</div>
                    </div>
                    <div className={cx('grid__row')}>
                        {products?.map((p) => (
                            <div className={cx('grid__column-2-6')} onClick={() => navigate(`/product/${p.slug}`)}>
                                <div className={cx('suggest-product-item')} style={{ cursor: 'pointer' }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className={cx('suggest-product-item__img')}
                                        alt={p.name}
                                    />
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/vn-50009109-e033389e5d593c2f59cdef16abd157f7"
                                        alt="https://down-vn.img.susercontent.com/file/vn-50009109-e033389e5d593c2f59cdef16abd157f7"
                                        className={cx('home-product-item__free-ship')}
                                    />
                                    <h4 className={cx('suggest-product-item__name')}>{p.name}</h4>
                                    <span className={cx('dac-biet')}> </span>
                                    <div className={cx('suggest-product-item__price')}>
                                        <span className={cx('suggest-product-item__price-current')}>₫{p.price}</span>
                                        <span className={cx('suggest-product-item__sold')}>Đã bán 48</span>
                                    </div>

                                    <div className={cx('home-product-item__favourite')}>
                                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
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
                    <div className={cx('suggest-p')}>
                        <button className={cx('suggest-plus')}>Xem Thêm</button>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Home;
