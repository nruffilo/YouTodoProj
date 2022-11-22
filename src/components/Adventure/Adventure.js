import React, {useEffect, useState} from 'react';
import { supabase } from '../../lib/api';

function Adventure(props) {
    const [yourAttack, setYourAttack] = useState();
    const [yourDefense, setYourDefense] = useState();
    const [yourMagic, setYourMagic] = useState();
    const [enemyAttack, setEnemyAttack] = useState();
    const [enemyDefense, setEnemyDefense] = useState();
    const [battleDescription, setBattleDescription] = useState();
    const [adventureNotice, setAdventureNotice] = useState();

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
        tmpYou.updateStats = true;

        //determine if there is a fight winner, if so, end the combat.
        if (tmpYou.currentHP <= 0) {
            let actions = [];
            actions.push({actiontext: "Return Home",adventureid:0});
            tmpYou.currentHP = 1;
            props.setUser(tmpYou);
            loadAdventureById(18, actions, tmpEnemy.reward);
        } else if (tmpEnemy.currentHP <= 0) {
            let actions = [];
            if (props.currentAdventure.returnAction !== undefined) {
                actions.push(props.currentAdventure.returnAction);
            } else {
                actions.push({actiontext: "Return Home",adventureid:0});
            }
            props.setUser(tmpYou);
            loadAdventureById(15, actions, tmpEnemy.reward);
        } else {
            props.setUser(tmpYou);
        }

    }

    const completeAdventure = () => {
        props.setCurrentAdventure({});
    }

    const goOnAdventure = async () => {
        //check to see if the user has at least 10gp
        if (props.user.gold < 10) {
            setAdventureNotice(<p>You do not have enough gold.  Complete more quests (tasks) to earn more gold.</p>);
            return false;
        } else {
            //if user HAS 10 gp, take it
            let tmpUser = props.user;
            tmpUser.updateStats = true;
            tmpUser.gold = tmpUser.gold - 10;
            props.setUser(tmpUser);
        }        

        let { data: nextAdventureResult, error } = await supabase
            .from("adventure")
            .select("*")
            .eq("startindicator",true);
        if (error) {
            console.log("error",error);
        } else {
            //load the actions
            let newAdvNum = Math.floor(Math.random()*nextAdventureResult.length);
            let {data: actionResult, error } = await supabase
                .from("adventureaction")
                .select("*")
                .eq("originatingadventureid",nextAdventureResult[newAdvNum].adventureid)
            if (error) {
                console.log("error",error);
            } else {
                actionResult.forEach((action) => {
                    if (action.conditions !== null) action.conditions = JSON.parse(action.conditions);
                });
                nextAdventureResult[newAdvNum].actions = actionResult;
                props.setCurrentAdventure(nextAdventureResult[newAdvNum]);
            }
        }    
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

    const loadAdventureById = async (adventureId, optionalActions, optionalReward) => {
        let { data: nextAdventureResult, error } = await supabase
            .from("adventure")
            .select("*")
            .eq("adventureid",adventureId)
            .single();
        if (error) {
            console.log("error",error);
        } else {
            //load the actions
            let {data: actionResult, error } = await supabase
                .from("adventureaction")
                .select("*")
                .eq("originatingadventureid",nextAdventureResult.adventureid)
            if (error) {
                console.log("error",error);
            } else {
                actionResult.forEach((action) => {
                    if (action.conditions !== null) action.conditions = JSON.parse(action.conditions);
                });
                nextAdventureResult.actions = actionResult;
                //convert any json text to json
                if (nextAdventureResult.reward !== null) {
                    nextAdventureResult.reward = JSON.parse(nextAdventureResult.reward);
                }
                if (optionalReward !== undefined && optionalReward !== null) {
                    nextAdventureResult.reward = optionalReward;
                }
                if (optionalActions !== undefined && optionalActions !== null) {
                    nextAdventureResult.actions = optionalActions;
                }
                //check to see if there is an enemy to load
                if (nextAdventureResult.adventureenemyid !== null) {
                    let { data: enemy,enemyError } = await supabase
                        .from("adventureenemy").select('*').eq("adventureenemyid",nextAdventureResult.adventureenemyid).single();
                    if (enemyError) {
                        console.log("error", error);
                    }
                    enemy.reward = JSON.parse(enemy.rewards);
                    nextAdventureResult.enemy = enemy;
                }
                
                props.setCurrentAdventure(nextAdventureResult);
            }
        }    
    }

    const nextStep = (action) => {
        if (action === 0) {
            completeAdventure();
        } else {
            loadAdventureById(action);
        }
    }

    const renderEvent = (event) => {
        switch (event.adventuretype) {
            case "story":
                return <>
                    <h2>{event.heading}</h2>
                    {
                        event.image !== null ?
                            <div className="adventureImage"><img alt='adventure thumbnail' src={`/images/${event.image}`}/></div>
                        : null
                    }
                    <p className="adventureStoryText" dangerouslySetInnerHTML={{__html: event.story}}></p>
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
                    <div className="adventureActionButtons">
                    { event.actions.map(action => {
                        let passedConditions = true;
                        if (action.conditions !== null) {
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
                            if (action.adventureid !== undefined) {
                                return <>
                                <button onClick={() => nextStep(action.adventureid)}>{action.actiontext}</button>
                                </>
                            } else if (action.randomAction !== undefined) {
                                return <>
                                <button onClick={() => nextStepRandom(action.randomAction)}>{action.actiontext}</button>
                                </>
                            }
                        }
                        return <></>;
                    })}
                    </div>
                    </>
            //a combat event STARTS the battle, otherwise you'd be stuck in a loop of activity.
            case "combat":
                props.setCurrentEnemy({
                    name: event.enemy.enemyName,
                    currentHP: event.enemy.hp,
                    maxHP: event.enemy.hp,
                    attack: event.enemy.attack,
                    defense: event.enemy.defense,
                    magic: event.enemy.magic,
                    reward: event.enemy.reward
                });
                props.setCurrentAdventure({
                    adventuretype   : "battle"                    
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
                typeof(props.currentAdventure.adventuretype) === "undefined" ? 
                <>
                    <h2>Go on an Adventure</h2>
                    <p>Life is full of adventure.  By stepping foot out of town, you open yourself to any number of possible adventures.  Some wonderful, some scary, and some very dangerous.  You never know what you will experience, except that it will be an adventure.</p>
                    <p>Adventures will cost you 10 gold, for supplies.</p>
                    {adventureNotice}
                    <div className="adventureActionButtons">
                        <button className="actionButton" onClick={goOnAdventure}>Adventure! (10gp)</button>
                    </div>
                </>
                : 
                    renderEvent(props.currentAdventure)

            }

        </div>
    )

}

export default Adventure;