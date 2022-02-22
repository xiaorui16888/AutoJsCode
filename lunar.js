/**
Android Tasker农历桌面挂件Javascript处理部分 v0.1
主要功能：
			1. 阳历日期及星期显示
			2、农历年、日期显示(有效范围： 1921 - 2020)
			3、节气显示和预测
			4、农历节日显示
			5、阳历节日显示
			6、自定义纪念日、长辈生日等显示
使用说明：http://shuyz.com/tasker-lunar-and-holiday-widget.html

代码来源： 
农历算法部分：	http://www.qwbm.com/new.asp?id=720
节气算法部分：	http://www.sharejs.com/js/date/215
节日算法来自 东来东去(QQ:30938) 2008/02/20 为摩托罗拉A1200E编写的网页版万年历
整合移植 by lance@shuyz.com
最后修改： 2012/10/24
*/

var tianganStr 				= 		"甲乙丙丁戊己庚辛壬癸";
var dizhiStr 					= 		"子丑寅卯辰巳午未申酉戌亥";
var numString				= 		"一二三四五六七八九十";
var monString 				= 		"正二三四五六七八九十冬腊";
var shengxiaoStr			= 		"鼠牛虎兔龙蛇马羊猴鸡狗猪";
var jieqiStr						=		new Array(
														"小寒","大寒","立春","雨水","惊蛰","春分",
														"清明","谷雨","立夏","小满","芒种","夏至",
														"小暑","大暑","立秋","处暑","白露","秋分",
														"寒露","霜降","立冬","小雪","大雪","冬至");
