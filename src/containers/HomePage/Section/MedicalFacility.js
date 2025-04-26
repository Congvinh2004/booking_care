import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import specialtyImg from '../../../assets/speciatly/co-xuong.png'
import { FormattedMessage } from 'react-intl';
import choray from "../../../assets/speciatly/cho-ray.jpg"
import medlatec from "../../../assets/speciatly/medlatec.png"
import vietduc from "../../../assets/speciatly/viet-duc.jpg"
import yduoc from "../../../assets/speciatly/y-duoc.jpg"
import Slider from 'react-slick';
class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>



                <div className='section-container'>

                    <div className='section-header'>
                        <span className='title-section'>

                            <FormattedMessage id="homepage.outstanding-medical-facilities" />

                        </span>
                        <button className='btn-section'>

                            <FormattedMessage id="homepage.more-information" />

                        </button>
                    </div>

                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>
                                    {/* <img className='img-specialty' src={vietduc}></img> */}
                                </div>
                                {/* <div>Cơ xương khớp</div> */}


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>
                                    {/* <img className='img-specialty' src={yduoc}></img> */}
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>
                                    {/* <img className='img-specialty' src={medlatec}></img> */}
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>
                                    {/* <img className='img-specialty' src={choray}></img> */}
                                </div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>

                            </div>
                        </Slider>
                    </div>

                </div>

            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
