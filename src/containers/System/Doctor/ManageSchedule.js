import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { fetchAllScheduleTime } from '../../../services/userService';
import { range } from 'lodash';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { saveBulkScheduleDoctor } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.fetchAllScheduleTimeRedux()

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.bildDataInputSeclect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSelected: false }));
            }


            this.setState({
                rangeTime: data
            })
        }



        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.bildDataInputSeclect(this.props.allDoctors);
        //     this.setState({
        //         listDoctors: dataSelect
        //     })
        // }

    }
    bildDataInputSeclect = (inputData) => {
        let result = [];
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                obj.languge = language
                result.push(obj);
            })
            return result
        }

    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })


    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    handleClickBtnTime = (time) => {

        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime

            })
        }
    }
    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;

        // Validate trước khi mở modal
        if (!currentDate) {
            toast.error('Vui lòng chọn ngày!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Vui lòng chọn bác sĩ!')
            return;
        }

        let selectedTime = rangeTime.filter(item => item.isSelected === true);
        if (!selectedTime || selectedTime.length === 0) {
            toast.error('Vui lòng chọn thời gian khám!')
            return;
        }

        // Nếu validate ok thì mở modal xác nhận
        this.props.setContentOfConfirmModal({
            isOpen: true,
            messageId: 'common.confirm-save-schedule',
            handleFunc: async () => {
                let result = [];
                console.log('check currentDate: ', currentDate)
                if (!currentDate) {
                    toast.error('Vui lòng chọn ngày!');
                    return;
                }
                if (selectedDoctor && _.isEmpty(selectedDoctor)) {
                    toast.error('Vui lòng chọn bác sĩ!')
                    return;
                }

                let formatedDate = new Date(currentDate).getTime();
                console.log('check formated date: ', formatedDate)

                if (rangeTime && rangeTime.length > 0) {
                    let selectedTime = rangeTime.filter(item => item.isSelected === true)
                    if (selectedTime && selectedTime.length > 0) {
                        console.log('chekc selectedTime: ', selectedTime)
                        selectedTime.map(schedule => {
                            let obj = {};
                            obj.doctorId = selectedDoctor.value;
                            obj.date = formatedDate;
                            obj.timeType = schedule.keyMap
                            result.push(obj);
                        })
                    }

                    else {
                        toast.error('Vui lòng chọn thời gian khám!')
                        return;
                    }
                }

                let res = await saveBulkScheduleDoctor({
                    arrSchedule: result,
                    doctorId: selectedDoctor.value,
                    date: formatedDate
                })
                if (res && res.errCode === 0) {
                    this.setState({
                        rangeTime: rangeTime.map(item => ({
                            ...item,
                            isSelected: false
                        })),
                        selectedDoctor: {},  // Reset bác sĩ đã chọn
                        currentDate: ''      // Reset ngày đã chọn
                    });
                    toast.success('Lưu lịch khám thành công!')

                }
                else {
                    toast.error('Có lỗi xảy ra!')
                    console.log('error saveBulkScheduleDoctor >> res: ', res)
                }
            },
            // dataFunc: data
        })


    }

    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log('check state: ', this.state)
        return (
            <div className='manage-schedule-container'>

                <div className='m-s-title'>
                    <FormattedMessage id='manage-schedule.title' />
                </div>
                <div className='container'>

                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker

                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                selected={this.state.currentDate}
                                minDate={yesterday}
                            />

                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'}
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }

                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >
                                <FormattedMessage id="manage-schedule.save" />
                            </button>

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
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
