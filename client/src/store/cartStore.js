import { makeAutoObservable } from "mobx";

export default class CartStore {
    constructor() {
        this._items = this._load();
        makeAutoObservable(this);
    }

    _load() {
        try { return JSON.parse(localStorage.getItem("volt_cart")) || []; }
        catch { return []; }
    }

    _save() {
        localStorage.setItem("volt_cart", JSON.stringify(this._items));
    }

    addItem(device) {
        const ex = this._items.find(i => i.id === device.id);
        if (ex) { ex.qty += 1; }
        else { this._items.push({ ...device, qty: 1 }); }
        this._save();
    }

    removeItem(id) {
        this._items = this._items.filter(i => i.id !== id);
        this._save();
    }

    updateQty(id, qty) {
        if (qty < 1) { this.removeItem(id); return; }
        const item = this._items.find(i => i.id === id);
        if (item) item.qty = qty;
        this._save();
    }

    clearCart() {
        this._items = [];
        this._save();
    }

    get items() { return this._items; }
    get count() { return this._items.reduce((s, i) => s + i.qty, 0); }
    get total() { return this._items.reduce((s, i) => s + Number(i.price) * i.qty, 0); }
}
