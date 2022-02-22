"ui";
var h=50;
var ts="100px"
var text="伪三维效果";
var cs=5;
var m=3;
var bs=5;

var str="ui.layout(<frame><frame id='fa'margin='100px'>"
for(var i=0;i<h*bs;i=i+bs){
    str=str+"<text textColor='"+colora(i+cs,m)+"'margin='"+i/bs+"px'textSize='"+ts+"'text='"+text+"'/>";
}
str=str+"<text textColor='#aaaaaa'margin='"+i/bs+"px'textSize='"+ts+"'text='"+text+"'/></frame></frame>);";
eval(str);

function colora(i,c){
    i=i.toString(16);
    if(i.length==1){
        i="0"+i;
        log("c");
    }
    if(c==1){
        return "#"+i+i+"00";
    }if(c==2){
        return "#00"+i+i;
    }if(c==3){
        return "#"+i+"00"+i;
    }
}

for(var r=0;;r++){
    ui.fa.setRotation(r);
    if(r==360){
        r=0;
    }
}
    
    