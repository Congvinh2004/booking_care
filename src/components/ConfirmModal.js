import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import * as actions from '../store/actions';
import { KeyCodeUtils } from '../utils';

import './ConfirmModal.scss';

class ConfirmModal extends Component {
    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if ((event.which || event.keyCode) === KeyCodeUtils.ENTER) {
            if (this.acceptBtnRef.current && !this.acceptBtnRef.current.disabled) {
                this.acceptBtnRef.current.click();
            }
        }
    };

    onAccept = () => {
        const { contentOfConfirmModal } = this.props;
        if (contentOfConfirmModal.handleFunc) {
            contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc);
        }
        this.onClose();
    };

    onClose = () => {
        this.props.setContentOfConfirmModal({
            isOpen: false,
            messageId: '',
            handleFunc: null,
            dataFunc: null,
        });
    };

    render() {
        const { contentOfConfirmModal } = this.props;
        const messageId = contentOfConfirmModal.messageId || 'common.confirm-this-task';

        return (
            <Modal style={{ width: "350px" }} isOpen={contentOfConfirmModal.isOpen} centered className="modern-confirm-modal">
                <div className="modal-content-box">
                    <div className="modal-header-modern">
                        <div className="icon-warning">
                            {/* <i className="far fa-exclamation-triangle"></i> */}
                        </div>
                        <h5 className="title">
                            <FormattedMessage id="common.confirm" />
                        </h5>
                        <button className="btn-icon-close" onClick={this.onClose} aria-label="Close">×</button>
                    </div>

                    <div className="modal-body-modern">
                        <p className="modal-message">
                            <FormattedMessage id={messageId} />
                        </p>
                    </div>

                    <div className="modal-footer-modern">
                        <button className="btn cancel" onClick={this.onClose}>
                            <FormattedMessage id="common.close" />
                        </button>
                        <button ref={this.acceptBtnRef} className="btn confirm" onClick={this.onAccept}>
                            <FormattedMessage id="common.accept" />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    contentOfConfirmModal: state.app.contentOfConfirmModal,
});

const mapDispatchToProps = (dispatch) => ({
    setContentOfConfirmModal: (content) =>
        dispatch(actions.setContentOfConfirmModal(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
