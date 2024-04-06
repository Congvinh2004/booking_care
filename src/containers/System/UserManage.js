import React, { Component } from 'react';

import { FormattedMessage } from 'react-intl';
import './userManage.scss'
import { getAllUsers, createNewUserService } from '../../services/userService';
import { connect } from 'react-redux';
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
        }

    }
    async componentDidMount() {
        await this.getAllUsersFromReact()
    }


    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users

            })
        }



    }

    handleAddNewuser = () => {

        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    /**  Life cycle
     * run component
     * run construct => init state
     * did mount
     * render
     * 
   
     */
    createNewUser = async (data) => {

        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {

                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: !this.state.isOpenModalUser
                })
            }




        } catch (e) {
            console.log(e)
        }



    }



    render() {
        let { arrUsers } = this.state
        // console.log('check render: ', this.state)
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    text={'abc'}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                ></ModalUser>
                <div className='title text-center'>Manage users with CV</div>
                <div className='mx-1'>
                    <button
                        onClick={() => { this.handleAddNewuser() }}
                        className='btn btn-primary px-3'>
                        <i className="fas fa-plus"></i>
                        Add  new users

                    </button>
                </div>
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>



                            {arrUsers &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr>


                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-delete'>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                                <button className='btn-edit'>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })


                            }
                        </tbody>


                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
