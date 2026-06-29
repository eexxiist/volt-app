import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const actions = [
        { label:"Добавить тип устройства", icon:"🏷", onClick:() => setTypeVisible(true) },
        { label:"Добавить бренд", icon:"⭐", onClick:() => setBrandVisible(true) },
        { label:"Добавить устройство", icon:"📱", onClick:() => setDeviceVisible(true) },
    ];

    return (
        <Container style={{ maxWidth:520, marginTop:48, paddingBottom:64 }}>
            <div style={{ marginBottom:28 }}>
                <div style={{ fontFamily:"var(--fh)", fontSize:22, fontWeight:700, marginBottom:6 }}>Панель управления</div>
                <div style={{ fontSize:13, color:"var(--ink-3)" }}>Добавляйте типы, бренды и устройства в каталог</div>
            </div>
            <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", overflow:"hidden" }}>
                {actions.map(({ label, icon, onClick }, i) => (
                    <button key={label} onClick={onClick}
                        style={{ display:"flex", alignItems:"center", gap:14, width:"100%", padding:"16px 20px", borderBottom: i < actions.length-1 ? "1px solid var(--border)" : "none", color:"var(--ink)", fontSize:14, fontWeight:500, transition:"var(--t)", textAlign:"left" }}
                        onMouseEnter={e => e.currentTarget.style.background="var(--bg-3)"}
                        onMouseLeave={e => e.currentTarget.style.background="transparent"}
                    >
                        <span style={{ width:36, height:36, background:"var(--accent-g)", border:"1px solid rgba(79,126,255,.2)", borderRadius:"var(--r)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{icon}</span>
                        {label}
                        <svg style={{ marginLeft:"auto", color:"var(--ink-3)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                ))}
            </div>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
        </Container>
    );
};

export default Admin;
