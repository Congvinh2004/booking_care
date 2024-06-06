import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { fetchAllScheduleTime } from '../../../services/userService';
import { range } from 'lodash';

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
            console.log('check range time: ', this.props.allScheduleTime)
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                // data = data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({ ...item, isSeclected: false }));
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
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })


    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }


    handleClickBtnTime = (time) => {

        console.log('check time click: ', time)
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSeclected = !item.isSeclected;
                return item;
            })
        }
        this.setState({
            rangeTime: rangeTime

        })
    }


    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        console.log('hoidanit check state: ', rangeTime)
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
                                minDate={new Date}
                            />

                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className='btn btn-schedule'
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
                            <button className='btn btn-primary btn-save-schedule'>
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
        fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
