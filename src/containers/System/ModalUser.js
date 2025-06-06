import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {


    constructor(props) {

        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', data => {

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })

    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }





    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({

            ...copyState
        })


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ', arrInput[i])
                break;
            }


        }

        return isValid;
    }



    handleAddNewuser = () => {

        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewUser(this.state);

        }



    }
    render() {

        let { email, password, firstName, lastName, address } = this.state;
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-ontainer'}
                size='lg'
            // centered

            >


                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>

                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                value={email}
                            />
                        </div>

                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                                value={password}
                            />
                        </div>

                        <div className='input-container'>
                            <label>First Name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                                value={firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last Name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}
                                value={lastName}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, 'address') }}
                                value={address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"
                        className='px-3'
                        onClick={() => this.handleAddNewuser()}>
                        Add new
                    </Button>{' '}
                    <Button color="secondary"
                        className='px-3'
                        onClick={() => this.toggle()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




