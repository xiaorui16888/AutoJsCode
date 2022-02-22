/*
   用法：（注：对于经度、纬度、时区，以西和北为正，东和南为负）
   var riseSetForm = {
	year : 2015, //年
	month : 11, //月
	day : 16, //日
	latitude : 23.1, //纬度
	longitude : -112.2, //经度
	zone : -8 //时区
   };
   var result = calcSun(riseSetForm,"No",0);
   alert("这是result的内容（JSON格式）："+JSON.stringify(result).replace(/,|\{|\}/g,"\n"));
   alert("这是sunset的内容："+result.sunset);
   //设置Tasker变量%Hello为sunset的值
   setGlobal("Hello",result.sunset);

*/

//***********************************************************************/
//*	DATA STRUCTURES									*/
//***********************************************************************/

	function month(name, numdays, abbr) 
	{
		this.name = name;
		this.numdays = numdays;
		this.abbr = abbr;
	}

//*********************************************************************/

	function ans(daySave,value)
	{
		this.daySave = daySave;
		this.value = value;
	}

//*********************************************************************/

	function city(name, lat, lng, zoneHr) 
	{
		this.name = name;
		this.lat = lat;
		this.lng = lng;
		this.zoneHr = zoneHr;
	}


//***********************************************************************/
//*	Data for Selectbox Controls							*/
//***********************************************************************/

	var monthList = new Array();	//	list of months and days for non-leap year
	var i = 0;
	monthList[i++] = new month("一月", 31, "Jan");
	monthList[i++] = new month("二月", 28, "Feb");
	monthList[i++] = new month("三月", 31, "Mar");
	monthList[i++] = new month("四月", 30, "Apr");
	monthList[i++] = new month("五月", 31, "May");
	monthList[i++] = new month("六月", 30, "Jun");
	monthList[i++] = new month("七月", 31, "Jul");
	monthList[i++] = new month("八月", 31, "Aug");
	monthList[i++] = new month("九月", 30, "Sep");
	monthList[i++] = new month("十月", 31, "Oct");
	monthList[i++] = new month("十一月", 30, "Nov");
	monthList[i++] = new month("十二月", 31, "Dec");

//*********************************************************************/

	/*var YesNo = new Array();	//Daylight Saving array	
	i=0;
	YesNo[i++] = new ans("No",0);
	YesNo[i++] = new ans("Yes",60);*/
	var YesNo = {
		"No" : 0,
		"Yes" : 60
	};

//*********************************************************************/

	var City = new Array();

	j = 0;
	City[j++] = new city("",0,0,0);
	City[j++] = new city("中国城市",0,0,0);
	City[j++] = new city("北京", 39.9,-115.4,-8);
	City[j++] = new city("天津", 39.1,-116.2,-8);
	City[j++] = new city("上海", 31.2, -120.4,-8);
	City[j++] = new city("石家庄",38.0,-113.4,-8);
	City[j++] = new city("太原", 37.8,-111.5,-8);
	City[j++] = new city("呼和浩特",40.8,-110.7,-8);
	City[j++] = new city("大连", 38.9,-120.6,-8);
	City[j++] = new city("沈阳",41.8,-122.4,-8);
	City[j++] = new city("长春",43.9,-124.3,-8);
	City[j++] = new city("吉林", 43.8,-125.5,-8);
	City[j++] = new city("哈尔滨",45.7,-125.6,-8);
	City[j++] = new city("济南",36.6,-117.0,-8);
	City[j++] = new city("青岛",36.0,-119.3,-8);
	City[j++] = new city("烟台",37.5,-120.4,-8);
	City[j++] = new city("西安",34.2,-107.9,-8);
	City[j++] = new city("兰州",36.0,-102.7,-8);
	City[j++] = new city("西宁",36.6,-100.8,-8);
	City[j++] = new city("南京",32.0,-117.7,-8);
	City[j++] = new city("无锡",31.5,-119.3,-8);
	City[j++] = new city("苏州",31.3,-119.6,-8);
	City[j++] = new city("徐州",34.2,-116.1,-8);
	City[j++] = new city("合肥",31.8,-116.6,-8);
	City[j++] = new city("杭州",30.2,-119.1,-8);
	City[j++] = new city("宁波",29.8,-120.5,-8);
	City[j++] = new city("南昌",28.6,-114.9,-8);
	City[j++] = new city("九江",29.7,-114.9,-8);
	City[j++] = new city("武汉",30.5,-113.2,-8);
	City[j++] = new city("长沙",28.2,111.9,-8);
	City[j++] = new city("湘潭",27.8,-111.9,-8);
	City[j++] = new city("乌鲁木齐",43.8,-86.6,-8);
	City[j++] = new city("哈密",42.8,-92.4,-8);
	City[j++] = new city("桂林",25.2,-109.2,-8);
	City[j++] = new city("柳州",24.3,-108.4,-8);
	City[j++] = new city("南宁",22.8,-107.3,-8);
	City[j++] = new city("广州",23.1,-112.2,-8);
	City[j++] = new city("汕头",23.3,-115.6,-8);
	City[j++] = new city("海口",20.0,-109.3,-8);
	City[j++] = new city("成都",30.6,-103.1,-8);
	City[j++] = new city("重庆",29.5,-105.5,-8);
	City[j++] = new city("贵阳",26.6,-105.7,-8);
	City[j++] = new city("昆明",25.0,-101.7,-8);
	City[j++] = new city("拉萨",29.6,-90.1,-8);
	City[j++] = new city("郑州",34.7,-112.6,-8);
	City[j++] = new city("洛阳",34.6,-111.4,-8);
	City[j++] = new city("福州",26.6,-118.3,-8);
	City[j++] = new city("厦门",24.4,-117.1,-8);
	City[j++] = new city("台北",25.0,-120.5,-8);	
	City[j++] = new city("高雄",22.0,-101.3,-8);
	City[j++] = new city("香港",22.25,-114.1667,-8);
	City[j++] = new city("",0,0,0);
	City[j++] = new city("世界城市",0,0,0);
	City[j++] = new city("纽约,美国",40.7167,74.0167,5);
	City[j++] = new city("柏林,德国",52.33, -13.30, -1);
	City[j++] = new city("孟买,印度", 18.9333, -72.8333, -5.5);
	City[j++] = new city("布宜诺斯艾利斯, 阿根廷", -34.60,58.45,3);
	City[j++] = new city("开罗,埃及", 30.10,-31.3667,-2);
	City[j++] = new city("开普敦,南非",-33.9167,-18.3667,-2);
	City[j++] = new city("加拉加斯,委内瑞拉", 10.50,66.9333,4);
	City[j++] = new city("赫尔辛基,芬兰", 60.1667, -24.9667,-2);
	City[j++] = new city("洛杉机,美国",34.05,118.233,8);
	City[j++] = new city("耶路撒冷,巴基斯坦", 31.7833, -35.2333, -2);
	City[j++] = new city("伦敦,英国", 51.50, 0.1667,0);
	City[j++] = new city("墨西哥城,墨西哥", 19.4,99.15,6);
	City[j++] = new city("莫斯科,俄罗斯", 55.75, -37.5833, -3);
	City[j++] = new city("新德里,印度",28.6, -77.2, -5.5);
	City[j++] = new city("渥太华,加拿大", 45.41667,75.7,5);
	City[j++] = new city("巴黎,法国", 48.8667, -2.667, -1);
	City[j++] = new city("圣保罗,巴西",-22.90,43.2333,3);
	City[j++] = new city("利雅得,沙特阿拉伯", 24.633, -46.71667, -3);
	City[j++] = new city("罗马,意大利",41.90, -12.4833,-1);
	City[j++] = new city("悉尼,澳大利亚",-33.8667,-151.2167,-10);
	City[j++] = new city("东京,日本", 35.70, -139.7667, -9); 
	City[j++] = new city("苏黎世,瑞士", 47.3833, -8.5333,-1);
	

