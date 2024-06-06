
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMessage: '',

        }


    }

    handleOnchangeInput = (event) => {
        // console.log(event.target.value)
        this.setState({
            userName: event.target.value
        })
        // console.log(this.state.userName)
    }
    handleOnchangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleOnclick = async () => {
        console.log(' userName: ', this.state.userName, ' password: ', this.state.password)



        console.log('check input: ', this.state)
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
            // console.log('hoidanit', data)
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }

            }
            console.log('hoidanit', error.response)
        }
    }
    handleShowHidePassword = () => {
        if (this.state.password.length > 0) {
            this.setState({
                isShowPassword: !this.state.isShowPassword,
            })
            // alert('1');
        }
        // else alert('0')

    }
    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleOnclick();

        }

    }
    render() {
        let { userName, passWord, isShowPassword } = this.state
        return (

            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>login</div>
                        <div className='col-12 form-group login-input'>
                            <label>UserName:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your name'
                                value={this.state.userName}
                                onChange={(event) => { this.handleOnchangeInput(event) }}
                            />

                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>password:</label>
                            <div className='custom-input-password'>
                                <input
                                    type={isShowPassword ? 'text' : 'password'}
                                    className='form-control' placeholder='Enter your name'
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnchangePassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    {isShowPassword ?
                                        <i className="fa fa-eye-slash"></i>
                                        :
                                        <i className="fa fa-eye"></i>


                                    }
                                </span>

                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'
                                onClick={() => { this.handleOnclick() }}>
                                Login
                            </button>

                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password ?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or login with: </span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>

                        </div>
                    </div>

                </div>
            </div>


        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
