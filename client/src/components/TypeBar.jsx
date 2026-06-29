import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";

const TypeBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
            {[{ id: null, name: "Все категории" }, ...device.types].map(type => {
                const isActive = type.id === null ? !device.selectedType : type.id === device.selectedType?.id;
                return (
                    <div key={type.id ?? "all"} onClick={() => device.setSelectedType(type.id === null ? null : type)}
                        style={{
                            cursor:"pointer", padding:"9px 14px", borderRadius:"var(--r)", fontSize:13,
                            color: isActive ? "var(--accent)" : "var(--ink-2)",
                            background: isActive ? "var(--accent-g)" : "transparent",
                            border: `1px solid ${isActive ? "rgba(79,126,255,.3)" : "transparent"}`,
                            fontWeight: isActive ? 500 : 400, transition:"var(--t)"
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background="var(--bg-3)"; e.currentTarget.style.color="var(--ink)"; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="var(--ink-2)"; } }}
                    >{type.name}</div>
                );
            })}
        </div>
    );
});

export default TypeBar;
