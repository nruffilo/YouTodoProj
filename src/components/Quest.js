import { useState } from "react";
import { supabase } from "../lib/api";
import * as Constants from "../lib/constants";


const Quest = ({ quest, onDelete }) => {
    const [isCompleted, setIsCompleted] = useState(quest.queststatus);

    const toggleCompleted = async () => {
        const { data, error } = await supabase
            .from("Quest")
            .update({ QuestStatus: Constants.QuestStatusCompleted })
            .eq("id", quest.questid)
            .single();
        if (error) {
            console.error(error);
        }
        setIsCompleted(data.queststatus);
    };

    function displaySize(size) {
        switch(size) {
            case 1:
                return "Small - 5 mins";
            case 2:
                return "Medium - 20 mins";
            case 3:
                return "Large - 1 hour";
            case 4:
                return "Epic - 2+ hours";
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
                    className={`w-full flex-grow ${
                        isCompleted ? "line-through" : ""
                    }`}
                >
                    {quest.questname}
                </span>
                <span
                    className={`w-full flex-grow ${
                        isCompleted ? "line-through" : ""
                    }`}
                >
                    {quest.questdescription}
                </span>
                <span
                    className={`w-full flex-grow ${
                        isCompleted ? "line-through" : ""
                    }`}
                >
                    {displaySize(quest.size)}
                </span>
                <span
                    className={`w-full flex-grow ${
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
