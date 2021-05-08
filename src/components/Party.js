
import { useState, useRef } from "react";
import { supabase } from "../lib/api";

const Party = ({user, returnHome, quests, setQuests, partyUsers, fetchPartyUsers}) => {

    const newPartyTextRef = useRef();

    const [errorText, setError] = useState("");
    const [partyUsersMap, setPartyUsersMap] = useState([]);

    useEffect(() => {
        sortPartyUsersMap;            
    });

    const sortPartyUsersMap = () => {
        let partyUsersMapClean = [];
        partyUsers.forEach(partyUser => {
            //check to see if we have already created the party id, if not, create it.
            if (typeof(partyUsersMapClean[partyUser.PartyId]) == "undefined") {
                partyUsersMapClean[partyUser.PartyId] = {PartyName: partyUser.PartyName, PartyUsers: []}
            }
            partyUsersMapClean[partyUser.PartyId].PartyUsers.add({user_id: partyUser.user_id, Email: partyUser.Email});
        });
        setPartyUsersMap(partyUsersMapClean);
    };

    //const [quests, setQuests] = useState([]);
    const addPartyUser = (partyId, userEmail) => {
        let { data: newPartyUserId, error } = await supabase
            .rpc("addPartyMember", {partyid: partyId, newuseremail: userEmail});
        if (error) {
            console.log("error", error);
            setError(error);
        } else {
            fetchPartyUsers();
            sortPartyUsersMap();
        }
        
    }

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

                <div className={"PartyUsers"}>
                {partyUsers.length ? (
                            partyUsersMap.map((partyInfo) => (
                                <PartyInfo 
                                    partyInfo={partyInfo}
                                    addPartyUser={addPartyUser}
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
