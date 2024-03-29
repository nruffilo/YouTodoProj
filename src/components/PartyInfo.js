import { useRef } from "react";

const PartyInfo = ({partyInfo,addPartyUser, partyUsersMap, returnHome})  => {
    const newPartyUserTextRef = useRef();

    const addPartyUserForThisParty = () => {
        addPartyUser(partyInfo.PartyId, newPartyUserTextRef.current.value);
    }

    return (<div className={"PartyInfo"} key={partyInfo.PartyId}>
                <h3>{partyInfo.PartyName}</h3>
                <div className={"partyMemberList"} key={partyInfo.PartyId}>
                    {
                        partyInfo.PartyUsers.length > 0 ? (
                            partyInfo.PartyUsers.map((partyUser) => (
                                <div key={partyUser.partyuserid} className={"PartyUser"}>{partyUser.displayname}</div>
                            ))
                        ) : (
                            <span>No members of this party</span>
                        )
                    } 
                    <div className={""}>
                        <label>
                            <input
                                ref={newPartyUserTextRef}
                                type="text"
                                placeholder="MemberName#1234"
                                className={
                                    "regularInput bg-gray-200 border px-2 border-gray-300 w-1/2"
                                }
                            />
                        </label>
                        <button
                            onClick={addPartyUserForThisParty}
                            className={
                                "buttonRightOfInput w-1/4 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Add to Party
                        </button>

                    </div>
                </div>
                <div className={"clearFix"}></div>

    </div>)

}

export default PartyInfo;