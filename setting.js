"ui";

const sdPath = files.getSdcardPath();
const scriptPath = files.join(sdPath, '脚本');
const settingPath = files.join(scriptPath, 'yys-setting.json');

const defaultSetting = {
    'all.returnHomeOnFinish': true,
    'tansuo.aheadBoss': true,
    'tansuo.circleTime': 5,
    'tansuo.autoChangeMaterial': false,
    'tansuo.autoClearBox': false,
    'tansuo.autoClearJJTP': false,
    'tansuo.autoClearYQFY': false,
    'tansuo.autoClearShiju': false,
    'tansuo.autoClearNianshou': false
}

let setting = defaultSetting;

files.ensureDir(scriptPath);
if (files.exists(settingPath)) {
    try {
        const txt = files.read(settingPath);
        const parsed = JSON.parse(txt);
        setting = Object.assign(JSON.parse(JSON.stringify(defaultSetting)), parsed);
    } catch (error) {
        toast('文件格式错误\n默认设置将会覆盖');
        files.write(settingPath, JSON.stringify(defaultSetting));
        setting = defaultSetting;
    }
} else {
    toast('文件不存在\n使用默认设置覆盖');
    files.write(settingPath, JSON.stringify(setting));
}

ui.layout(
    <vertical>
        <toolbar bg="#66CCFF">
            <horizontal>
                <text textSize="18sp" textColor="white" text="脚本运行设置" />
            </horizontal>
            <horizontal w="*" gravity="right">
                <button id="save" text="保存并退出" textColor="white" style="Widget.AppCompat.Button.Borderless" />
            </horizontal>
        </toolbar>
        <scroll>
            <vertical>
                <vertical marginTop="5" padding="0 10">
                    <text h="40" gravity="center_vertical" textSize="18sp" text="综合设置" />
                    <horizontal gravity="center_vertical" >
                        <checkbox text="脚本结束后回到桌面" id="ReturnHomeOnFinish" />
                    </horizontal>
                </vertical>
                <vertical marginTop="5" padding="0 10">
                    <text h="40" gravity="center_vertical" textSize="18sp" text="探索设置" />
                    <horizontal gravity="center_vertical" >
                        <text textSize="16sp" text="循环次数" />
                        <text textSize="14sp" w="50" id="TansuoCircleTimes" gravity="center" />
                        <button id="Down5TansuoCircleTimes" text="-5" h="40" w="40" />
                        <button id="DownTansuoCircleTimes" text="-1" h="40" w="40" />
                        <button id="UpTansuoCircleTimes" text="+1" h="40" w="40" />
                        <button id="Up5TansuoCircleTimes" text="+5" h="40" w="40" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="BOSS出现后直接攻击" id="TansuoAheadBoss" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动换狗粮" id="TansuoAutoChangeMaterial" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动领取地图奖励" id="TansuoAutoClearBox" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动清理结界突破" id="TansuoAutoClearJJTP" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动清理妖气封印" id="TansuoAutoClearYQFY" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动清理石距" id="TansuoAutoClearShiju" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动清理年兽" id="TansuoAutoClearNianshou" />
                    </horizontal>
                </vertical>
                <vertical marginTop="5" padding="0 10">
                    <text h="40" gravity="center_vertical" textSize="18sp" text="结界突破设置" />
                    <horizontal gravity="center_vertical" >
                        <checkbox text="后退等级" id="JJTPLevelDown" />
                    </horizontal>
                    <horizontal>
                        <text text="向前攻打轮数" />
                        <spinner entries="1|2|3" />
                    </horizontal>
                    <horizontal>
                        <text text="向后回退轮数" />
                        <spinner entries="1|2|3|4|5|6" />
                    </horizontal>
                </vertical>
                <text padding="10" id="settingText" />
            </vertical>
        </scroll>
    </vertical>
);

function refresh() {
    console.log(ui.TansuoCircleTimes);
    ui.ReturnHomeOnFinish = setting['all.returnHomeOnFinish'];
    ui.TansuoAheadBoss.checked = setting['tansuo.aheadBoss'];
    ui.TansuoAutoChangeMaterial.checked = setting['tansuo.autoChangeMaterial'];
    ui.TansuoAutoClearBox.checked = setting['tansuo.autoClearBox'];
    ui.TansuoAutoClearJJTP.checked = setting['tansuo.autoClearJJTP'];
    ui.TansuoAutoClearNianshou.checked = setting['tansuo.autoClearNianshou'];
    ui.TansuoAutoClearShiju.checked = setting['tansuo.autoClearShiju'];
    ui.TansuoAutoClearYQFY.checked = setting['tansuo.autoClearYQFY'];
    ui.TansuoCircleTimes.setText(setting['tansuo.circleTime'].toString());
    ui.settingText.setText(JSON.stringify(setting, null, 2));
}

function save() {
    // setting['tansuo.circleTime'] = Number(ui.TansuoCircleTimes.getText());
    files.write(settingPath, JSON.stringify(setting));
}

ui.save.click(function (v) {
    save();
    refresh();
    toast('保存成功');
    ui.finish();
});

ui.ReturnHomeOnFinish.click(function () {
    setting['all.returnHomeOnFinish'] = ui.ReturnHomeOnFinish.checked;
    save();
    refresh();
});

ui.Down5TansuoCircleTimes.click(function (v) {
    setting['tansuo.circleTime'] - 5 < 1 ? setting['tansuo.circleTime'] = 1 : setting['tansuo.circleTime'] -= 5;
    save();
    refresh();
});

ui.DownTansuoCircleTimes.click(function (v) {
    setting['tansuo.circleTime'] - 1 < 1 ? setting['tansuo.circleTime'] = 1 : setting['tansuo.circleTime'] -= 1;
    save();
    refresh();
});

ui.UpTansuoCircleTimes.click(function (v) {
    setting['tansuo.circleTime'] + 1 > 100 ? setting['tansuo.circleTime'] = 100 : setting['tansuo.circleTime'] += 1;
    save();
    refresh();
});

ui.Up5TansuoCircleTimes.click(function (v) {
    setting['tansuo.circleTime'] + 5 > 100 ? setting['tansuo.circleTime'] = 100 : setting['tansuo.circleTime'] += 5;
    save();
    refresh();
});

ui.TansuoAheadBoss.click(function () {
    setting['tansuo.aheadBoss'] = !setting['tansuo.aheadBoss'];
    save();
    refresh();
});

ui.TansuoAutoChangeMaterial.click(function () {
    setting['tansuo.autoChangeMaterial'] = !setting['tansuo.autoChangeMaterial'];
    save();
    refresh();
});

ui.TansuoAutoClearBox.click(function () {
    setting['tansuo.autoClearBox'] = !setting['tansuo.autoClearBox'];
    save();
    refresh();
});

ui.TansuoAutoClearJJTP.click(function () {
    setting['tansuo.autoClearJJTP'] = !setting['tansuo.autoClearJJTP'];
    save();
    refresh();
});

ui.TansuoAutoClearYQFY.click(function () {
    setting['tansuo.autoClearYQFY'] = !setting['tansuo.autoClearYQFY'];
    save();
    refresh();
});

ui.TansuoAutoClearShiju.click(function () {
    setting['tansuo.autoClearShiju'] = !setting['tansuo.autoClearShiju'];
    save();
    refresh();
});

ui.TansuoAutoClearNianshou.click(function () {
    setting['tansuo.autoClearNianshou'] = !setting['tansuo.autoClearNianshou'];
    save();
    refresh();
});

refresh();