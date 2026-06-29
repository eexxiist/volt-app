import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";

const BrandBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
            {[{ id: null, name: "Все бренды" }, ...(device.brands || [])].map(brand => {
                const isActive = brand.id === null ? !device.selectedBrand : brand.id === device.selectedBrand?.id;
                return (
                    <div key={brand.id ?? "all"} onClick={() => device.setSelectedBrand(brand.id === null ? null : brand)}
                        style={{
                            cursor:"pointer", padding:"6px 16px", borderRadius:99, fontSize:13, fontWeight:500,
                            background: isActive ? "var(--accent)" : "transparent",
                            color: isActive ? "#fff" : "var(--ink-2)",
                            border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                            transition:"var(--t)", userSelect:"none"
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor="var(--border-2)"; e.currentTarget.style.color="var(--ink)"; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--ink-2)"; } }}
                    >{brand.name}</div>
                );
            })}
        </div>
    );
});

export default BrandBar;
