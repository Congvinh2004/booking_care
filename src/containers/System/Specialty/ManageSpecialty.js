import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import { CommonUtils } from "../../../utils"
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            descriopMarkdown: '',
            descriptionHTML: '',
            previewImgURL: '',
            avatar: ''
        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }


    }

    handleEditorSpecialtyChange = ({ html, text }) => {
        this.setState({
            descriopMarkdown: text,
            descriptionHTML: html,
        })
    }



    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            console.log('check img base64: ', base64)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }
    }
    // openPreviewImg = () => {
    //     if (!this.state.previewImgURL) return;
    //     this.setState({
    //         isOpen: true
    //     })
    // }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    handleOnClickSaveInforSpecialty = async () => {
        let response = await createNewSpecialty(this.state)
        if (response && response.errCode === 0) {
            toast.success('New specialty saved successfully !')
        }
        else {
            toast.error('Save failed!')
            console.log('>>> check err: ', response)
        }
        console.log('check state: ', this.state)
    }
    render() {

        return (
            <>
                <div className="manage-specialty-container">
                    <div className='manage-specialty-title'>
                        Manage specialty

                    </div>
                    <div className='add-new-specialty my-3 mx-2 row'>
                        <div className='specialty-name form-group col-6'>
                            <label>Tên chuyên khoa</label>
                            <input type='text' onChange={(event) => this.handleOnchangeInput(event, 'name')} className='form-control' placeholder='Enter name specialty' />
                        </div>
                        <div className='specialty-avatar form-group col-6'>
                            <div className='col-4'>
                                {/* <label><FormattedMessage id="manage-user.image" /></label> */}
                                <label>Ảnh chuyên khoa</label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => { this.handleOnchangeImg(event) }}

                                    />
                                    <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>

                                    <div className='preview-image' // style in userRedux.scss file
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgURL})`,

                                        }}
                                    // onClick={() => { this.openPreviewImg() }}
                                    ></div>
                                </div>
                            </div>

                        </div>
                        <MdEditor
                            style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorSpecialtyChange}
                            value={this.state.descriopMarkdown}
                        />

                        <div className='btn-add-specialty' onClick={() => this.handleOnClickSaveInforSpecialty()}>
                            Lưu thông tin
                        </div>

                    </div>
                </div >

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
