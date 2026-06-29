import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const fmt = n => Number(n).toLocaleString("ru-RU") + " ₽";

const Basket = observer(() => {
    const { cart } = useContext(Context);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000/";

    if (cart.items.length === 0) return (
        <div style={{ minHeight:"calc(100vh - 56px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16, textAlign:"center", padding:24 }}>
            <div style={{ fontSize:64, opacity:.2 }}>🛒</div>
            <div style={{ fontFamily:"var(--fh)", fontSize:22, fontWeight:700 }}>Корзина пуста</div>
            <div style={{ fontSize:14, color:"var(--ink-2)", maxWidth:300 }}>Добавьте товары из каталога, чтобы оформить заказ</div>
            <button onClick={() => navigate(SHOP_ROUTE)} style={{ marginTop:8, padding:"12px 28px", background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:14, fontWeight:600 }}>
                Перейти в каталог
            </button>
        </div>
    );

    return (
        <Container style={{ paddingTop:32, paddingBottom:64 }}>
            <h1 style={{ fontFamily:"var(--fh)", fontSize:24, fontWeight:700, marginBottom:28 }}>Корзина</h1>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:28, alignItems:"start" }}>
                {/* Items */}
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    {cart.items.map(item => (
                        <div key={item.id} style={{ display:"grid", gridTemplateColumns:"80px 1fr auto", gap:16, alignItems:"start", background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:16 }}>
                            <div style={{ width:80, height:80, background:"var(--bg-3)", borderRadius:"var(--r)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                                {item.img ? <img src={apiUrl + item.img} alt={item.name} style={{ maxWidth:"85%", maxHeight:"85%", objectFit:"contain" }} /> : <span style={{ fontSize:28, opacity:.3 }}>📦</span>}
                            </div>
                            <div>
                                <div style={{ fontSize:14, fontWeight:500, marginBottom:4 }}>{item.name}</div>
                                <div style={{ fontSize:15, fontWeight:700, color:"var(--accent)", marginBottom:10 }}>{fmt(item.price)}</div>
                                <div style={{ display:"inline-flex", alignItems:"center", border:"1px solid var(--border)", borderRadius:"var(--r)", overflow:"hidden" }}>
                                    <button onClick={() => cart.updateQty(item.id, item.qty - 1)} style={{ width:30, height:30, fontSize:16, color:"var(--ink-2)", transition:"var(--t)" }}
                                        onMouseEnter={e => e.currentTarget.style.background="var(--bg-3)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>−</button>
                                    <div style={{ width:32, height:30, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:500, borderLeft:"1px solid var(--border)", borderRight:"1px solid var(--border)" }}>{item.qty}</div>
                                    <button onClick={() => cart.updateQty(item.id, item.qty + 1)} style={{ width:30, height:30, fontSize:16, color:"var(--ink-2)", transition:"var(--t)" }}
                                        onMouseEnter={e => e.currentTarget.style.background="var(--bg-3)"} onMouseLeave={e => e.currentTarget.style.background="transparent"}>+</button>
                                </div>
                            </div>
                            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                                <div style={{ fontSize:15, fontWeight:700 }}>{fmt(item.price * item.qty)}</div>
                                <button onClick={() => cart.removeItem(item.id)} style={{ fontSize:12, color:"var(--ink-3)", transition:"var(--t)", padding:"3px 8px", borderRadius:"var(--r)" }}
                                    onMouseEnter={e => { e.currentTarget.style.color="var(--red)"; e.currentTarget.style.background="rgba(231,76,60,.1)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.color="var(--ink-3)"; e.currentTarget.style.background="transparent"; }}>Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:24, position:"sticky", top:72 }}>
                    <div style={{ fontFamily:"var(--fh)", fontSize:16, fontWeight:600, marginBottom:20 }}>Итого</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:4 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                            <span style={{ color:"var(--ink-3)" }}>Товары ({cart.count})</span>
                            <span style={{ fontWeight:500 }}>{fmt(cart.total)}</span>
                        </div>
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:13 }}>
                            <span style={{ color:"var(--ink-3)" }}>Доставка</span>
                            <span style={{ color:"var(--green)", fontWeight:500 }}>Бесплатно</span>
                        </div>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", borderTop:"1px solid var(--border)", paddingTop:14, marginTop:10, fontSize:16, fontWeight:700 }}>
                        <span>К оплате</span>
                        <span style={{ color:"var(--accent)", fontSize:18 }}>{fmt(cart.total)}</span>
                    </div>
                    <button style={{ width:"100%", padding:13, marginTop:20, background:"var(--accent)", color:"#fff", borderRadius:"var(--r)", fontSize:14, fontWeight:600, transition:"var(--t)" }}
                        onMouseEnter={e => e.currentTarget.style.background="var(--accent-h)"}
                        onMouseLeave={e => e.currentTarget.style.background="var(--accent)"}
                    >Оформить заказ</button>
                    <button onClick={() => cart.clearCart()} style={{ width:"100%", padding:9, marginTop:10, fontSize:12, color:"var(--ink-3)", border:"1px solid var(--border)", borderRadius:"var(--r)", transition:"var(--t)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor="var(--red)"; e.currentTarget.style.color="var(--red)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--ink-3)"; }}
                    >Очистить корзину</button>
                </div>
            </div>
        </Container>
    );
});

export default Basket;
