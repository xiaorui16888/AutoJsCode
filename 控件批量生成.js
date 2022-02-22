






a="zxcvbnm".split("");
kj="<horizontal>";
sj="";
for(i=0;i<a.length;i++){
kj+='<button id="an'+a[i]+'" text="'+a[i]+'" size="10" h="60" w="35"/>';
sj+='ui.an'+a[i]+'.click(()=>{dj("'+a[i]+'");});';
}
kj+="</horizontal>"
setClip(kj);
setClip(sj);