//*********************************************************************/




//*********************************************************************/


	function setLatLong(f, index)
	{
		// Decimal degrees are passed in the array.  Temporarily store these 
		// degs in lat and lon deg and have convLatLong modify them.

		f["latDeg"].value = City[index].lat;
		f["lonDeg"].value = City[index].lng;
	
		// These are needed to prevent iterative adding of min and sec when 
		// set button is clicked.

		f["latMin"].value = 0;
		f["latSec"].value = 0;
		f["lonMin"].value = 0;
		f["lonSec"].value = 0;
		
		//call convLatLong to convert decimal degrees into table form.

		convLatLong(f);

		//Local time zone value set in table

		f["hrsToGMT"].value =  City[index].zoneHr;
	}


//*********************************************************************/

// isLeapYear returns 1 if the 4-digit yr is a leap year, 0 if it is not

	function isLeapYear(yr) 
	{
		return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
	}


//*********************************************************************/

// isPosInteger returns false if the value is not a positive integer, true is
// returned otherwise.  The code is from taken from Danny Goodman's Javascript
// Handbook, p. 372.

	function isPosInteger(inputVal) 
	{
		inputStr = ("" + inputVal);
		for (var i = 0; i < inputStr.length; i++) {
			var oneChar = inputStr.charAt(i);
			if (oneChar < "0" || oneChar > "9")
				return false;
		}
		return true;
	}

//*********************************************************************/

	function isInteger(inputVal) 
	{
		inputStr = "" + inputVal;
		if(inputStr == "NaN") return false;
		if(inputStr == "-NaN") return false;
		for (var i = 0; i < inputStr.length; i++) 
		{
			var oneChar = inputStr.charAt(i);
			if (i == 0 && (oneChar == "-" || oneChar == "+"))
			{
				continue;
			}
			if (oneChar < "0" || oneChar > "9")
			{
				return false;
			}
		}
		return true;
	}


//*********************************************************************/

	function isNumber(inputVal) 
	{
		var oneDecimal = false;
		var inputStr = "" + inputVal;
		for (var i = 0; i < inputStr.length; i++) 
		{
			var oneChar = inputStr.charAt(i);
			if (i == 0 && (oneChar == "-" || oneChar == "+"))
			{
				continue;
			}
			if (oneChar == "." && !oneDecimal) 
			{
				oneDecimal = true;
				continue;
			}
			if (oneChar < "0" || oneChar > "9")
			{
				return false;
			}
		}
		return true;
	}


//*********************************************************************/

// isValidInput makes sure valid input is entered before going ahead to 
// calculate the sunrise and sunset.  False is returned if an invalid entry 
// was made, true is the entry is valid.

	function isValidInput(f, index, latLongForm) 
	{
		if (f["day"].value == "") 
		{	//	see if the day field is empty
			alert("You must enter a day before attempting the calculation.");
			return false;
		}
		else if (f["year"].value == "") 
		{	//	 see if the year field is empty
			alert("You must enter a year before attempting the calculation.");
			return false;
		}
		else if (!isPosInteger(f["day"].value) || f["day"].value == 0)
		{
			alert("The day must be a positive integer.");
			return false;
		}
		else if (!isInteger(f["year"].value)) 
		{
			alert("The year must be an integer.");
			return false;
		}
		else if ( (f["year"].value < -1000) || (f["year"].value > 3000) )
		{
			alert("The algorithm used is not valid for years outside of/nthe range -1000 to 3000.");
			return false;
		}


		//	For the non-February months see if the day entered is greater than
		//	the number of days in the selected month

		else if ((index != 1) && (f["day"].value > monthList[index].numdays)) 
		{
			alert("There are only " + monthList[index].numdays + " days in " 
				+ monthList[index].name + ".");
			return false;
		}

		//	First see if the year entered is a leap year.  If so we have to make sure
		//	the days entered is <= 29.  If not a leap year we make sure that the days
		//	entered is <= 28.

		else if (index == 1) 
		{	//	 month selected is February the screwball month
			if (isLeapYear(f["year"].value)) {	//	year entered is a leap year
				if (f["day"].value > (monthList[index].numdays + 1)) 
				{
					alert("There are only " + (monthList[index].numdays + 1) 
						+ " days in " + monthList[index].name + ".");
					return false;
				}
				else
					return true;
			}
			else 
			{	//	year entered is not a leap year
				if (f["day"].value > monthList[index].numdays) 
				{
					alert("There are only " + monthList[index].numdays 
						+ " days in " + monthList[index].name + ".");
					return false;
				}
				else
					return true;
			}
		}
		else 
			return true;	
	}

//*********************************************************************/

