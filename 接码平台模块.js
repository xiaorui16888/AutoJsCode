var common={}

/********* 芒果云 *******************/
common.芒果云登录 = function(API帐号,密码){
    var url = "http://www.mangopt.com:9000/doApi/loginIn?name=API帐号&password=密码"
    url=url.replace("API帐号",API帐号)
    url=url.replace("密码",密码)
    r=http.get(url)
    r=r.body.string()
    if(r.substring(0,1)==1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        return r
    }else{
        return 0
    }
}
common.芒果云取用户信息 = function(令牌){
    var url="http://www.mangopt.com:9000/doApi/getSummary?token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url)
    r=r.body.string()
    console.info(r)
}

common.芒果云获取手机号 = function(项目id,令牌,虚拟号){
    var url="http://www.mangopt.com:9000/doApi/getPhone?sid=项目id&token=登录时返回的令牌&vno=虚拟号"//vno=0 表示指定只取虚拟运营商， vno=1 表示排除过滤虚拟运营商
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("虚拟号",虚拟号)
    var r=http.get(url)
    r=r.body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }

}

common.芒果云获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://www.mangopt.com:9000/doApi/getMessage?sid=项目id&phone=取出来的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url)
    r=r.body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}

common.芒果云手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://www.mangopt.com:9000/doApi/addBlacklist?sid=项目id&phone=要加入黑名单的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url)
    r=r.body.string()
    log(r)
}



/******************* 短租 ******************/
common.短租登录 = function(用户名,密码){
    var url="http://api.jmyzm.com/http.do?action=loginIn&uid=用户名&pwd=密码"
    url=url.replace("用户名",用户名)
    url=url.replace("密码",密码)
    r=http.get(url)
    r=r.body.string()
    if(r.substring(0,r.indexOf("|"))==用户名){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        //console.info(r)
        return r
    }else{
        return 0
    }


}
common.短租取用户信息 = function(用户名,令牌){
    var url="http://api.jmyzm.com/http.do?action=getUserInfos&uid=用户名&token=登录时返回的令牌"
    url=url.replace("用户名",用户名)
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url)
    r=r.body.string()
    console.info(r)
    return r
}
common.短租获取手机号 = function(用户名,项目ID,令牌,虚拟号,指定号码){
    var url="http://api.jmyzm.com/http.do?action=getMobilenum&pid=项目ID&uid=用户名&token=登录时返回的令牌&mobile=&size=1&vno=虚拟号&mobile=指定号码获取"//vno=指定或排除虚拟运营商； 可以不填 ， vno=0 表示排除过滤虚拟运营商 vno=1 表示指定只取虚拟运营商。
    url=url.replace("用户名",用户名)
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目ID",项目ID)
    url=url.replace("虚拟号",虚拟号)
    url=url.replace("指定号码获取",指定号码)
    var r=http.get(url).body.string()
    if(r.substring(0,r.indexOf("|")).length==11){
        r=r.substring(0,r.indexOf("|"))
        console.info("成功获取到:"+r)
        return r

    }else{
        return r 

    }
}

