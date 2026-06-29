import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user, cart } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
        navigate(SHOP_ROUTE);
    };

    const openCart = () => window.__cartOpen && window.__cartOpen(true);

    return (
        <header style={{ position:"sticky", top:0, zIndex:100, background:"rgba(14,15,17,.93)", backdropFilter:"blur(12px)", borderBottom:"1px solid var(--border)" }}>
            <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px", height:56, display:"flex", alignItems:"center", gap:32 }}>
                {/* Logo */}
                <NavLink to={SHOP_ROUTE} style={{ display:"flex", alignItems:"center", gap:6, textDecoration:"none", flexShrink:0 }}>
                    <span style={{ fontSize:18 }}>⚡</span>
                    <span style={{ fontFamily:"var(--fh)", fontSize:18, fontWeight:700, color:"var(--ink)", letterSpacing:".06em" }}>VOLT</span>
                </NavLink>

                {/* Nav */}
                <nav style={{ display:"flex", gap:4, flex:1 }}>
                    <NavLink to={SHOP_ROUTE} style={({ isActive }) => ({
                        fontSize:13, color: isActive ? "var(--ink)" : "var(--ink-2)",
                        padding:"6px 12px", borderRadius:"var(--r)",
                        background: isActive ? "var(--bg-3)" : "transparent",
                        transition:"var(--t)", textDecoration:"none"
                    })}>Каталог</NavLink>
                    {user.isAuth && (
                        <NavLink to={ADMIN_ROUTE} style={({ isActive }) => ({
                            fontSize:13, color:"var(--accent)",
                            padding:"6px 12px", borderRadius:"var(--r)",
                            background: isActive ? "var(--accent-g)" : "transparent",
                            transition:"var(--t)", textDecoration:"none"
                        })}>Админ</NavLink>
                    )}
                </nav>

                {/* Actions */}
                <div style={{ display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
                    {user.isAuth ? (
                        <button onClick={logOut}
                            style={{ fontSize:12, color:"var(--ink-2)", padding:"6px 14px", border:"1px solid var(--border)", borderRadius:"var(--r)", transition:"var(--t)" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-2)"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
                        >Выйти</button>
                    ) : (
                        <button onClick={() => navigate(LOGIN_ROUTE)}
                            style={{ fontSize:13, color:"var(--ink)", padding:"7px 16px", background:"var(--surface)", border:"1px solid var(--border-2)", borderRadius:"var(--r)", transition:"var(--t)" }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border-2)"; e.currentTarget.style.color="var(--ink)"; }}
                        >Войти</button>
                    )}

                    {/* Cart */}
                    <button onClick={openCart}
                        style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", width:38, height:38, background:"var(--surface)", border:"1px solid var(--border)", borderRadius:"var(--r)", color:"var(--ink-2)", transition:"var(--t)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; e.currentTarget.style.background="var(--accent-g)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--ink-2)"; e.currentTarget.style.background="var(--surface)"; }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                        {cart.count > 0 && (
                            <span style={{ position:"absolute", top:-5, right:-5, minWidth:16, height:16, padding:"0 4px", background:"var(--accent)", color:"#fff", borderRadius:99, fontSize:9, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>
                                {cart.count}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
});

export default NavBar;
