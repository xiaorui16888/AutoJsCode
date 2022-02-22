/*全文复制粘贴创建新脚本即可

此脚本适用于安卓最新版学习通app

时刻保持最新

脚本的功能十分有限

仅完成视频观看，完成视频中的选择题

课后习题会影响期末成绩，务必慎重

请务必在良好的网络环境下观看视频

可按需自行修改第23行的内容

版本：5.0

作者：2333

后续如果会有更新依旧可以在如下地址下载

https://shimo.im/docs/Ytyt2B1xT5czrd9I/

*/

 

auto.waitFor();

 

//启动学习通程序

var packageName = getPackageName("学习通");

if(!packageName){

	toast("未安装学习通软件！");

	exit();

}else{

	//输入课程信息

	var name = rawInput("课程名称", "无机及分析化学");

//替换上面的【大学语文】四个字为你最近要看的课程，避免频繁输入

	if (name.length == 0){

		toastLog("未输入课程名");

		exit();

	}

	var num = rawInput("课程章节数", "");

	if (num.length == 0){

		toastLog("未输入章节数");

		exit();

	}

	//alert("播放《"+name+"》第"+num+"节");

	launchPackage("com.chaoxing.mobile");

	}

 

//进入课程

className("android.widget.TextView").packageName("com.chaoxing.mobile").waitFor();