common.短租获取验证码并不再使用本号 = function(用户名,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://api.jmyzm.com/http.do?action=getVcodeAndReleaseMobile&uid=用户&token=登录时返回的令牌&mobile=获取到的手机号码"
    url=url.replace("用户",用户名)
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("获取到的手机号码",取出来的手机号)
    var r=http.get(url).body.string()
    
    if(r.substring(0,11)==取出来的手机号){
        r=r.substring(r.indexOf("|"),r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.短租加黑无用号码 = function(项目id,令牌,用户名,要加入黑名单的手机号){
    var url="http://api.jmyzm.com/http.do?action=addIgnoreList&uid=用户名&token=登录时返回的令牌&mobiles=要加入黑名单的手机号&pid=项目ID"
    url=url.replace("用户",用户名)
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    url=url.replace("项目ID",项目id)
    var r=http.get(url).body.string()
    return r
}

/******************** 信盒 ********************/
common.信盒登录 = function(用户名,密码){
    var url="http://api.xinheyz.com/api/do.php?action=loginIn&name=用户名&password=密码"
    url=url.replace("用户名",用户名)
    url=url.replace("密码",密码)
    r=http.get(url)
    r=r.body.string()
    if(r.substring(0,r.indexOf("|"))==1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        //console.info(r)
        return r
    }else{
        return 0
    }
}
common.信盒取用户信息 = function(令牌){
    var url="http://api.xinheyz.com/api/do.php?action=getSummary&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url).body.string()
    console.info(r)
    return r
}
common.信盒获取手机号 = function(项目id,令牌,虚拟号){
    var url="http://api.xinheyz.com/api/do.php?action=getPhone&sid=项目id&token=登录时返回的令牌&vno=虚拟号"//vno=1 表示指定只取虚拟运营商， vno=0 表示排除过滤虚拟运营商。
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("虚拟号",虚拟号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }

}
common.信盒获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://api.xinheyz.com/api/do.php?action=getMessage&sid=项目id&phone=取出来的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.信盒手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://api.xinheyz.com/api/do.php?action=addBlacklist&sid=项目id&phone=要加入黑名单的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url).body.string()
    log(r)
    
}
/*********************** 吸码皇 *********************************** */
common.吸码皇登录 = function(用户名,密码){
    var url="http://www.ximahuang.com/alz/api?action=loginIn&name=用户名&password=密码"
    url=url.replace("用户名",用户名)
    url=url.replace("密码",密码)
    r=http.get(url)
    r=r.body.string()
    log(url)
    if(r.substring(0,1)==1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        return r
    }else{
        return 0
    }
}
common.吸码皇取用户信息 = function(令牌){
    var url="http://www.ximahuang.com/alz/api?action=getSummary&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url).body.string()
    console.info(r)
}
common.吸码皇获取手机号 = function(项目id,令牌,指定不获取XXX开头的号码){
    var url="http://www.ximahuang.com/alz/api?action=getPhone&sid=项目id&token=登录时返回的令牌&filterPrefix=指定不获取XXX开头的号码"//指定不获取XXX开头的号码，请在参数后多加一个&filterPrefix=170,171，多个以英文,隔开
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("指定不获取XXX开头的号码",指定不获取XXX开头的号码)
    var r=http.get(url)
    r=r.body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }
}
common.吸码皇获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://www.ximahuang.com/alz/api?action=getMessage&sid=项目id&phone=取出来的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url)
    r=r.body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.吸码皇手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://www.ximahuang.com/alz/api?action=addBlacklist&sid=项目id&phone=要加入黑名单的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url)
    r=r.body.string()
    log(r)
}

/*********************** 快米 *********************************** */
common.快米登录 = function(用户名,密码){
    var url="http://api.kmiyz.com/api/do.php?action=loginIn&name=用户名&password=密码"
    url=url.replace("用户名",用户名)
    url=url.replace("密码",密码)
    r=http.get(url)
    r=r.body.string()
    log(url)
    if(r.substring(0,1)==1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        return r
    }else{
        return 0
    }
}
common.快米取用户信息 = function(令牌){
    var url="http://api.kmiyz.com/api/do.php?action=getSummary&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url).body.string()
    console.info(r)
    return r
}
common.快米获取手机号 = function(项目id,令牌,虚拟号){
    var url="http://api.kmiyz.com/api/do.php?action=getPhone&sid=项目id&token=登录时返回的令牌&vno=虚拟号"//vno=1 表示指定只取虚拟运营商， vno=0 表示排除过滤虚拟运营商。
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("虚拟号",虚拟号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }

}
common.快米获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://api.kmiyz.com/api/do.php?action=getMessage&sid=项目id&phone=取出来的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.快米手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://api.kmiyz.com/api/do.php?action=addBlacklist&sid=项目id&phone=要加入黑名单的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url).body.string()
    log(r)
    
}

