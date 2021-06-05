import { useEffect } from "react";

const LevelUp = ({ returnHome, levelUpInfo }) => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "./fireworks.js";
        script.async = true;
        document.body.appendChild(script);
      return () => {
          document.body.removeChild(script);
        }
      }, []);

      return (
    <div className={"QuestCompletedScreen"}>
        <h2>Huzzah!</h2>
        <p>You leveled up!  You are now level <b>{levelUpInfo.newlevel}</b></p>
        <p>Your rewards:</p>
        <p>
        <ul>
            <li>{levelUpInfo.goldrewards} gold</li>
            <li>{levelUpInfo.abilitypointsreward} ability points</li>
        </ul>
        </p>
        <canvas id="canvas">Canvas is not supported in your browser.</canvas>
        <div>
            <button className={"w-half BackToQuestsFromQuestComplete floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"} onClick={returnHome}>
                Back To Quests
            </button>
        </div>
    </div>
    );
}
export default LevelUp;