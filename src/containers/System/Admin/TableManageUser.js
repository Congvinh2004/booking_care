import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './TableManageUser.scss'
import * as actions from "../../../store/actions"
import { connect } from 'react-redux';
import { deleteUserService } from '../../../services/userService';
import { toast } from 'react-toastify';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }

    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        // this.props.deleteUserRedux(user.id);
        this.props.setContentOfConfirmModal({
            isOpen: true,
            messageId: 'common.confirm-delete-user',
            handleFunc: async () => {
                try {
                    let res = await deleteUserService(user.id);
                    if (res && res.errCode === 0) {
                        // await this.getAllUsersFromReact();
                        await this.props.fetchUserRedux();
                        toast.success('Xóa người dùng thành công!');
                    }
                } catch (e) {
                    console.log(e);
                    toast.error('Xóa người dùng thất bại!');
                }
            },
            dataFunc: user
        })
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);

    }
    render() {
        let arrUsers = this.state.usersRedux
        return (
            <>
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)} >
                                                <i className="fas fa-trash"></i></button>
                                            <button className='btn-edit'

                                                onClick={() => { this.handleEditUser(item) }}>
                                                <i className="fas fa-pencil-alt"></i></button>
                                        </td>

                                    </tr>
                                )
                            })



                        }



                    </tbody>


                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

            </>
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
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
