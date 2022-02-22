/**
 * 一系列app的签到脚本,注意本脚本需要本身登录号账号,后台保活问题.自行解决.脚本解锁屏幕代码自行解决.
 * 本代码只解决签到的逻辑,其他问题不予解决
 * 本脚本多数使用 意图 跳转.可以节省大量的代码.
 * 预计可以节省70%的代码量
 * 本脚本只是个例子.点击签到之类的操作,需要自行完成(部分已经自动点击)
 * 
 * 更多抓取意图类的参数,免root调用,请联系本脚本作者 稻草人:289986635 收费教学
 */

auto.waitFor();

//美团签到  --需要支付.后面的代码就没写
app.startActivity({
    data : "imeituan://www.meituan.com/web?url=https%3A%2F%2Fsignin-qianbao.meituan.com%2Fresource%2Fwa%2Fsign-in-activity%2Findex%3Ftag%3D1%26ehwebview%3D1%26userCode%3D53c2d30abfd9e1ee2null%26shareApp%3Dgroup%26utm_source%3Dappshare%26utm_fromapp%3Dcopy%26tdsourcetag%3Ds_pcqq_aiomsg&tag=1&ehwebview=1&userCode=53c2d30abfd9e1ee2null&shareApp=group&utm_source=appshare&utm_fromapp=copy&tdsourcetag=s_pcqq_aiomsg"
})
text("签到赢现金").waitFor();
sleep(3000);
//如果你想付费签到..请自行填写点击签到 以及付费流程


//京东签到
app.startActivity({
    data : "openapp.jdmobile://virtual?params=%7B%22category%22%3A%22jump%22%2C%22modulename%22%3A%22JDReactCollectJDBeans%22%2C%22appname%22%3A%22JDReactCollectJDBeans%22%2C%22ishidden%22%3A%22true%22%2C%22des%22%3A%22jdreactcommon%22%2C%22param%22%3A%7B%22source%22%3A%22%22%2C%22shareMark%22%3A%22%22%2C%22transparentenable%22%3Atrue%2C%22page%22%3A%22collectJDBeansHomePage%22%7D%2C%22sourceType%22%3A%222%22%2C%22sourceValue%22%3A%221%22%2C%22M_sourceFrom%22%3A%22ljdshare%22%2C%22msf_type%22%3A%22click%22%2C%22m_param%22%3A%7B%22m_source%22%3A%220%22%2C%22event_series%22%3A%7B%7D%2C%22jda%22%3A%22122270672.15657867566391942107949.1565786757.1566129699.1566920977.3%22%2C%22usc%22%3A%22androidapp%22%2C%22ucp%22%3A%22t_335139774%22%2C%22umd%22%3A%22appshare%22%2C%22utr%22%3A%22CopyURL%22%2C%22jdv%22%3A%22122270672%7Candroidapp%7Ct_335139774%7Cappshare%7CCopyURL%7C1566920977829%22%2C%22ref%22%3A%22https%3A%2F%2Fbean.m.jd.com%2Fshare%2Findex.action%3Fad_od%3Dshare%26utm_source%3Dandroidapp%26utm_medium%3Dappshare%26utm_campaign%3Dt_335139774%26utm_term%3DCopyURL%22%2C%22psn%22%3A%2215657867566391942107949%7C3%22%2C%22psq%22%3A1%2C%22unpl%22%3A%22%22%2C%22pc_source%22%3A%22%22%2C%22mba_muid%22%3A%2215657867566391942107949%22%2C%22mba_sid%22%3A%221566920977831781596122039158%22%2C%22std%22%3A%22MO-J2011-1%22%2C%22par%22%3A%22ad_od%3Dshare%26utm_source%3Dandroidapp%26utm_medium%3Dappshare%26utm_campaign%3Dt_335139774%26utm_term%3DCopyURL%22%2C%22event_id%22%3A%22MJingDouHome_ShareSign%22%2C%22mt_xid%22%3A%22%22%2C%22mt_subsite%22%3A%22%22%7D%2C%22SE%22%3A%7B%22mt_subsite%22%3A%22%22%2C%22__jdv%22%3A%22122270672%7Candroidapp%7Ct_335139774%7Cappshare%7CCopyURL%7C1566920977829%22%2C%22unpl%22%3A%22%22%2C%22__jda%22%3A%22122270672.15657867566391942107949.1565786757.1566129699.1566920977.3%22%7D%7D"
})
//这里因为是 H5界面 所有有的手机是 text属性 而有的手机是 desc属性 请自行修改
text("签到领京豆").waitFor();
sleep(500);
while(!click("签到领京豆"));
log("京东_京豆签到完成");

