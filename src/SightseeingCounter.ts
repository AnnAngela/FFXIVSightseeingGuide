import { ISightseeingGroup } from "./Sightseeing";

export class SucceedSightseeingCounter {
    private _succeedIds: Set<string>;

    constructor() {
        const succeedIdsInStorage: string[] = (localStorage.getItem("completedSightseeing") || "").split(",").filter(c => c !== "");
        this._succeedIds = new Set(succeedIdsInStorage);
    }
    private store(): void {
        localStorage.setItem("completedSightseeing", Array.from(this._succeedIds.values()).join(","));
    }
    contains(id: string): boolean {
        return this._succeedIds.has(id);
    }
    add(id: string): void {
        this._succeedIds.add(id);
        this.store();
    }
    delete(id: string): void {
        this._succeedIds.delete(id);
        this.store();
    }
    toggle(id: string): void {
        this[this.contains(id) ? "delete" : "add"](id);
    }
    countByGroup(group: ISightseeingGroup): number {
        return group.items.filter(item => this._succeedIds.has(item.id)).length;
    }
    count(): number {
        return this._succeedIds.size;
    }
}

export interface ISucceedCounter {
    activeGroupCount: number;
    activeGroupAllCount: number;
    succeedCount: number;
    allCount: number;
}