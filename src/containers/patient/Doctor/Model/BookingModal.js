import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BookingModal extends Component {
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
            <Modal
                isOpen={true}
                className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div syle={{ height: '100px' }}>hello world inside modal</div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
