
import {  useState, useRef } from "react";
import { supabase } from "../lib/api";

const NewQuest = ({user, returnHome, quests, setQuests, partyUsers}) => {

    const newQuestTextRef = useRef();
    const newQuestDescriptionRef = useRef();
    const newQuestRewardRef = useRef();
    const newQuestSizeRef = useRef();
    const newQuestUserRef = useRef();

    const [errorText, setError] = useState("");
    //const [quests, setQuests] = useState([]);


    const addQuest = async () => {
        let questText = newQuestTextRef.current.value;
        let questDesc = newQuestDescriptionRef.current.value;
        let questSize = Number(parseInt(newQuestSizeRef.current.value));
        let questReward = newQuestRewardRef.current.value;
        let questUserId = "";
        if (newQuestUserRef.current !== undefined) {
            questUserId = newQuestUserRef.current.value;
        } else {
            questUserId = user.id;
        }
        let quest = questText.trim();
        if (quest.length <= 1) {
            setError("Quest needs at least 1 character");
        } else {
            let { data: newQuestId, error } = await supabase 
                .rpc('addnewquest', {
                    questdescription: questDesc, 
                    questsize: questSize, 
                    reward: questReward, 
                    questname: questText,
                    newquestuserid: questUserId
                });
            if (error) setError(error.message);
            else {
                let newQuest = {
                    questid: newQuestId,
                    questname: newQuestTextRef.current.value,
                    questdescription: newQuestDescriptionRef.current.value,
                    queststatus: 1,
                    reward: newQuestRewardRef.current.value,
                    size: parseInt(newQuestSizeRef.current.value),
                    createddate: new Date(),
                    completeddate: null,
                    expiredate: null
                };
                console.log(newQuest);
                setQuests([newQuest, ...quests]);
                setError(null);
                newQuestTextRef.current.value = "";
                newQuestDescriptionRef.current.value = "";
                newQuestRewardRef.current.value = "";
                newQuestSizeRef.current.value = "";
                returnHome();
            }
        }
    }

    

    return (<div className={"addNewQuest"}>
        <h2>Add New Quest</h2>
                <div className={"m-4 mt-0 h-10"}>
                    {
                        partyUsers.length > 1 ? (
                            <label>
                                Create Quest For:
                                <select
                                    ref={newQuestUserRef}
                                    type="select"
                                    className={"bg-gray-200 border px-2 border-gray-300 w-full mr-4"}
                                    defaultValue={user.id}
                                    >
                                        <option key={user.id} value={user.id}>Yourself</option>
                                        {
                                            partyUsers.map((partyUser) => {
                                                if (user.id !== partyUser.partyuserid) {
                                                    return <option key={partyUser.partyuserid} value={partyUser.partyuserid}>{partyUser.displayname}</option>
                                                }
                                                return '';
                                            }
                                            )
                                        }

                                </select>
                            </label>
                        ) : (
                            <span/>
                        )
                    }
                    <label>

                    </label>
                    <label>
                        Quest Name:
                        <input
                            ref={newQuestTextRef}
                            type="text"
                            className={
                                "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                            }
                        />
                    </label>

                    <label>
                        Description:
                        <input
                            ref={newQuestDescriptionRef}
                            type="text"
                            className={
                                "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                            }
                        />
                    </label>
                    <label>
                        Reward:
                        <input
                            ref={newQuestRewardRef}
                            type="text"
                            className={
                                "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                            }
                        />
                    </label>
                    <label>
                        Size: 
                        <select
                            ref={newQuestSizeRef}
                            type="text"
                            className={
                                "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                            }
                        >
                            <option value="1">Small - 5 mins</option>
                            <option value="2">Medium - 20 mins</option>
                            <option value="3">Large - 1 hour</option>
                            <option value="4">Epic - 2+ hours</option>
                        </select>
                    </label>
                    <div className={"buttonrow"}>
                        <button
                            onClick={addQuest}
                            className={
                                "floatLeft justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Add
                        </button>

                        <button
                            onClick={returnHome}
                            className={
                                "floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Cancel
                        </button>
                    </div>
                    <div>
                        {errorText}
                    </div>
                </div>
        </div>)
 
}

export default NewQuest;
