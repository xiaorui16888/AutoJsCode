 "ui";
 ui.layout(
     <vertical>
         <list id="todoList">
             <card w="*" h="70" margin="10 5" cardCornerRadius="2dp"
             cardElevation="1dp" foreground="?selectableItemBackground">
             <horizontal gravity="center_vertical">
                 <View bg="{{this.color}}" h="*" w="10" />
                 <vertical padding="10 8" h="auto" w="0" layout_weight="1">
                     <text id="title" text="{{this.title}}" textColor="#222222" textSize="16sp" maxLines="1" />
                     <text text="{{this.summary}}" textColor="#999999" textSize="14sp" maxLines="1" />
                 </vertical>
                 <checkbox id="done" marginLeft="4" marginRight="6" checked="{{this.done}}" />
             </horizontal>
             
         </card>
     </list>
     </vertical>);
 ty("枫叶", "sjdj")

 function ty(title, summary) {
     todoList.push({
         title: title,
         summary: summary,
         color: materialColors[random(0, materialColors.length - 1)]
     });
 }