import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, confirmBooking } from '../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate)
    }
    getDataPatient = async (user, formatedDate) => {
        try {
            let res = await getAllPatientForDoctor({
                doctorId: user.id,
                date: formatedDate
            })

            if (res && res.errCode === 0) {
                // Convert single object to array if needed
                const patientData = Array.isArray(res.data) ? res.data : [res.data];
                this.setState({
                    dataPatient: patientData.filter(item => item) // Remove any null/undefined entries
                });
            }
        } catch (error) {
            console.error('Error fetching patient data:', error);
            this.setState({ dataPatient: [] });
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }


    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props;
            let { currentDate } = this.state;
            let formatedDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formatedDate)
        })
    }


    handleBtnComfirm = async (item) => {
        this.setState({ isLoading: true }); // Start loading
        try {
            let res = await confirmBooking({
                doctorId: item.doctorId,
                patientId: item.patientId,
                date: item.date,
                timeType: item.timeType
            });

            if (res && res.errCode === 0) {
                toast.success('Xác nhận thành công');
                // Refresh data
                let { user } = this.props;
                let { currentDate } = this.state;
                let formatedDate = new Date(currentDate).getTime();
                await this.getDataPatient(user, formatedDate);
            } else {
                toast.error('Đã xảy ra lỗi');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Đã xảy ra lỗi');
        } finally {
            this.setState({ isLoading: false }); // Stop loading
        }
    }
    handleBtnRemedy = () => {
        alert('Features will be developed in the future!')
    }


    render() {
        let { dataPatient, isLoading } = this.state;

        return (
            <div className='manage-patient-container'>
                {isLoading && (
                    <div className="loading-overlay">
                        <div className="loading-content">
                            <i className="fas fa-spinner fa-spin"></i>
                            <p>Đang xử lý...</p>
                        </div>
                    </div>
                )}
                <div className='m-p-title'>
                    Quản lý lịch khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnchangeDatePicker}
                            className="forrm-control"
                            value={this.state.currentDate}
                        >
                        </DatePicker>
                    </div>
                    <div className='col-12 table-manage-patient'>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    {/* <th>Trạng thái</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(dataPatient) && dataPatient.length > 0 ? (
                                    dataPatient.map((item, index) => {
                                        console.log('Rendering item:', item);
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.timeTypeDataPatient?.valueVi || ''}</td>
                                                <td>{item?.patientData?.firstName || ''}</td>
                                                <td>{item?.patientData?.address || ''}</td>
                                                <td>{item?.patientData?.genderData?.valueVi || ''}</td>
                                                {/* <td>{item?.status ? 'Đang hoàn thành' : 'Đang chờ'}</td> */}
                                                <td>
                                                    <button
                                                        className='mp-btn-confirm'
                                                        onClick={() => this.handleBtnComfirm(item)}
                                                    >
                                                        Xác nhận
                                                    </button>
                                                    <button
                                                        className='mp-btn-remedy'
                                                        onClick={() => this.handleBtnRemedy()}
                                                    >
                                                        Gửi hóa đơn
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center' }}>
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