//convLatLong converts any type of lat/long input
//into  the table form and then handles bad input
//it is nested in the calcSun function.

	function convLatLong(f)
	{
		var neg = 0;
		if(f["latDeg"].value[0] == '-') 
		{
			neg = 1;
		}

		if(neg != 1)
		{
			var latSeconds = (parseFloat(f["latDeg"].value))*3600 
				+ parseFloat(f["latMin"].value)*60 
				+ parseFloat(f["latSec"].value)*1;

			f["latDeg"].value = Math.floor(latSeconds/3600);
			f["latMin"].value = Math.floor((latSeconds
				- (parseFloat(f["latDeg"].value)*3600))/60);
			f["latSec"].value = Math.floor((latSeconds
				- (parseFloat(f["latDeg"].value)*3600) 
				- (parseFloat(f["latMin"].value)*60)) + 0.5);
		}
		else if(parseFloat(f["latDeg"].value) > -1)
		{
			var latSeconds = parseFloat(f["latDeg"].value)*3600 
				- parseFloat(f["latMin"].value)*60 
				- parseFloat(f["latSec"].value)*1;

			f["latDeg"].value = "-0";
			f["latMin"].value = Math.floor((-latSeconds)/60);
			f["latSec"].value = Math.floor( (-latSeconds 
				- (parseFloat(f["latMin"].value)*60)) + 0.5);

		}
		else
		{
			var latSeconds = parseFloat(f["latDeg"].value)*3600 
				- parseFloat(f["latMin"].value)*60 
				- parseFloat(f["latSec"].value)*1;

			f["latDeg"].value = Math.ceil(latSeconds/3600);
			f["latMin"].value = Math.floor((-latSeconds
				+ (parseFloat(f["latDeg"].value)*3600))/60);
			f["latSec"].value = Math.floor((-latSeconds
				+ (parseFloat(f["latDeg"].value)*3600) 
				- (parseFloat(f["latMin"].value)*60)) + 0.5);
		}

		neg = 0;
		if(f["lonDeg"].value[0] == '-') 
		{
			neg = 1;
		}

		if(neg != 1)
		{
			var lonSeconds = parseFloat(f["lonDeg"].value)*3600 
				+ parseFloat(f["lonMin"].value)*60 
				+ parseFloat(f["lonSec"].value)*1;
			f["lonDeg"].value = Math.floor(lonSeconds/3600);
			f["lonMin"].value = Math.floor((lonSeconds
				- (parseFloat(f["lonDeg"].value)*3600))/60);
			f["lonSec"].value = Math.floor((lonSeconds
				- (parseFloat(f["lonDeg"].value)*3600)
				- (parseFloat(f["lonMin"].value))*60) + 0.5);
		}
		else if(parseFloat(f["lonDeg"].value) > -1)
		{
			var lonSeconds = parseFloat(f["lonDeg"].value)*3600 
				- parseFloat(f["lonMin"].value)*60 
				- parseFloat(f["lonSec"].value)*1;

			f["lonDeg"].value = "-0";
			f["lonMin"].value = Math.floor((-lonSeconds)/60);
			f["lonSec"].value = Math.floor((-lonSeconds
				- (parseFloat(f["lonMin"].value)*60)) + 0.5);
		}
		else
		{
			var lonSeconds = parseFloat(f["lonDeg"].value)*3600 
				- parseFloat(f["lonMin"].value)*60 
				- parseFloat(f["lonSec"].value)*1;
			f["lonDeg"].value = Math.ceil(lonSeconds/3600);
			f["lonMin"].value = Math.floor((-lonSeconds
				+ (parseFloat(f["lonDeg"].value)*3600))/60);
			f["lonSec"].value = Math.floor((-lonSeconds
				+ (parseFloat(f["lonDeg"].value)*3600)
				- (parseFloat(f["lonMin"].value)*60)) + 0.5);
		}

		//Test for invalid lat/long input

		if(latSeconds > 324000)
		{
			alert("You have entered an invalid latitude.\n  Setting lat= 89.8.");
			f["latDeg"].value = 89.8;
			f["latMin"].value = 0;
			f["latSec"].value = 0;
		}
		if(latSeconds < -324000)
		{
			alert("You have entered an invalid latitude.\n  Setting lat= -89.8.");
			f["latDeg"].value = -89.8;
			f["latMin"].value = 0;
			f["latSec"].value = 0;
		}
		if(lonSeconds > 648000)
		{
			alert("You have entered an invalid longitude.\n Setting lon= 180.");
			f["lonDeg"].value = 180;
			f["lonMin"].value = 0;
			f["lonSec"].value = 0;
		}
		if(lonSeconds < -648000)
		{
			alert("You have entered an invalid longitude.\n Setting lon= -180.");
			f["lonDeg"].value = -180;
			f["lonMin"].value = 0;
			f["lonSec"].value =0;
		}

	}



//***********************************************************************/
//***********************************************************************/
//*												*/
//*This section contains subroutines used in calculating solar position */
//*												*/
//***********************************************************************/
//***********************************************************************/

// Convert radian angle to degrees

	function radToDeg(angleRad) 
	{
		return (180.0 * angleRad / Math.PI);
	}

//*********************************************************************/

// Convert degree angle to radians

	function degToRad(angleDeg) 
	{
		return (Math.PI * angleDeg / 180.0);
	}

//*********************************************************************/


//***********************************************************************/
//* Name:    calcDayOfYear								*/
//* Type:    Function									*/
//* Purpose: Finds numerical day-of-year from mn, day and lp year info  */
//* Arguments:										*/
//*   month: January = 1								*/
//*   day  : 1 - 31									*/
//*   lpyr : 1 if leap year, 0 if not						*/
//* Return value:										*/
//*   The numerical day of year							*/
//***********************************************************************/

	function calcDayOfYear(mn, dy, lpyr) 
	{
		var k = (lpyr ? 1 : 2);
		var doy = Math.floor((275 * mn)/9) - k * Math.floor((mn + 9)/12) + dy -30;
		return doy;
	}


//***********************************************************************/
//* Name:    calcDayOfWeek								*/
//* Type:    Function									*/
//* Purpose: Derives weekday from Julian Day					*/
//* Arguments:										*/
//*   juld : Julian Day									*/
//* Return value:										*/
//*   String containing name of weekday						*/
//***********************************************************************/

	function calcDayOfWeek(juld)
	{
		var A = (juld + 1.5) % 7;
		var DOW = (A==0)?"Sunday":(A==1)?"Monday":(A==2)?"Tuesday":(A==3)?"Wednesday":(A==4)?"Thursday":(A==5)?"Friday":"Saturday";
		return DOW;
	}


