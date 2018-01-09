<template>
    <div>
        <ul class="nav nav-pills">
            <li v-for="(item, index) in sourceData" 
                :class="{active: activeGroup == index}" @click="switchGroup(index)" :key="item.groupName">
                <a href="javascript:;">{{ item.groupName }}</a>
            </li>
        </ul>
        <div v-for="item in calcData" :key="item.id" class="sightseeing-panel panel" :class="item.vaildStatus === 'panel-danger' ? 'panel-default' : item.vaildStatus" @click="setComplete(item.id)">
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
.sightseeing-panel {
  margin-top: 20px;
  transition: all 1s;
  cursor: pointer;
}
.panel-postheader {
  font-style: italic;
  font-weight: lighter;
  margin-top: -1.3em;
}
</style>


<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import { SightseeingData, SightseeingGroup, Sightseeing } from "../Sightseeing";

@Component
export default class HomePage extends Vue {
  sourceData: SightseeingGroup[] = SightseeingData;
  activeGroup: number = 0;
  calcData: Sightseeing[] = [];
  created() {
    this.activeGroup = parseInt(
      localStorage.getItem("activeGroupIndex") || "0"
    );
    this.loadGroup(this.activeGroup);
    this.$gBus.$on("hourChange", (_: number) => {
      this.loadGroup(this.activeGroup);
    });
  }
  switchGroup(index: number) {
    this.activeGroup = index;
    localStorage.setItem("activeGroupIndex", index.toString());
    this.loadGroup(index);
  }
  setComplete(id: string) {
    let succeedStr = localStorage.getItem("comletedSightseeing") || "";
    let succeedIds: string[] = succeedStr.split(",");

    let pos = succeedIds.indexOf(id);

    if (pos == -1) {
      succeedIds.push(id);
    } else {
      succeedIds.splice(pos, 1);
    }
    localStorage.setItem("comletedSightseeing", succeedIds.join(","));
    this.loadGroup(this.activeGroup);
  }
  loadGroup(index: number) {
    let tempGroup = SightseeingData[index].items;
    let tempData: Sightseeing[] = [];
    let succeedData: Sightseeing[] = [];

    let succeedStr = localStorage.getItem("comletedSightseeing") || "";
    let succeedIds: string[] = succeedStr.split(",");
    for (let tempItemIndex in tempGroup) {
      let k = new Sightseeing(tempGroup[tempItemIndex]);
      k.calcNextAvailableTime();
      if (succeedIds.indexOf(k.id) != -1) {
        k.vaildStatus = "panel-success";
        succeedData.push(k);
      } else {
        tempData.push(k);
      }
    }
    tempData.sort(
      (a, b) =>
        a.nextAvaliableTime.date.getTime() - b.nextAvaliableTime.date.getTime()
    );
    for (let succeedIndex in succeedData) {
      tempData.push(succeedData[succeedIndex]);
    }
    this.calcData = tempData;
  }
}
</script>