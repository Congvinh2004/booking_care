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
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false
        }

    }
    componentDidMount() {
        this.props.fetchAllDoctorRedux()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.bildDataInputSeclect(this.props.allDoctors);
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

    bildDataInputSeclect = (inputData) => {
        let result = [];
        let language = this.props.language
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let obj = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                obj.value = item.id
                obj.languge = language
                result.push(obj);
            })
            return result
        }

    }
    render() {
        let { hasOldData } = this.state
        console.log('check state show markdown: ', this.state)
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    tạo thêm thông tin bác sĩ
                </div>

                <div className='more-infor'>

                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>

                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control'
                            rows="4"
                            onChange={(event) => { this.handleOnchangeDesc(event) }}
                            value={this.state.description}
                        >
                            sdfdfsdd
                        </textarea>
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
                    {hasOldData === true ? 'Lưu thông tin' : "Tạo thông tin"}
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