/*********************** 火云 *********************************** */
common.火云登录 = function(API帐号,密码){
    var url="http://huoyun888.cn/api/do.php?action=loginIn&name=API帐号&password=密码"
    url=url.replace("API帐号",API帐号)
    url=url.replace("密码",密码)
    r=http.get(url)
    r=r.body.string()
    log(url)
    if(r.substring(0,1)==1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        return r
    }else{
        return 0
    }
}
common.火云取用户信息 = function(令牌){
    var url="http://huoyun888.cn/api/do.php?action=getSummary&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url).body.string()
    console.info(r)
    return r
}
common.火云获取手机号 = function(项目id,令牌,虚拟号){
    var url="http://huoyun888.cn/api/do.php?action=getPhone&sid=项目id&token=登录时返回的令牌&vno=虚拟号"//vno=1 表示指定只取虚拟运营商， vno=0 表示排除过滤虚拟运营商。
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("虚拟号",虚拟号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(0,r.indexOf("|"))
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }

}
common.火云获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://huoyun888.cn/api/do.php?action=getMessage&sid=项目id&phone=取出来的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.火云手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://huoyun888.cn/api/do.php?action=addBlacklist&sid=项目id&phone=要加入黑名单的手机号&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url).body.string()
    log(r)
    
}
/*********************** 快云 *********************************** */
common.快云登录 = function(用户名,密码){
    var url="http://api.ky319.com/api/do.php?op=login&u=用户名&p=用户密码"
    url=url.replace("用户名",用户名)
    url=url.replace("用户密码",密码)
    r=http.get(url)
    r=r.body.string()
    log(url)
    if(r.substring(0,1)==1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        return r
    }else{
        return 0
    }
}
common.快云取用户信息 = function(令牌){
    var url="http://api.ky319.com/api/do.php?op=getUserInfo&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url).body.string()
    console.info(r)
    return r
}
common.快云获取手机号 = function(项目id,令牌,虚拟号){
    var url="http://api.ky319.com/api/do.php?op=getPhone&token=登录时返回的令牌&getPhoneCount=1&projId=项目id&sp=虚拟号"//(空,移动,联通,电信,虚拟商,非虚拟商)直接打中文上去
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("虚拟号",虚拟号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }

}
common.快云获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://api.ky319.com/api/do.php?op=getMessage&token=登录时返回的令牌&phone=取出来的手机号&projId=项目id"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url).body.string()
    if(r.substring(0,1)==1){
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.快云手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://api.ky319.com/api/do.php?op=addBlacklist&token=登录时返回的令牌&phone=要加入黑名单的手机号&projId=项目id"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url).body.string()
    log(r)
    
}

/*********************** 易码 *********************************** */
common.易码登录 = function(用户名,密码){
    var url="http://api.fxhyd.cn/UserInterface.aspx?action=login&username=用户名&password=用户密码"
    url=url.replace("用户名",用户名)
    url=url.replace("用户密码",密码)
    r=http.get(url)
    r=r.body.string()
    log(url)
    if(r.indexOf("success")>-1){
        console.info("登录成功!")
        r=r.substring(r.indexOf("|")+1,r.length)
        return r
    }else{
        return 0
    }
}
common.易码取用户信息 = function(令牌){
    var url="http://api.fxhyd.cn/UserInterface.aspx?action=getaccountinfo&token=登录时返回的令牌"
    url=url.replace("登录时返回的令牌",令牌)
    var r=http.get(url).body.string()
    console.info(r)
    return r
}
common.易码获取手机号 = function(项目id,令牌,排除号段){
    var url="http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=登录时返回的令牌&itemid=项目id&excludeno=排除号段"//(空,移动,联通,电信,虚拟商,非虚拟商)直接打中文上去
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("排除号段",排除号段)
    var r=http.get(url).body.string()
    if(r.indexOf("success")>-1){
        r=r.substring(r.indexOf("|")+1,r.length)
        console.info("成功获取到:"+r)
        return r
    }else{
        return 0
    }

}
common.易码获取验证码 = function(项目id,令牌,取出来的手机号,验证码左边字符,验证码位数){
    var url="http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=登录时返回的令牌&itemid=项目id&mobile=取出来的手机号"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("取出来的手机号",取出来的手机号)
    var r=http.get(url).body.string()
    if(r.indexOf("3001")!=-1){ //短信尚未到达：3001
        r=r.substring(r.indexOf("|")+1,r.length)
        r=r.substring(r.indexOf(验证码左边字符)+验证码左边字符.length,r.indexOf(验证码左边字符)+验证码左边字符.length+验证码位数)
        console.info("成功获取到:"+r)
        return r
    }else{
        return r
    }
}
common.易码手机号加入黑名单 = function(项目id,令牌,要加入黑名单的手机号){
    var url="http://api.fxhyd.cn/UserInterface.aspx?action=addignore&token=登录时返回的令牌&itemid=项目id&mobile=要加入黑名单的手机号"
    url=url.replace("登录时返回的令牌",令牌)
    url=url.replace("项目id",项目id)
    url=url.replace("要加入黑名单的手机号",要加入黑名单的手机号)
    var r=http.get(url).body.string()
    log(r)
    
}
module.exports = common;