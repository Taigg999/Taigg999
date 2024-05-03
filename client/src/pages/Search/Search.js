import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import classNames from 'classnames/bind';
import styles from '../Home/Home.module.scss';
const cx = classNames.bind(styles);

const Search = () => {
    const divStyle = {
        marginTop: '140px',
        marginBottom: '36px',
    };
    // eslint-disable-next-line no-unused-vars
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    return (
        <DefaultLayout title={'Tìm kiếm | Sopi VN'}>
            <div className="container" style={divStyle}>
                <div className={cx('grid')}>
                    <div className="d-flex align-items-center ml-2">
                        <div style={{ fontSize: '2.2rem' }}>Kết quả tìm kiếm cho từ</div>
                        <div style={{ color: '#EE4D2D', fontSize: '2.4rem', marginLeft: '10px' }}>
                            "{values?.keyword}"
                        </div>
                    </div>
                    <h5 className="mt-3 ml-2">
                        {values?.results.length < 1 ? 'Không tìm thấy' : `Tìm thấy ${values?.results.length} kết quả`}
                    </h5>
                    <div className={cx('grid__row')}>
                        {values?.results.map((p) => (
                            <div className={cx('grid__column-2-6')} onClick={() => navigate(`/product/${p.slug}`)}>
                                <div className={cx('suggest-product-item')} style={{ cursor: 'pointer' }}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className={cx('suggest-product-item__img')}
                                        alt={p.name}
                                    />
                                    <h4 className={cx('suggest-product-item__name')}>{p.name}</h4>
                                    <div className={cx('suggest-product-item__price')}>
                                        <span className={cx('suggest-product-item__price-current')}>₫{p.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Search;
