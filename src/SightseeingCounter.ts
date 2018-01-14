import { SightseeingGroup } from './Sightseeing';

export class SucceedSightseeingCounter {
    private succeedIds: Set<string>;

    constructor() {
        let succeedIdsInStorage = (localStorage.getItem('comletedSightseeing') || '').split(',').filter(c => c != '');
        this.succeedIds = new Set(succeedIdsInStorage);
    }
    private store() {
        localStorage.setItem('comletedSightseeing', Array.from(this.succeedIds.values()).join(','));
    }
    contains(id: string) {
        return this.succeedIds.has(id);
    }
    add(id: string) {
        this.succeedIds.add(id);
        this.store();
    }
    delete(id: string) {
        this.succeedIds.delete(id);
        this.store();
    }
    toggle(id: string) {
        this[this.contains(id) ? 'delete' : 'add'](id);
    }

    countByGroup(group: SightseeingGroup){
        return group.items.filter(item => this.succeedIds.has(item.id)).length;
    }
    count(){
        return this.succeedIds.size;
    }
}

export interface SucceedCounter {
    activeGroupCount: number,
    activeGroupAllCount: number,
    succeedCount: number,
    allCount: number
}