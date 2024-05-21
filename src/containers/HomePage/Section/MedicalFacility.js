import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import specialtyImg from '../../../assets/speciatly/co-xuong.png'
import { FormattedMessage } from 'react-intl';

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

                                </div>
                                <div>Cơ xương khớp</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>
                                <div>Thần kinh</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>
                                <div>Tiêu hóa</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>
                                <div>Tim mạch</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>
                                <div>Tai mũi họng</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility'>

                                </div>
                                <div>Cột sống</div>

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
