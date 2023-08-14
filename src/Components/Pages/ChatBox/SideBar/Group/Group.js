import React from 'react';
import '../SideBar.css'

const Group = ({ group }) => {

    const { groupId, groupName, groupPhoto } = group

    return (
        <div>
            <img className='group-image' src={groupPhoto} alt=''></img>
            <h4>{groupName}</h4>
        </div>
    );
};

export default Group;