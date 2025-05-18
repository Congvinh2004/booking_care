import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialty, getAllCodeService } from '../../../services/userService';
import _, { result } from 'lodash';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
import HomeFooter from '../../HomePage/HomeFooter';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataSpecialty: {},
            showFullDescription: false,
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialty({ id: id, location: 'ALL' });
            let resProvince = await getAllCodeService("PROVINCE");
            console.log('check resProvince: ', resProvince)
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && data.arrDoctorSpecialty && data.arrDoctorSpecialty.length > 0) {
                    let arr = data.arrDoctorSpecialty;
                    arr.map(item => {
                        arrDoctorId.push(item.doctorId)
                    })
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueEn: "Nationwide",
                        valueVi: "Toàn quốc"
                    })
                }


                this.setState({
                    dataSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
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


    handleOnchangeSelect = async (event) => {
        let location = event.target.value
        console.log('Selected location value:', location);
        console.log('Location type:', typeof location);
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailSpecialty({ id: id, location: location });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.arrDoctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }
                console.log('Filtered doctors:', arrDoctorId);

                this.setState({
                    dataSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }

    }
    render() {
        let language = this.props.language
        let { arrDoctorId, dataSpecialty, showFullDescription, listProvince } = this.state;
        const description = dataSpecialty && dataSpecialty.descriptionHTML ? dataSpecialty.descriptionHTML : '';
        const shortDescription = description.length > 300 ? description.slice(0, 300) + '...' : description;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />

                <div className='description-specialty'>
                    <div className='description-specialty-body'>
                        {dataSpecialty && !_.isEmpty(dataSpecialty) && (
                            <>
                                {!showFullDescription ?
                                    (
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: shortDescription }} ></div>
                                            {description.length > 300 && (
                                                <span className='btn-show-description' onClick={this.handleShowMore}>Xem thêm</span>
                                            )}
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <div dangerouslySetInnerHTML={{ __html: description }} ></div>
                                            <span className='btn-show-description' onClick={this.handleShowMore}>Ẩn bớt</span>
                                        </>

                                    )
                                }
                            </>
                        )}
                    </div>
                </div>

                <div className='search-sp-doctor'>
                    <select onChange={(event) => this.handleOnchangeSelect(event)}>
                        {listProvince && listProvince.length > 0 &&
                            listProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                    </option>

                                )

                            })
                        }

                    </select>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
