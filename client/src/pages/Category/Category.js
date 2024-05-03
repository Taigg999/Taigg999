import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from './Category.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faFilter,
    faHeart,
    faRotateRight,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../../components/Prices';

const cx = classNames.bind(styles);

function Category() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //tổng số sản phẩm
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count');
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    //xem thêm
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    //toàn bộ dnah mục
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    //lọc sản phẩm
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    //toàn bộ sản phẩm
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (!checked.length || !radio.length) getAllProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked, radio]);

    //lọc theo radio, checkbox
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', {
                checked,
                radio,
            });
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    //lọc theo giá thấp-cao và ngược lại
    // eslint-disable-next-line no-unused-vars
    const [sortedBy, setSortedBy] = useState(null);
    const sortByPrice = (order) => {
        const sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        });
        setProducts(sortedProducts);
        setSortedBy(order);
    };

    return (
        <DefaultLayout title={'Danh mục sản phẩm | Sopi VN'}>
            <div className={cx('app__container')}>
                <div className={cx('grid')}>
                    <div className={cx('banner')}></div>
                    <div className={cx('grid__row', 'app__content')}>
                        <div className={cx('grid__column-2')}>
                            <nav className={cx('category')}>
                                <h3 className={cx('category__heading')}>
                                    <FontAwesomeIcon
                                        className={cx('category__heading-icon')}
                                        icon={faFilter}
                                    ></FontAwesomeIcon>
                                    BỘ LỌC TÌM KIẾM
                                </h3>

                                <ul className={cx('category-list')}>
                                    <div className={cx('category-list__item')}>
                                        <h4>Theo danh mục</h4>
                                        <div className="d-flex flex-column justify-content-around mb-3">
                                            {categories?.map((c) => (
                                                <Checkbox
                                                    key={c._id}
                                                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                                                >
                                                    {c.name}
                                                </Checkbox>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cx('category-list__item')}>
                                        <h4>Khoảng giá</h4>
                                        <div className="d-flex flex-column justify-content-around mb-3">
                                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                                {Prices?.map((p) => (
                                                    <div key={p._id}>
                                                        <Radio value={p.array}>{p.name}</Radio>
                                                    </div>
                                                ))}
                                            </Radio.Group>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <button
                                            className={cx('btn', 'btn--primary')}
                                            onClick={() => window.location.reload()}
                                        >
                                            XÓA TẤT CẢ
                                        </button>
                                    </div>
                                </ul>
                            </nav>
                        </div>
                        <div className={cx('grid__column-10')}>
                            <div className={cx('infomation')}>
                                <div className={cx('if-left')}>
                                    <div className={cx('name-shop')}>
                                        <div className={cx('shopee-img')}>
                                            <svg
                                                enableBackground="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                className={cx('shopee-svg-icon', 'icon-headshot')}
                                            >
                                                <g>
                                                    <circle
                                                        cx="7.5"
                                                        cy="4.5"
                                                        fill="none"
                                                        r="3.8"
                                                        strokeMiterlimit="10"
                                                    ></circle>
                                                    <path
                                                        d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeMiterlimit="10"
                                                    ></path>
                                                </g>
                                            </svg>
                                            <img
                                                src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/mat-yasuo-16-10-58-00.jpg"
                                                alt=""
                                                className={cx('shop-img')}
                                            />
                                        </div>
                                        <div className={cx('shop-liked')}>Yêu thích</div>
                                    </div>
                                    <div className={cx('info-shop')}>
                                        <div className={cx('tg-shop')}>I am TaiGG</div>
                                        <div className={cx('tg-shop')}>taigg.official</div>
                                        <div className={cx('follow-shop')}>
                                            <div className={cx('follow-shop__left')}>
                                                <span className={cx('follower')}>11,8k</span>
                                                <span className={cx('follower')}> Người Theo Dõi</span>
                                            </div>
                                            <div className={cx('follow-shop__right')}>
                                                <span className={cx('follower')}>46</span>
                                                <span className={cx('follower')}> Đang Theo Dõi</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('if-right')}>
                                    <div className={cx('if-right__list')}>
                                        <div className={cx('if-right__item')}>
                                            <svg
                                                enableBackground="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                className={cx('shopee-svg-icon', 'icon-products')}
                                            >
                                                <g>
                                                    <path
                                                        d="m10 1 4.5 2.5-.5 3h-2v7.5h-9v-7.5h-2l-.5-3 4.6-2.5c.3 1.1 1.3 1.9 2.4 1.9s2.1-.8 2.5-1.9z"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                    ></path>
                                                    <line
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeMiterlimit="10"
                                                        x1="3"
                                                        x2="12"
                                                        y1="11.5"
                                                        y2="11.5"
                                                    ></line>
                                                </g>
                                            </svg>
                                            <span> 224</span>
                                        </div>
                                        <div className={cx('if-right__item')}>Sản Phẩm</div>
                                    </div>
                                    <div className={cx('if-right__list')}>
                                        <div className={cx('if-right__item')}>
                                            <svg
                                                enableBackground="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                className={cx('shopee-svg-icon', 'icon-rating')}
                                            >
                                                <polygon
                                                    fill="none"
                                                    points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeMiterlimit="10"
                                                ></polygon>
                                            </svg>
                                            <span> 4.9</span>
                                        </div>
                                        <div className={cx('if-right__item')}>Đánh Giá</div>
                                    </div>
                                    <div className={cx('if-right__list')}>
                                        <div className={cx('if-right__item')}>
                                            <svg
                                                enableBackground="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                className={cx('shopee-svg-icon')}
                                            >
                                                <g>
                                                    <polygon
                                                        fill="none"
                                                        points="14 10.8 7 10.8 3 13.8 3 10.8 1 10.8 1 1.2 14 1.2"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                    ></polygon>
                                                    <circle cx="4" cy="5.8" r="1" stroke="none"></circle>
                                                    <circle cx="7.5" cy="5.8" r="1" stroke="none"></circle>
                                                    <circle cx="11" cy="5.8" r="1" stroke="none"></circle>
                                                </g>
                                            </svg>
                                            <span> 97%</span>
                                        </div>
                                        <div className={cx('if-right__item')}>Tỉ Lệ Phản Hồi</div>
                                    </div>
                                    <div className={cx('if-right__list')}>
                                        <div className={cx('if-right__item')}>
                                            <svg
                                                enableBackground="new 0 0 15 15"
                                                viewBox="0 0 15 15"
                                                x="0"
                                                y="0"
                                                className={cx('shopee-svg-icon')}
                                            >
                                                <g>
                                                    <polyline
                                                        fill="none"
                                                        points="7.2 3.5 7.2 7.8 10.5 7.8"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeMiterlimit="10"
                                                    ></polyline>
                                                    <circle
                                                        cx="7.5"
                                                        cy="7.5"
                                                        fill="none"
                                                        r="6.5"
                                                        strokeMiterlimit="10"
                                                    ></circle>
                                                </g>
                                            </svg>
                                            <span> trong vài giờ</span>
                                        </div>
                                        <div className={cx('if-right__item')}>Thời Gian Phản Hồi</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('home-filter')}>
                                <span className={cx('home-filter__label')}>Sắp xếp theo</span>
                                <button className={cx('btn', 'home-filter__btn', 'btn--primary')}>Phổ biến</button>
                                <button className={cx('btn', 'home-filter__btn')}>Mới nhất</button>
                                <button className={cx('btn', 'home-filter__btn')}>Bán chạy</button>

                                <div className={cx('select-input')}>
                                    <span className={cx('select-input__label')}>Giá</span>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className={cx('select-input__icon')}
                                    ></FontAwesomeIcon>
                                    <ul className={cx('select-input__list')}>
                                        <li className={cx('select-input__item')}>
                                            <div
                                                className={cx('select-input__item-link')}
                                                onClick={() => sortByPrice('asc')}
                                            >
                                                Thấp đến Cao
                                            </div>
                                        </li>
                                        <li className={cx('select-input__item')}>
                                            <div
                                                className={cx('select-input__item-link')}
                                                onClick={() => sortByPrice('desc')}
                                            >
                                                Cao đến Thấp
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className={cx('home-filter__page')}>
                                    <span className={cx('home-filter__page-num')}>
                                        <span className={cx('home-filter__page-current')}>1</span>/6
                                    </span>

                                    <div className={cx('home-filter__page-control')}>
                                        <a
                                            href="a"
                                            className={cx('home-filter__page-btn', 'home-filter__page-btn--disable')}
                                        >
                                            <FontAwesomeIcon
                                                className={cx('home-filter__page-icon')}
                                                icon={faAngleLeft}
                                            ></FontAwesomeIcon>
                                        </a>

                                        <a
                                            href="a"
                                            className={cx('home-filter__page-btn', 'home-filter__page-btn--enable')}
                                        >
                                            <FontAwesomeIcon
                                                className={cx('home-filter__page-icon')}
                                                icon={faAngleRight}
                                            ></FontAwesomeIcon>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('home-product')}>
                                <div className={cx('grid__row')}>
                                    {products?.slice(0, 15).map((p) => (
                                        <div
                                            className={cx('grid__column-2-4')}
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            <div className={cx('home-product-item')} style={{ cursor: 'pointer' }}>
                                                <img
                                                    src={`/api/v1/product/product-photo/${p._id}`}
                                                    className={cx('home-product-item__img')}
                                                    alt={p.name}
                                                />
                                                <h4 className={cx('home-product-item__name')}>{p.name}</h4>
                                                <div className={cx('home-product-item__price')}>
                                                    <span className={cx('home-product-item__price-current')}>
                                                        ₫ {p.price}
                                                    </span>
                                                </div>
                                                <div className={cx('home-product-item__action')}>
                                                    <span
                                                        className={cx(
                                                            'home-product-item__like',
                                                            'home-product-item__like--liked',
                                                        )}
                                                    >
                                                        <FontAwesomeIcon
                                                            className={cx('home-product-item__like-icon-empty')}
                                                            icon={faHeart}
                                                        />
                                                        <FontAwesomeIcon
                                                            className={cx('home-product-item__like-icon-fill')}
                                                            icon={faHeart}
                                                        />
                                                    </span>

                                                    <div className={cx('home-product-item__rating')}>
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={cx('home-product-item__star')}
                                                        ></FontAwesomeIcon>
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={cx('home-product-item__star')}
                                                        ></FontAwesomeIcon>
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={cx('home-product-item__star')}
                                                        ></FontAwesomeIcon>
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            className={cx('home-product-item__star')}
                                                        ></FontAwesomeIcon>

                                                        <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                                                    </div>
                                                    <span className={cx('home-product-item__sold')}>Đã bán 1,7k</span>
                                                </div>
                                                <div className={cx('home-product-item__origin')}>
                                                    <span className={cx('home-product-item__brand')}>TaiGG</span>
                                                    <span className={cx('home-product-item__origin-name')}>Hà Nội</span>
                                                </div>
                                                <div className={cx('home-product-item__favourite')}>
                                                    <i className="fa-solid fa-check"></i>
                                                    <span>Yêu thích</span>
                                                </div>
                                                <div className={cx('home-product-item__sale-off')}>
                                                    <span className={cx('home-product-item__sale-off-percent')}>
                                                        43%
                                                    </span>
                                                    <span className={cx('home-product-item__sale-off-label')}>
                                                        GIẢM
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="m-2 p-3 text-center">
                                {products && products.length < total && (
                                    <button
                                        className="btn btn-secondary loadmore"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page + 1);
                                        }}
                                    >
                                        {loading ? (
                                            'Đang tải...'
                                        ) : (
                                            <>
                                                {' '}
                                                <span>Xem thêm</span>
                                                <FontAwesomeIcon icon={faRotateRight} className="ml-3" />
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default Category;
