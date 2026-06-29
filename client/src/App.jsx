import { observer } from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import { useContext, useEffect, useState } from "react";
import { Context } from "./main";
import { check } from "./http/userAPI";

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
            .then(data => { user.setUser(data); user.setIsAuth(true); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"var(--bg)" }}>
            <div style={{ width:36, height:36, border:"2.5px solid var(--border)", borderTopColor:"var(--accent)", borderRadius:"50%", animation:"spin .7s linear infinite" }} />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
    );

    return (
        <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
            <NavBar />
            <CartDrawer />
            <main style={{ flex:1 }}>
                <AppRouter />
            </main>
        </div>
    );
});

export default App;
