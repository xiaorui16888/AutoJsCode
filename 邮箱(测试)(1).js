"ui";
importClass(android.content.Intent);
importClass(android.net.Uri);
//你们运行一下，我手机上可以
uri=Uri.parse("mailto:135283717@qq.com"); 
intent=new Intent(Intent.ACTION_SENDTO,uri);
intent.putExtra(Intent.EXTRA_SUBJECT,"邮箱的intent");
intent.putExtra(Intent.EXTRA_TEXT,"可以帮我转成auto.js的格式吗？");

//activity.startActivity(Intent.createChooser(i, "Choice"))
activity.startActivity(intent);
//就是不知道怎么转换成auto.js的;