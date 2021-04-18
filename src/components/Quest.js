
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
            <div
                    className={"p-3 max-h-14 flex align-center justify-between border"}
                >
                    <span className={"truncate flex-grow"}>
                        <input
                            className="cursor-pointer mr-2"
                            onChange={onComplete}
                            
                            type="checkbox"
                        />
                        <span
                            className={`w-full flex-grow questSize `}
                        >
                            {questSize(quest.size)}
                        </span>  
                        <span
                            className={`w-full flex-grow questName `}
                        >
                            {quest.questname}
                        </span>
                        <span
                            className={`w-full flex-grow questDescription `}
                        >
                            {quest.questdescription}
                        </span>
                        <span
                            className={`w-full flex-grow questReward`}
                        >
                            {quest.reward}
                        </span>    
                    </span>
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
