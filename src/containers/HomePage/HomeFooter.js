import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import specialtyImg from '../../assets/speciatly/co-xuong.png'
// import './HomeFooter.scss'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >
        </div>
    );
}
class HomeFooter extends Component {





    render() {

        return (
            <div className='home-footer'>
                <div className='footer-container'>
                    <div className='footer-content'>
                        <div className='left-content'>
                            <h3>BookingCare</h3>
                            <p>Công ty Cổ phần Công nghệ BookingCare</p>
                            <p>Địa chỉ: 280 An Dương Vương, Phường 4, Quận 5, Thành phố Hồ Chí Minh</p>
                            <p>ĐKKD số: 0106790291. Sở KHĐT TP Hồ Chí Minh cấp ngày 16/03/2015</p>
                        </div>
                        <div className='center-content'>
                            <h3>Liên hệ hợp tác</h3>
                            <p>Email: support@bookingcare.vn</p>
                            <p>Hotline: 024-7301-2468</p>
                            <div className='social-links'>
                                <a href="#"><i className="fab fa-facebook"></i></a>
                                <a href="#"><i className="fab fa-youtube"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div className='right-content'>
                            <h3>Tải ứng dụng BookingCare</h3>
                            <div className='app-links'>
                                <a href="#" className="app-button">
                                    <i className="fab fa-apple"></i>
                                    App Store
                                </a>
                                <a href="#" className="app-button">
                                    <i className="fab fa-google-play"></i>
                                    Google Play
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
