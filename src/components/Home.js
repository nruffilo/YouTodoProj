import { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../lib/api";
import RecoverPassword from "./RecoverPassword";
import TodoItem from "./TodoItem";
import Quest from "./Quest";

const Home = ({ user }) => {
    const [recoveryToken, setRecoveryToken] = useState(null);
    const [quests, setQuests] = useState([]);
    const newTaskTextRef = useRef();
    const [errorText, setError] = useState("");
    const history = useHistory();

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
    }, []);

    const fetchQuests = async () => {
        let { data: quests, error } = await supabase
            .from("quest")
            .select("*")
            .order("id", { ascending: false });
        if (error) console.log("error", error);
        else setQuests(quests);
    }

    const deleteQuest = async (id) => {
        try {
            await supabase.from("quest").delete().eq("id", id);
            setQuests(quests.filter((x) => x.id !== id));
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleLogout = async () => {
        supabase.auth.signOut().catch(console.error);
    };

    return recoveryToken ? (
        <RecoverPassword
            token={recoveryToken}
            setRecoveryToken={setRecoveryToken}
        />
    ) : (
        <div className={"w-screen fixed flex flex-col min-h-screen bg-gray-50"}>
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
                    Todo List.
                </span>
                <button
                    onClick={handleLogout}
                    className={
                        "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    }
                >
                    Logout
                </button>
                <button
                    onClick ={() => history.push('/NewQuest')}
                    className={
                        "flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    }
                >
                    + New Quest
                </button>
            </header>
            <div
                className={"flex flex-col flex-grow p-4"}
                style={{ height: "calc(100vh - 11.5rem)" }}
            >
                <div
                    className={`p-2 border flex-grow grid gap-2 ${
                        quests.length ? "auto-rows-min" : ""
                    } grid-cols-1 h-2/3 overflow-y-scroll first:mt-8`}
                >
                    {quests.length ? (
                        quests.map((quest) => (
                            <Quest
                                key={quest.id}
                                quest={quest}
                                onDelete={() => deleteQuest(quest.id)}
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
            
        </div>
    );
};

export default Home;
