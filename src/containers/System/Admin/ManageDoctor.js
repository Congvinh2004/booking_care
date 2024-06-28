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
            let dataSelect = this.bildDataInputSeclect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor != this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.bildDataInputSeclect(resPrice)
            let dataSelectPayment = this.bildDataInputSeclect(resPayment)
            let dataSelectProvince = this.bildDataInputSeclect(resProvince)

            console.log('check data new: ', dataSelectPrice, dataSelectPayment, dataSelectProvince)
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
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE

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
        let res = await getDataMarkdownById(selectedOption.value)
        console.log('check res: ', res)
        if (res && res.errCode === 0 && res.data) {
            let markDown = res.data
            this.setState({
                contentMarkdown: markDown.contentMarkdown,
                contentHTML: markDown.contentHTML,
                description: markDown.description,
                hasOldData: true
            })
        }
        else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false

            })
        }

    };

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    bildDataInputSeclect = (inputData, type) => {
        let result = [];
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueVi
                let labelEn = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueEn
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                result.push(obj);
            })
            return result
        }

    }
    render() {
        let { hasOldData } = this.state
        let { listPrice, listPayment, listProvince } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>

                <div className='more-infor'>

                    <div className='content-left form-group'>
                        <label> <FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={"Chọn bác sĩ..."}
                        />
                    </div>

                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.information" /></label>
                        <textarea className='form-control'

                            onChange={(event) => { this.handleOnchangeDesc(event) }}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>


                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedPrice}
                            // onChange={this.handleChangeSelect}
                            options={listPrice}
                            placeholder={"Chọn giá..."}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedPayment}
                            // onChange={this.handleChangeSelect}
                            options={listPayment}
                            placeholder={"Chọn phương thức thanh toán..."}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={this.state.selectedPayment}
                            // onChange={this.handleChangeSelect}
                            options={listProvince}
                            placeholder={"Chọn tỉnh thành..."}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input className='form-control' />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control' />
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