for(var i = 1;i <= 20;i++){

var me = id("tabButton").packageName("com.chaoxing.mobile").className("android.widget.TextView").text("我");

if (me.exists()){

click("我");

sleep(200);

click("课程");

 


//选择课程

var lessonPic = className("android.widget.FrameLayout");

if (lessonPic.findOne(4000)==null){

    toastLog("网络状况不佳或未登录");

    }

//	while(!click("课程",0));

	lessonPic.waitFor();

	sleep(200);

for(var i = 1;i <= 20;i++){

if(text(name).exists()){
    
	sleep(200);

	click(name);

	break;

}else{

    if 	(scrollable(true).exists()){

	scrollable(true).scrollUp(0);

	sleep(600);

}

	}

}

if (text(name).findOne(1000)==null && lessonPic.exists()){

	toastLog("未找到课程"+name);

//	exit();

}
 

//选择章节

if (text("章节").findOne(3000)==null){

	toastLog("网络状况不佳");

	}

text("章节").waitFor();

click("章节");

var unitList = id("tv_part_index");

if (unitList.findOne(3000)==null){

	toastLog("网络状况不佳");

	}

unitList.waitFor();

sleep(200);

for(var i = 1;i <= 20;i++){

if(text(num).exists()){

sleep(200);

	click(num);

	break;

}else if (text("已经到底啦~(>_<)~~").className("android.widget.TextView").exists()){

	break;

}else{

    scrollable(true).findOnce(1).scrollForward();

    sleep(600);

     }

}

if (text(num).findOne(1000)==null && unitList.exists()){

	toastLog("未找到第"+num+"章节");

	exit();

}

 

//播放视频

waitForActivity("com.chaoxing.fanya.aphone.ui.chapter.detail.ui.ChapterDetailActivity");

sleep(1000);

if (text("1 学习目标").exists()){

    click("2 视频",0);

}

toast("正在寻找播放按钮");

if (text("play").findOne(25000)==null){

    var playbutton = confirm("未找到播放按钮，\n估计也找不到了\n是否继续寻找？");

    if(playbutton){

        toast("继续寻找中…");

        text("play").waitFor();

    }else{

    exit();

}

    }

    

 

//text("play").waitFor();

sleep(500);

click("play");

 

/*    if (text("play").exists()){

    click("play");

    }else{

//	toastLog("未找到播放按钮");

alert("抱歉！","未找到播放按钮，\问题无法被解决，\n脚本已停止，\n再试一次如果依旧不可以，\n请使用简版脚本。");

exit();

}

/*className("android.view.View").depth("18").packageName("com.chaoxing.mobile").waitFor();

sleep(2000);

className("android.view.View").depth("18").packageName("com.chaoxing.mobile").click();

if (text("play").exists()){

    click("play");

}else{

//	toastLog("未找到播放按钮");

alert("抱歉！","未找到播放按钮，\问题无法被解决，\n脚本已停止，\n再试一次如果依旧不可以，\n请使用简版脚本。");

exit();

}*/

while(!click("play",0));

sleep(600);

 

//移动网络识别

if (text("继续").id("btnOk").className("android.widget.Button").exists()){

//text("继续").packageName("com.chaoxing.mobile").id("btnOk").clickable().className("android.widget.Button").click();

sleep(500);

while(!click("继续"));

toastLog("你正在使用移动网络");

}

sleep(2000);

 

//循环轮选题目

while(true){

//判断提交按钮是否存在

if (className("android.widget.TextView").id("btn_check_answer").text("提交").exists()){

//判断题

	if (id("test_tv_title").text("判断题:").exists()){

	click("A");

	sleep(50);

	click("提交");

	sleep(100);

		if (id("tv_answer").text("回答错误").exists()){

		sleep(50);

		click("B");

		sleep(50);

		click("提交");

		}

	}

 

//单选题

	else if (id("test_tv_title").text("单选题:").exists()){

	click("A");

	sleep(50);

	click("提交");

	sleep(100);

	if (id("tv_answer").text("回答错误").exists()){

	click("B");

	sleep(50);

	click("提交");

	sleep(100);

		if (id("tv_answer").text("回答错误").exists()){

		click("C");

		sleep(50);

		click("提交");

		sleep(100);

			if (id("tv_answer").text("回答错误").exists()){

			click("D");

			sleep(50);

			click("提交");

		}

	}

}

}

 

//多选题

	else if (id("test_tv_title").text("多选题:").exists()){

	click("D");

	sleep(50);

	click("C");

	sleep(50);

	click("B");

	sleep(50);

	click("A");

	sleep(50);

	click("提交");

	sleep(100);

	//ABCD

	if (id("tv_answer").text("回答错误").exists()){

	click("D");

	sleep(50);

	click("提交");

	sleep(100);

	//ABC

		if (id("tv_answer").text("回答错误").exists()){

			click("C");

			sleep(50);

			click("提交");

			sleep(100);

			//AB

			if (id("tv_answer").text("回答错误").exists()){

				click("D");

				sleep(50);

				click("提交");

				sleep(100);

				//ABD

				if (id("tv_answer").text("回答错误").exists()){

					click("B");

					sleep(50);

					click("提交");

					sleep(100);

					//AD

					if (id("tv_answer").text("回答错误").exists()){

						click("C");

						sleep(50);

						click("提交");

						sleep(100);

						//ACD

						if (id("tv_answer").text("回答错误").exists()){

							click("A");

							sleep(50);

							click("提交");

							sleep(100);

							//CD

							if (id("tv_answer").text("回答错误").exists()){

								click("D");

								sleep(50);

								click("A");

								sleep(50);

								click("提交");

								sleep(100);

								//AC

								if (id("tv_answer").text("回答错误").exists()){

									click("A");

									sleep(50);

									click("B");

									sleep(50);

									click("提交");

									sleep(100);

									//BC

									if (id("tv_answer").text("回答错误").exists()){

										click("D");

										sleep(50);

										click("提交");

										sleep(100);

										//BCD

										if (id("tv_answer").text("回答错误").exists()){

											click("C");

											sleep(50);

											click("提交");

											sleep(100);

											//BD

											}

										}

									}

								}

							}

						}

					}

				}

			}

		}

}

}

 

//跳过开头重试

else if  (id("btnOk").text("重试").exists()){

    toastLog("网络状况不佳或当前线路不佳")

    click("重试");

    }

 

//跳过回答正确页

else if  (id("btn_next").className("android.widget.TextView").text("继续").exists()){

click("继续");

toastLog("回答完毕");

}

 

//离开学习通提示

else if (currentPackage() != ("com.chaoxing.mobile" )){

    toastLog("脚本仍在运行\n\n播放页有效");

    sleep(10000);

    //exit();

    }

}

 

}else{

	if (currentPackage()==("com.chaoxing.mobile")){

		back()

		sleep(1000)

	}else{

		launchPackage("com.chaoxing.mobile");	

	}

	}

}

 