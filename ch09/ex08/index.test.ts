import { AlarmClock } from "./index.ts";

describe("AlarmClock", () => {
  test("通常 -> アラームセット中: アラーム設定", () => {
    const alarmClock = new AlarmClock("normal");
    expect(alarmClock.setAlarm()).toBe("none");
  });
  test("アラームセット中 -> 通常: アラーム解除", () => {
    const alarmClock = new AlarmClock("alarmSet");
    expect(alarmClock.cancelAlarm()).toBe("none");
  });
  test("アラームセット中 --> アラーム鳴動中: アラーム設定時刻到達", () => {
    const alarmClock = new AlarmClock("alarmSet");
    expect(alarmClock.reachedToAlarmTime()).toBe("soundAlarm");
  });
  test("アラーム鳴動中 --> 通常: アラーム解除", () => {
    const alarmClock = new AlarmClock("alarmSounding");
    expect(alarmClock.cancelAlarm()).toBe("stopAlarm");
  });
  test("アラーム鳴動中 --> スヌーズ中: スヌーズ", () => {
    const alarmClock = new AlarmClock("alarmSounding");
    expect(alarmClock.snooze()).toBe("stopAlarm");
  });
  test("スヌーズ中 --> アラーム鳴動中: スヌーズ設定時間経過", () => {
    const alarmClock = new AlarmClock("snoozing");
    expect(alarmClock.elapseSnoozeTime()).toBe("soundAlarm");
  });
  test("スヌーズ中 --> 通常: アラーム解除", () => {
    const alarmClock = new AlarmClock("snoozing");
    expect(alarmClock.cancelAlarm()).toBe("none");
  });
});
