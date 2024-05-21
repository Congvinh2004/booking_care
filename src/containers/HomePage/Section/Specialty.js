import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/speciatly/co-xuong.png'

import Slider from 'react-slick';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >
        </div>
    );
}
class Specialty extends Component {





    render() {

        return (
            <div className='section-share section-specialty'>



                <div className='section-container'>

                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.popular-specialties" />
                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homepage.more-information" />
                        </button>
                    </div>

                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>

                                </div>
                                <div>Cơ xương khớp</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>

                                </div>
                                <div>Thần kinh</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>

                                </div>
                                <div>Tiêu hóa</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>

                                </div>
                                <div>Tim mạch</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>

                                </div>
                                <div>Tai mũi họng</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>

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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
