import{R as u,Y as r,t as s,v as o,x as d,T as i}from"./BlVSFuhK.js";import{s as p}from"./D0iILvv1.js";var b={root:function(a){var n=a.instance,l=a.props;return["p-radiobutton p-component",{"p-highlight":n.checked,"p-disabled":l.disabled,"p-invalid":l.invalid,"p-variant-filled":l.variant?l.variant==="filled":n.$primevue.config.inputStyle==="filled"}]},box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},c=u.extend({name:"radiobutton",classes:b}),h={name:"BaseRadioButton",extends:p,props:{value:null,modelValue:null,binary:Boolean,name:{type:String,default:null},variant:{type:String,default:null},invalid:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:c,provide:function(){return{$parentInstance:this}}},f={name:"RadioButton",extends:h,inheritAttrs:!1,emits:["update:modelValue","change","focus","blur"],methods:{getPTOptions:function(a){var n=a==="root"?this.ptmi:this.ptm;return n(a,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(a){if(!this.disabled&&!this.readonly){var n=this.binary?!this.checked:this.value;this.$emit("update:modelValue",n),this.$emit("change",a)}},onFocus:function(a){this.$emit("focus",a)},onBlur:function(a){this.$emit("blur",a)}},computed:{checked:function(){return this.modelValue!=null&&(this.binary?!!this.modelValue:r.equals(this.modelValue,this.value))}}},m=["data-p-highlight","data-p-disabled"],y=["id","value","name","checked","tabindex","disabled","readonly","aria-labelledby","aria-label","aria-invalid"];function v(e,a,n,l,g,t){return s(),o("div",i({class:e.cx("root")},t.getPTOptions("root"),{"data-p-highlight":t.checked,"data-p-disabled":e.disabled}),[d("input",i({id:e.inputId,type:"radio",class:[e.cx("input"),e.inputClass],style:e.inputStyle,value:e.value,name:e.name,checked:t.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:a[0]||(a[0]=function(){return t.onFocus&&t.onFocus.apply(t,arguments)}),onBlur:a[1]||(a[1]=function(){return t.onBlur&&t.onBlur.apply(t,arguments)}),onChange:a[2]||(a[2]=function(){return t.onChange&&t.onChange.apply(t,arguments)})},t.getPTOptions("input")),null,16,y),d("div",i({class:e.cx("box")},t.getPTOptions("box")),[d("div",i({class:e.cx("icon")},t.getPTOptions("icon")),null,16)],16)],16,m)}f.render=v;export{f as default};
