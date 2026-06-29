import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

const DeviceItem = observer(({ device }) => {
    const navigate = useNavigate();
    const { cart } = useContext(Context);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/";

    const handleAdd = e => {
        e.stopPropagation();
        cart.addItem(device);
        window.__cartOpen && window.__cartOpen(true);
    };

    return (
        <div style={{ width:"calc(33.33% - 11px)", minWidth:200 }}>
            <div onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
                style={{ cursor:"pointer", borderRadius:"var(--r-lg)", background:"var(--bg-2)", border:"1px solid var(--border)", transition:"border-color var(--t), transform var(--t), box-shadow var(--t)", overflow:"hidden", display:"flex", flexDirection:"column", height:"100%" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="var(--border-2)"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
            >
                {/* Image */}
                <div style={{ width:"100%", aspectRatio:"1", background:"var(--bg-3)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                    {device.img
                        ? <img src={apiUrl + device.img} alt={device.name} style={{ maxWidth:"80%", maxHeight:"80%", objectFit:"contain" }} />
                        : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--border-2)" strokeWidth=".8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    }
                </div>
                {/* Body */}
                <div style={{ padding:"14px 16px 16px", display:"flex", flexDirection:"column", gap:5, flex:1 }}>
                    <div style={{ fontSize:10, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--accent)" }}>
                        {device.brand?.name || device.brandId || "VOLT"}
                    </div>
                    <div style={{ fontSize:14, fontWeight:500, color:"var(--ink)", lineHeight:1.35 }}>{device.name}</div>
                    <div style={{ display:"flex", alignItems:"center", gap:2 }}>
                        {[1,2,3,4,5].map(i => (
                            <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i <= Math.round(device.rating || 4) ? "var(--accent)" : "var(--border-2)"} stroke="none">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        ))}
                        <span style={{ fontSize:11, color:"var(--ink-3)", marginLeft:4 }}>{device.rating || "4.8"}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto", paddingTop:12, borderTop:"1px solid var(--border)" }}>
                        <div style={{ fontFamily:"var(--fh)", fontSize:16, fontWeight:700 }}>
                            {Number(device.price).toLocaleString("ru-RU")} ₽
                        </div>
                        <button onClick={handleAdd}
                            style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:12, fontWeight:500, transition:"var(--t)" }}
                            onMouseEnter={e => e.currentTarget.style.background="var(--accent-h)"}
                            onMouseLeave={e => e.currentTarget.style.background="var(--accent)"}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DeviceItem;
