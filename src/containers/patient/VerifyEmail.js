import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import { postVerifyBookAppointment } from '../../services/userService';
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../HomePage/HomeHeader"
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');

            try {
                let res = await postVerifyBookAppointment({
                    token: token,
                    doctorId: doctorId
                });

                this.setState({
                    stateVerify: true,
                    errCode: res && res.errCode === 0 ? 0 : -1
                });
            } catch (error) {
                this.setState({
                    stateVerify: true,
                    errCode: -1
                });
            }
        }
    }

    handleReturnHome = () => {
        if (this.props.history) {
            this.props.history.push('/home');
        }
    }

    render() {
        const { stateVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    <div className="message-box">
                        <div className={`message ${errCode === 0 ? 'success' : 'error'}`}>
                            {errCode === 0 ?
                                'Xác nhận lịch hẹn thành công!' :
                                'Lịch hẹn đã được xác nhận hoặc không tồn tại!'
                            }
                        </div>
                        <button
                            className="btn-home"
                            onClick={this.handleReturnHome}
                        >
                            Quay về trang chủ
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