//***********************************************************************/
//* Name:    calcJD									*/
//* Type:    Function									*/
//* Purpose: Julian day from calendar day						*/
//* Arguments:										*/
//*   year : 4 digit year								*/
//*   month: January = 1								*/
//*   day  : 1 - 31									*/
//* Return value:										*/
//*   The Julian day corresponding to the date					*/
//* Note:											*/
//*   Number is returned for start of day.  Fractional days should be	*/
//*   added later.									*/
//***********************************************************************/

	function calcJD(year, month, day)
	{
		if (month <= 2) {
			year -= 1;
			month += 12;
		}
		var A = Math.floor(year/100);
		var B = 2 - A + Math.floor(A/4);

		var JD = Math.floor(365.25*(year + 4716)) + Math.floor(30.6001*(month+1)) + day + B - 1524.5;
		return JD;
	}



//***********************************************************************/
//* Name:    calcDateFromJD								*/
//* Type:    Function									*/
//* Purpose: Calendar date from Julian Day					*/
//* Arguments:										*/
//*   jd   : Julian Day									*/
//* Return value:										*/
//*   String date in the form DD-MONTHNAME-YYYY					*/
//* Note:											*/
//***********************************************************************/

	function calcDateFromJD(jd)
	{
		var z = Math.floor(jd + 0.5);
		var f = (jd + 0.5) - z;

		if (z < 2299161) {
			var A = z;
		} else {
			alpha = Math.floor((z - 1867216.25)/36524.25);
			var A = z + 1 + alpha - Math.floor(alpha/4);
		}

		var B = A + 1524;
		var C = Math.floor((B - 122.1)/365.25);
		var D = Math.floor(365.25 * C);
		var E = Math.floor((B - D)/30.6001);

		var day = B - D - Math.floor(30.6001 * E) + f;
		var month = (E < 14) ? E - 1 : E - 13;
		var year = (month > 2) ? C - 4716 : C - 4715;

		// alert ("date: " + day + "-" + monthList[month-1].name + "-" + year);
		return (day + "-" + monthList[month-1].name + "-" + year);
	}


//***********************************************************************/
//* Name:    calcDayFromJD								*/
//* Type:    Function									*/
//* Purpose: Calendar day (minus year) from Julian Day			*/
//* Arguments:										*/
//*   jd   : Julian Day									*/
//* Return value:										*/
//*   String date in the form DD-MONTH						*/
//***********************************************************************/

	function calcDayFromJD(jd)
	{
		var z = Math.floor(jd + 0.5);
		var f = (jd + 0.5) - z;

		if (z < 2299161) {
			var A = z;
		} else {
			alpha = Math.floor((z - 1867216.25)/36524.25);
			var A = z + 1 + alpha - Math.floor(alpha/4);
		}

		var B = A + 1524;
		var C = Math.floor((B - 122.1)/365.25);
		var D = Math.floor(365.25 * C);
		var E = Math.floor((B - D)/30.6001);

		var day = B - D - Math.floor(30.6001 * E) + f;
		var month = (E < 14) ? E - 1 : E - 13;
		var year = (month > 2) ? C - 4716 : C - 4715;

		return ((day<10 ? "0" : "") + day + monthList[month-1].abbr);
	}


//***********************************************************************/
//* Name:    calcTimeJulianCent							*/
//* Type:    Function									*/
//* Purpose: convert Julian Day to centuries since J2000.0.			*/
//* Arguments:										*/
//*   jd : the Julian Day to convert						*/
//* Return value:										*/
//*   the T value corresponding to the Julian Day				*/
//***********************************************************************/

	function calcTimeJulianCent(jd)
	{
		var T = (jd - 2451545.0)/36525.0;
		return T;
	}


//***********************************************************************/
//* Name:    calcJDFromJulianCent							*/
//* Type:    Function									*/
//* Purpose: convert centuries since J2000.0 to Julian Day.			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the Julian Day corresponding to the t value				*/
//***********************************************************************/

	function calcJDFromJulianCent(t)
	{
		var JD = t * 36525.0 + 2451545.0;
		return JD;
	}


//***********************************************************************/
//* Name:    calGeomMeanLongSun							*/
//* Type:    Function									*/
//* Purpose: calculate the Geometric Mean Longitude of the Sun		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the Geometric Mean Longitude of the Sun in degrees			*/
//***********************************************************************/

	function calcGeomMeanLongSun(t)
	{
		var L0 = 280.46646 + t * (36000.76983 + 0.0003032 * t);
		while(L0 > 360.0)
		{
			L0 -= 360.0;
		}
		while(L0 < 0.0)
		{
			L0 += 360.0;
		}
		return L0;		// in degrees
	}


//***********************************************************************/
//* Name:    calGeomAnomalySun							*/
//* Type:    Function									*/
//* Purpose: calculate the Geometric Mean Anomaly of the Sun		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the Geometric Mean Anomaly of the Sun in degrees			*/
//***********************************************************************/

	function calcGeomMeanAnomalySun(t)
	{
		var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
		return M;		// in degrees
	}

//***********************************************************************/
//* Name:    calcEccentricityEarthOrbit						*/
//* Type:    Function									*/
//* Purpose: calculate the eccentricity of earth's orbit			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   the unitless eccentricity							*/
//***********************************************************************/


	function calcEccentricityEarthOrbit(t)
	{
		var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
		return e;		// unitless
	}

