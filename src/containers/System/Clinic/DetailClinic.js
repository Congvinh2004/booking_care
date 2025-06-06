import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../../patient/Doctor/DoctorSchedule';
// import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../../patient/Doctor/DoctorExtraInfor';
// import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../../patient/Doctor/ProfileDoctor';
// import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import HomeFooter from '../../HomePage/HomeFooter';
import _ from 'lodash';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            showFullDescription: false,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailClinicById({
                id: id
            });

            console.log('Check res detail clinic: ', res); // Thêm log để debug
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }
                console.log('Check arrDoctorId: ', arrDoctorId); // Thêm log để debug


                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleShowMore = () => {
        this.setState({ showFullDescription: !this.state.showFullDescription });
    }
    handleShowMoreInforDoctor = (doctorId) => {
        if (this.props.history) {

            this.props.history.push(`/detail-doctor/${doctorId}`)
        }
    }




    render() {
        let { arrDoctorId, showFullDescription, dataDetailClinic } = this.state;
        const description = dataDetailClinic && dataDetailClinic.descriptionHTML ? dataDetailClinic.descriptionHTML : '';
        const shortDescription = description.length > 300 ? description.slice(0, 300) + '...' : description;

        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='description-specialty'>
                    <div className='description-specialty-body'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                            <div className="clinic-description-container">
                                <div className="clinic-name">
                                    <h2>{dataDetailClinic.name}</h2>
                                </div>
                                <div className="clinic-address">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{dataDetailClinic.address}</span>
                                </div>
                                <div className={`clinic-description ${showFullDescription ? 'expanded' : ''}`}>
                                    <div
                                        className="description-content"
                                        dangerouslySetInnerHTML={{
                                            __html: showFullDescription ? description : shortDescription
                                        }}
                                    />
                                    {description.length > 300 && (
                                        <button
                                            className="btn-toggle-description"
                                            onClick={this.handleShowMore}
                                        >
                                            {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                                            <i className={`fas fa-chevron-${showFullDescription ? 'up' : 'down'}`}></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>


                <div className='detail-specialty-body'>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {

                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='each-doctor-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                            // dataTime={dataTime}
                                            />
                                        </div>

                                        <span className='see-more-doctor' onClick={() => this.handleShowMoreInforDoctor(item)}>Xem thêm</span>

                                    </div>

                                    <div className='each-doctor-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule doctorIdFromParent={item} />

                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor doctorIdFromParent={item} />

                                        </div>
                                    </div>
                                </div>




                            )
                        })
                    }

                </div>
                <HomeFooter />
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
