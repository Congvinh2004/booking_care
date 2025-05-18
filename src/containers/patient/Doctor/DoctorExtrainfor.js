import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { getExtraInforDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }
    showhideDetailInfor = (isShowHide) => {
        this.setState({
            isShowDetailInfor: isShowHide
        })
    }
    render() {
        let { language } = this.props
        let { isShowDetailInfor, extraInfor } = this.state
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                        </div>

                        <div className='name-clinic'>
                            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''

                            }
                        </div>

                        <div className='detail-address'>
                            {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''
                            }
                        </div>
                    </div>
                    <div className='content-down'>

                        {isShowDetailInfor === false &&
                            <div className='short-infor'>
                                <span className='price-label'>
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />

                                </span>

                                <span className='price-value'>
                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                        ?
                                        <NumberFormat value={extraInfor.priceTypeData.valueVi}
                                            className='currency'
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'} />
                                        :
                                        ''}

                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                        ?
                                        <NumberFormat value={extraInfor.priceTypeData.valueEn}
                                            className='currency'
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'} />
                                        :

                                        ''}
                                </span>


                                <span
                                    className='see-detail'
                                    onClick={() => this.showhideDetailInfor(true)}
                                >
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />
                                </span>
                            </div>
                        }

                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'> <FormattedMessage id="patient.extra-infor-doctor.price" /> </div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'> <FormattedMessage id="patient.extra-infor-doctor.price" /> </span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                                ?
                                                <NumberFormat value={extraInfor.priceTypeData.valueVi}
                                                    className='currency'
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'} />
                                                :
                                                ''}

                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN
                                                ?
                                                <NumberFormat value={extraInfor.priceTypeData.valueEn}
                                                    className='currency'
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'} />
                                                :
                                                ''}


                                        </span>
                                    </div>
                                    <div className='note'>
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''
                                        }

                                    </div>
                                </div>
                                <div className='payment'>
                                    <div className='payment-label'>
                                        <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                        &nbsp;
                                    </div>
                                    <div className='payment-value'>
                                        {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI

                                            ? extraInfor.paymentTypeData.valueVi
                                            : ''
                                        }

                                        {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN

                                            ? extraInfor.paymentTypeData.valueEn
                                            : ''
                                        }
                                    </div>

                                </div>
                                <div className='hide-price'>
                                    <span
                                        onClick={() => this.showhideDetailInfor(false)}
                                    >
                                        <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