//***********************************************************************/
//* Name:    calcSunEqOfCenter							*/
//* Type:    Function									*/
//* Purpose: calculate the equation of center for the sun			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   in degrees										*/
//***********************************************************************/


	function calcSunEqOfCenter(t)
	{
		var m = calcGeomMeanAnomalySun(t);

		var mrad = degToRad(m);
		var sinm = Math.sin(mrad);
		var sin2m = Math.sin(mrad+mrad);
		var sin3m = Math.sin(mrad+mrad+mrad);

		var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
		return C;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunTrueLong								*/
//* Type:    Function									*/
//* Purpose: calculate the true longitude of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's true longitude in degrees						*/
//***********************************************************************/


	function calcSunTrueLong(t)
	{
		var l0 = calcGeomMeanLongSun(t);
		var c = calcSunEqOfCenter(t);

		var O = l0 + c;
		return O;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunTrueAnomaly							*/
//* Type:    Function									*/
//* Purpose: calculate the true anamoly of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's true anamoly in degrees							*/
//***********************************************************************/

	function calcSunTrueAnomaly(t)
	{
		var m = calcGeomMeanAnomalySun(t);
		var c = calcSunEqOfCenter(t);

		var v = m + c;
		return v;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunRadVector								*/
//* Type:    Function									*/
//* Purpose: calculate the distance to the sun in AU				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun radius vector in AUs							*/
//***********************************************************************/

	function calcSunRadVector(t)
	{
		var v = calcSunTrueAnomaly(t);
		var e = calcEccentricityEarthOrbit(t);
 
		var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(degToRad(v)));
		return R;		// in AUs
	}

//***********************************************************************/
//* Name:    calcSunApparentLong							*/
//* Type:    Function									*/
//* Purpose: calculate the apparent longitude of the sun			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's apparent longitude in degrees						*/
//***********************************************************************/

	function calcSunApparentLong(t)
	{
		var o = calcSunTrueLong(t);

		var omega = 125.04 - 1934.136 * t;
		var lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
		return lambda;		// in degrees
	}

//***********************************************************************/
//* Name:    calcMeanObliquityOfEcliptic						*/
//* Type:    Function									*/
//* Purpose: calculate the mean obliquity of the ecliptic			*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   mean obliquity in degrees							*/
//***********************************************************************/

	function calcMeanObliquityOfEcliptic(t)
	{
		var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
		var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
		return e0;		// in degrees
	}

//***********************************************************************/
//* Name:    calcObliquityCorrection						*/
//* Type:    Function									*/
//* Purpose: calculate the corrected obliquity of the ecliptic		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   corrected obliquity in degrees						*/
//***********************************************************************/

	function calcObliquityCorrection(t)
	{
		var e0 = calcMeanObliquityOfEcliptic(t);

		var omega = 125.04 - 1934.136 * t;
		var e = e0 + 0.00256 * Math.cos(degToRad(omega));
		return e;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunRtAscension							*/
//* Type:    Function									*/
//* Purpose: calculate the right ascension of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's right ascension in degrees						*/
//***********************************************************************/

	function calcSunRtAscension(t)
	{
		var e = calcObliquityCorrection(t);
		var lambda = calcSunApparentLong(t);
 
		var tananum = (Math.cos(degToRad(e)) * Math.sin(degToRad(lambda)));
		var tanadenom = (Math.cos(degToRad(lambda)));
		var alpha = radToDeg(Math.atan2(tananum, tanadenom));
		return alpha;		// in degrees
	}

//***********************************************************************/
//* Name:    calcSunDeclination							*/
//* Type:    Function									*/
//* Purpose: calculate the declination of the sun				*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   sun's declination in degrees							*/
//***********************************************************************/

	function calcSunDeclination(t)
	{
		var e = calcObliquityCorrection(t);
		var lambda = calcSunApparentLong(t);

		var sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
		var theta = radToDeg(Math.asin(sint));
		return theta;		// in degrees
	}

//***********************************************************************/
//* Name:    calcEquationOfTime							*/
//* Type:    Function									*/
//* Purpose: calculate the difference between true solar time and mean	*/
//*		solar time									*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//* Return value:										*/
//*   equation of time in minutes of time						*/
//***********************************************************************/

	function calcEquationOfTime(t)
	{
		var epsilon = calcObliquityCorrection(t);
		var l0 = calcGeomMeanLongSun(t);
		var e = calcEccentricityEarthOrbit(t);
		var m = calcGeomMeanAnomalySun(t);

		var y = Math.tan(degToRad(epsilon)/2.0);
		y *= y;

		var sin2l0 = Math.sin(2.0 * degToRad(l0));
		var sinm   = Math.sin(degToRad(m));
		var cos2l0 = Math.cos(2.0 * degToRad(l0));
		var sin4l0 = Math.sin(4.0 * degToRad(l0));
		var sin2m  = Math.sin(2.0 * degToRad(m));

		var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0
				- 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;

		return radToDeg(Etime)*4.0;	// in minutes of time
	}

//***********************************************************************/
//* Name:    calcHourAngleSunrise							*/
//* Type:    Function									*/
//* Purpose: calculate the hour angle of the sun at sunrise for the	*/
//*			latitude								*/
//* Arguments:										*/
//*   lat : latitude of observer in degrees					*/
//*	solarDec : declination angle of sun in degrees				*/
//* Return value:										*/
//*   hour angle of sunrise in radians						*/
//***********************************************************************/

	function calcHourAngleSunrise(lat, solarDec)
	{
		var latRad = degToRad(lat);
		var sdRad  = degToRad(solarDec)

		var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

		var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

		return HA;		// in radians
	}

//***********************************************************************/
//* Name:    calcHourAngleSunset							*/
//* Type:    Function									*/
//* Purpose: calculate the hour angle of the sun at sunset for the	*/
//*			latitude								*/
//* Arguments:										*/
//*   lat : latitude of observer in degrees					*/
//*	solarDec : declination angle of sun in degrees				*/
//* Return value:										*/
//*   hour angle of sunset in radians						*/
//***********************************************************************/

	function calcHourAngleSunset(lat, solarDec)
	{
		var latRad = degToRad(lat);
		var sdRad  = degToRad(solarDec)

		var HAarg = (Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));

		var HA = (Math.acos(Math.cos(degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad)));

		return -HA;		// in radians
	}


//***********************************************************************/
//* Name:    calcSunriseUTC								*/
//* Type:    Function									*/
//* Purpose: calculate the Universal Coordinated Time (UTC) of sunrise	*/
//*			for the given day at the given location on earth	*/
//* Arguments:										*/
//*   JD  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   time in minutes from zero Z							*/
//***********************************************************************/

	function calcSunriseUTC(JD, latitude, longitude)
	{
		var t = calcTimeJulianCent(JD);

		// *** First pass to approximate sunrise

		var eqTime = calcEquationOfTime(t);
		var solarDec = calcSunDeclination(t);
		var hourAngle = calcHourAngleSunrise(latitude, solarDec);

		var delta = longitude - radToDeg(hourAngle);
		var timeDiff = 4 * delta;	// in minutes of time
		var timeUTC = 720 + timeDiff - eqTime;	// in minutes

		// alert("eqTime = " + eqTime + "\nsolarDec = " + solarDec + "\ntimeUTC = " + timeUTC);

		// *** Second pass includes fractional jday in gamma calc

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
		eqTime = calcEquationOfTime(newt);
		solarDec = calcSunDeclination(newt);
		hourAngle = calcHourAngleSunrise(latitude, solarDec);
		delta = longitude - radToDeg(hourAngle);
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		// alert("eqTime = " + eqTime + "\nsolarDec = " + solarDec + "\ntimeUTC = " + timeUTC);

		return timeUTC;
	}

//***********************************************************************/
//* Name:    calcSolNoonUTC								*/
//* Type:    Function									*/
//* Purpose: calculate the Universal Coordinated Time (UTC) of solar	*/
//*		noon for the given day at the given location on earth		*/
//* Arguments:										*/
//*   t : number of Julian centuries since J2000.0				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   time in minutes from zero Z							*/
//***********************************************************************/

	function calcSolNoonUTC(t, longitude)
	{
		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + 0.5 + longitude/360.0); 

		var eqTime = calcEquationOfTime(t);
		var solarNoonDec = calcSunDeclination(t);
		var solNoonUTC = 720 + (longitude * 4) - eqTime; // min
		
		return solNoonUTC;
	}

//***********************************************************************/
//* Name:    calcSunsetUTC								*/
//* Type:    Function									*/
//* Purpose: calculate the Universal Coordinated Time (UTC) of sunset	*/
//*			for the given day at the given location on earth	*/
//* Arguments:										*/
//*   JD  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   time in minutes from zero Z							*/
//***********************************************************************/

	function calcSunsetUTC(JD, latitude, longitude)
	{
		var t = calcTimeJulianCent(JD);

		// First calculates sunrise and approx length of day

		var eqTime = calcEquationOfTime(t);
		var solarDec = calcSunDeclination(t);
		var hourAngle = calcHourAngleSunset(latitude, solarDec);

		var delta = longitude - radToDeg(hourAngle);
		var timeDiff = 4 * delta;
		var timeUTC = 720 + timeDiff - eqTime;

		// first pass used to include fractional day in gamma calc

		var newt = calcTimeJulianCent(calcJDFromJulianCent(t) + timeUTC/1440.0); 
		eqTime = calcEquationOfTime(newt);
		solarDec = calcSunDeclination(newt);
		hourAngle = calcHourAngleSunset(latitude, solarDec);

		delta = longitude - radToDeg(hourAngle);
		timeDiff = 4 * delta;
		timeUTC = 720 + timeDiff - eqTime; // in minutes

		return timeUTC;
	}


//*********************************************************************/

// Returns the decimal latitude from the degrees, minutes and seconds entered 
// into the form	

	function getLatitude(latLongForm)
	{
		var neg = 0;
		var degs = parseFloat(latLongForm["latDeg"].value);
		if (latLongForm["latDeg"].value[0] == '-') 
		{
			neg = 1;
		}

		var mins = parseFloat(latLongForm["latMin"].value);

		var secs = parseFloat(latLongForm["latSec"].value);

		if(neg != 1)
		{
			var decLat = degs + (mins / 60) + (secs / 3600);
		} 
		else if(neg == 1)
		{
			var decLat = degs - (mins / 60) - (secs / 3600);
		} else 
		{
			return -9999;
		}
		return decLat;
	}	


//*********************************************************************/

// Returns the decimal longitude from the degrees, minutes and seconds entered 
// into the form	

	function getLongitude(latLongForm)
	{
		var neg = 0;
		var degs = parseFloat(latLongForm["lonDeg"].value);
		if (latLongForm["lonDeg"].value[0] == '-') 
		{
			neg = 1;
		}
		var mins = parseFloat(latLongForm["lonMin"].value);
		var secs = parseFloat(latLongForm["lonSec"].value);
		var decLon = degs + (mins / 60) + (secs / 3600);

		if(neg != 1)
		{
			var decLon = degs + (mins / 60) + (secs / 3600);
		} else if(neg == 1)
		{
			var decLon = degs - (mins / 60) - (secs / 3600);
		} else 
		{
			return -9999;
		}
		return decLon;
	}	


//***********************************************************************/
//* Name:    findRecentSunrise							*/
//* Type:    Function									*/
//* Purpose: calculate the julian day of the most recent sunrise		*/
//*		starting from the given day at the given location on earth	*/
//* Arguments:										*/
//*   JD  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   julian day of the most recent sunrise					*/
//***********************************************************************/

	function findRecentSunrise(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunriseUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday -= 1.0;
			time = calcSunriseUTC(julianday, latitude, longitude);
		}

		return julianday;
	}


