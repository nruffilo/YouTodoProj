import { useEffect } from "react";

const QuestCompleted = ({ quest, returnHome }) => {
    const questExp = (questSize) => {
        switch (questSize) {
            case 1: 
                return 100;
            case 2: 
                return 400;
            case 3: 
                return 1200;
            case 4:
                return 2500;
            default:
                return 0;
        }
    }

    const questGold = (questSize) => {
        switch (questSize) {
            case 1: 
                return 5;
            case 2: 
                return 10;
            case 3: 
                return 25;
            case 4:
                return 55;
            default:
                return 0;
        }
    }
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
        <p>You completed a quest and earned {questExp(quest.size)} xp and {questGold(quest.size)} gold!</p>
        <canvas id="canvas">Canvas is not supported in your browser.</canvas>
        <div>
            <button className={"w-half BackToQuestsFromQuestComplete floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"} onClick={returnHome}>
                Back To Quests
            </button>
        </div>
    </div>
    );
}
export default QuestCompleted;