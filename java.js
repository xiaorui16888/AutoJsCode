package com.mycompany.ZQH;
//注册一堆烂玩意
import android.app.*;
import android.content.*;
import android.os.*;
import android.view.*;
import android.view.View.*;
import android.widget.*;

public class MainActivity extends Activity 
{
	//先声明一遍
	EditText tan,qing,yang,xxx,yyy,zzz;
	private TextView aaa;
	private TextView bbb;
	private TextView ccc;
	private TextView ddd;
	Button kkk;
	protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		//再来一遍
		tan=(EditText)findViewById(R.id.tan);
		qing=(EditText)findViewById(R.id.qing);
		yang=(EditText)findViewById(R.id.yang);	
		this.aaa=(TextView)super.findViewById(R.id.aa);
		this.bbb=(TextView)super.findViewById(R.id.bb);
		this.ccc=(TextView)super.findViewById(R.id.cc);
		this.ddd=(TextView)super.findViewById(R.id.dd);
		this.kkk=(Button)super.findViewById(R.id.bbbb);
	    //监听事件声明
		kkk.setOnClickListener(new Showlistener());
		}
		//分享事件处理
       public void share(View vi){
	   Intent send=new Intent();
	   send.setAction(Intent.ACTION_SEND);
	   send.putExtra(Intent.EXTRA_TEXT,"我在用一款神奇的软件");
	   send.setType("text/plain");
	   startActivity(Intent.createChooser(send,"是不很新奇快告诉小伙伴吧"));
	   }
	
	   private class Showlistener implements OnClickListener
	{
       //运算事件处理
		@Override
		public void onClick(View p1)
		{
			Intent intent=new Intent();
			//获得数据
			intent.putExtra("tan",tan.getText().toString());
			intent.putExtra("qing",qing.getText().toString());
			intent.putExtra("yang",yang.getText().toString());
            //声明变量
			int ix,iy,iz,ia,ib,ic,id;
			//声明标签对象并得到
			TextView aaa=(TextView)findViewById(R.id.aa);
			TextView bbb=(TextView)findViewById(R.id.bb);
			TextView ccc=(TextView)findViewById(R.id.cc);
			TextView ddd=(TextView)findViewById(R.id.dd);
			//赋值
			ix=Integer.parseInt(intent.getStringExtra("tan"));
			iy=Integer.parseInt(intent.getStringExtra("qing"));
			iz=Integer.parseInt(intent.getStringExtra("yang"));
			//第一次运算
			ia=1;
			ib=(2*ix+iy/2-iz)/2;
			ic=ix;
			id=iy/2;
			//第一次检测能否整除
			if(iy%2==1){
				//扩大二倍
				ia=2;
				ib=2*ib;
				ic=2*ic;
				id=iy;
				//再次检测，不知道有没有简单写法
				if((2*ix-iy)==1){
					//好烦啊，再扩二倍
					ia=4;
					ib=2*ib;
					ic=4*ix;
					id=2*iy;	
				}
				
			}	
			//总算算完了，我知道你们可能调戏程序，我得看看
			if(iy>=(2*ix+2)||(iz>2*ix)||(ib<=0))
				{
				aaa.setText("我真是服了");
				bbb.setText("你瞅瞅你那啥破燃烧物");
				ccc.setText("还有比机器还傻的");
				ddd.setText("快回幼儿园吧");
			}else{
			//设置文本，撒花
			aaa.setText(ia+"");
			bbb.setText(ib+"");
			ccc.setText(ic+"");
			ddd.setText(id+"");
			
			Intent send=new Intent();
			send.setAction(Intent.ACTION_SEND);
			send.putExtra(Intent.EXTRA_TEXT,"我在用一款神奇的软件，它可以自己配平燃烧的化学方程式，我设定碳氢氧的系数分别为"+ix+"、"+iy+"、"+iz+"，于是它立刻帮我算出此时"+"燃烧物系数为"+ia+"，氧气系数为"+ib+"，二氧化碳系数为"+ic+"，水的系数为"+id);
			send.setType("text/plain");
				startActivity(Intent.createChooser(send,"怎么样，是不算的又快又准，已设定碳氢氧的系数分别为"+ix+"、"+iy+"、"+iz+"，结果：燃烧物系数为"+ia+"，氧气系数为"+ib+"，二氧化碳系数为"+ic+"，水的系数为"+id));
}
		}
		}
		}
		