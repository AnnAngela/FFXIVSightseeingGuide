<template>
    <div>
        <ul class="nav nav-pills">
            <li v-for="(item, index) in sourceData" 
                :class="{active: activeGroup == index}" @click="switchGroup(index)" :key="item.groupName">
                <a href="javascript:;">{{ item.groupName }}</a>
            </li>
        </ul>
        <p class="sightseeing alert" :class="succeedSightseeingCount.activeGroup[0] === succeedSightseeingCount.activeGroup[1] ? 'alert-success' : 'alert-info'">
            {{$t('info.succeedSightseeingCountInfomation')}}:
            {{$t('info.activeGroupCount')}}: {{succeedSightseeingCount.activeGroup[0]}} / {{succeedSightseeingCount.activeGroup[1]}}
            {{$t('info.totalCount')}}: {{succeedSightseeingCount.total[0]}} / {{succeedSightseeingCount.total[1]}}
        </p>
        <div v-for="item in calcData" :key="item.id" class="sightseeing panel" :class="item.vaildStatus === 'panel-danger' ? 'panel-default' : item.vaildStatus" @click="setComplete(item.id)">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <span>{{item.id}}</span>
                    <span v-if="item.subarea != undefined">{{$t(item.subarea)}}</span>
                    <span v-else>{{$t(item.area)}}</span>
                    <span>x:{{item.pos.x}} y:{{item.pos.y}}</span>
                    <span>{{$t(item.weather)}}</span>
                    <span>{{item.timestr}}</span>
                    <span>{{$t(item.action)}}</span>
                </h3>
                <div class="pull-right panel-postheader">
                    <span v-if="item.vaildStatus == 'panel-primary'">{{$t("info.soonToComplete")}}</span>
                    <span v-if="item.vaildStatus == 'panel-info'">{{$t("info.fewHoursToComplete")}}</span>
                    <span v-if="item.vaildStatus == 'panel-warning'">{{$t("info.moreTimeToComplete")}}</span>
                    <span v-if="item.vaildStatus == 'panel-default'">{{$t("info.longTimeToComplete")}}</span>
                    <span v-if="item.vaildStatus == 'panel-danger'">{{$t("info.veryLongTimeToComplete")}}</span>
                    <span v-if="item.vaildStatus == 'panel-success'">{{$t("info.completed")}}</span>
                </div>
            </div>
            <div class="panel-body">
                <div v-if="item.vaildStatus == 'panel-success'">{{$t("info.completed")}}</div>
                <div v-else-if="item.vaildStatus == 'panel-primary'">
                    {{$t("info.startFrom")}}: ET {{item.nextAvaliableTime.toHourMinuteString()}}
                    {{$t("info.localTime")}}: {{$d(item.nextAvaliableTime.getLocalTime(), 'long')}}
                    <br>
                    {{$t("info.endingAt")}}: ET {{item.nextAvaliableTimeEndTime.toHourMinuteString()}}
                    {{$t("info.localTime")}}: {{$d(item.nextAvaliableTimeEndTime.getLocalTime(), 'long')}}
                    {{$tc("info.lessThan", item.nextAvaliableTimeLeft, { m: item.nextAvaliableTimeLeft })}}
                </div>
                <div v-else-if="item.vaildStatus != 'panel-danger'">
                    {{$t("info.startFrom")}}: ET {{item.nextAvaliableTime.toHourMinuteString()}}
                    {{$t("info.localTime")}}: {{$d(item.nextAvaliableTime.getLocalTime(), 'long')}}
                </div>
                <div v-else>
                    {{$t("info.veryLongTimeToComplete")}}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.sightseeing {
    margin-top: 20px;
}
.sightseeing.panel {
    cursor: pointer;
    transition: all 1s;
}
.panel-postheader {
    font-style: italic;
    font-weight: lighter;
    margin-top: -1.3em;
}
</style>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { SightseeingData, SightseeingGroup, Sightseeing } from '../Sightseeing';
class SucceedSightseeingGroup {
    private succeedIds: Set<string>;
    private range: (string | number)[][];
    constructor(range: (string | number)[][]) {
        let succeedStr = (localStorage.getItem('comletedSightseeing') || '').replace(/^\s*,|,\s*$/g, '').replace(/,\s*,/g, ',');
        let succeedIds: string[] = succeedStr.split(',');
        this.succeedIds = new Set(succeedIds);
        this.range = range;
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
    private getSucceedSightseeingCountByRange(start: number = -1, end: number = -1) {
        let count = 0;
        if (end === -1) end = Number.MAX_SAFE_INTEGER;
        this.succeedIds.forEach((id: string) => {
            if (start <= +id && +id <= end) count++;
        });
        return count;
    }
    getSucceedSightseeingCount() {
        return this.range.map((range: (string | number)[]) => [range[0], this.getSucceedSightseeingCountByRange(<number>range[1], <number>range[2])]);
    }
}

interface succeedSightseeingCount {
    activeGroup: number[];
    total: number[];
}

@Component
export default class HomePage extends Vue {
    sourceData: SightseeingGroup[] = SightseeingData;
    activeGroup: number = 0;
    calcData: Sightseeing[] = [];
    succeedSightseeingGroup: SucceedSightseeingGroup;
    succeedSightseeingCount: succeedSightseeingCount;
    created() {
        let range: (string | number)[][] = [];
        this.sourceData.forEach((data: SightseeingGroup) => {
            let _range = data.groupName.split('~').map((n: string) => +n);
            range.push([data.groupName, _range[0], _range[1]]);
        });
        this.succeedSightseeingGroup = new SucceedSightseeingGroup(range);
        this.activeGroup = parseInt(localStorage.getItem('activeGroupIndex') || '0');
        this.loadGroup(this.activeGroup);
        this.$gBus.$on('hourChange', (_: number) => {
            let oldData: Sightseeing[] = this.calcData;
            this.loadGroup(this.activeGroup);
            let newData: Sightseeing[] = this.calcData;
            let nearSoonToCompleteData: Sightseeing[] = [];
            newData.forEach((sightseeing: Sightseeing) => {
                oldData.forEach((s: Sightseeing) => {
                    if (s.id !== sightseeing.id) return;
                    if (sightseeing.vaildStatus === 'panel-primary') {
                        if (s.vaildStatus === 'panel-info') nearSoonToCompleteData.push(sightseeing);
                        else if (s.vaildStatus === 'panel-primary' && s.isStillWaiting === true && sightseeing.isStillWaiting === false) nearSoonToCompleteData.push(sightseeing);
                    }
                });
            });
            if (nearSoonToCompleteData.length) this.$gBus.$emit('nearSoonToCompleteGet', nearSoonToCompleteData);
        });
    }
    switchGroup(index: number) {
        this.activeGroup = index;
        localStorage.setItem('activeGroupIndex', index.toString());
        this.loadGroup(index);
    }
    setComplete(id: string) {
        this.succeedSightseeingGroup.toggle(id);
        this.loadGroup(this.activeGroup);
    }
    loadGroup(index: number) {
        let tempGroup = SightseeingData[index].items;
        let tempData: Sightseeing[] = [];
        let succeedData: Sightseeing[] = [];
        let succeedSightseeingCount = this.succeedSightseeingGroup.getSucceedSightseeingCount();
        this.succeedSightseeingCount = {
            activeGroup: [<number>succeedSightseeingCount.filter(([key, value]) => key === this.sourceData[this.activeGroup].groupName)[0][1], this.sourceData[this.activeGroup].items.length],
            total: [succeedSightseeingCount.reduce((sum: number, [key, value]) => sum + <number>value, 0), this.sourceData.reduce((sum: number, value: SightseeingGroup) => sum + value.items.length, 0)],
        };
        for (let tempItemIndex in tempGroup) {
            let k = new Sightseeing(tempGroup[tempItemIndex]);
            k.calcNextAvailableTime();
            if (this.succeedSightseeingGroup.contains(k.id)) {
                k.vaildStatus = 'panel-success';
                succeedData.push(k);
            } else {
                tempData.push(k);
            }
        }
        tempData.sort((a, b) => a.nextAvaliableTime.date.getTime() - b.nextAvaliableTime.date.getTime());
        for (let succeedIndex in succeedData) {
            tempData.push(succeedData[succeedIndex]);
        }
        this.calcData = tempData;
    }
}
</script>