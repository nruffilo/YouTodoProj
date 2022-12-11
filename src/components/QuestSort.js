
const QuestSort = ({ currentSortType, setQuestSort, returnHome }) => {
    return (
        <div className={"templateFull"}>
            <h2>Quest Sorting</h2>
            <p>Select an ordering for your quests:</p>
            <button className={currentSortType === "sizeAsc" ? "active" : null} onClick={() => setQuestSort("sizeAsc")}>Quest Size (Small to Large)</button>
            <button className={currentSortType === "sizeDesc" ? "active" : null} onClick={() => setQuestSort("sizeDesc")}>Quest Size (Large to Small)</button>
            <button className={currentSortType === "newest" ? "active" : null} onClick={() => setQuestSort("newest")}>Newest First</button>
            <button className={currentSortType === "oldest" ? "active" : null} onClick={() => setQuestSort("oldest")}>Oldest First</button>

            <br/><br/>
            <button onClick={returnHome}>Return</button>
        </div>
    );
};

export default QuestSort;
