import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils"
import * as actions from "../../../store/actions"
import './userRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            previewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: ''
        }

    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        // try {
        //     let res = await getAllCodeService('role');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             arrGender: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux

            this.setState({
                arrGender: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                arrRole: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                arrPosition: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRoles = this.props.roleRedux
            let arrPositions = this.props.positionRedux
            this.setState({

                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }


    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }
    }
    openPreviewImg = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }


    handleSaveUser = (data) => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;
        // fire redux create user

        if (action === CRUD_ACTIONS.CREATE) {

            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        // fire redux edit user
        else if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid
    }
    onchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {

            // const imageBuffer = Buffer.from(JSON.stringify(user.image))
            // imageBase64 = `data:image/png;base64, ${imageBuffer.toString('base64')}`
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id

        }, () => {
            console.log('check ')
        })
    }


    render() {
        let language = this.props.language
        let { arrGender } = this.state
        let isGetGenders = this.props.isLoadingGender
        let roles = this.state.arrRole
        let positions = this.state.arrPosition

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        return (
            <div className='user-redux-container'>
                <div className="title" >Quản lý thông tin bác sĩ</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-12'>{isGetGenders === true ? 'loading genders' : ''}</div>

                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onchangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onchangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onchangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onchangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onchangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onchangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onchangeInput(event, 'gender') }}>
                                    {arrGender && arrGender.length > 0 &&
                                        arrGender.map((item, index) => {
                                            return (

                                                <option key={index} value={item.keyMapMap} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onchangeInput(event, 'position') }}>
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>


                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    value={role}
                                    onChange={(event) => { this.onchangeInput(event, 'role') }}>
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>


                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type="file" hidden
                                        onChange={(event) => { this.handleOnchangeImg(event) }}

                                    />
                                    <label className='label-upload' htmlFor="previewImg">Tải ảnh <i className="fas fa-upload"></i></label>

                                    <div className='preview-image'
                                        style={{
                                            backgroundImage: `url(${this.state.previewImgURL})`,

                                        }}
                                        onClick={() => { this.openPreviewImg() }}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>

                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => { this.handleSaveUser() }}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT
                                        ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>

                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser

                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />

                            </div>
                        </div>
                    </div>
                </div>


                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}


                    />
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data)),



        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
