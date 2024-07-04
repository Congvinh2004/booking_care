import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtrainfor.scss'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

class DoctorExtrainfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: true
        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    showhideDetailInfor = (isShowHide) => {
        this.setState({
            isShowDetailInfor: isShowHide
        })
    }
    render() {
        let { language } = this.props
        let { isShowDetailInfor } = this.state

        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            ĐỊA CHỈ PHÒNG KHÁM
                        </div>

                        <div className='name-clinic'>
                            Phòng khám chuyên khoa gia liễu
                        </div>

                        <div className='detail-address'>
                            207 Phố Huế - Hai Bà Trưng - Hà Nội
                        </div>
                    </div>
                    <div className='content-down'>
                        {isShowDetailInfor === false &&
                            <div className='short-infor'>GIÁ KHÁM: 250.000đ.
                                <span
                                    onClick={() => this.showhideDetailInfor(true)}
                                >
                                    Xem chi tiết
                                </span>
                            </div>
                        }

                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'>GIÁ KHÁM: </div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'>Giá khám: </span>
                                        <span className='right'>250.000đ</span>
                                    </div>
                                    <div className='note'>
                                        Giá khám chưa bao gồm chi  phí chụp chiếu, xét nghiệm

                                    </div>
                                </div>
                                <div className='payment'>Bệnh viện có các hình thức thanh toán: Chuyển khoản, tiền mặt, thẻ tín dụng</div>
                                <div className='hide-price'>
                                    <span
                                        onClick={() => this.showhideDetailInfor(false)}
                                    >
                                        Ẩn bảng giá
                                    </span>
                                </div>
                            </>


                        }

                    </div>


                </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