//***********************************************************************/
//* Name:    findRecentSunset								*/
//* Type:    Function									*/
//* Purpose: calculate the julian day of the most recent sunset		*/
//*		starting from the given day at the given location on earth	*/
//* Arguments:										*/
//*   JD  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   julian day of the most recent sunset					*/
//***********************************************************************/

	function findRecentSunset(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunsetUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday -= 1.0;
			time = calcSunsetUTC(julianday, latitude, longitude);
		}

		return julianday;
	}


//***********************************************************************/
//* Name:    findNextSunrise								*/
//* Type:    Function									*/
//* Purpose: calculate the julian day of the next sunrise			*/
//*		starting from the given day at the given location on earth	*/
//* Arguments:										*/
//*   JD  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   julian day of the next sunrise						*/
//***********************************************************************/

	function findNextSunrise(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunriseUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday += 1.0;
			time = calcSunriseUTC(julianday, latitude, longitude);
		}

		return julianday;
	}


//***********************************************************************/
//* Name:    findNextSunset								*/
//* Type:    Function									*/
//* Purpose: calculate the julian day of the next sunset			*/
//*		starting from the given day at the given location on earth	*/
//* Arguments:										*/
//*   JD  : julian day									*/
//*   latitude : latitude of observer in degrees				*/
//*   longitude : longitude of observer in degrees				*/
//* Return value:										*/
//*   julian day of the next sunset							*/
//***********************************************************************/

	function findNextSunset(jd, latitude, longitude)
	{
		var julianday = jd;

		var time = calcSunsetUTC(julianday, latitude, longitude);
		while(!isNumber(time)){
			julianday += 1.0;
			time = calcSunsetUTC(julianday, latitude, longitude);
		}

		return julianday;
	}

