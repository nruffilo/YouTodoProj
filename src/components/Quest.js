
const Quest = ({ quest, onDelete, onComplete }) => {

    const questSize = (questSize) => {
        switch (questSize) {
            case 1:
                return "Small";
            case 2:
                return "Medium";
            case 3: 
                return "Large";
            case 4: 
                return "Epic";
            default:
                return "Unknown";
        }
    }

    return (
            <div key={quest.questid}
                    className={"flex align-center justify-between border questList"}
                >
                    <div className={"flex-grow"}>
                        <input
                            className="cursor-pointer mr-2"
                            onChange={onComplete}
                            
                            type="checkbox"
                        />
                        <div
                            className={`questName `}
                        >
                            {quest.questname}
                            <span className={'questSize'}>
                                {questSize(quest.size)}
                            </span>
                        </div>
                        <div
                            className={`questDescription `}
                        >
                            {quest.questdescription}
                        </div>
                        { quest.reward !== "" ? 
                            <div
                                className={`questReward`}
                            >
                                Reward: {quest.reward }
                            </div>    
                            : ''
                        }
                    </div>
                    <span
                        className={"cancelButton"}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <i className="ra ra-cancel"></i>
                    </span>
                </div>
    );
};

export default Quest;
