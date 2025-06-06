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
            dataScheduleTimeModal: {},
            bookedTimes: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)


        let bookedTimes = [];

        const stored = localStorage.getItem('bookedTimes');
        if (stored) {
            const parsed = JSON.parse(stored);
            const now = Date.now();

            if (parsed.expiresAt && now < parsed.expiresAt) {
                bookedTimes = parsed.data;
            } else {
                // Đã qua 0h hôm sau → clear
                localStorage.removeItem('bookedTimes');
            }
        }

        if (this.props.doctorIdFromParent) {

            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays,
            bookedTimes: bookedTimes
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
        console.log('check time; ', time)
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

    handleBookedTime = (bookedTime) => {
        this.setState(prevState => {
            const updatedBookedTimes = [...prevState.bookedTimes, bookedTime];

            // Tính thời gian 0h hôm sau
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // 00:00 ngày mai
            const expiresAt = midnight.getTime();

            const dataToStore = {
                data: updatedBookedTimes,
                expiresAt: expiresAt
            };

            localStorage.setItem('bookedTimes', JSON.stringify(dataToStore));

            return {
                bookedTimes: updatedBookedTimes
            };
        });
    };

    render() {
        let { allDays, allAvalableTime, dataScheduleTimeModal, isOpenModalBooking } = this.state
        let { language } = this.props
        let { bookedTimes } = this.state;
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

                            <div className='time-content-btns'>
                                {allAvalableTime.map((item, index) => {
                                    const isBooked = bookedTimes.some(bt =>
                                        bt.doctorId === item.doctorId &&
                                        bt.date === item.date &&
                                        bt.timeType === item.timeType
                                    );
                                    const timeRange = (language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn); // "8:00 - 9:00"

                                    // Lấy giờ bắt đầu (VD: "8:00")
                                    const startTimeStr = timeRange.split('-')[0].trim(); // "8:00"

                                    // Lấy ngày của lịch khám
                                    const dateTimestamp = +item.date; // dạng số (milliseconds)

                                    // Gộp ngày + giờ vào moment
                                    const [hour, minute] = startTimeStr.split(':');
                                    const scheduleMoment = moment(dateTimestamp).hour(+hour).minute(+minute || 0).second(0);

                                    // Nếu đã qua giờ thì bỏ qua
                                    if (scheduleMoment.isBefore(moment())) {
                                        return null;
                                    }

                                    return (
                                        <button
                                            key={index}
                                            disabled={isBooked}
                                            className={isBooked ? 'booked' : ''}
                                            onClick={() => !isBooked && this.handleClickSheduleTime(item)}
                                            style={{
                                                width: language === LANGUAGES.EN ? "150px" : "115px",
                                            }}
                                        // onClick={() => this.handleClickSheduleTime(item)}
                                        >
                                            {timeRange}
                                        </button>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    dataTime={dataScheduleTimeModal}
                    closeBookingModal={this.closeBookingModal}
                    onBookedTime={this.handleBookedTime}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        bookedTimes: state.schedule.bookedTimes
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
