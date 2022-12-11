
const ConfirmDeleteQuest = ({returnHome, questToDelete, deleteQuest}) => {
    const okToDelete = () => {
        deleteQuest(questToDelete.questid);
        returnHome();
    }

    return (
    <div className={"confirmQuestCompletion"}>
        <h2>Confirm Delete: {questToDelete.questname}</h2>
        <h3>Description:</h3>
        <div className={"w-full confirmQuestDescription"}>
            {questToDelete.questdescription}
        </div>
        <h3>Reward:</h3>
        <div className={"w-full confirmQuestDescription spaceAtTheBottom"}>
            {questToDelete.reward}<br/>
        </div>
        <div>
            <button className={"completeQuestButton floatLeft justify-center hover:bg-blue-500 transition duration-150 ease-in-out"} onClick={() => okToDelete()}>
                Delete
            </button>
            <button className={"cancelCompleteQuestButton floatRight justify-center transition duration-150 ease-in-out"} onClick={returnHome}>
                Cancel
            </button>
        </div>
    </div>
    );
}
export default ConfirmDeleteQuest;