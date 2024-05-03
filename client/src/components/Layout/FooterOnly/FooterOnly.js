import Footer from '../DefaultLayout/Footer/Footer.js';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

import styles from './FooterOnly.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function FooterOnly({ children, description, keywords, author, title }) {
    return (
        <div className={cx('abc')}>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <div className={cx('abcd')}>
                <div className={cx('abcde')}>
                    <Toaster />
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default FooterOnly;
