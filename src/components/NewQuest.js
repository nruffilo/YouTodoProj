import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/api";
import * as Constants from "../lib/constants";

const NewQuest = ({user}) => {

    const newQuestTextRef = useRef();
    const newQuestDescriptionRef = useRef();
    const newQuestRewardRef = useRef();
    const newQuestSizeRef = useRef();

    const [errorText, setError] = useState("");
    const [quests, setQuests] = useState([]);


    const addQuest = async () => {
        let questText = newQuestTextRef.current.value;
        let quest = questText.trim();
        if (quest.length <= 1) {
            setError("Quest needs at least 1 character");
        } else {
            let { data: quest, error } = await supabase
                .from("quest")
                .insert({ quest, createdbyuserid: user.id })
                .single();
            if (error) setError(error.message);
            else {
                setQuests([quest, ...quests]);
                setError(null);
                newQuestTextRef.current.value = "";
            }
        }
    }

    

    return (<div>
            <div className={"flex m-4 mt-0 h-10"}>
                <input
                    ref={newQuestTextRef}
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addQuest()}
                    className={
                        "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                    }
                />
                <input
                    ref={newQuestDescriptionRef}
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addQuest()}
                    className={
                        "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                    }
                />
                <input
                    ref={newQuestRewardRef}
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addQuest()}
                    className={
                        "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                    }
                />
                <select
                    ref={newQuestSizeRef}
                    type="text"
                    onKeyUp={(e) => e.key === "Enter" && addQuest()}
                    className={
                        "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                    }
                >
                    <option value="1">Small - 5 mins</option>
                    <option value="2">Medium - 20 mins</option>
                    <option value="3">Large - 1 hour</option>
                    <option value="4">Epic - 2+ hours</option>
                </select>
                <button
                    onClick={addQuest}
                    className={
                        "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    }
                >
                    Add
                </button>
            </div>
    </div>)
 
}

export default NewQuest;
