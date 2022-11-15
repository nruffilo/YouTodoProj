import React from 'react';

function Training(props) {

    const train = (type) => {
        if (type === "strength") {
            if (props.user.gold < props.user.strength) {
                alert("You don't have enough gold!");
                return false;
            }
            let tmpUser = {...props.user};
            tmpUser.gold = tmpUser.gold - tmpUser.strength;
            tmpUser.strength = tmpUser.strength + 1;
            tmpUser.updateStats = true;
            props.setUser(tmpUser);
        }
        if (type === "magic") {
            if (props.user.gold < props.user.magic) {
                alert("You don't have enough gold!");
                return false;
            }
            let tmpUser = {...props.user};
            tmpUser.gold = tmpUser.gold - tmpUser.magic;
            tmpUser.magic = tmpUser.magic + 1;
            tmpUser.updateStats = true;
            props.setUser(tmpUser);
        }

    }

    return (
        <div className="town">
            <h2>Welcome to The Training Dojo</h2>
            <p>You currently have <b>{props.user.gold}</b> gold.  It costs your current skill level in gold to train one more levels.</p>
            <br/>
            <button onClick={() => {train("strength")}}>Train STRENGTH for {props.user.strength} gold</button>
            <br/><br/>
            <button onClick={() => {train("magic")}}>Train MAGIC for {props.user.magic} gold</button>
        </div>
    )

}

export default Training;