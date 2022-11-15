
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
            {quest.reward}<br/><br/>
            (Reward will be available on the reward screen for you to claim!)
        </div>
        <div>
            <button className={"completeQuestButton floatLeft justify-center hover:bg-blue-500 transition duration-150 ease-in-out"} onClick={() => completeQuest(quest)}>
                Complete!
            </button>
            <button className={"cancelCompleteQuestButton floatRight justify-center transition duration-150 ease-in-out"} onClick={returnHome}>
                Cancel
            </button>
        </div>
    </div>
    );
}
export default CompleteQuest;