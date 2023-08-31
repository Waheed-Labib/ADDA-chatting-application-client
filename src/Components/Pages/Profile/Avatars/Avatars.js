import React, { useContext, useState } from 'react';
import './Avatars.css'
import beardMan from '../../../../Assets/images/avatar/beard-man.webp'
import boy from '../../../../Assets/images/avatar/boy.webp'
import eyeglassBoy from '../../../../Assets/images/avatar/eyeglass-boy.webp'
import eyeglassGirl from '../../../../Assets/images/avatar/eyeglass-girl.webp'
import frog from '../../../../Assets/images/avatar/frog.webp'
import girl from '../../../../Assets/images/avatar/girl.webp'
import hijab from '../../../../Assets/images/avatar/hijab.webp'
import man from '../../../../Assets/images/avatar/man.webp'
import tree from '../../../../Assets/images/avatar/tree.webp'
import woman from '../../../../Assets/images/avatar/woman.webp'
import ghost from '../../../../Assets/images/avatar/ghost.webp'
import cat from '../../../../Assets/images/avatar/cat.webp'
import { AuthContext } from '../../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const Avatars = ({ setShowAvatars, setUserPhoto, userMongoProfile }) => {

    const { updateUserAccount } = useContext(AuthContext);

    const [selected, setSelected] = useState(null);


    const handleUpdateAvatar = () => {
        const profile = {
            photoURL: selected
        }
        updateUserAccount(profile)
            .then(() => {
                toast.success('User Photo Updated.')
                setShowAvatars(false)
                setUserPhoto(selected)

                userMongoProfile.photoURL = selected

                fetch(`https://adda-chatting-app-server.vercel.app/users/${userMongoProfile.uid}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userMongoProfile)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(() => { })
            })
            .catch(err => alert('Something went wrong. Please try again.'))
    }

    const handleCancelAvatar = () => {
        setShowAvatars(false)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ marginBottom: '30px' }}>Select Your Avatar</h2>

            <div className='avatars'>
                <img className={`${selected === frog ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(frog) }} src={frog} alt=''></img>

                <img className={`${selected === tree ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(tree) }} src={tree} alt=''></img>

                <img className={`${selected === cat ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(cat) }} src={cat} alt=''></img>

                <img className={`${selected === boy ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(boy) }} src={boy} alt=''></img>

                <img className={`${selected === eyeglassBoy ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(eyeglassBoy) }} src={eyeglassBoy} alt=''></img>

                <img className={`${selected === man ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(man) }} src={man} alt=''></img>

                <img className={`${selected === girl ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(girl) }} src={girl} alt=''></img>

                <img className={`${selected === eyeglassGirl ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(eyeglassGirl) }} src={eyeglassGirl} alt=''></img>

                <img className={`${selected === hijab ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(hijab) }} src={hijab} alt=''></img>

                <img className={`${selected === woman ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(woman) }} src={woman} alt=''></img>

                <img className={`${selected === beardMan ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(beardMan) }} src={beardMan} alt=''></img>

                <img className={`${selected === ghost ? 'selected' : 'not-selected'}`} onClick={() => { setSelected(ghost) }} src={ghost} alt=''></img>

            </div>


            <button className='avatar-btn' onClick={handleUpdateAvatar}>Save Changes</button>
            <button className='cancel-avatar-btn' onClick={handleCancelAvatar}>Cancel</button>


        </div>
    );
};

export default Avatars;