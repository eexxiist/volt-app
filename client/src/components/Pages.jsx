import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../main";

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    if (pageCount <= 1) return null;
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    return (
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:28 }}>
            <button disabled={device.page===1} onClick={() => device.setPage(device.page-1)}
                style={{ minWidth:36, height:36, padding:"0 10px", border:"1px solid var(--border)", background:"var(--bg-2)", color:"var(--ink-2)", borderRadius:"var(--r)", fontSize:13, transition:"var(--t)", opacity: device.page===1 ? .4 : 1, cursor: device.page===1 ? "not-allowed" : "pointer" }}>←</button>
            {pages.map(p => (
                <button key={p} onClick={() => device.setPage(p)}
                    style={{ minWidth:36, height:36, padding:"0 10px", border:`1px solid ${device.page===p ? "var(--accent)" : "var(--border)"}`, background: device.page===p ? "var(--accent)" : "var(--bg-2)", color: device.page===p ? "#fff" : "var(--ink-2)", borderRadius:"var(--r)", fontSize:13, fontWeight: device.page===p ? 600 : 400, transition:"var(--t)", cursor:"pointer" }}>
                    {p}
                </button>
            ))}
            <button disabled={device.page===pageCount} onClick={() => device.setPage(device.page+1)}
                style={{ minWidth:36, height:36, padding:"0 10px", border:"1px solid var(--border)", background:"var(--bg-2)", color:"var(--ink-2)", borderRadius:"var(--r)", fontSize:13, transition:"var(--t)", opacity: device.page===pageCount ? .4 : 1, cursor: device.page===pageCount ? "not-allowed" : "pointer" }}>→</button>
        </div>
    );
});

export default Pages;
