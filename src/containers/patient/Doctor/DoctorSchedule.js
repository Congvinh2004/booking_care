import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import Select from 'react-select'
import moment from 'moment';
import locallization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Model/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)
        if (this.props.doctorIdFromParent) {

            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays,
        })
    }
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today

                }
                else {
                    let firstLetter = moment(new Date()).add(i, "days").format("dddd - DD/MM").charAt(0).toUpperCase();
                    object.label = firstLetter + moment(new Date()).add(i, "days").format("dddd - DD/MM").slice(1);
                }
            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format("DD/MM");
                    let today = `Today - ${ddMM}`;
                    object.label = today

                }
                else
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)

            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }


    }
    handleOnchangeSelect = async (event) => {
        let doctorIdFromParent = this.props.doctorIdFromParent
        let date = event.target.value;
        if (doctorIdFromParent && doctorIdFromParent !== -1) {
            let res = await getScheduleDoctorByDate(doctorIdFromParent, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }

        }
    }


    handleClickSheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = (time) => {
        this.setState({
            isOpenModalBooking: false,
            dataScheduleTimeModal: time
        })
    }
    render() {
        let { allDays, allAvalableTime, dataScheduleTimeModal, isOpenModalBooking } = this.state
        let { language } = this.props


        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select
                            onChange={(event) => this.handleOnchangeSelect(event)}
                        >
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (

                                        <option
                                            key={index}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </option>
                                    )

                                })
                            }



                        </select>

                    </div>

                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span>
                                <i className="fas fa-calendar-alt"></i>
                                <div>
                                    <FormattedMessage id="patient.detail-doctor.schedule" />

                                </div>
                            </span>

                        </div>
                        <div className='time-content'>


                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>

                                        {allAvalableTime.map((item, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    style={{
                                                        width: language === LANGUAGES.EN ? "150px" : "115px",
                                                    }}
                                                    onClick={() => this.handleClickSheduleTime(item)}
                                                >
                                                    {language === LANGUAGES.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueVi}
                                                </button>
                                            )
                                        })
                                        }

                                    </div>
                                    <div className='book-free'>
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            &nbsp;
                                            <i className='far fa-hand-point-up'></i>
                                            &nbsp;
                                            <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>

                                </>
                                : <span className='no-calendar'><i><FormattedMessage id="patient.detail-doctor.no-schedule" /></i></span>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    dataTime={dataScheduleTimeModal}
                    closeBookingModal={this.closeBookingModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
