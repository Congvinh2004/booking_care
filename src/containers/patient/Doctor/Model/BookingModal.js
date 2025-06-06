import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctorById } from '../../../../services/userService';
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select'
import { toast } from 'react-toastify';
import { postPatientBookAppointment } from '../../../../services/userService';
import moment from 'moment/moment';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            selectedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isBooking: false,
            isLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()

    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {

            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {

            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType;

                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    // fullName: '',
    // phoneNumber: '',
    // email: '',
    // address: '',
    // reason: '',
    // birthday: '',
    // doctorId:'',
    // gender:''
    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI
                ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

            return (
                `${time} - ${date}`
            )
        }
        return '';

    }

    handleConfilmBooking = async () => {
        this.setState({ isLoading: true });
        try {
            let date = new Date(this.state.birthday).getTime()
            console.log('check date: ', date)
            let timeString = this.buildTimeBooking(this.props.dataTime)
            let res = await postPatientBookAppointment({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address: this.state.address,
                reason: this.state.reason,
                selectedGender: this.state.selectedGender.value,
                birthday: date,
                dateTime: +(this.props.dataTime.date),
                doctorId: this.state.doctorId,
                timeType: this.state.timeType,
                language: this.props.language,
                timeString: timeString
            })
            if (res && res.errCode === 0) {
                if (this.props.onBookedTime) {
                    this.props.onBookedTime({
                        doctorId: this.state.doctorId,
                        date: this.props.dataTime.date,
                        timeType: this.state.timeType
                    });
                }
                toast.success("booking a new appointment succeed !")
                this.props.closeBookingModal();
                this.setState({
                    fullName: '',
                    phoneNumber: '',
                    email: '',
                    address: '',
                    reason: '',
                    selectedGender: '',
                    doctorId: '',
                    genders: '',
                    timeType: '',
                }
                )
            }
            else {
                toast.error('booking a new appointment arror !')

            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('booking a new appointment arror !')
        } finally {
            this.setState({ isLoading: false }); // Stop loading
        }
        console.log('check data: ', this.state)
    }
    render() {
        let { isOpenModal, dataTime, closeBookingModal } = this.props
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
        let { isLoading } = this.state;
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-content">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>Đang xử lý...</p>
                        </div>
                    </div>
                )}
                <div className='booking-modal-content'>

                    <div className='booking-modal-header'>
                        <span className='left'>
                            <FormattedMessage id="patient.booking-modal.title" />
                        </span>

                        <span
                            className='right'
                            onClick={closeBookingModal}
                        >
                            <i className="fas fa-times"></i>
                        </span>

                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.fullName" /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label> <FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker

                                    onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}

                                />
                            </div>
                            <div className='col-6 form-group gender'>
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    className={'gender-select'}
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                >

                                </Select>
                            </div>
                        </div>

                    </div>

                    <div className='booking-modal-footer'>
                        <button className='btn btn-booking-confilm'
                            onClick={() => this.handleConfilmBooking()}
                        >
                            <FormattedMessage id="patient.booking-modal.btnConfilm" />
                        </button>

                        <button
                            onClick={closeBookingModal}
                            className='btn btn-booking-cancel'>
                            Hủy
                        </button>

                    </div>

                </div>



            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
        updateBookedTime: (data) => dispatch(actions.updateBookedTime(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
