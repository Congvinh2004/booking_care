import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { lang } from 'moment';
import { LANGUAGES } from '../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }

    async componentDidMount() {

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id);
            // console.log('hoi dan it check res: ', res)
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                    currentDoctorId: id
                })
            }
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    render() {
        let { detailDoctor } = this.state
        let { language } = this.props
        let nameVi, nameEn = ''

        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.lastName} ${detailDoctor.firstName}`

        }

        return (
            <>

                <HomeHeader isShowBanner={false} />
                <div className='doctor-detail-container'>
                    {detailDoctor && detailDoctor.roleId === 'R2' &&
                        <div className='intro-doctor'>
                            <div className='content-left'
                                style={{
                                    backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`,
                                }}>

                            </div>
                            <div className='content-right'>
                                <div className='up'>

                                    {language === LANGUAGES.VI ? <h2>{nameVi}</h2> : <h2>{nameEn}</h2>}
                                </div>
                                <div className='down'>
                                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && <span>{detailDoctor.Markdown.description}</span>}



                                </div>
                            </div>

                        </div>

                    }
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule



                                doctorIdFromParent={this.state.currentDoctorId}></DoctorSchedule>

                        </div>
                        <div className='content-right'>


                            <DoctorExtraInfor doctorIdFromParent={this.state.currentDoctorId} />
                        </div>

                    </div>
                    <div className='detail-infor-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        }


                    </div>
                    <div className='comment-doctor'></div>



                </div>

            </>
        );
    }
}

const mapStateToProps = state => {

    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
