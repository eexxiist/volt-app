import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { device } = useContext(Context);
    if (!device.devices.length) return (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"80px 24px", gap:12, textAlign:"center" }}>
            <div style={{ fontSize:48, opacity:.3 }}>🔍</div>
            <div style={{ fontSize:16, fontWeight:600, color:"var(--ink-2)" }}>Ничего не найдено</div>
            <div style={{ fontSize:13, color:"var(--ink-3)" }}>Попробуйте изменить фильтры</div>
        </div>
    );
    return (
        <div style={{ display:"flex", flexWrap:"wrap", gap:16 }}>
            {device.devices.map(item => <DeviceItem key={item.id} device={item} />)}
        </div>
    );
});

export default DeviceList;
