import { SightseeingGroup } from './Sightseeing';

export class SucceedSightseeingCounter {
    private _succeedIds: Set<string>;

    constructor() {
        let succeedIdsInStorage = (localStorage.getItem('comletedSightseeing') || '').split(',').filter(c => c != '');
        this._succeedIds = new Set(succeedIdsInStorage);
    }
    private store() {
        localStorage.setItem('comletedSightseeing', Array.from(this._succeedIds.values()).join(','));
    }
    contains(id: string) {
        return this._succeedIds.has(id);
    }
    add(id: string) {
        this._succeedIds.add(id);
        this.store();
    }
    delete(id: string) {
        this._succeedIds.delete(id);
        this.store();
    }
    toggle(id: string) {
        this[this.contains(id) ? 'delete' : 'add'](id);
    }
    countByGroup(group: SightseeingGroup) {
        return group.items.filter(item => this._succeedIds.has(item.id)).length;
    }
    count() {
        return this._succeedIds.size;
    }
}

export interface SucceedCounter {
    activeGroupCount: number,
    activeGroupAllCount: number,
    succeedCount: number,
    allCount: number
}