import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { BASKET_ROUTE } from "../../utils/consts";

const fmt = n => Number(n).toLocaleString("ru-RU") + " ₽";

const CartDrawer = observer(() => {
    const { cart } = useContext(Context);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    // expose opener to NavBar
    window.__cartOpen = setOpen;

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/";

    return (
        <>
            {/* Overlay */}
            <div onClick={() => setOpen(false)} style={{
                position:"fixed", inset:0, background:"rgba(0,0,0,.6)", backdropFilter:"blur(3px)",
                zIndex:200, opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none", transition:"opacity .25s ease"
            }} />

            {/* Drawer */}
            <div style={{
                position:"fixed", top:0, right:0, bottom:0, width:400, maxWidth:"100vw",
                background:"var(--bg-2)", borderLeft:"1px solid var(--border)",
                zIndex:201, display:"flex", flexDirection:"column",
                transform: open ? "translateX(0)" : "translateX(100%)",
                transition:"transform .28s cubic-bezier(.4,0,.2,1)",
                boxShadow:"0 0 40px rgba(0,0,0,.6)"
            }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", borderBottom:"1px solid var(--border)", flexShrink:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"var(--fh)", fontSize:16, fontWeight:600 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                        Корзина
                        {cart.count > 0 && (
                            <span style={{ background:"var(--accent)", color:"#fff", borderRadius:99, minWidth:18, height:18, padding:"0 5px", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center" }}>
                                {cart.count}
                            </span>
                        )}
                    </div>
                    <button onClick={() => setOpen(false)}
                        style={{ width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"var(--r)", color:"var(--ink-3)", transition:"var(--t)" }}
                        onMouseEnter={e => { e.currentTarget.style.background="var(--bg-3)"; e.currentTarget.style.color="var(--ink)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--ink-3)"; }}
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column" }}>
                    {cart.items.length === 0 ? (
                        <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, padding:"40px 24px", textAlign:"center" }}>
                            <div style={{ fontSize:52, opacity:.3 }}>🛒</div>
                            <div style={{ fontSize:15, fontWeight:600, color:"var(--ink-2)" }}>Корзина пуста</div>
                            <div style={{ fontSize:13, color:"var(--ink-3)" }}>Добавьте товары из каталога</div>
                            <button onClick={() => setOpen(false)} style={{ marginTop:8, padding:"10px 24px", background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:13, fontWeight:500 }}>
                                Перейти в каталог
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Items list */}
                            <div style={{ padding:"16px 24px", display:"flex", flexDirection:"column", gap:10 }}>
                                {cart.items.map(item => (
                                    <div key={item.id} style={{ display:"grid", gridTemplateColumns:"60px 1fr auto", gap:12, alignItems:"start", background:"var(--bg-3)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:12 }}>
                                        {/* Img */}
                                        <div style={{ width:60, height:60, background:"var(--surface)", borderRadius:"var(--r)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0 }}>
                                            {item.img
                                                ? <img src={apiUrl + item.img} alt={item.name} style={{ maxWidth:"90%", maxHeight:"90%", objectFit:"contain" }} />
                                                : <span style={{ fontSize:22, opacity:.4 }}>📦</span>
                                            }
                                        </div>
                                        {/* Info */}
                                        <div style={{ display:"flex", flexDirection:"column", gap:4, minWidth:0 }}>
                                            <div style={{ fontSize:13, fontWeight:500, color:"var(--ink)", lineHeight:1.35, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                                                {item.name}
                                            </div>
                                            <div style={{ fontSize:13, fontWeight:600, color:"var(--accent)" }}>{fmt(item.price)}</div>
                                            {/* Qty */}
                                            <div style={{ display:"flex", alignItems:"center", border:"1px solid var(--border)", borderRadius:"var(--r)", width:"fit-content", overflow:"hidden", marginTop:2 }}>
                                                <button onClick={() => cart.updateQty(item.id, item.qty - 1)}
                                                    style={{ width:26, height:26, fontSize:15, color:"var(--ink-2)", transition:"var(--t)" }}
                                                    onMouseEnter={e => { e.currentTarget.style.background="var(--surface)"; e.currentTarget.style.color="var(--ink)"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--ink-2)"; }}
                                                >−</button>
                                                <div style={{ width:28, height:26, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:500, borderLeft:"1px solid var(--border)", borderRight:"1px solid var(--border)" }}>
                                                    {item.qty}
                                                </div>
                                                <button onClick={() => cart.updateQty(item.id, item.qty + 1)}
                                                    style={{ width:26, height:26, fontSize:15, color:"var(--ink-2)", transition:"var(--t)" }}
                                                    onMouseEnter={e => { e.currentTarget.style.background="var(--surface)"; e.currentTarget.style.color="var(--ink)"; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--ink-2)"; }}
                                                >+</button>
                                            </div>
                                        </div>
                                        {/* Remove */}
                                        <button onClick={() => cart.removeItem(item.id)}
                                            style={{ width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", color:"var(--ink-3)", borderRadius:"var(--r)", transition:"var(--t)", flexShrink:0 }}
                                            onMouseEnter={e => { e.currentTarget.style.color="var(--red)"; e.currentTarget.style.background="rgba(231,76,60,.1)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.color="var(--ink-3)"; e.currentTarget.style.background="transparent"; }}
                                        >
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div style={{ padding:"20px 24px 24px", borderTop:"1px solid var(--border)", flexShrink:0, display:"flex", flexDirection:"column", gap:8 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                                    <span style={{ color:"var(--ink-3)" }}>Товары ({cart.count})</span>
                                    <span style={{ fontWeight:500 }}>{fmt(cart.total)}</span>
                                </div>
                                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                                    <span style={{ color:"var(--ink-3)" }}>Доставка</span>
                                    <span style={{ color:"var(--green)", fontWeight:500 }}>Бесплатно</span>
                                </div>
                                <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid var(--border)", paddingTop:12, marginTop:4, fontSize:15, fontWeight:700 }}>
                                    <span>Итого</span>
                                    <span style={{ color:"var(--accent)", fontSize:16 }}>{fmt(cart.total)}</span>
                                </div>
                                <button onClick={() => { setOpen(false); navigate(BASKET_ROUTE); }}
                                    style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:13, background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:14, fontWeight:600, marginTop:8, transition:"var(--t)" }}
                                    onMouseEnter={e => e.currentTarget.style.background="var(--accent-h)"}
                                    onMouseLeave={e => e.currentTarget.style.background="var(--accent)"}
                                >
                                    Оформить заказ
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>
                                <button onClick={() => cart.clearCart()}
                                    style={{ width:"100%", padding:8, fontSize:12, color:"var(--ink-3)", border:"1px solid var(--border)", borderRadius:"var(--r)", transition:"var(--t)" }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.color="var(--red)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--ink-3)"; }}
                                >Очистить корзину</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
});

export default CartDrawer;
