import './Adventure.css';
import React, {useState, useRef } from 'react';
import Town from './Town';
import UserInfo from './UserInfo';
import Training from './Training';
import Tavern from './Tavern';
import Adventure from './Adventure';
import 'rpg-awesome/css/rpg-awesome.min.css';
import { CommonAdventures } from './CommonAdventures';


function AdventureHome(props) {
  const userName = useRef(null);
  /*
  const [user, setUser] = useState({
    characterName: "",
    currentHP: 25,
    maxHP: 25,
    defense: 5,
    strength: 10,
    magic: 10,
    gold: 10,
    satisfaction: 10,
    items: [],
    mostRecentAdventure: {}
  });
  */

  const [inAction, setInAction] = useState(false);
  const [action, setAction] = useState("town");
  const [currentAdventure, setCurrentAdventure] = useState({});
  const [currentEnemy, setCurrentEnemy] = useState({});

  const setUser = (newUser) => {
    console.log("setting to ");
    console.log(newUser);
    props.setHeroInfo(newUser);
  }

  const updateAndSetCurrentAdventure = (adventure) => {
    //see if the adventure has an encounter, if so, process it.
    debugger;
    if (adventure.encounter !== undefined && adventure.encounter !== null) {
      let roll = Math.floor(Math.random() * 100);
      let activeEncounter = null;
      for (const key in adventure.encounter) {
        if (key >= roll) {
          activeEncounter = adventure.encounter[key];
        }
      };

      //if we have an active encounter process it as a reward, or action
      if (activeEncounter !== null) {
        if (activeEncounter.reward !== undefined) {
          adventure.reward.push(activeEncounter.reward);
          adventure.story += adventure.text;
        } else if (activeEncounter.action !== undefined) {
          let newAdventure = CommonAdventures[activeEncounter.action];
          newAdventure.returnAction = activeEncounter.returnAction;
        }
      }
    }

    //see if this has a reward attached, if so, give it and mark it as collected if not already.
    if (adventure.reward !== undefined && adventure.reward !== null) {
      let tmpUser = {...props.heroInfo};

      adventure.reward.forEach(reward => {
          tmpUser[reward.stat] = tmpUser[reward.stat] + reward.value;
      });
      tmpUser.updateStats = true;
      adventure.rewardDisplay = adventure.reward;
      setUser(tmpUser);
      //add the rewards to the story text.

      adventure.reward = null;
    }
    setCurrentAdventure(adventure);
  }

  const loadUserMenu = () => {
    if (!inAction)
      setAction("user");
  }

  const goToQuests = () => {
    props.returnHome();
  }

  const goOnAdventure = () => {
    if (!inAction)
      setAction("adventure");

  }

  const goToTavern = () => {
    setAction("tavern");
  }

  const goTraining = () => {
    if (!inAction)
      setAction("training");
  }

  const beginAdventure = () => {
    if (userName.current === "" && userName.current === null) {
      alert("You must provide a name");
      return false;
    }
    let tmpUser = {...props.heroInfo};
    tmpUser.characterName = userName.current.value;
    setUser(tmpUser);
    setAction("town");
  }

  return (
    <div className="App">
      { (action !== "intro") ? 
        <header className="HeaderMenu">
          <button className="MenuButton" onClick={loadUserMenu}><i className="ra ra-player"></i> You</button>
          <button className="MenuButton" onClick={goOnAdventure}><i className="ra ra-dice-two"></i> Adventure</button>
          <br/>
          <button className="MenuButton" onClick={goTraining}><i className="ra ra-anvil"></i> Train</button>
          <button className="MenuButton" onClick={goToTavern}><i className="ra ra-bottle-vapors"></i> Tavern</button>
          <br/>
          <button className="MenuButton" onClick={goToQuests}><i className="ra ra-bridge"></i> Back</button>
        </header>
        : null
      }
      <div className="mainWindow">
        {
          action === "intro" ?
          <>
            <h1>Welcome to Adventure</h1>
            <p>To win the game, you must enjoy yourself.  To master the game, you must achieve a satisfaction level of 100.  To begin, tell me your name.</p>

            <br/><br/>
            <input type="text" className="textInput" placeholder="Your Name" ref={userName}></input><br/>
            <button className="actionButton" onClick={beginAdventure}>Adventure!</button>
            </>
          : null
        }

        { 
        action === "town" ? 
          <Town user={props.heroInfo} setInAction={setInAction}></Town>
          : null
        }

        { 
        action === "user" ? 
          <UserInfo user={props.heroInfo} setInAction={setInAction} setUser={setUser}></UserInfo>
        : null
        }

        { 
        action === "training" ? 
          <Training user={props.heroInfo} setInAction={setInAction} setUser={setUser}></Training>
        : null
        }

        {
          action === "tavern" ?
          <Tavern user={props.heroInfo} setInAction={setInAction} setUser={setUser}></Tavern>
          : null
        }

        {
        action === "adventure" ?
          <Adventure user={props.heroInfo} setInAction={setInAction} setAction={setAction} currentEnemy={currentEnemy} setCurrentEnemy={setCurrentEnemy} setUser={setUser} currentAdventure={currentAdventure} setCurrentAdventure={updateAndSetCurrentAdventure}></Adventure>
          : null
        }

        {
          action === "end" ?
          <>
            <h2>Your adventure has come to an end...</h2>
            <p>I hope you enjoyed it.</p>
          </>
          : null
        }

      </div>
    </div>
  );
}

export default AdventureHome;
