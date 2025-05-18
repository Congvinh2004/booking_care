import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import moment from 'moment/moment';
import NumberFormat from 'react-number-format';
import _ from 'lodash'

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id)
            if (res && res.errCode === 0) {

                result = res.data;
            }
        }
        return result;

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {


        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }


    }
    TimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time;
            if (dataTime.timeTypeData) {
                if (language === LANGUAGES.VI) {
                    time = dataTime.timeTypeData.valueVi
                }
                else {
                    time = dataTime.timeTypeData.valueEn
                }
            }
            console.log('check dataTimeType: ', dataTime.timeTypeData)

            let date = language === LANGUAGES.VI
                ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

            return (
                <>
                    <div> {time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return null;

    }


    render() {
        let { dataProfile } = this.state
        let { language, isShowDescriptionDoctor, dataTime } = this.props
        let nameVi, nameEn = ''

        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi} ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.lastName} ${dataProfile.firstName}`

        }
        return (
            <>
                <div className='profile-doctor-container'>

                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                            }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>

                                {language === LANGUAGES.VI ? <h2>{nameVi}</h2> : <h2>{nameEn}</h2>}
                            </div>

                            <div className='down'>
                                {isShowDescriptionDoctor === true ?
                                    <>
                                        {dataProfile && dataProfile.Markdown &&
                                            dataProfile.Markdown.description &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.TimeBooking(dataTime)}
                                    </>
                                }

                            </div>
                        </div>

                    </div>
                    {/* <div className='price'>

                        <FormattedMessage id="patient.booking-modal.price" />:
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                            &&
                            <NumberFormat value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                className='currency'
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                        }

                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                            &&
                            <NumberFormat value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                className='currency'
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'} />
                        }
                    </div> */}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
