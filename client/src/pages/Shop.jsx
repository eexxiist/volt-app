import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { Context } from "../main";
import { observer } from "mobx-react-lite";
import { fetchBrands, fetchDevice, fetchTypes } from "../http/DeviceApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const { device } = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
    }, []);

    useEffect(() => {
        fetchDevice(device.selectedType?.id, device.selectedBrand?.id, device.page, 6)
            .then(data => { device.setDevices(data.rows); device.setTotalCount(data.count); });
    }, [device.page, device.selectedType, device.selectedBrand]);

    return (
        <div>
            {/* Hero */}
            <div style={{ background:"var(--bg-2)", borderBottom:"1px solid var(--border)", padding:"52px 24px 44px" }}>
                <div style={{ maxWidth:1280, margin:"0 auto" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--accent)", background:"var(--accent-g)", border:"1px solid rgba(79,126,255,.25)", padding:"4px 12px", borderRadius:99, marginBottom:16 }}>
                        ⚡ Магазин техники VOLT
                    </div>
                    <h1 style={{ fontFamily:"var(--fh)", fontSize:"clamp(26px,4vw,40px)", fontWeight:700, lineHeight:1.15, color:"var(--ink)", marginBottom:12 }}>
                        Лучшие устройства<br/><span style={{ color:"var(--accent)" }}>по лучшим ценам</span>
                    </h1>
                    <p style={{ fontSize:15, color:"var(--ink-2)", maxWidth:460 }}>
                        Смартфоны, ноутбуки, аудио и аксессуары от ведущих мировых брендов
                    </p>
                </div>
            </div>

            <Container style={{ marginTop:28 }}>
                <div style={{ display:"flex", gap:28, alignItems:"flex-start" }}>
                    {/* Sidebar */}
                    <div style={{ width:210, flexShrink:0, position:"sticky", top:72 }}>
                        <div style={{ background:"var(--bg-2)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:20 }}>
                            <div style={{ fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink-3)", marginBottom:14 }}>Категории</div>
                            <TypeBar />
                        </div>
                    </div>
                    {/* Main */}
                    <div style={{ flex:1, paddingBottom:48 }}>
                        <BrandBar />
                        <DeviceList />
                        <Pages />
                    </div>
                </div>
            </Container>
        </div>
    );
});

export default Shop;