//***********************************************************************/
//* Name:    timeString									*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields			*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//* Return value:										*/
//*   string of the format HH:MM:SS, minutes and seconds are zero padded*/
//***********************************************************************/

	function timeString(minutes)
	// timeString returns a zero-padded string (HH:MM:SS) given time in minutes
	{
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ":";
		else
			timeStr += minute + ":";
		if (second < 10)	//	i.e. only one digit
			timeStr += "0" + second;
		else
			timeStr += second;

		return timeStr;
	}


//***********************************************************************/
//* Name:    timeStringShortAMPM							*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields.  If time	*/
//*		crosses a day boundary, date is appended.				*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM[AM/PM] (DDMon)					*/
//***********************************************************************/

// timeStringShortAMPM returns a zero-padded string (HH:MM *M) given time in 
// minutes and appends short date if time is > 24 or < 0, resp.

	function timeStringShortAMPM(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);
		var PM = false;

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			daychange = true;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			daychange = true;
			julianday -= 1.0;
		}

		if (hour > 11)
		{
			hour -= 12;
			PM = true;
		}

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += "" + minute + ((PM)?"PM":"AM");

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}


//***********************************************************************/
//* Name:    timeStringAMPMDate							*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded string	*/
//*		suitable for printing to the form text fields, and appends	*/
//*		the date.									*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM[AM/PM] DDMon					*/
//***********************************************************************/

