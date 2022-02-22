"ui";

const sdPath = files.getSdcardPath();
const scriptPath = files.join(sdPath, '脚本');
const settingPath = files.join(scriptPath, 'yys-setting.json');

const defaultSetting = {
    'all.returnHomeOnFinish': true,
    'tansuo.aheadBoss': true,
    'tansuo.circleTime': 1,
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
                <button id="save" text="保存并运行脚本" textColor="white" style="Widget.AppCompat.Button.Borderless" />
            </horizontal>
        </toolbar>
        <scroll>
            <vertical>
                <vertical marginTop="5" padding="0 10">
                    <text h="40" gravity="center_vertical" textSize="18sp" text="全局设置" />
                    <horizontal gravity="center_vertical" >
                        <checkbox text="脚本循环结束后回到桌面" id="ReturnHomeOnFinish" />
                    </horizontal>
                </vertical>
                <vertical marginTop="5" padding="0 10">
                    <text h="40" gravity="center_vertical" textSize="18sp" text="养号设置" />
                    <horizontal gravity="center_vertical" >
                        <text textSize="16sp" text="本次养号时间(输入需要刷的视频数量)" />
                              
                <text text="" textColor="black" textSize="32sp" marginTop="32"/>
                 <input inputType="number" text="100"/>
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="养号(勾选下列所需功能)" id="TansuoAheadBoss" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动点赞" id="TansuoAutoChangeMaterial" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动评论" id="TansuoAutoClearBox" />
                    </horizontal>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动关注" id="TansuoAutoClearJJTP" />
                    </horizontal>
  
                </vertical>
                <vertical marginTop="5" padding="0 10">
                    <text h="40" gravity="center_vertical" textSize="18sp" text="自动上传视频" />
                     <checkbox id="cb1" text="自动上传视频(勾选下列所需功能)"/>
                    <horizontal gravity="center_vertical" >
                        <checkbox text="自动上传视频加音乐" id="JJTPLevelDown" />
                           <horizontal gravity="center_vertical" >
                        <checkbox text="自动上传视频加标题" id="JJTPLevelDown" />
                    </horizontal>                        
                    </horizontal>
                    <horizontal>
                        <text text="本次上传视频数量" />
                <text text="" textColor="black" textSize="32sp" marginTop="32"/>
                 <input inputType="number" text="10"/>
                    </horizontal>
                 
                </vertical>
                <text padding="10" id="settingText" />
            </vertical>
        </scroll>
    </vertical>
);

function save() {
    // setting['tansuo.circleTime'] = Number(ui.TansuoCircleTimes.getText());
    files.write(settingPath, JSON.stringify(setting));
}

ui.save.click(function (v) {

    save();
    toast('程序开始运行，请勿操作屏幕');
    ui.finish();
});

ui.ReturnHomeOnFinish.click(function () {
    setting['all.returnHomeOnFinish'] = ui.ReturnHomeOnFinish.checked;
    save();
 
});



ui.TansuoAheadBoss.click(function () {
    setting['tansuo.aheadBoss'] = !setting['tansuo.aheadBoss'];
    save();
});

ui.TansuoAutoChangeMaterial.click(function () {
    setting['tansuo.autoChangeMaterial'] = !setting['tansuo.autoChangeMaterial'];
    save();
});

ui.TansuoAutoClearBox.click(function () {
    setting['tansuo.autoClearBox'] = !setting['tansuo.autoClearBox'];
    save();
});

ui.TansuoAutoClearJJTP.click(function () {
    setting['tansuo.autoClearJJTP'] = !setting['tansuo.autoClearJJTP'];
    save();
});