app.startActivity({
    data : "openapp.jdmobile://virtual?params={\"category\":\"jump\",\"des\":\"couponCenter\"}"
})
text("签到领券").waitFor();
sleep(500);
while(!click("签到领券"));
log("京东_领券签到完成");

//京东金融签到
app.startActivity({
    data : "jdmobile://share?jumpType=7&jumpUrl=1373&channel=default&sourceUrl=1000*https%3A%2F%2Fu.jr.jd.com%2FdownloadApp%2Findex.html%3Fid%3D1708&source=&time=1566923315288"
})
//这里因为是 H5界面 所有有的手机是 text属性 而有的手机是 desc属性 请自行修改
desc("签到领钢镚").waitFor();
sleep(500);
desc("签到领钢镚").findOne().click();
log("京东金融_签到领钢镚完毕");

//京东双签领奖励
app.startActivity({
    data : "jdmobile://share?jumpType=7&jumpUrl=1374&channel=default&sourceUrl=1000*https%3A%2F%2Fu.jr.jd.com%2FdownloadApp%2Findex.html%3Fid%3D1709&source=&time=1566923694481"
})
desc("完成双签领取").waitFor();
sleep(500);
desc("完成双签领取").findOne().click();
log("京东双签完成");

//UC签到   这个就直接签到了.好像要执行多次 才能领取完当天的奖励  自己加个for循环
app.startActivity({
    data : "uclink://www.uc.cn/cc77796ca7c25dff9607d31b29effc07?action=open_url&url=https%3A%2F%2Fbroccoli.uc.cn%2Fapps%2Fhjc2019%2Froutes%2FjFpfVYdTL%3Fuc_wx_params%3Ddsdnfrpfbivesscpgimibtbmnijblauputogpintnwktprchmt%26uc_param_str%3Ddsdnfrpfbivesscpgimibtbmnijblauputogpintnwktprchmt%26uc_biz_str%3DS%3Acustom%7CC%3Afull_screen%26uc_wx_page_name%3Dsummerholiday2019%26uc_wx_used_dp%3D0%26uc_wx_disable_rotate%3Dtrue%23uc_wx_init_params%3D%7B%22entry%22%3A%22buwang_qq%22%2C%22inviteCode%22%3A%22196731977%22%7D&src_ch=lingling.yll@huanji03"
})
sleep(1000);

//淘宝签到
app.startActivity({
    data : 'taobao://market.m.taobao.com/app/tmall-wireless/tjb-2018/index/index.html?utparam=%7B"ranger_buckets_native"%3A"tsp2189_21618"%7D&spm=a2141.1.iconsv5.8&scm=1007.home_icon.lingjb.d&disableNav=YES#/tjb'
})
text("金币庄园首页").waitFor();
sleep("1000");
//这里进入到了金币庄园. 收金币的气泡可能有很多个. 自己遍历数量使用for循环处理
textStartsWith("签到领取").findOne().click();

//闲鱼签到,暂时用淘宝的方法吧.
app.startActivity({
    data : "taobao://market.m.taobao.com/app/idleFish-F2e/idlefish-xycoin/pages/index?wh_weex=true&_from__=main&spm=a2170.7905589.2641857.3404"
})
desc("马上签到").waitFor();
sleep(500);
desc("马上签到").findOne().parent().click();