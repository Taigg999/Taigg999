import React, { useEffect, useState } from 'react';
import { useSearch } from '../../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../Layout/DefaultLayout/Header/Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const SearchInput = () => {
    const [values, setValues] = useSearch({ history: [] });
    const navigate = useNavigate();
    const [selectedKeyword, setSelectedKeyword] = useState(null);
    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);

            // Cập nhật cả kết quả và lịch sử tìm kiếm
            if (Array.isArray(values.history)) {
                const updatedHistory = [...values.history, values.keyword];
                setValues({ ...values, results: data, history: updatedHistory });
            } else {
                setValues({ ...values, results: data, history: [values.keyword] });
            }

            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchHistoryItemClick = (keyword) => {
        setSelectedKeyword(keyword);
    };
    useEffect(() => {
        // Kiểm tra selectedKeyword có giá trị không null
        if (selectedKeyword !== null) {
            // Thực hiện tìm kiếm với từ khóa được chọn
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeyword]);
    return (
        <form className={cx('header__search-input-wrap')} role="search" onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Tổng kho voucher xịn 4.4"
                className={cx('header__search-input', 'header__search-input')}
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            />
            <div className={cx('header__search-history')}>
                <h3 className={cx('header__search-history-heading')}>Lịch sử tìm kiếm</h3>
                <ul className={cx('header__search-history-list')}>
                    {values.history &&
                        values.history.map((item, index) => (
                            <li
                                key={index}
                                className={cx('header__search-history-item')}
                                onClick={() => handleSearchHistoryItemClick(item)}
                            >
                                <div>{item}</div>
                            </li>
                        ))}
                </ul>
            </div>
            {selectedKeyword !== null && (
                <div>
                    Bạn đã chọn từ khóa: {selectedKeyword} -{' '}
                    <button onClick={() => setSelectedKeyword(null)}>Tìm kiếm lại</button>
                </div>
            )}
            <button className={cx('header__search-btn')} type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('header__search-btn-icon')} />
            </button>
        </form>
    );
};

export default SearchInput;
