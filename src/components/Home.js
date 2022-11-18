import { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import RecoverPassword from "./RecoverPassword";
import Quest from "./Quest"
import NewQuest from "./NewQuest";
import Hero from "./Hero";
import CharacterSheet from "./CharacterSheet";
import Rewards from "./Rewards";
import CompleteQuest from "./CompleteQuest";
import QuestCompleted from "./QuestCompleted";
import Party from "./Party";
import LevelUp from "./LevelUp";
import AdventureHome from "./Adventure/AdventureHome";
import 'rpg-awesome/css/rpg-awesome.min.css';


const Home = ({ user }) => {
    const [recoveryToken, setRecoveryToken] = useState(null);
    const [quests, setQuests] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [errorText, setError] = useState("");
    const [currentAction, setCurrentAction] = useState("home");
    const [heroInfo, setHeroInfo] = useState({});
    const [questToComplete, setQuestToComplete] = useState({});
    const [partyUsers, setPartyUsers] = useState([]);
    const [levelUpInfo, setLevelUpInfo] = useState([]);

    
    useEffect(() => {
        /* Recovery url is of the form
         * <SITE_URL>#access_token=x&refresh_token=y&expires_in=z&token_type=bearer&type=recovery
         * Read more on https://supabase.io/docs/client/reset-password-email#notes
         */
        let url = window.location.hash;
        let query = url.substr(1);
        let result = {};

        query.split("&").forEach((part) => {
            const item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });

        if (result.type === "recovery") {
            setRecoveryToken(result.access_token);
        }

        checkLevelUp().catch(console.error);
        fetchQuests().catch(console.error);
        fetchHero().catch(console.error);
        fetchPartyUsers().catch(console.error);
        loadRewards().catch(console.error);
    }, []);

    const updateHeroInfo = (hero) => {
        console.log(hero);
        if (hero.updateStats) {
            updateStats(hero);
            hero.updateStats = null;
        }
        setHeroInfo(hero);
    }

    const updateStats = async (userStats) => {
        let { data , error } = await supabase
            .rpc('updateherostats', {
                gold: userStats.gold, 
                currenthp: userStats.currentHP,
                maxhp: userStats.maxHP,
                defense: userStats.defense,
                strength: userStats.strength, 
                magic: userStats.magic });
        if (error) setError(error.message + data);
        else {
            console.log("data saved");
        }
    }

    const checkLevelUp = async () => {
        let { data: levelUpInfo, error } = await supabase
            .rpc("checklevelup");
        if (error) {
            console.log("error", error);
            setError(error);
        }
        else {
            if (levelUpInfo.leveledup === 1) {
                //the user has leveled up - lets CELEBRATE!
                setLevelUpInfo(levelUpInfo);
                setCurrentAction("LeveledUp");
            }
            console.log(levelUpInfo);
        }

    }

    const fetchHero = async () => {
        let { data: hero, error } = await supabase
            .rpc("gethero");
        if (error) {
            console.log("error", error);
            setError(error);
        }
        else {
            hero[0].items = [];
            setHeroInfo(hero[0]);
        }
    }

    const loadRewards = async () => {
        let { data: rewards, error } = await supabase
        .from("reward").select('rewardid, reward').eq("redemptionstatus",0);
        if (error) {
            console.log("error", error);
            setError(error);
        }
        else setRewards(rewards);
    }

    const fetchPartyUsers = async () => {
        let { data: partyUserResult, error } = await supabase
            .rpc("getpartyandusers");
        if (error) {
            console.log("error",error);
            setError(error);
        } else setPartyUsers(partyUserResult);
    }

    const fetchQuests = async () => {
        let { data: quests, error } = await supabase
            .rpc("getquests")
            .select("*")
            .order("questid", { ascending: false });
        if (error) {
            console.log("error", error);
            setError(error);
        }
        else setQuests(quests);
        console.log(quests);

    }

    const returnHome = () => {
        setCurrentAction("home");
    }

    const loadRewardsScreen = () => {
        setCurrentAction("Rewards");
    }

    const loadPartyScreen = () => {
        setCurrentAction("Party");
    }
    const showCharacterSheet = () => {
        setCurrentAction("CharacterSheet");
    }

    const completeQuest = async (quest) => {
        let { data , error } = await supabase
            .rpc('completequest', {completedquestid: quest.questid});
        if (error) setError(error.message + data);
        else {
            fetchQuests();
            fetchHero();
            loadRewards();
            setCurrentAction("QuestCompleted");
        }
    }

    const loadNewQuest = () => {
        setCurrentAction("NewQuest");
    }

    const loadAdventureScreen = () => {
        setCurrentAction("Adventure");
    }

    const confirmCompleteQuest = (quest) => {
        setQuestToComplete(quest);
        setCurrentAction("CompleteQuest");
    }

    const deleteQuest = async (id) => {
        try {
            await supabase.rpc("deletequest", {deletedquestid: id});
            setQuests(quests.filter((x) => x.questid !== id));
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
    };

    if (recoveryToken) {
        return <RecoverPassword
        token={recoveryToken}
        setRecoveryToken={setRecoveryToken}
        />
    } else {
        console.log("Current Action " + currentAction);
        switch (currentAction) {
            case 'home':
            return <div className={"w-screen fixed flex flex-col min-h-screen"}>
                <header
                    className={
                        "flex justify-between items-center px-4 h-16 bg-gray-900"
                    }
                >
                    <span
                        className={
                            "hiddenMobile text-2xl sm:text-4xl invisible md:visible text-white border-b font-sans"
                        }
                    >
                        You Todo
                    </span>
                    <Hero user={user} heroInfo={heroInfo} showCharacterSheet={showCharacterSheet} setError={setError}></Hero>
                    <button
                        onClick={handleLogout}
                        className={
                            "logoutButton flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        }
                    >
                        Logout
                    </button>
                </header>
                <div
                    className={"flex flex-col flex-grow p-4 listContainer"}
                    
                >
                    <div
                        className={`p-2 border grid gap-2 ${
                            quests.length ? "auto-rows-min" : ""
                        } grid-cols-1 h-2/3 overflow-y-scroll first:mt-8 noFlexGrow`}
                    >
                        {quests.length ? (
                            quests.map((quest) => (
                                <Quest 
                                    questId={quest.questid}
                                    quest={quest}
                                    onDelete={() => deleteQuest(quest.questid)}
                                    onComplete={() => confirmCompleteQuest(quest)}
                                />
                            ))
                        ) : (
                            <span
                                className={
                                    "h-full flex justify-center items-center"
                                }
                            >
                                You have no active quests!
                            </span>
                        )}
                    </div>
                    {!!errorText && (
                        <div
                            className={
                                "border max-w-sm self-center px-4 py-2 mt-4 text-center text-sm bg-red-100 border-red-300 text-red-400"
                            }
                        >
                            {errorText}
                        </div>
                    )}
                </div>
                <div className={"flex m-4 mt-0 h-10"}>
                    <button
                        onClick={loadNewQuest}
                        className={
                            "bottomMenuButton"
                        }
                    >
                        Add
                    </button>
                    <button
                        onClick={loadPartyScreen}
                        className={
                            "bottomMenuButton"
                        }
                        >Party</button>
                    <button
                        onClick={loadRewardsScreen}
                        className={
                            "bottomMenuButton"
                        }
                        >Rewards</button>
                    <button
                        onClick={loadAdventureScreen}
                        className={
                            "bottomMenuButton"
                        }
                        >Adventure</button>
                </div>
            </div>
            case 'NewQuest':
                return <NewQuest returnHome={returnHome} setQuests={setQuests} quests={quests} heroInfo={heroInfo} user={user} partyUsers={partyUsers}/>
            case 'CharacterSheet':
                return <CharacterSheet user={user} heroInfo={heroInfo} returnHome={returnHome} setHeroInfo={updateHeroInfo}/>
            case 'CompleteQuest':
                return <CompleteQuest user={user} quest={questToComplete} completeQuest={completeQuest} returnHome={returnHome}></CompleteQuest>
            case 'QuestCompleted':
                return <QuestCompleted returnHome={returnHome} quest={questToComplete}></QuestCompleted>
            case 'Party':
                return <Party fetchPartyUsers={fetchPartyUsers} heroInfo={heroInfo} returnHome={returnHome} user={user} partyUsers={partyUsers}></Party>
            case 'Rewards':
                return <Rewards returnHome={returnHome} rewards={rewards} loadRewards={loadRewards}></Rewards>
            case 'LeveledUp':
                return <LevelUp returnHome={returnHome} levelUpInfo={levelUpInfo}></LevelUp>
            case 'Adventure':
                return <AdventureHome updateStats={updateStats} returnHome={returnHome} setHeroInfo={updateHeroInfo} heroInfo={heroInfo} user={user}></AdventureHome>
            default: 
                return null;
        }
    }
};

export default Home;
