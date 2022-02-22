
/**
* @1900-2100区间内的公历、农历互转(MOD)
* @charset  UTF-8
* @Author  Orig: Ajing(JJonline@JJonline.Cn)  Mod: firefly(dance.of.firefly@gmail.com)
* @Time  2016-5-10
* @Version  1.0.3
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/
var calendar = {
	
	/**
      * 农历1900-2100的闰大小信息表
      * @Array Of Property
      * @return Hex 
      * 农历数据 以五位16进制数也就是20位2进制数组成
		比如第一个也就是1900年的数据是0x04bd8，相当于 0000 0100 1011 1101 1000 
		从前往后记开始为第0位 第16-19位代表 是否是闰月，如果全为0代表不闰月，否则代表闰月的月份。
		第4-15位代表从1月到12月是大月还是小月，大月30天，小月29天。
		前4位代表的是闰月是大月还是小月 0为小1为大。
      */
	lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
			0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
			0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
			0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
			0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
			0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
			0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
			0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
			0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
			0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
			0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
			0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
			0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
			0x05aa0,0x076a3,0x096d0,0x04bdb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
			0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
			/**Add By JJonline@JJonline.Cn**/
			0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
			0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
			0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
			0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
			0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
			0x0d520],//2100
				
	
	/**
      * 公历每个月份的天数普通表(一三五七八十腊，三十一天永不差)
      * @Array Of Property
      * @return Number 
      */
	solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],
	

	/**
      * 天干地支之天干速查表
      * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
      * @return Cn string 
      */
	Gan:["\u7532","\u4e59","\u4e19","\u4e01","\u620a","\u5df1","\u5e9a","\u8f9b","\u58ec","\u7678"],
	
	
	/**
      * 天干地支之地支速查表
      * @Array Of Property 
      * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
      * @return Cn string 
      */
	Zhi:["\u5b50","\u4e11","\u5bc5","\u536f","\u8fb0","\u5df3","\u5348","\u672a","\u7533","\u9149","\u620c","\u4ea5"],
	
	
	/**
      * 天干地支之地支速查表<=>生肖
      * @Array Of Property 
      * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
      * @return Cn string 
      */
	Animals:["\u9f20","\u725b","\u864e","\u5154","\u9f99","\u86c7","\u9a6c","\u7f8a","\u7334","\u9e21","\u72d7","\u732a"],
	
	
	/**
      * 24节气速查表
      * @Array Of Property 
      * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
      * @return Cn string 
      */
	solarTerm:["\u5c0f\u5bd2","\u5927\u5bd2","\u7acb\u6625","\u96e8\u6c34","\u60ca\u86f0","\u6625\u5206","\u6e05\u660e","\u8c37\u96e8","\u7acb\u590f","\u5c0f\u6ee1","\u8292\u79cd","\u590f\u81f3","\u5c0f\u6691","\u5927\u6691","\u7acb\u79cb","\u5904\u6691","\u767d\u9732","\u79cb\u5206","\u5bd2\u9732","\u971c\u964d","\u7acb\u51ac","\u5c0f\u96ea","\u5927\u96ea","\u51ac\u81f3"],
	
	
	/**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property 
      * @return 0x string For splice
      */
	sTermInfo:[	'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
				'97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',	'97bd0b06bdb0722c965ce1cfcc920f',
				'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
				'97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
				'97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f',	'97bd097bd097c36b0b6fc9210c8dc2',
				'9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
				'97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',	'97bd097bd097c35b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
				'97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',	'97bd097bd07f595b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
				'97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
				'97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
				'9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
				'7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
				'9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
				'97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722',	'7f0e397bd097c36b0b6fc9210c8dc2',
				'9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
				'9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
				'7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
				'977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
				'7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
				'977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',	'977837f0e37f14998082b0787b06bd',
				'7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
				'977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
				'7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
				'7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
				'7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
				'7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
				'7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',	'7f0e27f1487f531b0b0bb0b6fb0722',
				'7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
				'7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
				'7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
				'7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
				'7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35',	'665f67f0e37f14898082b0723b02d5',
				'7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722',	'7f0e36665b66a449801e9808297c35',
				'665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35',	'7ec967f0e37f14998082b0787b06bd',
				'7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35',	'665f67f0e37f1489801eb072297c35',
				'7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',	'7f0e27f1487f531b0b0bb0b6fb0722'],
	
	
	/**
      * 数字转中文速查表
      * @Array Of Property 
      * @trans ['日','一','二','三','四','五','六','七','八','九','十']
      * @return Cn string 
      */
	nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],
	
	
	/**
      * 日期转农历称呼速查表
      * @Array Of Property 
      * @trans ['初','十','廿','卅']
      * @return Cn string 
      */
	nStr2:["\u521d","\u5341","\u5eff","\u5345"],
	

	/**
      * 月份转农历称呼速查表
      * @Array Of Property 
      * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
      * @return Cn string 
      */
	nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"],
	
	
	/**
      * 返回农历y年一整年的总天数
      * @param lunar Year
      * @return Number
      * @eg:var count = calendar.lYearDays(1987) ;//count=387
      */
	lYearDays:function(y) {
		var i, sum = 348;
		for(i=0x8000; i>0x8; i>>=1) { sum += (calendar.lunarInfo[y-1900] & i)? 1: 0; }
		return(sum+calendar.leapDays(y));
	},
	
	
	/**
      * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
      * @param lunar Year
      * @return Number (0-12)
      * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
      */
	leapMonth:function(y) { //闰字编码 \u95f0
		return(calendar.lunarInfo[y-1900] & 0xf);
	},
	
	
	/**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      * @param lunar Year
      * @return Number (0、29、30)
      * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
      */
	leapDays:function(y) {
		if(calendar.leapMonth(y))  { 
			return((calendar.lunarInfo[y-1900] & 0x10000)? 30: 29); 
		}
		return(0);
	},
	
	
	/**
      * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
      * @param lunar Year
      * @return Number (-1、29、30)
      * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
      */
	monthDays:function(y,m) {
		if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
		return( (calendar.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
	},
	
	
	/**
      * 返回公历(!)y年m月的天数
      * @param solar Year
      * @return Number (-1、28、29、30、31)
      * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
      */
	solarDays:function(y,m) {
		if(m>12 || m<1) {return -1} //若参数错误 返回-1
		var ms = m-1;
		if(ms==1) { //2月份的闰平规律测算后确认返回28或29
			return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
		}else {
			return(calendar.solarMonth[ms]);
		}
	},
	
	
	/**
      * 传入offset偏移量返回干支
      * @param offset 相对甲子的偏移量
      * @return Cn string
      */
	toGanZhi:function(offset) {
		return(calendar.Gan[offset%10]+calendar.Zhi[offset%12]);
	},
	
	
	/**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起 
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
	getTerm:function(y,n) {
		if(y<1900 || y>2100) {return -1;}
		if(n<1 || n>24) {return -1;}
		var _table = calendar.sTermInfo[y-1900];
		var _info = [
			parseInt('0x'+_table.substr(0,5)).toString() ,
			parseInt('0x'+_table.substr(5,5)).toString(),
			parseInt('0x'+_table.substr(10,5)).toString(),
			parseInt('0x'+_table.substr(15,5)).toString(),
			parseInt('0x'+_table.substr(20,5)).toString(),
			parseInt('0x'+_table.substr(25,5)).toString()
		];
		var _calday = [
			_info[0].substr(0,1),
			_info[0].substr(1,2),
			_info[0].substr(3,1),
			_info[0].substr(4,2),
			
			_info[1].substr(0,1),
			_info[1].substr(1,2),
			_info[1].substr(3,1),
			_info[1].substr(4,2),
			
			_info[2].substr(0,1),
			_info[2].substr(1,2),
			_info[2].substr(3,1),
			_info[2].substr(4,2),
			
			_info[3].substr(0,1),
			_info[3].substr(1,2),
			_info[3].substr(3,1),
			_info[3].substr(4,2),
			
			_info[4].substr(0,1),
			_info[4].substr(1,2),
			_info[4].substr(3,1),
			_info[4].substr(4,2),
			
			_info[5].substr(0,1),
			_info[5].substr(1,2),
			_info[5].substr(3,1),
			_info[5].substr(4,2),
		];
		return parseInt(_calday[n-1]);
	},
	
	
	/**
      * 传入农历数字月份返回汉语通俗表示法
      * @param lunar month
      * @return Cn string
      * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
      */
	toChinaMonth:function(m) { // 月 => \u6708
		if(m>12 || m<1) {return -1} //若参数错误 返回-1
		var s = calendar.nStr3[m-1];
		s+= "\u6708";//加上月字
		return s;
	},
	
	
	/**
      * 传入农历日期数字返回汉字表示法
      * @param lunar day
      * @return Cn string
      * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
      */
	toChinaDay:function(d){ //日 => \u65e5
		var s;
		switch (d) {
			case 10:
			s = '\u521d\u5341'; break;
		case 20:
			s = '\u4e8c\u5341'; break;
			break;
		case 30:
			s = '\u4e09\u5341'; break;
			break;
		default :
			s = calendar.nStr2[Math.floor(d/10)];
			s += calendar.nStr1[d%10];
		}
		return(s);
	},
	
	
	/**
      * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
      * @param y year
      * @return Cn string
      * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
      */
	getAnimal: function(y) {
		return calendar.Animals[(y - 4) % 12]
	},
	
	/**
      * 获取公历节日
      * @param y year
      * @param m month
      * @param d date
      * @return Cn string
      * @eg:var feast = calendar.getFeast(2016, 1,1) ;//feast='元旦'
      */
	getFeast: function(y, m, d) {
        //---普通阳历节日
		var FeastList = {
			"0101":"元旦","0106":"中国第13亿人口日","0126":"国际海关日","0202":"世界湿地日","0207":"国际声援南非日","0210":"国际气象节","0214":"情人节",
			"0215":"中国12亿人口日","0221":"反对殖民制度斗争日；国际母语日","0224":"第三世界青年日","0228":"世界居住条件调查日","0301":"国际海豹日",
			"0303":"全国爱耳日","0305":"中国青年志愿者服务日；“向雷锋同志学习”纪念日","0306":"世界青光眼日","0308":"国际劳动妇女节","0312":"中国植树节",
			"0314":"国际警察日（节）","0315":"国际消费者权益日","0316":"手拉手情系贫困小伙伴全国统一行动日","0317":"中国国医节","0321":"世界林业节（世界森林日）",
			"0401":"国际愚人节","0402":"国际儿童图书日","0407":"世界卫生日","0421":"全国企业家活动日","0422":"世界地球日；世界法律日","0423":"世界图书和版权日",
			"0424":"世界青年反对殖民主义日；亚非新闻工作者日","0425":"全国儿童预防接种宣传日","0426":"世界知识产权日","0427":"联谊城日",
			"0430":"全国交通安全反思日","0501":"国际劳动节","0503":"世界新闻自由日","0504":"中国青年节 ；五四运动纪念日","0504":"科技传播日","0508":"世界红十字日",
			"0508":"世界微笑日","0512":"国际护士节","0515":"全国碘缺乏病防治日；国际家庭（咨询）日","0517":"世界电信日","0518":"国际博物馆日",
			"0520":"全国母乳喂养宣传日；中国学生营养日","0522":"生物多样性国际日","0526":"世界向人体条件挑战日","0530":"“五卅”反对帝国主义运动纪念日",
			"0531":"世界无烟日","0601":"国际儿童节","0605":"世界环境日","0606":"全国爱眼日","0611":"中国人口日","0617":"世界防止荒漠化和干旱日","0620":"世界难民日",
			"0622":"中国儿童慈善活动日","0623":"国际奥林匹克日；世界手球日","0625":"全国土地日","0626":"国际禁毒日（国际反毒品日）",
			"0626":"禁止药物滥用和非法贩运国际日；国际宪章日（联合国宪章日）","0630":"世界青年联欢节","0701":"中国共产党诞生日；香港回归纪念日",
			"0701":"国际建筑日；亚洲30亿人口日","0702":"国际体育记者日","0707":"中国人民抗日战争纪念日","0711":"世界人口日","0726":"世界语（言）创立日",
			"0731":"非洲妇女日","0801":"中国人民解放军建军节","0806":"国际电影节","0808":"中国男子节（爸爸节）","0813":"国际左撇子日","0815":"日本正式宣布无条件投降日",
			"0826":"全国律师咨询日","0903":"中国抗日战争胜利纪念日","0908":"国际新闻工作者日；世界扫盲日","0910":"中国教师节","0914":"世界清洁地球日",
			"0916":"国际臭氧层保护日","0918":"“九·一八”事变纪念日（中国国耻日）","0920":"全国爱牙日","0921":"国际和平日","0927":"世界旅游日","1001":"国庆节",
			"1001":"国际音乐日；国际老年人日（国际老人节）","1004":"世界动物日","1009":"世界邮政日（万国邮联日）","1010":"辛亥革命纪念日；世界精神卫生日",
			"1011":"声援南非政治犯日","1013":"中国少年先锋队诞辰日","1014":"世界标准日","1015":"国际盲人节（白手杖节）","1016":"世界粮食日","1017":"世界消除贫困日",
			"1022":"世界传统医药日","1024":"联合国日；世界发展信息日","1028":"世界“男性健康日”","1031":"世界勤俭日","1108":"中国记者节",
			"1109":"中国消防宣传日（消防节）","1110":"世界青年节（日）","1114":"世界糖尿病日","1117":"国际大学生节（国际学生日）","1121":"世界电视日",
			"1121":"世界问候日","1201":"世界艾滋病日","1202":"废除一切形式奴役世界日","1203":"世界残疾人日","1204":"中国法制宣传日",
			"1205":"促进经济和社会发展自愿人员国际日；世界弱能人士日","1207":"国际民航日","1209":"“一二·九”运动纪念日；国际反腐败日","1209":"世界足球日",
			"1210":"世界人权日","1211":"世界防治哮喘日","1212":"西安事变纪念日","1213":"南京大屠杀纪念日","1215":"世界强化免疫日","1220":"澳门回归纪念日",
			"1221":"国际篮球日","1224":"平安夜","1225":"圣诞节","1226":"节礼节","1229":"生物多样性国际日"
		};
		m = m.toString();d = d.toString();
		if(/^\d$/.test(m)) m="0"+m; if(/^\d$/.test(d)) d=String("0"+d);
		var feast = FeastList[m+d];
        
        //---阳历月周节日：某月的第几个星期几
        var wFtv = new Array(
        	"0150 世界麻风日", //一月的最后一个星期日（月倒数第一个星期日）
        	"0520 国际母亲节",
        	"0530 全国助残日",
        	"0630 父亲节",
        	"0716 合作节",
        	"0730 被奴役国家周",
        	"0932 国际和平日",
        	"0940 国际聋人节 世界儿童日",
        	"0950 世界海事日",
        	"1011 国际住房日",
        	"1013 国际减轻自然灾害日(减灾日)",
        	"1144 感恩节");
        var tmp1,tmp2,tmp3;
	    var length = calendar.solarDays(y,m);       //公历当月天数
        var objDate1 = new Date(y,parseInt(m)-1,1);
	    var firstWeek = objDate1.getDay(); //公历当月1日星期几
        var objDate2 = new Date(y,parseInt(m)-1,d);
	    for(i in wFtv){
	        if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
	            if(Number(RegExp.$1)==(m)) {//月份
	            	tmp1=Number(RegExp.$2);//第几个
	            	tmp2=Number(RegExp.$3);//星期
	            	if(tmp1<5) { 
	            		if( (((firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - firstWeek+1)==objDate2.getDate() ) 
                        {
                            if(feast!=null)
                                feast += ' ' + RegExp.$5;
                            else
                                feast = RegExp.$5;
                            break;
                        }
                    }
	            	else {
	            		tmp1 -= 5;
	            		tmp3 = (firstWeek+length-1)%7; //当月最后一天星期?
	            		if( (length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) )==objDate2.getDate() )
                        {
                            if(feast!=null)
                                feast += ' ' + RegExp.$5;
                            else
                                feast = RegExp.$5;
                            break;
                        }
	            	}
	            }
        }
        
        //---黑色星期五(13号的星期五)
	    if(((firstWeek+12)%7==5) && (parseInt(d)==13)){
            if(feast!=null)
                feast += ' 黑色星期五';
            else
                feast = '黑色星期五';
        }
        
		if(feast == null) feast = '';
		return feast;
	},
	
	/**
      * 获取农历节日
      * @param m month
      * @param d date
      * @return Cn string
      * @eg:var feast = calendar.getlFeast(1,1) ;//lfeast='春节'
      */
	getlFeast: function(m, d) {
        //农历节日 *表示放假日
		var lFeastList = {
	        "0101":"*春节",
	        "0102":"*初二",
	        "0103":"*初三",
	        "0105":"路神生日",
            "0108":"寒食节",
	        "0115":"元宵节",
	        "0125":"填仓节",
	        "0126":"生菜会",
	        "0202":"龙头节",
	        "0206":"东华帝君诞", 
	        "0215":"涅槃节",
	        "0219":"观世音圣诞",
            "0303":"歌墟节(壮族)",
	        "0323":"妈祖诞、天后诞",
	        "0404":"文殊菩萨诞",
	        "0408":"佛诞节(香港) 牛王诞",
	        "0505":"*端午节",
	        "0508":"龙母诞", 
	        "0520":"分龙节",
	        "0606":"天贶节 姑姑节",
	        "0616":"鲁班节",
	        "0630":"围香节",
	        "0624":"彝族火把节 关帝节",
	        "0707":"七夕情人节",
	        "0714":"鬼节(南方)",
	        "0715":"中元节 盂兰节",
	        "0730":"地藏节",
	        "0802":"灶君诞",
	        "0815":"*中秋节",
	        "0827":"先师诞",
	        "0909":"重阳节 中国老年节(义务助老活动日)[1989]",
	        "1001":"祭祖节(十月朝) 送寒衣节 祀靴节",
            "1015":"下元节 文成公主诞",
	        "1025":"感天上帝诞",
	        "1117":"阿弥陀佛圣诞",
	        "1208":"腊八节 释迦如来成道日",
	        "1220":"鲁班公诞",
	        "1223":"北方小年(扫房日)",
	        "1224":"南方小年(掸尘日)",
	        "0100":"*除夕"
		};
		m = m.toString();d = d.toString();
		if(/^\d$/.test(m)) m="0"+m; if(/^\d$/.test(d)) d=String("0"+d);
		var lfeast = lFeastList[m+d];
		if(lfeast == null) lfeast = '';
		return lfeast;
	},

	/**
      * 获取朝代纪年
      * @param y year
      * @return yCn string
      * @eg:var yCn = calendar.getYearCn(2016) ;//yCn='建国67年'
      */
	getYearCn: function(y) {
	    if(y>1874 && y<1909) yCn = '光绪' + (((y-1874)==1)?'元':y-1874);
	    if(y>1908 && y<1912) yCn = '宣统' + (((y-1908)==1)?'元':y-1908);
	    if(y>1911 && y<1950) yCn = '民国' + (((y-1911)==1)?'元':y-1911);
	    if(y>1949) yCn = '建国' + (((y-1949)==1)?'元':y-1949);
	    return yCn+'年';
	},
    
	/**
      * 获取一年中的第几周
      * @param y year
      * @return yCn string
      * @eg:var yWeek = calendar.getYearWeek(2016,4,13);//yWeek=16
      */
    getYearWeek: function (a, b, c) {  
    	var date1 = new Date(a, b - 1, c), 
    		date2 = new Date(a, 0, 1), 
    		d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000) ;
        	return Math.ceil((d + date2.getDay()+1) / 7);
    },
    
	/**
      * 传入公历年月日获得详细的公历、农历object信息 <=>JSON
      * @param y  solar year
      * @param m solar month
      * @param d  solar day
      * @return JSON object
      * @eg:console.log(calendar.solar2lunar(1987,11,01));
      */
	solar2lunar:function (y,m,d) { //参数区间1900.1.31~2100.12.31
		if(y<1900 || y>2100) {return -1;}//年份限定、上限
		if(y==1900&&m==1&&d<31) {return -1;}//下限
		if(!y) { //未传参  获得当天
			var objDate = new Date();
		}else {
			var objDate = new Date(y,parseInt(m)-1,d)
		}
		var i, leap=0, temp=0;
		//修正ymd参数
		var y = objDate.getFullYear(),m = objDate.getMonth()+1,d = objDate.getDate();
		var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
		for(i=1900; i<2101 && offset>0; i++) { temp=calendar.lYearDays(i); offset-=temp; }
		if(offset<0) { offset+=temp; i--; }
		
		//是否今天
		var isTodayObj = new Date(),isToday=false;
		if(isTodayObj.getFullYear()==y && isTodayObj.getMonth()+1==m && isTodayObj.getDate()==d) {
			isToday = true;
		}
		//星期几
		var nWeek = objDate.getDay(),cWeek = calendar.nStr1[nWeek];
		if(nWeek==0) {nWeek =7;}//数字表示周几顺应天朝周一开始的惯例
		//农历年
		var year = i;
		
		var leap = calendar.leapMonth(i); //闰哪个月
		var isLeap = false;
		
		//效验闰月
		for(i=1; i<13 && offset>0; i++) {
			//闰月
			if(leap>0 && i==(leap+1) && isLeap==false){ 
				--i;
				isLeap = true; temp = calendar.leapDays(year); //计算农历闰月天数
			}
			else{
				temp = calendar.monthDays(year, i);//计算农历普通月天数
			}
			//解除闰月
			if(isLeap==true && i==(leap+1)) { isLeap = false; }
			offset -= temp;
		}
		
		if(offset==0 && leap>0 && i==leap+1)
		if(isLeap){
			isLeap = false;
		}else{ 
			isLeap = true; --i;
		}
		if(offset<0){ offset += temp; --i; }
		//农历月
		var month 	= i;
		//农历日
		var day 		= offset + 1;
		
		//天干地支处理
		var sm 		= 	m-1;
		var term3	=	calendar.getTerm(year,3); //该农历年立春日期
		var gzY 		= 	calendar.toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正
		
		//依据立春日进行修正gzY
		if(sm<2 && d<term3) {
			gzY = calendar.toGanZhi(year-5);
		}else {
			gzY = calendar.toGanZhi(year-4);
		}
		
		//月柱 1900年1月小寒以前为 丙子月(60进制12)
		var firstNode 	= calendar.getTerm(y,(m*2-1));//返回当月「节」为几日开始
		var secondNode = calendar.getTerm(y,(m*2));//返回当月「节」为几日开始
		
		//依据12节气修正干支月
		var gzM 	= 	calendar.toGanZhi((y-1900)*12+m+11);
		if(d>=firstNode) {
			gzM 	= 	calendar.toGanZhi((y-1900)*12+m+12);
		}
		
		//传入的日期的节气与否
		var isTerm = false;
		var Term = null;
		if(firstNode==d) {
			isTerm 	= true;
			Term 	= calendar.solarTerm[m*2-2];
		}
		if(secondNode==d) {
			isTerm 	= true;
			Term 	= calendar.solarTerm[m*2-1];
		}
        if(Term==null) Term = '';
        
		//日柱 当月一日与 1900/1/1 相差天数
		var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
		var gzD = calendar.toGanZhi(dayCyclical+d-1);
		
		//获取公历节日
		var f = calendar.getFeast(y,m,d);
        
        //获取农历节日
		var lf = calendar.getlFeast(month,day);
        
	return {
    'isToday':isToday,//是否今天(True / False)
    'lYear':year,//农历年
    'lMonth':month,//农历月(数字)
    'lMonthCn':(isLeap?"\u95f0":'')+calendar.toChinaMonth(month),//农历月(中文)
    'lDay':day,//农历日(数字)
    'lDayCn':calendar.toChinaDay(day),//农历日(中文)
    'Animal':calendar.getAnimal(year),//生肖
    'sYear':y,//公历年
    'sMonth':m,//公历月
    'sDay':d,//公历日
    'YearCn':calendar.getYearCn(year),//朝代纪年
    'gzYear':gzY,//干支纪年
    'gzMonth':gzM,//干支纪月
    'gzDay':gzD,//干支纪日
    'nWeek':nWeek,//星期(数字)
    'nWeekCn':"\u661f\u671f"+cWeek,//星期(中文)
    'yWeek':calendar.getYearWeek(y,m,d),//一年中的第几周(数字)
    'sFeast':f,//公历节日
    'lFeast':lf,//农历节日
    'sTerm':Term//二十四节气
    };
	},	

		
	/**
      * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
      * @param y  lunar year
      * @param m lunar month
      * @param d  lunar day
      * @param isLeapMonth  lunar month is leap or not.
      * @return JSON object
      * @eg:console.log(calendar.lunar2solar(1987,9,10));
      */
	lunar2solar:function(y,m,d,isLeapMonth) {	//参数区间1900.1.31~2100.12.1
		var leapOffset = 0;
		var leapMonth = calendar.leapMonth(y);
		var leapDay  	  = calendar.leapDays(y);
		if(isLeapMonth&&(leapMonth!=m)) {return -1;}//传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
		if(y==2100&&m==12&&d>1 || y==1900&&m==1&&d<31) {return -1;}//超出了最大极限值
		var day = calendar.monthDays(y,m);
		if(y<1900 || y>2100 || d>day) {return -1;}//参数合法性效验
		
		//计算农历的时间差
		var offset = 0;
		for(var i=1900;i<y;i++) {
			offset+=calendar.lYearDays(i);
		}
		var leap = 0,isAdd= false;
		for(var i=1;i<m;i++) {
			leap = calendar.leapMonth(y);
			if(!isAdd) {//处理闰月
				if(leap<=i && leap>0) { 
					offset+=calendar.leapDays(y);isAdd = true;
				}
			}
			offset+=calendar.monthDays(y,i);
		}
		//转换闰月农历 需补充该年闰月的前一个月的时差
		if(isLeapMonth) {offset+=day;}
		//1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
		var stmap 	= 	Date.UTC(1900,1,30,0,0,0);
		var calObj 	= 	new Date((offset+d-31)*86400000+stmap);
		var cY 		= 	calObj.getUTCFullYear();
		var cM 		=	calObj.getUTCMonth()+1;
		var cD 		=	calObj.getUTCDate();
		
		return calendar.solar2lunar(cY,cM,cD);
	}	
};

/*********************************
* Tasker 测试
**********************************/
lcal = calendar.solar2lunar();

//Display = "遍历测试：\n";
//for (lc in lcal)
//{
//    Display += lc+":"+lcal[lc]+",\n";
//}
//flashLong(Display);
//setClip(Display);

setGlobal('Cal_lDate',lcal.lMonthCn + lcal.lDayCn);
setGlobal('Cal_sDate',lcal.sMonth + '月'+ lcal.sDay + '日');
setGlobal('Cal_gzDate',lcal.gzYear + '年' + lcal.gzMonth + '月'+ lcal.gzDay +'日');
setGlobal('Cal_nWeek',lcal.nWeekCn);
setGlobal('Cal_yWeek','第' + lcal.yWeek + '周');
setGlobal('Cal_Animal',lcal.Animal);
setGlobal('Cal_lFeast',lcal.lFeast);
setGlobal('Cal_sFeast',lcal.sFeast);
setGlobal('Cal_sTerm',lcal.sTerm);