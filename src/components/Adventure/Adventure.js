import React, {useEffect, useState} from 'react';
import { CommonAdventures } from './CommonAdventures';
import { AdventureList } from "./AdventureList";

function Adventure(props) {
    const [yourAttack, setYourAttack] = useState();
    const [yourDefense, setYourDefense] = useState();
    const [yourMagic, setYourMagic] = useState();
    const [enemyAttack, setEnemyAttack] = useState();
    const [enemyDefense, setEnemyDefense] = useState();
    const [battleDescription, setBattleDescription] = useState();

    const attack = () => {
        let tmpYourAttack = Math.floor(Math.random()*(props.user.strength/2)) + Math.floor(props.user.strength/2);
        setYourAttack(tmpYourAttack);
        setYourMagic(0);
        setYourDefense(0);
        opponentAct(tmpYourAttack,0,0);
    }

    const magic = () => {
        let tmpYourMagic = Math.floor(Math.random()*(props.user.magic*1.3));
        setYourMagic(tmpYourMagic);
        setYourAttack(0);
        setYourDefense(0);
        opponentAct(0,tmpYourMagic,0);    
    }

    const defend = () => {
        setYourMagic(0);
        setYourAttack(0);
        setYourDefense(props.user.defense);
        opponentAct(0,0,props.user.defense); 
    }

    const flee = () => {
        props.setAction("Flee");
    }

    useEffect(() => {
        setBattleDescription(<>
        <br/>The battle was epic.  You attacked for {yourAttack}
        {
            yourMagic > 0 ?
                <>and used magic for {yourMagic} </>
                : null
        }
         and defended {yourDefense}.
         The enemy attacked for {enemyAttack} and defended {enemyDefense}
        </>);
    },[yourAttack,yourDefense,enemyAttack,enemyDefense, yourMagic])

    const opponentAct = (yourAttack, yourMagicAttack, yourDefense) => {
        let enemyAction = Math.floor(Math.random()*2);
        let tmpEnemyAttack = 0;
        let tmpEnemyDefense = 0; 
        switch (enemyAction) {
            case 0:
                tmpEnemyAttack = Math.floor(Math.random()*props.currentEnemy.attack);
                tmpEnemyDefense = 0;        
                break;
            case 1:
                tmpEnemyAttack = 0;
                tmpEnemyDefense = Math.floor(Math.random()*props.currentEnemy.defense);        
                break;
            default:
                break;
        }
        let damageToYou = Math.max(0, tmpEnemyAttack - yourDefense);
        let damageToEnemy = Math.max(0, (yourAttack + yourMagicAttack) - tmpEnemyDefense);
        setEnemyAttack(tmpEnemyAttack);
        setEnemyDefense(tmpEnemyDefense);
        let tmpEnemy = {...props.currentEnemy};
        let tmpYou = {...props.user};
        tmpEnemy.currentHP -= damageToEnemy;
        tmpYou.currentHP -= damageToYou;
        props.setCurrentEnemy(tmpEnemy);
        props.setUser(tmpYou);

        //determine if there is a fight winner, if so, end the combat.
        if (tmpYou.currentHP <= 0) {
            props.setAction("end");            
        }
        if (tmpEnemy.currentHP <= 0) {
            let nextAdventure = CommonAdventures.CombatComplete;
            if (props.currentAdventure.returnAction !== undefined) {
                nextAdventure.actions.push(props.currentAdventure.returnAction);
            } else {
                nextAdventure.actions.push({text: "Return Home",action:"complete"});
            }
            nextAdventure.reward = tmpEnemy.reward;
            props.setCurrentAdventure(nextAdventure);
        }

    }

    const completeAdventure = () => {
        props.setCurrentAdventure({});
    }

    const goOnAdventure = () => {
        let newAdvType = Math.floor(Math.random()*AdventureList.length);
        props.setCurrentAdventure({...CommonAdventures[AdventureList[newAdvType]]});
    }

    const nextStepRandom = (randomAction) => {
        let stepCheck = Math.floor(Math.random() * 100);
        let nextAction = "";
        for (const key in randomAction) {
            if (stepCheck < parseInt(key) && nextAction === "") {
                nextAction = randomAction[key];
            }
        }
        nextStep(nextAction);
    }

    const nextStep = (action) => {
        if (action === "complete") {
            completeAdventure();
        } else {
            props.setCurrentAdventure(CommonAdventures[action]);
        }
    }

    const renderEvent = (event) => {
        switch (event.type) {
            case "story":
                return <>
                    <h2>{event.heading}</h2>
                    <p>{event.story}</p>
                    {
                        event.rewardDisplay !== undefined ?
                        <b>Rewards:</b>
                        : null
                    }
                    {   
                        event.rewardDisplay !== undefined ?
                            event.rewardDisplay.map((reward) => {
                                return <div className="rewardDisplay">{reward.stat} {reward.value}</div>
                            })
                        : null
                    }
                    { event.actions.map(action => {
                        let passedConditions = true;
                        if (action.conditions != null) {                            
                            for (let idx in action.conditions) {
                                let condition = action.conditions[idx];
                                if (condition.random !== undefined) {
                                    if (Math.random() * 100 > condition.random) {
                                        passedConditions = false;
                                    }
                                } else {
                                    if (props.user[condition.stat] < condition.value) {
                                        passedConditions = false;
                                    }
                                }
                            };
                        };
                        if (passedConditions)
                        {
                            if (action.action !== undefined) {
                                return <>
                                <button onClick={() => nextStep(action.action)}>{action.text}</button>
                                </>
                            } else if (action.randomAction !== undefined) {
                                return <>
                                <button onClick={() => nextStepRandom(action.randomAction)}>{action.text}</button>
                                </>
                            }
                        }
                    })}
                    </>
            //a combat event STARTS the battle, otherwise you'd be stuck in a loop of activity.
            case "combat":
                props.setCurrentAdventure({
                    type: "battle"                    
                });
                props.setCurrentEnemy({
                    name: event.enemyName,
                    currentHP: event.stats.hp,
                    maxHP: event.stats.hp,
                    attack: event.stats.attack,
                    defense: event.stats.defense,
                    magic: event.stats.magic,
                    reward: event.stats.reward
                });
                return <>
                </>

            case "battle":
                return <>
                Your HP: {props.user.currentHP}/{props.user.maxHP}<br/>
                {props.currentEnemy.name} HP: {props.currentEnemy.currentHP}/{props.currentEnemy.maxHP}
                {battleDescription}<br/>
                <button onClick={attack}>Attack</button>
                <button onClick={magic}>Magic</button>
                <button onClick={defend}>Defend</button>
                <button onClick={flee}>Flee</button>
                </>
            default:
                break;
        }
    }

    return (
        <div className="adventure">
            {
                typeof(props.currentAdventure.type) === "undefined" ? 
                <>
                    <h2>Go on an Adventure</h2>
                    <p>Life is full of adventure.  By stepping foot out of town, you open yourself to any number of possible adventures.  Some wonderful, some scary, and some very dangerous.  You never know what you will experience, except that it will be an adventure.</p>
                    <button className="actionButton" onClick={goOnAdventure}>Adventure!</button>
                </>
                : 
                    renderEvent(props.currentAdventure)

            }

        </div>
    )

}

export default Adventure;