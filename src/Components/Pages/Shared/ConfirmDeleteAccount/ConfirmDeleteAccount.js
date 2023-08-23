import React, { useContext } from 'react';
import './ConfirmDeleteAccount.css'
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const ConfirmDeleteAccount = ({ setDeleteModalOpen }) => {

    const { user, deleteAccount } = useContext(AuthContext);

    const handleDeleteAccount = () => {

        deleteAccount()
            .then(() => {

                fetch(`https://adda-chatting-app-server.vercel.app/users/${user?.uid}`, {
                    method: 'DELETE'
                }).then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            setDeleteModalOpen(false)
                            toast.success('Account Deleted.')
                        }

                    })
                    .catch(err => alert('Something Went Wrong'))
            })
            .catch((err) => alert('Something Went Wrong'))
    }
    return (
        <div className='modal confirm-delete'>
            <div class="modal-content">
                <span onClick={() => setDeleteModalOpen(false)} class="close">&times;</span>
                <h2>DELETE ACCOUNT?</h2>
                <p>This will delete your account permanantly</p>

                <button onClick={handleDeleteAccount} className='confirm-dlt-btn'>Yes, I want to delete my account</button>
                <button onClick={() => setDeleteModalOpen(false)} className='cancel-dlt-btn'>Cancel</button>
            </div>
        </div>
    );
};

export default ConfirmDeleteAccount;