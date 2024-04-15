import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/speciatly/co-xuong.png'
import './HandBook.scss'
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
class HandBook extends Component {





    render() {

        return (
            <div className='section-share section-handbook'>



                <div className='section-container'>

                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>

                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'>

                                </div>
                                <div>Cơ xương khớp</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'>

                                </div>
                                <div>Thần kinh</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'>

                                </div>
                                <div>Tiêu hóa</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'>

                                </div>
                                <div>Tim mạch</div>

                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'>

                                </div>
                                <div>Tai mũi họng</div>


                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook'>

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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
