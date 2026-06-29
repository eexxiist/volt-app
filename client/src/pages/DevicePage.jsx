import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOneDevice } from "../http/DeviceApi";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { SHOP_ROUTE } from "../utils/consts";

const DevicePage = observer(() => {
    const [device, setDevice] = useState({ info: [] });
    const [added, setAdded] = useState(false);
    const { id } = useParams();
    const { cart } = useContext(Context);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/";

    useEffect(() => { fetchOneDevice(id).then(data => setDevice(data)); }, []);

    const handleAdd = () => { cart.addItem(device); setAdded(true); setTimeout(() => setAdded(false), 2000); };
    const handleBuy = () => { cart.addItem(device); window.__cartOpen && window.__cartOpen(true); };

    return (
        <Container style={{ marginTop:32, paddingBottom:64 }}>
            {/* Breadcrumb */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28, fontSize:13 }}>
                <button onClick={() => navigate(SHOP_ROUTE)} style={{ color:"var(--ink-3)", transition:"var(--t)" }}
                    onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
                    onMouseLeave={e => e.currentTarget.style.color="var(--ink-3)"}
                >Каталог</button>
                <span style={{ color:"var(--border-2)" }}>›</span>
                <span style={{ color:"var(--ink-2)" }}>{device.name || "..."}</span>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }}>
                {/* Image */}
                <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", display:"flex", alignItems:"center", justifyContent:"center", aspectRatio:"1", overflow:"hidden" }}>
                    {device.img
                        ? <img src={apiUrl + device.img} alt={device.name} style={{ maxWidth:"75%", maxHeight:"75%", objectFit:"contain" }} />
                        : <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--border-2)" strokeWidth=".8"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    }
                </div>

                {/* Info */}
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                    <div style={{ display:"inline-block", fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--accent)", background:"var(--accent-g)", border:"1px solid rgba(79,126,255,.2)", padding:"3px 10px", borderRadius:99, width:"fit-content" }}>
                        {device.brand?.name || "VOLT"}
                    </div>
                    <h1 style={{ fontFamily:"var(--fh)", fontSize:"clamp(20px,2.5vw,28px)", fontWeight:700, lineHeight:1.25 }}>{device.name}</h1>
                    <div style={{ display:"flex", alignItems:"center", gap:3 }}>
                        {[1,2,3,4,5].map(i => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(device.rating || 4) ? "var(--accent)" : "var(--border-2)"} stroke="none">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        ))}
                        <span style={{ fontSize:12, color:"var(--ink-3)", marginLeft:6 }}>{device.rating || "4.8"} / 5</span>
                    </div>
                    <div style={{ fontFamily:"var(--fh)", fontSize:32, fontWeight:700 }}>{Number(device.price).toLocaleString("ru-RU")} ₽</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                        {["✓ В наличии","🚚 Бесплатная доставка","↩ Возврат 14 дней"].map(b => (
                            <span key={b} style={{ fontSize:12, color:"var(--ink-2)", background:"var(--bg-3)", border:"1px solid var(--border)", padding:"5px 12px", borderRadius:"var(--r)" }}>{b}</span>
                        ))}
                    </div>
                    <div style={{ display:"flex", gap:12 }}>
                        <button onClick={handleAdd} style={{ flex:1, padding:"13px 20px", background: added ? "rgba(46,204,113,.12)" : "var(--surface)", border:`1px solid ${added ? "rgba(46,204,113,.4)" : "var(--border-2)"}`, color: added ? "var(--green)" : "var(--ink)", borderRadius:"var(--r)", fontSize:14, fontWeight:600, transition:"var(--t)" }}>
                            {added ? "✓ Добавлено" : "В корзину"}
                        </button>
                        <button onClick={handleBuy} style={{ flex:1, padding:"13px 20px", background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:14, fontWeight:600, transition:"var(--t)" }}
                            onMouseEnter={e => e.currentTarget.style.background="var(--accent-h)"}
                            onMouseLeave={e => e.currentTarget.style.background="var(--accent)"}
                        >Купить сейчас</button>
                    </div>

                    {/* Specs */}
                    {device.info && device.info.length > 0 && (
                        <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:"20px 24px" }}>
                            <div style={{ fontSize:11, fontWeight:600, letterSpacing:".08em", textTransform:"uppercase", color:"var(--ink-3)", marginBottom:14 }}>Характеристики</div>
                            {device.info.map(info => (
                                <div key={info.id} style={{ display:"flex", alignItems:"baseline", gap:8, padding:"8px 0", borderBottom:"1px solid var(--border)", fontSize:13 }}>
                                    <span style={{ color:"var(--ink-2)", whiteSpace:"nowrap", flexShrink:0 }}>{info.title}</span>
                                    <span style={{ flex:1, borderBottom:"1px dotted var(--border-2)", marginBottom:3 }} />
                                    <span style={{ color:"var(--ink)", fontWeight:500, textAlign:"right" }}>{info.description}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
});

export default DevicePage;
