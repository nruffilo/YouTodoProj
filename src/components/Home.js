import { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import RecoverPassword from "./RecoverPassword";
import Quest from "./Quest"
import NewQuest from "./NewQuest";
import Hero from "./Hero";
import CharacterSheet from "./CharacterSheet";
import CompleteQuest from "./CompleteQuest";

const Home = ({ user }) => {
    const [recoveryToken, setRecoveryToken] = useState(null);
    const [todos, setTodos] = useState([]);
    const [quests, setQuests] = useState([]);
    const [errorText, setError] = useState("");
    const [currentAction, setCurrentAction] = useState("home");
    const [heroInfo, setHeroInfo] = useState({});
    const [questToComplete, setQuestToComplete] = useState({});

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

        fetchQuests().catch(console.error);
        fetchHero().catch(console.error);
    }, []);

    const fetchHero = async () => {
        let { data: hero, error } = await supabase
            .rpc("gethero")
            .select("*").single();
        if (error) {
            console.log("error", error);
            setError(error);
        }
        else setHeroInfo(hero);
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
    }

    const returnHome = () => {
        setCurrentAction("home");
    }

    const showCharacterSheet = () => {
        setCurrentAction("CharacterSheet");
    }

    const completeQuest = async (questId) => {
        let { data , error } = await supabase
            .rpc("CompleteQuest", {completedQuestId: questId}).single();
        if (error) setError(error.message);
        else {
            fetchQuests();
            returnHome();
        }
    }

    const loadNewQuest = () => {
        setCurrentAction("NewQuest");
    }

    const confirmCompleteQuest = (quest) => {
        setQuestToComplete(quest);
        setCurrentAction("CompleteQuest");
    }

    const deleteQuest = async (id) => {
        try {
            await supabase.from("quests").delete().eq("questid", id);
            setTodos(quests.filter((x) => x.id !== id));
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
            return <div className={"w-screen fixed flex flex-col min-h-screen bg-gray-50"}>
                <header
                    className={
                        "flex justify-between items-center px-4 h-16 bg-gray-900"
                    }
                >
                    <span
                        className={
                            "text-2xl sm:text-4xl text-white border-b font-sans"
                        }
                    >
                        You Todo
                    </span>
                    <Hero user={user} heroInfo={heroInfo} showCharacterSheet={showCharacterSheet} setError={setError}></Hero>
                    <button
                        onClick={handleLogout}
                        className={
                            "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        }
                    >
                        Logout
                    </button>
                </header>
                <div
                    className={"flex flex-col flex-grow p-4"}
                    
                >
                    <div
                        className={`p-2 border flex-grow grid gap-2 ${
                            todos.length ? "auto-rows-min" : ""
                        } grid-cols-1 h-2/3 overflow-y-scroll first:mt-8`}
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
                                You do have any tasks yet!
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
                            "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        }
                    >
                        Add
                    </button>
                </div>
            </div>
            case 'NewQuest':
                return <NewQuest returnHome={returnHome} setQuests={setQuests} quests={quests} heroInfo={heroInfo}/>
            case 'CharacterSheet':
                return <CharacterSheet user={user} heroInfo={heroInfo} returnHome={returnHome} setHeroInfo={setHeroInfo}/>
            case 'CompleteQuest':
                return <CompleteQuest user={user} quest={questToComplete} completeQuest={completeQuest} returnHome={returnHome}></CompleteQuest>
            default: 
                return null;
        }
    }
};

export default Home;
