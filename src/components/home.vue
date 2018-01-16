<template>
    <div>
        <ul class="nav nav-pills">
            <li v-for="(item, index) in sourceData" 
                :class="{active: activeGroup == index}" @click="switchGroup(index)" :key="item.groupName">
                <a href="javascript:;">{{ item.groupName }}</a>
            </li>
        </ul>
        <p class="sightseeing alert" :class="activeGroupCount >= activeGroupAllCount / 2 ? activeGroupCount === activeGroupAllCount ? 'alert-success' : 'alert-primary' : 'alert-info'">
            {{$t('info.succeedSightseeingCountInfomation')}}:
            {{$t('info.activeGroupCount')}}: {{activeGroupCount}} / {{activeGroupAllCount}}
            {{$t('info.totalCount')}}: {{succeedCount}} / {{allCount}}
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
                    {{item.isStillWaiting ? $t('info.isStillWaiting') : ""}}
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
.alert-primary {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
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
import { SucceedSightseeingCounter } from '../SightseeingCounter'

@Component
export default class HomePage extends Vue {
    sourceData: SightseeingGroup[] = SightseeingData;
    activeGroup: number = 0;
    calcData: Sightseeing[] = [];
    succeedSightseeingCounter: SucceedSightseeingCounter;
    created() {
        this.succeedSightseeingCounter = new SucceedSightseeingCounter();
        this.activeGroup = parseInt(localStorage.getItem('activeGroupIndex') || '0');
        this.loadGroup(this.activeGroup);
        this.$gBus.$on('hourChange', (_: number) => {
            let oldData: Sightseeing[] = this.calcData;
            this.loadGroup(this.activeGroup); // * 本句是至关重要的，其他的待优化
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
        this.succeedSightseeingCounter.toggle(id);
        this.loadGroup(this.activeGroup);
    }
    loadGroup(index: number) {
        // 保证存入错误数据初始化时不出错
        if(index >= SightseeingData.length){
            this.switchGroup(0);
        }

        let tempGroup = SightseeingData[index].items;
        let tempData: Sightseeing[] = [];
        let succeedData: Sightseeing[] = [];

        for (let tempItemIndex in tempGroup) {
            let k = new Sightseeing(tempGroup[tempItemIndex]);
            k.calcNextAvailableTime();
            if (this.succeedSightseeingCounter.contains(k.id)) {
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
    get activeGroupCount(){
        return this.succeedSightseeingCounter.countByGroup(SightseeingData[this.activeGroup]);
    }
    get activeGroupAllCount(){
        return SightseeingData[this.activeGroup].items.length;
    }
    get succeedCount(){
        return this.succeedSightseeingCounter.count();
    }
    get allCount(){
        return SightseeingData.reduce<number>((s, ig) => s += ig.items.length, 0);
    }
}
</script>