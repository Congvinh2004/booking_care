import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import specialtyImg from '../../../assets/speciatly/co-xuong.png'
import Coxuong from "../../../assets/speciatly/co-xuong.png"
import tieuhoa from "../../../assets/speciatly/tieu-hoa.png"
import timmach from "../../../assets/speciatly/tim-mach.png"
import thankinh from "../../../assets/speciatly/than-kinh.png"
import { getAllSpecialty } from '../../../services/userService';
import Slider from 'react-slick';
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: []
        }
    }
    async componentDidMount() {
        let listSpecialty = await getAllSpecialty();
        if (listSpecialty && listSpecialty.errCode === 0) {
            console.log('check listSpecialty: ', listSpecialty)
            this.setState({
                listSpecialty: listSpecialty.data
            })
        }
    }
    render() {
        let listSpecialty = this.state.listSpecialty;
        console.log('check state: ', listSpecialty)
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
                            {listSpecialty.map((item, index) => {
                                return (
                                    <div key={index} className='section-customize'>
                                        <div className='bg-image section-specialty'>
                                            <img className='img-specialty' src={item.image}></img>
                                        </div>
                                        <div className='name-specialty'>{item.name}</div>
                                    </div>
                                )
                            }
                            )}

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
