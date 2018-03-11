<template>
    <div>
        <div class="introdutionlead alert alert-info" :class="isFirstView ? 'show' : 'hidden'">
            <p class="lead" v-html="$t('introdution.text')"></p>
            <button type="button" class="btn btn-success" @click="setFirstView()">{{$t('introdution.button')}}</button>
        </div>
        <ul class="nav nav-pills">
            <li v-for="(item, index) in sourceData" 
                :class="{active: activeGroup == index}" @click="switchGroup(index)" :key="item.groupName">
                <a href="javascript:;">{{ item.groupName }}</a>
            </li>
        </ul>
        <p class="sightseeing alert" :class="alertClass">
            {{$t('info.succeedSightseeingCountInfomation')}} {{$t('sightseeingClickIntroduction')}}:
            {{$t('info.activeGroupCount')}}: {{succeedCounter.activeGroupCount}} / {{succeedCounter.activeGroupAllCount}}
            {{$t('info.totalCount')}}: {{succeedCounter.succeedCount}} / {{succeedCounter.allCount}}
            <span :class="alertClass === 'alert-success' && 'hidden'"> | <a class="external" target="_blank" href="https://bbs.ngacn.cc/read.php?tid=7755329">{{$t('sightseeingActGuide')}}</a>[zh-cn]</span>
        </p>
        <div v-for="item in calcData" :key="item.id" class="sightseeing panel" :class="item.vaildStatus === 'panel-danger' ? 'panel-default' : item.vaildStatus" @click="setComplete(item.id)">
            <div class="panel-heading">
                <h3 class="panel-title">
                    <span>{{item.id}}</span>
                    <span v-if="item.subarea != undefined">{{$t(item.subarea)}}</span>
                    <span v-else>{{$t(item.area)}}</span>
                    <span>x:{{item.pos.x}} y:{{item.pos.y}}</span>
                    <img class="weatherImg" :src="'./image/weather/' + item.weather + '.png'">
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
                    {{$t("info.endingAt")}}: ET {{item.nextAvaliableTimeEnd.toHourMinuteString()}}
                    {{$t("info.localTime")}}: {{$d(item.nextAvaliableTimeEnd.getLocalTime(), 'long')}}
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
.weatherImg {
    max-height: 1.25em;
    margin-top: -0.25em;
}
a.external {
    cursor: pointer;
    background-position: center right;
    background-repeat: no-repeat;
    background-image: -webkit-linear-gradient(transparent, transparent),
        url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Cg%20transform%3D%22translate%28-826.429%20-698.791%29%22%3E%3Crect%20width%3D%225.982%22%20height%3D%225.982%22%20x%3D%22826.929%22%20y%3D%22702.309%22%20fill%3D%22%23fff%22%20stroke%3D%22%2306c%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M831.194%20698.791h5.234v5.391l-1.571%201.545-1.31-1.31-2.725%202.725-2.689-2.689%202.808-2.808-1.311-1.311z%22%20fill%3D%22%2306f%22%2F%3E%3Cpath%20d%3D%22M835.424%20699.795l.022%204.885-1.817-1.817-2.881%202.881-1.228-1.228%202.881-2.881-1.851-1.851z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);
    background-image: linear-gradient(transparent, transparent),
        url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Cg%20transform%3D%22translate%28-826.429%20-698.791%29%22%3E%3Crect%20width%3D%225.982%22%20height%3D%225.982%22%20x%3D%22826.929%22%20y%3D%22702.309%22%20fill%3D%22%23fff%22%20stroke%3D%22%2306c%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M831.194%20698.791h5.234v5.391l-1.571%201.545-1.31-1.31-2.725%202.725-2.689-2.689%202.808-2.808-1.311-1.311z%22%20fill%3D%22%2306f%22%2F%3E%3Cpath%20d%3D%22M835.424%20699.795l.022%204.885-1.817-1.817-2.881%202.881-1.228-1.228%202.881-2.881-1.851-1.851z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);
    padding-right: 12px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { SightseeingData, SightseeingGroup, Sightseeing } from '../Sightseeing';
import { SucceedSightseeingCounter, SucceedCounter } from '../SightseeingCounter';

@Component
export default class HomePage extends Vue {
    sourceData: SightseeingGroup[] = SightseeingData;
    activeGroup: number = 0;
    calcData: Sightseeing[] = [];
    succeedSightseeingCounter: SucceedSightseeingCounter;
    succeedCounter: SucceedCounter;
    isFirstView: boolean = localStorage.getItem('firstView') !== 'true';
    alertClass: string;
    created() {
        this.succeedSightseeingCounter = new SucceedSightseeingCounter();
        this.activeGroup = parseInt(localStorage.getItem('activeGroupIndex') || '0');

        //初始化succeedCounter
        this.succeedCounter = {
            activeGroupCount: 0,
            activeGroupAllCount: 0,
            succeedCount: 0,
            allCount: SightseeingData.reduce<number>((s, ig) => (s += ig.items.length), 0),
        };
        
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
        if (index >= SightseeingData.length) {
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
        tempData.sort((a, b) => {
            let diff = a.nextAvaliableTime.date.getTime() - b.nextAvaliableTime.date.getTime();
            if (diff === 0 && a.nextAvaliableTimeEnd && b.nextAvaliableTimeEnd) diff = a.nextAvaliableTimeEnd.date.getTime() - b.nextAvaliableTimeEnd.date.getTime();
            return diff;
        });
        for (let succeedIndex in succeedData) {
            tempData.push(succeedData[succeedIndex]);
        }
        this.succeedCounter.activeGroupCount = this.succeedSightseeingCounter.countByGroup(SightseeingData[this.activeGroup]);
        this.succeedCounter.activeGroupAllCount = SightseeingData[this.activeGroup].items.length;
        this.succeedCounter.succeedCount = this.succeedSightseeingCounter.count();

        this.calcData = tempData;

        this.alertClass = this.succeedCounter.activeGroupCount >= this.succeedCounter.activeGroupAllCount / 2 ? (this.succeedCounter.activeGroupCount === this.succeedCounter.activeGroupAllCount ? 'alert-success' : 'alert-primary') : 'alert-info';
    }
    setFirstView() {
        localStorage.setItem('firstView', 'true');
        this.isFirstView = localStorage.getItem('firstView') !== 'true';
    }
}
</script>
