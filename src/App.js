import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from "./components/Auth";
import Home from "./components/Home";
import NewQuest from "./components/NewQuest";


function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const session = supabase.auth.session();
        setUser(session?.user ?? null);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user;
                setUser(currentUser ?? null);
            }
        );

        return () => {
            authListener?.unsubscribe();
        };
    }, [user]);

    return (
        <>
            <Layout>
                <p>Test</p>
            </Layout>
        </>        
    );
}

export default App;
