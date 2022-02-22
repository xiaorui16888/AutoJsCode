var q=0;
while(true)
{
q++;
toast("我在循环内");
if(q==5)
{
break;
toast("我不会被执行");
}
}
toast("我在循环外");
