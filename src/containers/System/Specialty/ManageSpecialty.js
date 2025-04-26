import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { FormattedMessage } from 'react-intl';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }


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
                            <input type='text' className='form-control' placeholder='Enter name specialty' />
                        </div>
                        <div className='specialty-avatar form-group col-6'>
                            <div className='col-4'>
                                {/* <lable><FormattedMessage id="manage-user.image" /></lable> */}
                                <lable>Ảnh chuyên khoa</lable>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type="file" hidden
                                    // onChange={(event) => { this.handleOnchangeImg(event) }}

                                    />
                                    <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>

                                    <div className='preview-image'
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
                        // onChange={this.handleEditorChange}
                        // value={this.state.contentMarkdown}
                        />

                        <div className='btn-add-specialty'>
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