var sWeek 					= 		new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
var madd 						= 		new Array(0,31,59,90,120,151,181,212,243,273,304,334);
var CalendarData 			= 		new Array(
														0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96,
														0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A,
														0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA,
														0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA,
														0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D,
														0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B,
														0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F,
														0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96,
														0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95,
														0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
var DifferenceInMonth	= 		new Array(
														1272060, 1275495, 1281180, 1289445, 1299225, 1310355,
														1321560, 1333035, 1342770, 1350855, 1356420, 1359045,
														1358580, 1355055, 1348695, 1340040, 1329630, 1318455,
														1306935, 1297380, 1286865, 1277730, 1274550, 1271556);
var LunarHolidays 			= 		new Array(
														"0101*春节",
														"0108 寒食节",
														"0115#元宵节",
														//-
														"0202 龙抬头节",
														//-
														"0303 歌墟节(壮族)",
														//-
														"0408 佛诞节(香港)",
														//-
														"0505#端午节",
														//-
														// 6月
														//-
														"0707#七夕节",
														"0715 中元节(鬼节)",
														//-
														"0815#中秋节",
														//-
														"0909 重阳节 中国老年节(义务助老活动日)[1989]",
														//-
														"1001 祭祖节(十月朝) 送寒衣节",
														"1015 下元节 文成公主诞",
														//-
														//-
														"1208 腊八节",
														"1223 北方小年(扫房日)",
														"1224 南方小年(掸尘日)",
														"1229#除夕");
var yangliHolidays 			= 		new Array(
														"0101*元旦",
														"0106 主显节 中国13亿人口日[2005]",
														"0126 国际海关日[1924]",
														//-
														"0202 世界湿地日[1996]",
														"0207 国际声援南非日[1964]",
														"0210 世界气象日[1960]",
														"0214#西方情人节",
														"0215 中国12亿人口日[1995]",
														"0221 国际母语日[2000] 反对殖民制度斗争日[1949]",
														"0224 第三世界青年日",
														"0228 世界居住条件调查日",
														//-
														"0301 国际海豹日[1983]",
														"0303 全国爱耳日[2000]",
														"0305 中国青年志愿者服务日[2000] 毛泽东题词“向雷锋同志学习”[1963]",
														"0308#国际妇女节(联合国妇女权益和国际和平日)[1910]",
														"0312 中国植树节[1979]",
														"0314 国际警察日(节)",
														"0315 国际消费者权益日[1983]",
														"0316 手拉手情系贫困小伙伴全国统一行动日",
														"0317 中国国医节[1929] 国际航海日",
														"0318 全国科技人才活动日 巴黎公社纪念日[1871]",
														"0321 世界睡眠日[2001] 世界儿歌日 世界森林日(林业节)[1972] 国际消除种族歧视日[1976] 国际法语日",
														"0322 世界水日[1993] 中国水周(3月22日至3月28日)[1988设/1994改]",
														"0323 世界气象日[1950]",
														"0324 世界防治结核病日[1996]",
														"0330 巴勒斯坦国土日",
														//-
														"0401#国际愚人节[1564] 全国爱国卫生运动月(四月) 税收宣传月(四月)",
														"0402 国际儿童图书日",
														"0407 世界卫生日[1950] 反思卢旺达大屠杀国际日[2004]",
														"0410 非洲环境保护日[1984]",
														"0411 世界帕金森病日[1997]",
														"0412 世界航天节",
														"0414 中国11亿人口日[1989]",
														"0415 非洲自由日[1958]",
														"0416 全球青年服务日[4月16-18日][2000]",
														"0421 全国企业家活动日[1994]",
														"0422 世界地球日[1970] 世界法律日",
														"0423 世界读书日[1995] 世界图书和版权日[1995]",
														"0424 世界青年反对殖民主义日[1957] 亚非新闻工作者日",
														"0425 全国预防接种宣传日[1986]",
														"0426 世界知识产权日[2000]",
														"0427 联谊城日",
														"0430 全国交通安全反思日",
														//-
														"0501*国际劳动节[1889] 国际示威游行日",
														"0502& ",
														"0503&太阳日 世界新闻自由日",
														"0504 中国青年节[1939] 五四运动纪念日[1919] 科技传播日",
														"0505 全国碘缺乏病防治日[1994]",
														"0508 世界红十字日[1948] 世界微笑日",
														"0509 战胜德国法西斯纪念日[1945]",
														"0512 国际护士节[1912]",
														"0515 国际家庭(咨询)日[1994] 全国碘缺乏病防治日[1994]",
														"0517 世界电信日[1969]",
														"0518 国际博物馆日[1977]",
														"0520 世界计量日[1999] 全国母乳喂养宣传日[1990] 全国学生营养日[1990]",
														"0521 世界文化多样性对话和发展日[2001]",
														"0522 国际生物多样性日[1994设/2001改]",
														"0525 非洲解放日[1963]",
														"0526 世界向人体条件挑战日[1993]",
														"0527 上海解放日[1949]",
														"0529 国际维和人员日[2002]",
														"0530 “五卅”反对帝国主义运动纪念日[1925]",
														"0531 世界无烟日[1988]", 
														//
														"0601#国际儿童节[1949] 世界牛奶日[2001]",
														"0604 受侵略戕害无辜儿童国际日",
														"0605 世界环境日[1974]",
														"0606 全国爱眼日[1996]",
														"0611 中国10亿人口日[1981]",
														"0611 世界无童工日[2002]",
														"0614 世界献血者日[2004]",
														"0616 国际非洲儿童日[1991]",
														"0617 世界防止荒漠化和干旱日[1995]",
														"0620 世界难民日[2001]",
														"0622 中国儿童慈善活动日",
														"0623 国际奥林匹克日[1894/1984] 世界手球日 国际SOS儿童村节",
														"0625 全国土地日[1991]",
														"0626 国际禁毒日(国际反毒品日)[1987] 禁止药物滥用和非法贩运国际日[1987] 国际宪章日(联合国宪章日)[1945] 支援酷刑受害者国际日[1997]",
														"0630 世界青年联欢节",
														//-
														"0701#中国建党日(中国共产党建党纪念日)[1921] 香港回归纪念日[1997] 国际建筑日[1985] 亚洲“三十亿人口日”[1988]",
														"0702 国际体育记者日",
														"0707 中国人民抗日战争纪念日[1937]",
														"0711 中国航海日[2005] 世界(50亿)人口日[1987]",
														"0718 国际海洋日",
														"0720 人类月球日(人类首次成功登月)[1969]",
														"0726 世界语(言)创立日 葡萄牙祖父母日[2003]",
														"0728 第一次世界大战爆发纪念日[1914]",
														"0730 非洲妇女日",
														//-
														"0801#中国建军节(中国人民解放军建军节)[1927]",
														"0806 国际电影节[1932]",
														"0808 爸爸节",
														"0910 中国教师节[1985]",
														"0911 9·11纪念日",
														"0914 世界清洁地球日",
														"0916 国际臭氧层保护日[1987]",
														"0918 中国国耻日(“九·一八”事变纪念日)[1931]",
														"0920 全国公民道德宣传日[2003] 全国爱牙日[1989] 世界球茎花卉日",
														"0921 国际和平日(全球停火和非暴力日,2002年以后)[2002]",
														"0926 孔子文化节(曲阜国际)[1989]",
														"0927 世界旅游日[1979]",
														//-
														"1001*中国国庆节[1949] 国际音乐日[1980] 国际敬老日(老人节)[1991]",
														"1002&国际和平(与民主自由)斗争日[1949]",
														"1003& ",
														"1004 世界动物日[1949]",
														"1008 全国高血压日[1998] 狮子会世界视觉日[1998]",
														"1009 世界邮政日(万国邮联日)[1969]",
														"1010 辛亥革命纪念日[1911] 世界精神卫生日[1992] 世界居室卫生日",
														"1011 声援南非政治犯日",
														"1012 世界(60亿)人口日[1999]",
														"1013 世界保健日 中国少年先锋队建队纪念日[1949] 国际教师节 采用格林威治时间为国际标准时间日[1884]",
														"1014 世界标准日[1969]",
														"1015 国际盲人节(白手杖节)[1984] 中国首次载人航天圆满成功[2003]",
														"1016 世界粮食日[1979]",
														"1017 消除贫穷国际日[1992]",
														"1020 世界骨质疏松日[1997]",
														"1022 世界传统医药日[1992]",
														"1024 联合国日[1947] 世界发展信息日",
														"1025 Tasker 桌面挂件开发完成",
														"1028 世界“男性健康日”[2000]",
														"1031 万圣节前夜 世界勤俭日",
														//-
														"1107 十月社会主义革命纪念日(现俄“和谐和解日”)[1917]",
														"1108 中国记者日[2000]",
														"1109 中国消防宣传日(消防节, 全国消防安全宣传教育日)[1992]",
														"1110 世界青年节(日)[1946]",
														"1111 国际科学与和平周(本日所属的一周)",
														"1114 世界糖尿病日[1991]",
														"1116 国际宽容日",
														"1117 国际大学生节(世界学生节)[1946]",
														"1120 世界儿童日[1986] 非洲工业化日",
														"1121 世界问候日[1973] 世界电视日[1996]",
														"1129 国际声援巴勒斯坦人民国际日[1977]",
														//-
														"1201 世界艾滋病日[1988]",
														"1202 废除一切形式奴役世界日[1986]",
														"1203 世界残疾人日[1992]",
														"1204 中国法制宣传日[2001]",
														"1205 国际经济和社会发展志愿人员日[1985] 世界弱能人士日",
														"1207 国际民航日[纪念1994, 1996定]",
														"1209 “一二·九”运动纪念日[1935] 世界足球日[1995]",
														"1210 世界人权日(诺贝尔日)[1950]",
														"1211 世界防治哮喘日[1998]",
														"1212 西安事变纪念日[1936]",
														"1213 中国国耻日(南京大屠杀纪念日·勿忘国耻,紧记血泪史!)[1937]",
														"1215 世界强化免疫日",
														"1220 澳门回归纪念日[1999]",
														"1221 国际篮球日",
														"1224#平安夜",
														"1225#我的生日 圣诞节",
														"1228 世界小丑节[1987]");

// 全局变量
var dNow = new Date();
var cYear, cMonth, cDay, TheDate;
var eYear, eMonth, eDay, eWeek;

function init() {
	eYear 		= dNow.getFullYear();
    eMonth 	= dNow.getMonth();
    eDay 		= dNow.getDate();
	eWeek		= dNow.getDay();
}

function GetBit(m, n) {
    return (m >> n) & 1;
}

// 修正firefox下year错误
function getFullYear(d) { 
    yr = d.getYear();
    if (yr < 1000) yr += 1900;
    return yr;
}

// 农历年月日的索引值
// 这里的参数不能直接调用eYear等！！！
function toLunarDateIdx(Year, Month, Day) {
    TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    var total, m, n, k;
    var isEnd = false;
    var tmp = TheDate.getFullYear();
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
        total++;
    }
    for (m = 0;; m++) {
        k = (CalendarData[m] < 0xfff) ? 11 : 12;
        for (n = k; n >= 0; n--) {
            if (total <= 29 + GetBit(CalendarData[m], n)) {
                isEnd = true;
                break;
            }
            total = total - 29 - GetBit(CalendarData[m], n);
        }
        if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
        if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth;
        }
        if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--;
        }
    }
}

