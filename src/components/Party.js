
import { useState, useRef, useEffect} from "react";
import { supabase } from "../lib/api";
import PartyInfo from "./PartyInfo";

const Party = ({user, returnHome, heroInfo, quests, setQuests, partyUsers, fetchPartyUsers}) => {

    const newPartyTextRef = useRef();

    const [errorText, setError] = useState("");
    const [partyUsersMap, setPartyUsersMap] = useState([]);

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


    useEffect(() => {
        sortPartyUsersMap(); 
        console.log("USER FROM PARTY");           
        console.log(user);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    //const [quests, setQuests] = useState([]);
    const addPartyUser = async (partyId, userText) => {
        console.log("About to add ");
        console.log(partyId);
        console.log(userText);
        let { data: newPartyUserId, error } = await supabase
            .rpc("addpartymember", {insertpartyid: partyId, newmembertext: userText});
        if (error) {
            console.log(newPartyUserId);
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
            console.log(newPartyId);
            setError(error);
        } else {
            fetchPartyUsers();
            sortPartyUsersMap();
        }

    }

    return (<div className={"PartyScreen  templateScreen"}>
                <h2>Party</h2>
                <p>A party is a group of adventurers that can assign quests to each other.  There are two different types of roles, <b>Leader</b> who can assign quests to anyone in the group, and <b>trainee</b> who can only assign quests to themselves.</p>
                <p>To be added to someone else's party, have them use your Adventurer ID: 
                    <span className={"YourInviteCode"}>{heroInfo.displayname}#{user.id.substring(0,4)}</span>
                    </p>

                <div className={"PartyUsers"}>
                {partyUsersMap.length ? (
                        <div>
                            <h2>Your Parties</h2>
                            {
                            partyUsersMap.map((partyInfo) => (
                                <PartyInfo 
                                    key={partyInfo.PartyId}
                                    partyInfo={partyInfo}
                                    addPartyUser={addPartyUser}
                                    partyUsersMap={partyUsersMap}
                                    returnHome={returnHome}
                                />
                            ))
                            }
                            </div>
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

                <div className={"CreateParty"}>
                    <h2>Create New Party</h2>
                    <div className={"m-4 mt-0 h-10"}>
                        <label>
                            <input
                                ref={newPartyTextRef}
                                type="text"
                                placeholder={"New Party Name"}
                                className={
                                    "regularInput bg-gray-200 border px-2 border-gray-300 w-1/2"
                                }
                            />
                        </label>
                        <button
                            onClick={createParty}
                            className={
                                "buttonRightOfInput w-1/4 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Create New Party
                        </button>

                    </div>
                </div>

                <div className={"ClearFix"}></div>
                <div className={"CreatePartyFooter"}>
                    <button
                            onClick={returnHome}
                            className={
                                "justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                        Home
                    </button>
                </div>
                <div>{errorText}</div>

    </div>)

}

export default Party;
