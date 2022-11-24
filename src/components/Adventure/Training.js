import React from 'react';

function Training(props) {

    const train = (type) => {
        if (type === "strength") {
            if (props.user.gold < ((props.user.strength-9)*10)) {
                alert("You don't have enough gold!");
                return false;
            }
            let tmpUser = {...props.user};
            tmpUser.gold = tmpUser.gold - ((tmpUser.strength-9)*10);
            tmpUser.strength = tmpUser.strength + 1;
            tmpUser.updateStats = true;
            props.setUser(tmpUser);
        }
        if (type === "magic") {
            if (props.user.gold < ((props.user.magic-9)*10)) {
                alert("You don't have enough gold!");
                return false;
            }
            let tmpUser = {...props.user};
            tmpUser.gold = tmpUser.gold - ((tmpUser.magic-9)*10);
            tmpUser.magic = tmpUser.magic + 1;
            tmpUser.updateStats = true;
            props.setUser(tmpUser);
        }

    }

    return (
        <div className="town">
            <h2>Welcome to The Training Dojo</h2>
            <p>You currently have <b>{props.user.gold}</b> gold. </p>
            <p><b>Strength:</b> {props.user.strength}<br/>
            Strength helps you in combat and unlocks areas that require your character to be strong to pass.</p>
            <p><b>Magic:</b> {props.user.magic}<br/>
            Magic helps you in combat and unlocks areas that require your character to be wise or magical to pass.</p>
            <br/>
            <button className="trainingButton" onClick={() => {train("strength")}}>Train<br/>STRENGTH<br/>for {(props.user.strength-9)*10} gold</button>
            <button className="trainingButton" onClick={() => {train("magic")}}>Train<br/>MAGIC<br/>for {(props.user.magic-9)*10} gold</button>
        </div>
    )

}

export default Training;