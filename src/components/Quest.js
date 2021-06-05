
const Quest = ({ quest, onDelete, onComplete }) => {

    const questSize = (questSize) => {
        switch (questSize) {
            case 1:
                return "Small - 5 mins";
            case 2:
                return "Medium - 20 mins";
            case 3: 
                return "Large - 1 hour";
            case 4: 
                return "Epic - 2+ hours";
            default:
                return "Unknown";
        }
    }

    return (
            <div key={quest.questid}
                    className={"p-3 flex align-center justify-between border questList"}
                >
                    <div className={"flex-grow"}>
                        <input
                            className="cursor-pointer mr-2"
                            onChange={onComplete}
                            
                            type="checkbox"
                        />
                        <div
                            className={`questSize `}
                        >
                            {questSize(quest.size)}
                        </div>  
                        <div
                            className={`questName `}
                        >
                            {quest.questname}
                        </div>
                        <div
                            className={`questDescription `}
                        >
                            {quest.questdescription}
                        </div>
                        <div
                            className={`questReward`}
                        >
                            {quest.reward }
                        </div>    
                    </div>
                    <button
                        className={"font-mono text-red-500 text-xl border px-2"}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        X
                    </button>
                </div>
    );
};

export default Quest;
