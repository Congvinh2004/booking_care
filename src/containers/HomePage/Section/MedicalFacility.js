import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import specialtyImg from '../../../assets/speciatly/co-xuong.png'
import { FormattedMessage } from 'react-intl';
import choray from "../../../assets/hospital/cho-ray.jpg"
import medlatec from "../../../assets/hospital/medlatec.png"
import vietduc from "../../../assets/hospital/viet-duc.jpg"
import yduoc from "../../../assets/hospital/y-duoc.jpg"
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }
    render() {
        let { dataClinics } = this.state
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
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className='bg-image section-medical-facility'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>

                                            <span style={{ fontWeight: "600", fontSize: "15px", paddingTop: "10px" }}>{item.name}</span>
                                        </div>

                                    )
                                })
                            }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
