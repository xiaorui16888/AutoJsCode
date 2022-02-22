"ui";
auto();
setScreenMetrics(720 , 1280);
http.get("www.baidu.com", {}, function(res, err){
			if(err){
				//console.error(err);
				toast("网络异常，请稍后重试！");
				return;
			}
			//log("code = " + res.statusCode);
			//log("html = " + res.body.string());
			//登录成功
			
			var strRes = res.body.string();
			toast(strRes);
			//if(res.body.string().indexOf("login-ok") >= 0)
			if(strRes.contains("title") >= 0)
			{
				toast("成功！");
				
			}
			else
			{
				toast("失败");
			}
		});