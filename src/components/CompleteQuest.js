
const CompleteQuest = ({user, quest, completeQuest, returnHome}) => {
    return (
    <div className={"confirmQuestCompletion"}>
        <h2>{quest.questname}</h2>
        <h3>Description:</h3>
        <div className={"w-full confirmQuestDescription"}>
            {quest.questdescription}
        </div>
        <h3>Reward:</h3>
        <div className={"w-full confirmQuestDescription spaceAtTheBottom"}>
            {quest.reward}
        </div>
        <div>
            <button className={"w-half completeQuestButton floatLeft justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"} onClick={() => completeQuest(quest)}>
                Complete!
            </button>
            <button className={"w-half cancelCompleteQuestButton floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"} onClick={returnHome}>
                Cancel
            </button>
        </div>
    </div>
    );
}
export default CompleteQuest;