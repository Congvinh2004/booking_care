import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss'
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { convertCompilerOptionsFromJson } from 'typescript';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { saveDetailDoctor } from '../../../services/userService';
import { getDataMarkdownById } from '../../../services/userService';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,


            //save to doctor information table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }

    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
        this.props.getAllRequiredDoctorInfor()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.bildDataInputSeclect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor

            let dataSelect = this.bildDataInputSeclect(this.props.allDoctors, 'USERS');
            let dataSelectPrice = this.bildDataInputSeclect(resPrice, "PRICE")
            let dataSelectPayment = this.bildDataInputSeclect(resPayment, "PAYMENT")
            let dataSelectProvince = this.bildDataInputSeclect(resProvince, "PROVINCE")
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listDoctors: dataSelect

            })
        }
        if (prevProps.allRequiredDoctorInfor != this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.bildDataInputSeclect(resPrice, "PRICE")
            let dataSelectPayment = this.bildDataInputSeclect(resPayment, "PAYMENT")
            let dataSelectProvince = this.bildDataInputSeclect(resProvince, "PROVINCE")
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,


            })

        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {

        let { hasOldData } = this.state
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })

        setTimeout(function () {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                selectedOption: '',
                hasOldData: false
            });
        }.bind(this), 1000);
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let { listPrice, listPayment, listProvince } = this.state
        let res = await getDetailInforDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markDown = res.data.Markdown

            let addressClinic = '', note = ''
                , priceId = '', paymentId = ''
                , provinceId = '', nameClinic = '',
                selectedPrice = '',
                selectedPayment = '',
                selectedProvince = ''

            if (res.data.Doctor_Infor) {
                priceId = res.data.Doctor_Infor.priceId
                paymentId = res.data.Doctor_Infor.paymentId
                provinceId = res.data.Doctor_Infor.provinceId

                nameClinic = res.data.Doctor_Infor.nameClinic
                addressClinic = res.data.Doctor_Infor.addressClinic
                note = res.data.Doctor_Infor.note
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
            }
            this.setState({
                contentMarkdown: markDown.contentMarkdown,
                contentHTML: markDown.contentHTML,
                description: markDown.description,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,
                hasOldData: true
            })
        }

        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
                hasOldData: false

            })
        }
        console.log('check res: ', res);

    };

    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption

        this.setState({
            ...stateCopy
        })



    }


    handleOnchangeText = (event, id) => {
        let stateCopy = this.state
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    bildDataInputSeclect = (inputData, type) => {
        let result = [];
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            if (type === "USERS") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.id
                    result.push(obj);
                })

            }
            else if (type === "PRICE" || type === "PAYMENT" || type === "PROVINCE") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi} `
                    let labelEn = `${item.valueEn} USD`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    result.push(obj);
                })
            }
            console.log('check result: ', result)
            return result
        }

    }


    render() {
        console.log("check state: ", this.state)
        let { hasOldData } = this.state
        let { language } = this.props.language
        let { listPrice, listPayment, listProvince, selectedPrice, selectedPayment, selectedProvince } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>

                <div className='more-infor'>

                    <div className='content-left form-group list-label'>
                        <label> <FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>

                    <div className='content-right list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.information" /></label>
                        <textarea className='form-control'

                            onChange={(event) => { this.handleOnchangeText(event, 'description') }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>


                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /> </label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>

                    <div className='col-4 form-group list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>

                    <div className='col-4 form-group list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.name-clinic" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>

                    <div className='col-4 form-group list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.clinic-address" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'addressClinic')}
                            value={this.state.addressClinic} />

                    </div>

                    <div className='col-4 form-group list-label'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input
                            className='form-control'
                            onChange={(event) => this.handleOnchangeText(event, 'note')}
                            value={this.state.note} />

                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                </div>
                <button
                    onClick={() => {
                        this.handleSaveContentMarkdown()
                    }}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}>
                    {hasOldData === true ? <FormattedMessage id="admin.manage-doctor.save" /> : <FormattedMessage id="admin.manage-doctor.add" />}
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
