import React, { useContext } from 'react';
import '../SideBar.css'
import { Link } from 'react-router-dom';
import defaultGroupPhoto from '../../../../../Assets/images/group/group.webp'
import { AuthContext } from '../../../../../contexts/AuthProvider';


const Group = ({ group, setChatMate, setShowInSmallDevice }) => {

    const { groupId, name, photoURL } = group;
    const { user } = useContext(AuthContext);

    const handlePersonClick = () => {
        setChatMate(group)
        setShowInSmallDevice('messages')
    }

    return (
        <Link onClick={handlePersonClick} style={{ textDecoration: 'none', color: 'black' }}>
            <div className='group'>
                <img className='group-image' src={photoURL || defaultGroupPhoto} alt=''></img>
                <h4>{name}</h4>
            </div>
        </Link>
    );
};

export default Group;