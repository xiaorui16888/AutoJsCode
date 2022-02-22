console.show();//显示控制台
    var xzlx,xzlx2;							//		 表示选项 
    var jine,lixi,tians;				//		 分别表示金额、利息、存款天数、年利率 
    log("欢迎使用存贷计算器！");			 	 //显示欢迎语  
    log("请您选择需要使用的计算器：");			 //显示提示 
    log(" 1.存款利息计算器\n 2.贷款利息计算器");//提示选择计算器
    log("请选择:"+xzlx);
    var xzlx=console.rawInput();//输入选项 
    if(xzlx==1)		//如果输入数字选项 1 
  {
    log("欢迎使用存款利息计算器！");//显示欢迎语 
    log("请输入存款金额:"+jine);//输入存款金额 
    var jine=console.rawInput();			//输入金额
    log("======存款期限====== \n1.活期存款\n 2.3个月\n 3.6个月\n 4.一年\n 5.两年\n 6.三年\n 7.五年");
    log("请输入存款期限的代号："+xzlx2);//输出存款类型 
    var xzlx2=console.rawInput();			//输入选项 
    if(xzlx2>=1&&xzlx2<=7)//如果输入数字选项	大于等于1且小于等于7 
{
    	switch(xzlx2)//switch语句判断 
  {
    case 2:	//选项第二项的情况 
           lixi=jine*0.0135*0.25;	//计算利息 
           break;					//跳出switch结构 
    case 3:	//选项第三项的情况
           lixi=jine*0.0155*0.5;	//计算利息
           break;					//跳出switch结构 
    case 4:	//选项第四项的情况
           lixi=jine*0.0175*1;		//计算利息
           	break;					//跳出switch结构 
    case 5:	//选项第五项的情况
    	       lixi=jine*0.225*2;		//计算利息
            break;					//跳出switch结构 
    case 6:	//选项第六项的情况
           	lixi=jine*0.275*3;		//计算利息
           	break;					//跳出switch结构 
    case 7:	//选项第七项的情况 	
           lixi=jine*0.275*5;		//计算利息
           	break;					//跳出switch结构 			
  }
    if(xzlx2==1)//如果输入数字 1 
    {
         log("请输入存款天数："+tians);	//提示信息 
         var tians=console.rawInput();	//输入天数 
         lixi=jine*0.003*tians;		//计算利息 
    	}
         log("到期利息为:"+lixi,"本息合计共:"+lixi+jine);//输出字符串
  }
	else
		log("选择存款类型错误！\n");					//提示信息 
		log("感谢您的使用，欢迎下次光临！\n");	//显示欢送语
}