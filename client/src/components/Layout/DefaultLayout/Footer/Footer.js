import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className="footer__item">
                <div className={cx('grid', 'footer-top')}>
                    <div className={cx('grid__row')}>
                        <div className={cx('grid__column-2-4')}>
                            <h3 className={cx('footer__heading')}>Chăm Sóc Khách Hàng</h3>
                            <ul className={cx('footer-list')}>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Trung tâm trợ giúp
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Shopee - Mail
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Hướng Dẫn Mua Hàng
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Hướng Dẫn Bán Hàng
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Thanh Toán
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Vận Chuyển
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Trả hàng & Hoàn Tiền
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid__column-2-4')}>
                            <h3 className={cx('footer__heading')}>Về shopee</h3>
                            <ul className={cx('footer-list')}>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Giới Thiệu Về Shopee Việt Nam
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Tuyển Dụng
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Điều Khoản Shopee
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Kênh Người Bán
                                    </a>
                                </li>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        Flash Sales
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid__column-2-4')}>
                            <h3 className={cx('footer__heading')}>Thanh toán</h3>
                            <div className={cx('footer-pay-list')}>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8"
                                        alt="anh"
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                                <div className={cx('footer-pay-item')}>
                                    <img
                                        src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492"
                                        alt=""
                                        className={cx('footer-pay-item__link')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('grid__column-2-4')}>
                            <h3 className={cx('footer__heading')}>Theo Dõi chúng tôi trên</h3>
                            <ul className={cx('footer-list')}>
                                <li className={cx('footer-item')}>
                                    <a href="a" className={cx('footer-item__link')}>
                                        <FontAwesomeIcon icon={faFacebook} className={cx('footer-item__icon')} />
                                        Facebook
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="a" className={cx('footer-item__link')}>
                                        <FontAwesomeIcon icon={faInstagram} className={cx('footer-item__icon')} />
                                        Instagram
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="a" className={cx('footer-item__link')}>
                                        <FontAwesomeIcon icon={faLinkedin} className={cx('footer-item__icon')} />
                                        Linkedln
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('grid__column-2-4')}>
                            <h3 className={cx('footer__heading')}>Tải Ứng Dụng Shopee Ngay Thôi</h3>
                            <div className={cx('footer__download')}>
                                <img
                                    src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472"
                                    alt="Download QR"
                                    className={cx('footer__download-qr')}
                                />
                                <div className={cx('footer__download-apps')}>
                                    <a href="a" className={cx('footer__download-app-link')}>
                                        <img
                                            className={cx('footer__download-app-img')}
                                            src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163"
                                            alt="Google Play"
                                        />
                                    </a>
                                    <a href="a" className={cx('footer__download-app-link')}>
                                        <img
                                            className={cx('footer__download-app-img')}
                                            src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def"
                                            alt="App Store"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('grid')}>
                    <div className={cx('footer__discribe')}>
                        <div className={cx('footer__discribe-text')}>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
                        <div className={cx('footer__discribe-list')}>
                            <div className={cx('footer__discribe-item')}>
                                <p className={cx('footer__discribe-link')}>Quốc gia & Khu vực:</p>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Sigapore
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Indonesia
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Đài Loan
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Thái Lan
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Malaysia
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Việt Nam
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Philippines
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Brazil
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    México
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Colombia
                                </a>
                            </div>
                            <div className={cx('footer__discribe-item')}>
                                <a href="a" className={cx('footer__discribe-link')}>
                                    Chile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer__bottom')}>
                <div className={cx('grid')}>
                    <div className={cx('footer-policy', 'footer__text')}>
                        <a href="hhh" className={cx('footer-policy__text')}>
                            <span>CHÍNH SÁCH BẢO MẬT</span>
                        </a>
                        <a href="hhh" className={cx('footer-policy__text')}>
                            <span>QUY CHẾ HOẠT ĐỘNG</span>
                        </a>
                        <a href="hhh" className={cx('footer-policy__text')}>
                            <span>CHÍNH SÁCH VẬN CHUYỂN</span>
                        </a>
                        <a href="hhh" className={cx('footer-policy__text', 'footer-policy__texte')}>
                            <span>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</span>
                        </a>
                    </div>
                    <div className={cx('footer__text')}>
                        <a href="a" className={cx('footer-license__imglink')}>
                            <div
                                className={cx('footer-license__img', 'footer-license__imgg', 'footer-license__imggg')}
                            ></div>
                        </a>
                        <a href="a" className={cx('footer-license__imglink')}>
                            <div
                                className={cx('footer-license__img', 'footer-license__imgg', 'footer-license__imggg')}
                            ></div>
                        </a>
                        <a href="a" className={cx('footer-license__imglink')}>
                            <div
                                className={cx('footer-license__img', 'footer-license__img2', 'footer-license__img3')}
                            ></div>
                        </a>
                    </div>
                    <p className={cx('footer__text')}>Công ty TNHH Shopee</p>
                    <p className={cx('footer__text')}>
                        Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba
                        Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
                    </p>
                    <p className={cx('footer__text')}>
                        Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
                    </p>
                    <p className={cx('footer__text')}>
                        Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
                    </p>
                    <p className={cx('footer__text')}>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
                    <div className={cx('chat', 'chat-box')}>
                        <FontAwesomeIcon icon={faComment} className={cx('chat__icon')}></FontAwesomeIcon>
                        <div className={cx('chat__text')}>Chat</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
