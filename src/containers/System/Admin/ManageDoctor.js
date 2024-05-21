import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './ManangeDoctor.scss'
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { convertCompilerOptionsFromJson } from 'typescript';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!


class ManangeDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: ''
        }

    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('hoi danit check state: ', this.state)

    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        })
    };

    handleOnchangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
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
                            onChange={this.handleChange}
                            options={options}
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
                    />

                </div>
                <button
                    onClick={() => {
                        this.handleSaveContentMarkdown()
                    }}
                    className='save-content-doctor'>
                    Lưu thông tin
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManangeDoctor);