// 农历年月日的字符串值
function toLumarDateStr() {
    var tmp = "";
    tmp += tianganStr.charAt((cYear - 4) % 10);
    tmp += dizhiStr.charAt((cYear - 4) % 12);
    tmp += "年 ";
    if (cMonth < 1) {
        tmp += "(闰)";
        tmp += monString.charAt(-cMonth - 1);
    } else {
        tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
        tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}

//完整的农历字符串(包括年)
function getLunar() {
	var solarYear 	= eYear;
	var solarMonth 	= eMonth +1;
	var solarDay		= eDay;
	
    if (solarYear < 1921 || solarYear > 2020) {
        return "超出计算范围";
    } 
	else {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
        toLunarDateIdx(solarYear, solarMonth, solarDay);
		
		var svalue3 = toLumarDateStr();
		var sx2 = shengxiaoStr.substr(dizhiStr.indexOf(svalue3.substr(1, 1)), 1);
		var svalue33 = svalue3.substr(0, 3);
		var svalue333 = svalue33.substr(0, 2) + "(" + sx2 + ")" + svalue33.substr(2, 1);
		var sx22 = svalue333 + "农历" + svalue3.substr(4, 6);
	
		return sx22;
    }
}

// 二十四节气
function getJieqi(DateGL) {
	var DifferenceInYear = 31556926;
	var BeginTime = new Date(1901 / 1 / 1);
	BeginTime.setTime(947120460000);
	for (; DateGL.getFullYear() < BeginTime.getFullYear();) {
		BeginTime.setTime(BeginTime.getTime() - DifferenceInYear * 1000);
	}
	for (; DateGL.getFullYear() > BeginTime.getFullYear();) {
		BeginTime.setTime(BeginTime.getTime() + DifferenceInYear * 1000);
	}
	for (var M = 0; DateGL.getMonth() > BeginTime.getMonth(); M++) {
		BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
	}
	if (DateGL.getDate() > BeginTime.getDate()) {
		BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
		M++;
	}
	if (DateGL.getDate() > BeginTime.getDate()) {
		BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
		M == 23 ? M = 0 : M++;
	}
	var JQ = "";
	if (DateGL.getDate() == BeginTime.getDate()) {
		JQ += "今日 " + jieqiStr[M];
	} else if (DateGL.getDate() == BeginTime.getDate() - 1) {
		JQ += "明日 " + jieqiStr[M];
	} else if (DateGL.getDate() == BeginTime.getDate() - 2) {
		JQ += "后日 " + jieqiStr[M];
	} else {
		if (DateGL.getMonth() == BeginTime.getMonth()) {
			JQ += "本月";
		} else {
			JQ += "下月";
		}
		JQ += BeginTime.getDate() + "日 " + jieqiStr[M];
	}
	return JQ;
}

// 阳历日期、星期
function getYangli() {
	return ((eMonth + 1) + "月" + eDay + "日 " + sWeek[eWeek] );
}

// 在节日列表中搜索指定月和日的节日
// 如果没有搜索到该天的节日则返回"-"
function getHoliday(HList,Month, Day) {
	var result = "-";
	
	for(i in HList) {
		var monthIdx = parseFloat(HList[i].substring(0,2));
		
		if(monthIdx < Month) {
			continue;
		}
		else if(monthIdx==Month) {
			if(parseFloat(HList[i].substring(2,4)) == Day) {
				result =  HList[i].substring(4,HList[i].length);
				break;
			}
		}
		else /*monthIdx > Month)*/{
			break;
		}
	}

  return result;
}

function pushAll() {
	// 将值发送到全局变量中
	init();
	myangli = getYangli();
	mlunar = getLunar();
	mjieqi = getJieqi(dNow);
 nm = eMonth;


	mholiday = getHoliday(LunarHolidays,cMonth, cDay); // 农历先
	var myangliHoliday = getHoliday(yangliHolidays,eMonth+1, eDay);
	if("-" != myangliHoliday) {
		mholiday = (mholiday == "-") ? myangliHoliday : (mholiday + "," + myangliHoliday);
	}
	mholiday = (mholiday == "-") ? "今天没有节日" : mholiday;
}

pushAll();

