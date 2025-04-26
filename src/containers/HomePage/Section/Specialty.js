import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/speciatly/co-xuong.png'
import Coxuong from "../../../assets/speciatly/co-xuong.png"
import tieuhoa from "../../../assets/speciatly/tieu-hoa.png"
import timmach from "../../../assets/speciatly/tim-mach.png"
import thankinh from "../../../assets/speciatly/than-kinh.png"
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
                                    <img className='img-specialty' src={Coxuong}></img>

                                </div>
                                <div className='name-specialty'>Cơ xương khớp</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>
                                    <img className='img-specialty' src={thankinh}></img>

                                </div>
                                <div className='name-specialty'>Thần kinh</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>
                                    <img className='img-specialty' src={tieuhoa}></img>

                                </div>
                                <div className='name-specialty'>Tiêu hóa</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>
                                    <img className='img-specialty' src={timmach}></img>

                                </div>
                                <div className='name-specialty'>Tim mạch</div>

                            </div>
                            {/* <div className='section-customize'> */}
                            {/* <div className='bg-image section-specialty'>
                                <img src={Coxuong}></img>

                                </div>
                                <div>Tai mũi họng</div>


                            </div> */}
                            <div className='section-customize'>
                                <div className='bg-image section-specialty'>
                                    <img className='img-specialty' src={timmach}></img>

                                </div>
                                <div className='name-specialty'>Cột sống</div>

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