// timeStringAMPMDate returns a zero-padded string (HH:MM[AM/PM]) given time 
// in minutes and julian day, and appends the short date

	function timeStringAMPMDate(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		if (hour > 23) 
		{
			hour -= 24;
			julianday += 1.0;
		}

		if (hour < 0)
		{
			hour += 24;
			julianday -= 1.0;
		}

		var PM = false;
		if (hour > 11)
		{
			hour -= 12;
			PM = true;
		}

		if (hour == 0)
		{
			PM = false;
			hour = 12;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute + ((PM)?"PM":"AM");
		else
			timeStr += minute + ((PM)?"PM":"AM");

		return timeStr + " " + calcDayFromJD(julianday);
	}


//***********************************************************************/
//* Name:    timeStringDate								*/
//* Type:    Function									*/
//* Purpose: convert time of day in minutes to a zero-padded 24hr time	*/
//*		suitable for printing to the form text fields.  If time	*/
//*		crosses a day boundary, date is appended.				*/
//* Arguments:										*/
//*   minutes : time of day in minutes						*/
//*   JD  : julian day									*/
//* Return value:										*/
//*   string of the format HH:MM (DDMon)						*/
//***********************************************************************/

// timeStringDate returns a zero-padded string (HH:MM) given time in minutes
// and julian day, and appends the short date if time crosses a day boundary

	function timeStringDate(minutes, JD)
	{
		var julianday = JD;
		var floatHour = minutes / 60;
		var hour = Math.floor(floatHour);
		var floatMinute = 60 * (floatHour - Math.floor(floatHour));
		var minute = Math.floor(floatMinute);
		var floatSec = 60 * (floatMinute - Math.floor(floatMinute));
		var second = Math.floor(floatSec);

		minute += (second >= 30)? 1 : 0;

		if (minute >= 60) 
		{
			minute -= 60;
			hour ++;
		}

		var daychange = false;
		if (hour > 23) 
		{
			hour -= 24;
			julianday += 1.0;
			daychange = true;
		}

		if (hour < 0)
		{
			hour += 24;
			julianday -= 1.0;
			daychange = true;
		}

		var timeStr = hour + ":";
		if (minute < 10)	//	i.e. only one digit
			timeStr += "0" + minute;
		else
			timeStr += minute;

		if (daychange) return timeStr + " " + calcDayFromJD(julianday);
		return timeStr;
	}

	
//***********************************************************************/
//* Name:    calcSun									*/
//* Type:    Main Function called by form controls				*/
//* Purpose: calculate time of sunrise and sunset for the entered date	*/
//*		and location.  In the special cases near earth's poles, 	*/
//*		the date of nearest sunrise and set are reported.		*/
//* Arguments:										*/
//*   riseSetForm : for displaying results					*/
//*   latLongForm : for reading latitude and longitude data			*/
//*   index : daylight saving yes/no select					*/
//*   index2 : city select index							*/
//* Return value:										*/
//*   none											*/
//*	(fills riseSetForm text fields with results of calculations)	*/
//***********************************************************************/


	function calcSun(riseSetForm, /*latLongForm, */index, index2) 
	{
		/*if(index2 != 0)
		{
			//setLatLong(latLongForm, index2);
		}*/

		//var latitude = getLatitude(latLongForm);
		//var longitude = getLongitude(latLongForm);
		var latitude = riseSetForm.latitude;
		var longitude = riseSetForm.longitude;
		
		//var indexRS = riseSetForm.mos.selectedIndex;
		var indexRS = riseSetForm.month-1;
		
		if(1==1) //(isValidInput(riseSetForm, indexRS, latLongForm)) 
		{
			if((latitude >= -90) && (latitude < -89.8))
			{
				alert("All latitudes between 89.8 and 90 S\n will be set to -89.8");
				//latLongForm["latDeg"].value = -89.8;
				latitude = -89.8;
			}
			if ((latitude <= 90) && (latitude > 89.8))
			{
				alert("All latitudes between 89.8 and 90 N\n will be set to 89.8");
				//latLongForm["latDeg"].value = 89.8;
				latitude = 89.8;
			}
			
			//*****	Calculate the time of sunrise			

//*********************************************************************/
//****************   NEW STUFF   ******   January, 2001   ****************
//*********************************************************************/

			var JD = (calcJD(parseFloat(riseSetForm["year"]), indexRS + 1, parseFloat(riseSetForm["day"])));
			var dow = calcDayOfWeek(JD);
			var doy = calcDayOfYear(indexRS + 1, parseFloat(riseSetForm["day"]), isLeapYear(riseSetForm["year"]));
			var T = calcTimeJulianCent(JD);
			//var L0 = calcGeomMeanLongSun(T);
			//var M = calcGeomMeanAnomalySun(T);
			//var e = calcEccentricityEarthOrbit(T);
			//var C = calcSunEqOfCenter(T);
			//var O = calcSunTrueLong(T);
			//var v = calcSunTrueAnomaly(T);
			//var R = calcSunRadVector(T);
			//var lambda = calcSunApparentLong(T);
			//var epsilon0 = calcMeanObliquityOfEcliptic(T);
			//var epsilon = calcObliquityCorrection(T);
			var alpha = calcSunRtAscension(T);
			var theta = calcSunDeclination(T);
			var Etime = calcEquationOfTime(T);

			//riseSetForm["dbug"].value = doy;

//*********************************************************************/

			var eqTime = Etime;
			var solarDec = theta;

			riseSetForm["eqTime"] = (Math.floor(100*eqTime))/100;
			riseSetForm["solarDec"] = (Math.floor(100*(solarDec)))/100;

			// Calculate sunrise for this date
			// if no sunrise is found, set flag nosunrise

			var nosunrise = false;

			var riseTimeGMT = calcSunriseUTC(JD, latitude, longitude);
			if (!isNumber(riseTimeGMT))
			{
				nosunrise = true;
			}

			// Calculate sunset for this date
			// if no sunset is found, set flag nosunset

			var nosunset = false;
			var setTimeGMT = calcSunsetUTC(JD, latitude, longitude);
			if (!isNumber(setTimeGMT))
			{
				nosunset = true;
			}

			var daySavings = YesNo[index];  // = 0 (no) or 60 (yes)
			//alert(daySavings);
			//var zone = latLongForm["hrsToGMT"].value;
			var zone = riseSetForm.zone;//alert("true");
			if(zone > 12 || zone < -12.5)
			{
				alert("The offset must be between -12.5 and 12.  \n Setting \"Off-Set\"=0");
				zone = "0";
				//latLongForm["hrsToGMT"].value = zone;
			}

			if (!nosunrise)		// Sunrise was found
			{
				var riseTimeLST = riseTimeGMT - (60 * zone) + daySavings;	
					//	in minutes
				var riseStr = timeStringShortAMPM(riseTimeLST, JD);
				var utcRiseStr = timeStringDate(riseTimeGMT, JD);

				riseSetForm["sunrise"] = riseStr;
				riseSetForm["utcsunrise"] = utcRiseStr;
			}

			if (!nosunset)		// Sunset was found
			{
				var setTimeLST = setTimeGMT - (60 * zone) + daySavings;
				var setStr = timeStringShortAMPM(setTimeLST, JD);
				var utcSetStr = timeStringDate(setTimeGMT, JD);

				riseSetForm["sunset"] = setStr;
				riseSetForm["utcsunset"] = utcSetStr;
			}

			// Calculate solar noon for this date

			var solNoonGMT = calcSolNoonUTC(T, longitude);
			var solNoonLST = solNoonGMT - (60 * zone) + daySavings;

			var solnStr = timeString(solNoonLST);
			var utcSolnStr = timeString(solNoonGMT);

			riseSetForm["solnoon"] = solnStr;
			riseSetForm["utcsolnoon"] = utcSolnStr;
			
			//***********Convert lat and long to standard format
			//convLatLong(latLongForm);

			// report special cases of no sunrise

			if(nosunrise)
			{
				riseSetForm["utcsunrise"] = "";
				// if Northern hemisphere and spring or summer, OR  
				// if Southern hemisphere and fall or winter, use 
				// previous sunrise and next sunset

				if ( ((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
				   ((latitude < -66.4) && ((doy < 83) || (doy > 263))) )
				{
					newjd = findRecentSunrise(JD, latitude, longitude);
					newtime = calcSunriseUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunrise"] = 
						timeStringAMPMDate(newtime, newjd);
					riseSetForm["utcsunrise"] = "prior sunrise";
				}

				// if Northern hemisphere and fall or winter, OR 
				// if Southern hemisphere and spring or summer, use 
				// next sunrise and previous sunset

				else if ( ((latitude > 66.4) && ((doy < 83) || (doy > 263))) ||
					((latitude < -66.4) && (doy > 79) && (doy < 267)) )
				{
					newjd = findNextSunrise(JD, latitude, longitude);
					newtime = calcSunriseUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunrise"] = 
						timeStringAMPMDate(newtime, newjd);
//					riseSetForm["sunrise"].value = calcDayFromJD(newjd)
//						+ " " + timeStringDate(newtime, newjd);
					riseSetForm["utcsunrise"] = "next sunrise";
				}
				else 
				{
					alert("Cannot Find Sunrise!");
				}

				// alert("Last Sunrise was on day " + findRecentSunrise(JD, latitude, longitude));
				// alert("Next Sunrise will be on day " + findNextSunrise(JD, latitude, longitude));

			}

			if(nosunset)
			{ 
				riseSetForm["utcsunset"] = "";
				// if Northern hemisphere and spring or summer, OR
				// if Southern hemisphere and fall or winter, use 
				// previous sunrise and next sunset

				if ( ((latitude > 66.4) && (doy > 79) && (doy < 267)) ||
				   ((latitude < -66.4) && ((doy < 83) || (doy > 263))) )
				{
					newjd = findNextSunset(JD, latitude, longitude);
					newtime = calcSunsetUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunset"] = 
						timeStringAMPMDate(newtime, newjd);
					riseSetForm["utcsunset"] = "next sunset";
					riseSetForm["utcsolnoon"] = "";
				}

				// if Northern hemisphere and fall or winter, OR
				// if Southern hemisphere and spring or summer, use 
				// next sunrise and last sunset

				else if ( ((latitude > 66.4) && ((doy < 83) || (doy > 263))) ||
					((latitude < -66.4) && (doy > 79) && (doy < 267)) )
				{
					newjd = findRecentSunset(JD, latitude, longitude);
					newtime = calcSunsetUTC(newjd, latitude, longitude)
						 - (60 * zone) + daySavings;
					if (newtime > 1440)
					{
						newtime -= 1440;
						newjd += 1.0;
					}
					if (newtime < 0)
					{
						newtime += 1440;
						newjd -= 1.0;
					}
					riseSetForm["sunset"] = 
						timeStringAMPMDate(newtime, newjd);
					riseSetForm["utcsunset"] = "prior sunset";
					riseSetForm["solnoon"] = "N/A";
					riseSetForm["utcsolnoon"] = "";
				}

				else 
				{
					alert ("Cannot Find Sunset!");
				}
			}
		}
	return riseSetForm;
	}