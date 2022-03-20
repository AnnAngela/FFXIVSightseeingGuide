<template>
  <div>
    <div
      class="introdutionlead alert alert-info collapse"
      :class="isFirstView ? 'show' : 'hidden'"
    >
      <p class="lead" v-html="$t('introdution.text')"></p>
      <button type="button" class="btn btn-success" @click="setFirstView()">
        {{ $t("introdution.button") }}
      </button>
    </div>
    <div
      class="introdutionlead alert alert-info collapse"
      :class="isUpdatelogView ? 'show' : 'hidden'"
    >
      <p class="lead" v-html="$t('updatelog')"></p>
      <button type="button" class="btn btn-success" @click="setUpdatelogView()">
        {{ $t("introdution.button") }}
      </button>
    </div>
    <ul class="nav nav-pills">
      <li
        class="nav-item"
        v-for="(item, index) in sourceData"
        @click="switchGroup(index)"
        :key="item.groupName"
      >
        <a
          class="nav-link text-secondary"
          :class="activeGroup == index ? 'active bg-secondary text-light' : ''"
          href="javascript:void(0);"
          >{{ item.groupName }}</a
        >
      </li>
    </ul>
    <p class="sightseeing alert" :class="alertClass">
      {{ $t("info.succeedSightseeingCountInfomation") }}:
      {{ $t("info.activeGroupCount") }}: {{ succeedCounter.activeGroupCount }} /
      {{ succeedCounter.activeGroupAllCount }} {{ $t("info.totalCount") }}:
      {{ succeedCounter.succeedCount }} / {{ succeedCounter.allCount }}
      <span class="hr">
        <!-- 用来回避<p/>不能嵌套<hr>的静态检查错误 -->
      </span>
      <span class="ps">{{ $t("sightseeingClickIntroduction") }}</span>
      <span :class="alertClass === 'alert-success' && 'hidden'" class="ps">{{
        $t("info.additionalInfo")
      }}</span>
      <span :class="alertClass === 'alert-success' && 'hidden'" class="ps"
        >{{ $t("sightseeingActGuide")
        }}<a
          class="external seehere"
          target="_blank"
          href="https://bbs.ngacn.cc/read.php?tid=7755329"
          >{{ $t("sightseeingActGuideSeeHere") }}</a
        >[zh-cn]
      </span>
    </p>
    <div
      v-for="item in calcData"
      :key="item.id"
      class="sightseeing card"
      :class="
        item.validStatus === 'card-danger' ? 'card-default' : item.validStatus
      "
      @click="setComplete(item.id)"
    >
      <div class="card-header">
        <span class="card-title">
          <span>{{ item.id }}</span>
          <span v-if="item.subarea != undefined">{{ $t(item.subarea) }}</span>
          <span v-else>{{ $t(item.area) }}</span>
          <span class="mr-2">x:{{ item.pos.x }} y:{{ item.pos.y }}</span>
          <span v-for="(weather, index) in item.weathers" :key="weather"
            ><span v-if="index !== 0" class="mx-1"> | </span
            ><img
              class="inlineImg"
              :src="'./image/weather/' + weather + '.png'"
            />
            <span :class="weather === item.forecast ? 'forecast' : ''">{{
              $t(weather)
            }}</span></span
          >
          <span class="ml-2 mr-3">{{ item.timestr }}</span
          ><img
            class="inlineImg"
            :src="'./image/emote/' + item.action + '.png'"
          />
          <span>{{ $t(item.action) }}</span>
        </span>
        <div class="float-right card-postheader">
          <span v-if="item.validStatus == 'card-primary'">{{
            $t("info.soonToComplete")
          }}</span>
          <span v-if="item.validStatus == 'card-info'">{{
            $t("info.fewHoursToComplete")
          }}</span>
          <span v-if="item.validStatus == 'card-secondary'">{{
            $t("info.moreTimeToComplete")
          }}</span>
          <span v-if="item.validStatus == 'card-default'">{{
            $t("info.longTimeToComplete")
          }}</span>
          <span v-if="item.validStatus == 'card-danger'">{{
            $t("info.veryLongTimeToComplete")
          }}</span>
          <span v-if="item.validStatus == 'card-success'">{{
            $t("info.completed")
          }}</span>
        </div>
      </div>
      <div class="card-body">
        <div v-if="item.validStatus == 'card-success'">
          {{ $t("info.completed") }}
        </div>
        <div v-else-if="item.validStatus == 'card-primary'">
          {{ $t("info.startFrom") }}: ET
          {{ item.nextAvaliableTime.toHourMinuteString() }}
          {{ $t("info.localTime") }}:
          {{
            $d(item.nextAvaliableTime.getLocalTime(), "long").replace(
              nowYear,
              ""
            )
          }}
          {{ item.isStillWaiting ? $t("info.isStillWaiting") : "" }}
          <br />
          {{ $t("info.endingAt") }}: ET
          {{ item.nextAvaliableTimeEnd.toHourMinuteString() }}
          {{ $t("info.localTime") }}:
          {{
            $d(item.nextAvaliableTimeEnd.getLocalTime(), "long").replace(
              nowYear,
              ""
            )
          }}
          {{
            $tc(
              item.isOversize ? "info.lessThan2" : "info.lessThan",
              item.nextAvaliableTimeLeft,
              {
                m: item.nextAvaliableTimeLeft,
              }
            )
          }}
        </div>
        <div v-else-if="item.validStatus != 'card-danger'">
          {{ $t("info.startFrom") }}: ET
          {{ item.nextAvaliableTime.toHourMinuteString() }}
          {{ $t("info.localTime") }}:
          {{
            $d(item.nextAvaliableTime.getLocalTime(), "long").replace(
              nowYear,
              ""
            )
          }}
        </div>
        <div v-else>{{ $t("info.veryLongTimeToComplete") }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sightseeing {
  margin-top: 20px;
}
.sightseeing.card {
  cursor: pointer;
  transition: all 1s;
}
.alert-success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.alert-success .hr {
  border-top-color: #c9e2b3;
}
.alert-info {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.alert-info .hr {
  border-top-color: #a6e1ec;
}
.alert-warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.alert-warning .hr {
  border-top-color: #f7e1b5;
}
.alert-danger {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.alert-warning .hr {
  border-top-color: #f7e1b5;
}
.alert-primary {
  color: #004085;
  background-color: #cce5ff;
  border-color: #b8daff;
}
.card-default {
  border-color: #ddd;
}
.card-default > .card-header {
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
}
.card-primary {
  border-color: #337ab7;
}
.card-primary > .card-header {
  color: #fff;
  background-color: #337ab7;
  border-color: #337ab7;
}
.card-success {
  border-color: #d6e9c6;
}
.card-success > .card-header {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
.card-info {
  border-color: #bce8f1;
}
.card-info > .card-header {
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
}
.card-warning {
  border-color: #faebcc;
}
.card-warning > .card-header {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}
.card-danger {
  border-color: #ebccd1;
}
.card-danger > .card-header {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
.card-postheader {
  font-style: italic;
  font-weight: lighter;
}
.inlineImg {
  max-height: 1.25em;
  margin-top: -0.25em;
}
a.external {
  cursor: pointer;
  background-position: center right 2px;
  background-repeat: no-repeat;
  background-image: -webkit-linear-gradient(transparent, transparent),
    url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Cg%20transform%3D%22translate%28-826.429%20-698.791%29%22%3E%3Crect%20width%3D%225.982%22%20height%3D%225.982%22%20x%3D%22826.929%22%20y%3D%22702.309%22%20fill%3D%22%23fff%22%20stroke%3D%22%2306c%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M831.194%20698.791h5.234v5.391l-1.571%201.545-1.31-1.31-2.725%202.725-2.689-2.689%202.808-2.808-1.311-1.311z%22%20fill%3D%22%2306f%22%2F%3E%3Cpath%20d%3D%22M835.424%20699.795l.022%204.885-1.817-1.817-2.881%202.881-1.228-1.228%202.881-2.881-1.851-1.851z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);
  background-image: linear-gradient(transparent, transparent),
    url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2210%22%3E%3Cg%20transform%3D%22translate%28-826.429%20-698.791%29%22%3E%3Crect%20width%3D%225.982%22%20height%3D%225.982%22%20x%3D%22826.929%22%20y%3D%22702.309%22%20fill%3D%22%23fff%22%20stroke%3D%22%2306c%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M831.194%20698.791h5.234v5.391l-1.571%201.545-1.31-1.31-2.725%202.725-2.689-2.689%202.808-2.808-1.311-1.311z%22%20fill%3D%22%2306f%22%2F%3E%3Cpath%20d%3D%22M835.424%20699.795l.022%204.885-1.817-1.817-2.881%202.881-1.228-1.228%202.881-2.881-1.851-1.851z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E);
  padding-right: 14px;
}
.hr {
  display: block;
  height: 0;
  border-style: inset;
  border-width: 1px 0 0;
  margin: 0.5em auto;
  overflow: hidden;
}
.ps {
  margin-left: 2em;
  display: inline-block;
}
.ps:before {
  content: "P.S.";
  margin-left: -2em;
  display: inline-block;
  width: 2em;
}
.ps + .ps:before {
  content: "";
}
.seehere {
  font-style: italic;
}
.forecast {
  border-bottom: 1px gray solid;
}
.card-primary .forecast {
  border-color: white;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import {
  SightseeingData,
  ISightseeingGroup,
  Sightseeing,
} from "../Sightseeing";
import {
  SucceedSightseeingCounter,
  ISucceedCounter,
} from "../SightseeingCounter";

const updatelog_date = "2022-3-20";

@Component
export default class HomePage extends Vue {
  nowYear: RegExp = RegExp(`${new Date().getFullYear()}年`, "g");
  sourceData: ISightseeingGroup[] = SightseeingData;
  activeGroup: number = 0;
  calcData: Sightseeing[] = [];
  succeedSightseeingCounter: SucceedSightseeingCounter =
    new SucceedSightseeingCounter();
  succeedCounter: ISucceedCounter = {
    activeGroupCount: 0,
    activeGroupAllCount: 0,
    succeedCount: 0,
    allCount: SightseeingData.reduce((s, ig) => (s += ig.items.length), 0),
  };
  isFirstView: boolean =
    (localStorage.getItem("isFirstView") || "true") === "true";
  isUpdatelogView: boolean =
    (localStorage.getItem("isUpdatelogView") || "") !== updatelog_date;
  alertClass: string = "";
  created() {
    localStorage.removeItem("firstView");
    this.activeGroup = parseInt(
      localStorage.getItem("activeGroupIndex") || "0"
    );

    this.loadGroup(this.activeGroup);
    this.$gBus.$on("hourChange", (_: number) => {
      let oldData: Sightseeing[] = this.calcData;
      this.loadGroup(this.activeGroup); // * 本句是至关重要的，其他的待优化
      let newData: Sightseeing[] = this.calcData;
      let nearSoonToCompleteData: Sightseeing[] = [];
      newData.forEach((sightseeing: Sightseeing) => {
        oldData.forEach((s: Sightseeing) => {
          if (s.id !== sightseeing.id) return;
          if (sightseeing.validStatus === "card-primary") {
            if (s.validStatus === "card-info")
              nearSoonToCompleteData.push(sightseeing);
            else if (
              s.validStatus === "card-primary" &&
              s.isStillWaiting === true &&
              sightseeing.isStillWaiting === false
            )
              nearSoonToCompleteData.push(sightseeing);
          }
        });
      });
      if (nearSoonToCompleteData.length)
        this.$gBus.$emit("nearSoonToCompleteGet", nearSoonToCompleteData);
    });
  }
  switchGroup(index: number) {
    this.activeGroup = index;
    localStorage.setItem("activeGroupIndex", index.toString());
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
      return; //防止因错误数据导致加载两次数据
    }

    let tempGroup = SightseeingData[index].items;
    let tempData: Sightseeing[] = [];
    let succeedData: Sightseeing[] = [];

    for (let tempItemIndex in tempGroup) {
      let k = new Sightseeing(tempGroup[tempItemIndex]);
      if (this.succeedSightseeingCounter.contains(k.id)) {
        k.validStatus = "card-success";
        succeedData.push(k);
      } else {
        k.calcNextAvailableTime();
        tempData.push(k);
      }
    }
    tempData.sort((a, b) => {
      let diff =
        a.nextAvaliableTime.date.getTime() - b.nextAvaliableTime.date.getTime();
      if (diff === 0 && a.nextAvaliableTimeEnd && b.nextAvaliableTimeEnd)
        diff =
          a.nextAvaliableTimeEnd.date.getTime() -
          b.nextAvaliableTimeEnd.date.getTime();
      return diff;
    });
    for (let succeedIndex in succeedData) {
      tempData.push(succeedData[succeedIndex]);
    }
    this.succeedCounter.activeGroupCount =
      this.succeedSightseeingCounter.countByGroup(
        SightseeingData[this.activeGroup]
      );
    this.succeedCounter.activeGroupAllCount =
      SightseeingData[this.activeGroup].items.length;
    this.succeedCounter.succeedCount = this.succeedSightseeingCounter.count();

    this.calcData = tempData;

    this.alertClass =
      this.succeedCounter.activeGroupCount >=
      this.succeedCounter.activeGroupAllCount / 2
        ? this.succeedCounter.activeGroupCount ===
          this.succeedCounter.activeGroupAllCount
          ? "alert-success"
          : "alert-primary"
        : "alert-info";
  }
  setFirstView() {
    localStorage.setItem("isFirstView", "false");
    this.isFirstView = false;
  }
  setUpdatelogView() {
    localStorage.setItem("isUpdatelogView", updatelog_date);
    this.isUpdatelogView = false;
  }
}
</script>
