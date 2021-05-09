import { useState, useRef } from "react";

const PartyInfo = ({partyInfo,addPartyUser})  => {
    const newPartyUserTextRef = useRef();
    const [errorText, setError] = useState("");

    const addPartyUserForThisParty = () => {
        addPartyUser(partyInfo.PartyId, newPartyUserTextRef.value);
    }

    return (<div className={"PartyInfo"}>
                <h3>{partyInfo.PartyName}</h3>
                <div className={"CreateParty"}>
                    {
                        partyInfo.partyUsers.length > 0 ? (
                            partyInfo.partyUsers.map((partyUser) => (
                                <div className={"PartyUser"}>{partyUser.Email}</div>
                            ))
                        ) : (
                            <span>No members of this party</span>
                        )
                    } 
                    <div className={"m-4 mt-0 h-10"}>
                        <label>
                            Email:
                            <input
                                ref={newPartyUserTextRef}
                                type="text"
                                className={
                                    "bg-gray-200 border px-2 border-gray-300 w-full mr-4"
                                }
                            />
                        </label>
                    </div>
                    <button
                            onClick={addPartyUserForThisParty}
                            className={
                                "floatLeft justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Add to Party
                        </button>
                </div>

                <div className={"PartyUsers"}>
                {partyUsers.length ? (
                            partyUsersMap.map((partyInfo) => (
                                <PartyInfo 
                                    partyInfo={partyInfo}
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

export default PartyInfo;