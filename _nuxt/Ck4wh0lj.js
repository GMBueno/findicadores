import{R as m,Y as u,t as p,v as c,a3 as v,a4 as d,T as s,x as i,a5 as l,X as g}from"./Y1-kzYOd.js";import{s as f}from"./XpITsjgG.js";var y={root:function(a){var n=a.props;return["p-timeline p-component","p-timeline-"+n.align,"p-timeline-"+n.layout]},event:"p-timeline-event",opposite:"p-timeline-event-opposite",separator:"p-timeline-event-separator",marker:"p-timeline-event-marker",connector:"p-timeline-event-connector",content:"p-timeline-event-content"},T=m.extend({name:"timeline",classes:y}),h={name:"BaseTimeline",extends:f,props:{value:null,align:{mode:String,default:"left"},layout:{mode:String,default:"vertical"},dataKey:null},style:T,provide:function(){return{$parentInstance:this}}},k={name:"Timeline",extends:h,inheritAttrs:!1,methods:{getKey:function(a,n){return this.dataKey?u.resolveFieldData(a,this.dataKey):n},getPTOptions:function(a,n){return this.ptm(a,{context:{index:n,count:this.value.length}})}}};function O(e,a,n,P,K,r){return p(),c("div",s({class:e.cx("root")},e.ptmi("root")),[(p(!0),c(v,null,d(e.value,function(o,t){return p(),c("div",s({key:r.getKey(o,t),class:e.cx("event")},r.getPTOptions("event",t)),[i("div",s({class:e.cx("opposite",{index:t})},r.getPTOptions("opposite",t)),[l(e.$slots,"opposite",{item:o,index:t})],16),i("div",s({class:e.cx("separator")},r.getPTOptions("separator",t)),[l(e.$slots,"marker",{item:o,index:t},function(){return[i("div",s({class:e.cx("marker")},r.getPTOptions("marker",t)),null,16)]}),t!==e.value.length-1?l(e.$slots,"connector",{key:0,item:o,index:t},function(){return[i("div",s({class:e.cx("connector")},r.getPTOptions("connector",t)),null,16)]}):g("",!0)],16),i("div",s({class:e.cx("content")},r.getPTOptions("content",t)),[l(e.$slots,"content",{item:o,index:t})],16)],16)}),128))],16)}k.render=O;export{k as default};