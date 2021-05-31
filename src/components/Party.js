
import { useState, useRef, useEffect } from "react";
import { supabase } from "../lib/api";
import PartyInfo from "./PartyInfo";

const Party = ({user, returnHome, quests, setQuests, partyUsers, fetchPartyUsers}) => {

    const newPartyTextRef = useRef();

    const [errorText, setError] = useState("");
    const [partyUsersMap, setPartyUsersMap] = useState([]);

    useEffect(() => {
        sortPartyUsersMap();            
    }, []);

    const sortPartyUsersMap = () => {
        let partyUsersMapClean = [];
        partyUsers.forEach(partyUser => {
            //check to see if we have already created the party id, if not, create it.
            if (typeof(partyUsersMapClean[partyUser.partyid]) == "undefined") {
                partyUsersMapClean[partyUser.partyid] = {PartyName: partyUser.partyname, PartyUsers: [], PartyId: partyUser.partyid}
            }
            partyUsersMapClean[partyUser.partyid].PartyUsers.push({user_id: partyUser.partyuserid, displayname: partyUser.displayname});
        });
        console.log("Setting party user map to:");
        console.log(partyUsersMapClean);
        setPartyUsersMap(partyUsersMapClean);
    };

    //const [quests, setQuests] = useState([]);
    const addPartyUser = async (partyId, userText) => {
        console.log("About to add ");
        console.log(partyId);
        console.log(userText);
        let { data: newPartyUserId, error } = await supabase
            .rpc("addpartymember", {insertpartyid: partyId, newmembertext: userText});
        if (error) {
            console.log("error", error);
            setError(error);
        } else {
            fetchPartyUsers();
            sortPartyUsersMap();
        }
    }

    const createParty = async () => {
        let {data: newPartyId, error } = await supabase.rpc("createnewparty",{partyname: newPartyTextRef.current.value});
        if (error) {
            console.log("error",error);
            setError(error);
        } else {
            fetchPartyUsers();
            sortPartyUsersMap();
        }

    }

    return (<div className={"PartyScreen  templateScreen"}>
                <h2>Party</h2>
                <div className={"CreateParty"}>
                    <div className={"m-4 mt-0 h-10"}>
                        <label>
                            New Party Name:<br/>
                            <input
                                ref={newPartyTextRef}
                                type="text"
                                placeholder={"New Party Name"}
                                className={
                                    "floatLeft bg-gray-200 border px-2 border-gray-300 w-3/4 mr-4"
                                }
                            />
                        </label>
                    </div>
                    <button
                            onClick={createParty}
                            className={
                                "floatRight w-1/4 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Create New Party
                        </button>
                </div>

                <div className={"PartyUsers"}>
                {partyUsersMap.length ? (
                            partyUsersMap.map((partyInfo) => (
                                <PartyInfo 
                                    partyInfo={partyInfo}
                                    addPartyUser={addPartyUser}
                                    partyUsersMap={partyUsersMap}
                                    returnHome={returnHome}
                                />
                            ))
                        ) : (
                            <span
                                className={
                                    "h-full flex justify-center items-center"
                                }
                            >
                                You do not have any parties yet.
                            </span>
                        )}
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
