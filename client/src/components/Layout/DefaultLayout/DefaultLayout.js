import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';

import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function DefaultLayout({ children, title, description, keywords, author }) {
    return (
        <div className={cx('hhh')}>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <Toaster />
            {children}
            <Footer />
        </div>
    );
}

export default DefaultLayout;
