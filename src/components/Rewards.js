import { useState } from "react";
import { supabase } from "../lib/api";

const Rewards = ({ rewards, returnHome, loadRewards }) => {

    const [errorText, setError] = useState("");

    const completeReward = async (rewardId) => {
        const { data, error } = await supabase
            .from('reward')
            .update({ redemptionstatus: 1 })
            .eq('rewardid', rewardId);

//        let { data, error } = await supabase
//            .from("reward").update({redemptionstatus: 1, redemptiondate: new Date()}).eq('rewardid',rewardId);
        if (error) {
            console.log("error", error);
            //console.log(updated);
            setError("There was an error updating");
        }
        else loadRewards();
    };

    return (<div className={"RewardScreen templateFull"}>
                <h2>Rewards</h2>
                <div className={"RewardsList"}>
                    {rewards.length ? (
                        rewards.map((reward) => (
                            <div key={reward.rewardid} className={"IndividualReward"}>
                                <input type="checkbox" onClick={() => completeReward(reward.rewardid)}></input>
                                {reward.reward}
                                </div>
                        ))
                    ) : ( 
                        <div className={"IndividualReward"}>You have redeemed all your rewards</div> 
                    )
                    }
                </div>

                <div className={"RewardsFooter"}>
                    <button
                            onClick={returnHome}
                            className={
                                "floatRight justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                            }
                        >
                        Home
                    </button>
                </div>
                <div>{errorText}</div>

    </div>)

}

export default Rewards;