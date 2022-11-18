import React from 'react';

function Tavern(props) {
    const buyDrink = (goldCost, hpGain) => {
        if (props.user.gold < goldCost) {
            alert("You do not have enough gold");
            return false;
        }
        let tmpUser = {...props.user};
        tmpUser.gold -= goldCost;
        tmpUser.currentHP += hpGain;
        if (tmpUser.currentHP > tmpUser.maxHP) tmpUser.currentHP = tmpUser.maxHP;
        tmpUser.updateStats = true;
        props.setUser(tmpUser);
    }

    return (
        <div className="town">
            <h2>Welcome to the Flagon Wagon</h2>
            <p>"Hello there, {props.user.characterName}" the barkeep greets you as you enter the tavern.  "What can I get for ya'?"</p>
            <br/><br/>
            <button onClick={() => {buyDrink(2, 5)}}>Buy Ale (2gp, heals 5hp)</button>
            <button onClick={() => {buyDrink(5, 15)}}>Buy Kombucha (5gp, heals 15hp)</button>
            <br/><br/>
            <h2>You currently have <b>{props.user.gold}</b> gold.<br/>
            HP: <b>{props.user.currentHP} / {props.user.maxHP}</b></h2>
        </div>
    )

}

export default Tavern;