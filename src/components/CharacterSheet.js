import { useState, useRef } from "react";
import { supabase } from "../lib/api";

const CharacterSheet = ({user, returnHome, setHeroInfo, heroInfo }) => {

    const displayNameRef = useRef();
    const avatarUrlRef = useRef();

    const [errorText, setError] = useState("");

    const updateDisplayName = async () => {
        let displayName = displayNameRef.current.value;
        console.log("Updating display name to " + displayName);
        if (displayName.length <= 1) {
            setError("You need at least 1 character for your display name");
        } else {
            let { data: updatedDisplayName, error } = await supabase
                .from("userdetail")
                .update({displayname: displayName});
            if (error) setError(error.message + updatedDisplayName);
            else {
                heroInfo.displayname = displayName;
                setHeroInfo(heroInfo);
            }
        }
    }    

    const updateAvatarUrl = async () => {
        let avatarUrl = avatarUrlRef.current.value;
        if (avatarUrl.length <= 1) {
            setError("You need at least 1 character for your avatar URL");
        } else {
            let { data: updatedUrl, error } = await supabase
                .from("userdetail")
                .update({avatarurl: avatarUrl});
            if (error) setError(error.message + updatedUrl);
            else {
                heroInfo.avatarurl = avatarUrl;
                setHeroInfo(heroInfo);
            }
        }
    }   

    return (<div className={"displayCharacterSheet"}>
        <h2>Your Character Sheet</h2>
                <div className={"m-4 mt-0 h-10"}>
                    <label className={"characterSheetLabel"}>
                        Hero Name:
                        <input
                            ref={displayNameRef}
                            type="text"
                            defaultValue={heroInfo.displayname}
                            className={
                                "bg-gray-200 border px-2 border-gray-300 mr-4"
                            }
                        />
                        <button className={"UpdateCharacterSheetButton"} onClick={updateDisplayName}>Update</button>
                    </label>
                    <label className={"characterSheetLabel"}>
                        Avatar URL:
                        <input
                            ref={avatarUrlRef}
                            defaultValue={heroInfo.avatarurl}
                            type="text"
                            className={
                                "bg-gray-200 border px-2 border-gray-300 mr-4"
                            }
                        />
                        <button className={"UpdateCharacterSheetButton"} onClick={updateAvatarUrl}>Update</button>
                    </label>
                    <div className={"buttonrow"}>
                        <button
                            onClick={returnHome}
                            className={
                                "floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                            Return
                        </button>
                    </div>
                    <div>
                        {errorText}
                    </div>
                </div>
        </div>)
 
}

export default CharacterSheet;
