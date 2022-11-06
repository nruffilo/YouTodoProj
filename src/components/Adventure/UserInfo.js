import React from 'react';

function UserInfo(props) {
    return (
        <>
        <div className="userDisplay">
            <h2>About You:</h2>
            <p>Name: {props.user.characterName}</p>
            <p>HP: {props.user.currentHP} / {props.user.maxHP}</p>
            <p>Strength: {props.user.strength}</p>
            <p>Magic: {props.user.magic}</p>
            <p>Gold: {props.user.gold}</p>
            <p>Satisfaction: {props.user.satisfaction}</p>
            <p>Items:</p>
            {
                props.user.items.length === 0 ?
                    <>You have no items</>
                    :
                    props.user.items.map(item => {
                        return <>{item.name}</>
                    })
            }
        </div>
        </>
    );

}

export default UserInfo;