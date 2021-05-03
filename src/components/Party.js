
import {  useState, useRef } from "react";
import { supabase } from "../lib/api";

const Party = ({user, returnHome, quests, setQuests, partyUsers}) => {

    const newPartyTextRef = useRef();
    const newQuestDescriptionRef = useRef();
    const newQuestRewardRef = useRef();
    const newQuestSizeRef = useRef();

    const [errorText, setError] = useState("");
    const [partyUsers, setPartyUsers] = useState([]);

    //const [quests, setQuests] = useState([]);

    return (<div className={"PartyScreen"}>
                <h2>Party</h2>
                <div className={"CreateParty"}>
                    <div className={"m-4 mt-0 h-10"}>
                        <label>
                            New Party Name:
                            <input
                                ref={newPartyTextRef}
                                type="text"
                                className={
                                    "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                                }
                            />
                        </label>
                    </div>
                    <button
                            onClick={createParty}
                            className={
                                "floatLeft justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Create New Party
                        </button>
                </div>


                <div className={"CreatePartyFooter"}>
                    <button
                            onClick={returnHome}
                            className={
                                "floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                        Home
                    </button>
                </div>

    </div>)

}

export default Party;
