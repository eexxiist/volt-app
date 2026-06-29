import React, { useContext, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../main";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const click = async () => {
        try {
            let data = isLogin ? await login(email, password) : await registration(email, password);
            user.setUser(data);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) { alert(e.response?.data?.message || "Ошибка"); }
    };

    const inputStyle = { width:"100%", padding:"10px 12px", background:"var(--bg-3)", border:"1px solid var(--border)", borderRadius:"var(--r)", color:"var(--ink)", fontSize:13, fontFamily:"var(--ff)", outline:"none", transition:"var(--t)" };

    return (
        <div style={{ minHeight:"calc(100vh - 56px)", display:"flex", alignItems:"center", justifyContent:"center", padding:24, background:"var(--bg)" }}>
            <div style={{ width:380, padding:"36px 32px", background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", boxShadow:"0 8px 32px rgba(0,0,0,.4)" }}>
                <div style={{ textAlign:"center", marginBottom:28 }}>
                    <div style={{ fontSize:28, marginBottom:6 }}>⚡</div>
                    <div style={{ fontFamily:"var(--fh)", fontSize:20, fontWeight:700, letterSpacing:".06em" }}>VOLT</div>
                </div>
                <div style={{ display:"flex", borderBottom:"1px solid var(--border)", marginBottom:24 }}>
                    {[{ label:"Войти", to:LOGIN_ROUTE }, { label:"Регистрация", to:REGISTRATION_ROUTE }].map(({ label, to }) => (
                        <NavLink key={to} to={to} style={{ fontSize:14, paddingBottom:10, marginRight:24, color: location.pathname===to ? "var(--ink)" : "var(--ink-3)", borderBottom:`1.5px solid ${location.pathname===to ? "var(--accent)" : "transparent"}`, marginBottom:-1, transition:"var(--t)", textDecoration:"none" }}>
                            {label}
                        </NavLink>
                    ))}
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <div>
                        <label style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".06em", color:"var(--ink-3)", display:"block", marginBottom:5 }}>Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle}
                            onFocus={e => e.target.style.borderColor="var(--accent)"} onBlur={e => e.target.style.borderColor="var(--border)"} />
                    </div>
                    <div>
                        <label style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".06em", color:"var(--ink-3)", display:"block", marginBottom:5 }}>Пароль</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" style={inputStyle}
                            onFocus={e => e.target.style.borderColor="var(--accent)"} onBlur={e => e.target.style.borderColor="var(--border)"} />
                    </div>
                    <button onClick={click} style={{ width:"100%", padding:12, marginTop:4, background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:14, fontWeight:600, transition:"var(--t)" }}
                        onMouseEnter={e => e.currentTarget.style.background="var(--accent-h)"}
                        onMouseLeave={e => e.currentTarget.style.background="var(--accent)"}
                    >{isLogin ? "Войти" : "Создать аккаунт"}</button>
                </div>
            </div>
        </div>
    );
});

export default Auth;
