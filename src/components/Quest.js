import { useState } from "react";
import { supabase } from "../lib/api";

const Quest = ({ quest, onDelete }) => {
    const [isCompleted, setIsCompleted] = useState(quest.is_complete);

    const toggleCompleted = async () => {
        const { data, error } = await supabase
            .from("quests")
            .update({ is_complete: !isCompleted })
            .eq("id", quest.questid)
            .single();
        if (error) {
            console.error(error);
        }
        setIsCompleted(data.is_complete);
    };

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
                        onChange={toggleCompleted}
                        
                        type="checkbox"
                        checked={isCompleted ? true : ""}
                    />
                    <span
                        className={`w-full flex-grow questSize ${
                            isCompleted ? "line-through" : ""
                        }`}
                    >
                        {questSize(quest.questSize)}
                    </span>  
                    <span
                        className={`w-full flex-grow questName ${
                            isCompleted ? "line-through" : ""
                        }`}
                    >
                        {quest.questname}
                    </span>
                    <span
                        className={`w-full flex-grow questDescription ${
                            isCompleted ? "line-through" : ""
                        }`}
                    >
                        {quest.questdescription}
                    </span>
                    <span
                        className={`w-full flex-grow questReward ${
                            isCompleted ? "line-through" : ""
                        }`}
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
