(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6fa60b26"],{"0bb4":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"register"},[a("el-container",[a("el-main",[a("el-row",{staticStyle:{"box-shadow":"0 2px 12px 0 rgba(0, 0, 0, 0.1)","background-color":"#FFFFFF","border-radius":"4px"}},[a("el-col",{attrs:{span:20,offset:2}},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px"}},[a("p"),a("el-form-item",{attrs:{label:"姓名",prop:"name",rules:[{required:!0,message:"連絡電話不能為空",trigger:"blur"}]}},[a("el-input",{attrs:{type:"text",clearable:"",autocomplete:"off"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{label:"出生日期",prop:"birthday",rules:[{required:!0,message:"出生日期不能為空",trigger:"blur"}]}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",format:"MM月dd日","suffix-icon":"el-icon-date",clearable:"",autocomplete:"off"},model:{value:e.form.birthday,callback:function(t){e.$set(e.form,"birthday",t)},expression:"form.birthday"}})],1),a("el-form-item",{attrs:{label:"連絡電話",prop:"phone",rules:[{required:!0,message:"連絡電話不能為空",trigger:"blur"}]}},[a("el-input",{attrs:{type:"text",clearable:"",autocomplete:"off"},model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1),a("el-form-item",{attrs:{label:"電子信箱",prop:"email",rules:[{required:!0,message:"電子信箱不能為空",trigger:"blur"}]}},[a("el-input",{attrs:{type:"text",clearable:"",autocomplete:"off"},model:{value:e.form.email,callback:function(t){e.$set(e.form,"email",t)},expression:"form.email"}})],1),a("el-form-item",{attrs:{rules:[{required:!0,message:"連絡地址不能為空",trigger:"blur"}],label:"聯繫地址"}},[e.addressChoose?a("el-cascader",{attrs:{props:e.form.address.addressList},model:{value:e.form.address.values,callback:function(t){e.$set(e.form.address,"values",t)},expression:"form.address.values"}}):a("el-input",{attrs:{placeholder:"請輸入詳細地址",clearable:""},model:{value:e.form.address.value,callback:function(t){e.$set(e.form.address,"value",t)},expression:"form.address.value"}})],1),a("el-row",[a("el-col",{attrs:{span:3,offset:9}},[e.canSent?a("el-button",{attrs:{type:"danger",loading:!1}},[e._v("加入並註冊")]):a("el-button",{attrs:{disabled:"",plain:"",type:"danger",loading:!1}},[e._v("註冊")])],1)],1),a("p")],1)],1)],1)],1)],1)],1)},o=[],s=(a("7f7f"),a("ac6a"),a("6b54"),a("a481"),a("bc3a")),l=a.n(s),n={name:"register",data:function(){return{form:{phone:"",name:"",email:"",birthday:"",address:{value:"",values:[],addressList:{lazy:!0,lazyLoad:function(e,t){e.label?l()({methods:"get",url:"https://script.google.com/macros/s/AKfycbyAxehtbFWqje0TGMRMKteOvE2s0KCsVEboOVOGGjK5W6oQSdz_/exec?city="+e.label}).then(function(e){var a=e.data.data.map(function(e){return{value:e,label:e,leaf:!0}});t(a)}):l()({methods:"get",url:"https://script.google.com/macros/s/AKfycbyAxehtbFWqje0TGMRMKteOvE2s0KCsVEboOVOGGjK5W6oQSdz_/exec?city=all"}).then(function(e){var a=e.data.data.map(function(e){return{value:e,label:e,leaf:!1}});t(a)})}}}}}},created:function(){this.$store.dispatch("getLineId")},watch:{"form.address.values":{handler:function(e,t){this.form.address.value=this.form.address.values.toString().replace(",","")},immediate:!0,deep:!0}},computed:{lineId:function(){return this.$store.state.lineId},addressChoose:function(){return""==this.form.address.value},canSent:function(){return""!=this.form.address.value&&""!=this.form.phone&&""!=this.form.name&&""!=this.form.email&&""!=this.form.birthday}},methods:{onSubmit:function(){console.log("submit!")}}},i=n,c=(a("17d4"),a("2877")),d=Object(c["a"])(i,r,o,!1,null,"206e13fe",null);t["default"]=d.exports},"17d4":function(e,t,a){"use strict";var r=a("6116"),o=a.n(r);o.a},6116:function(e,t,a){},"7f7f":function(e,t,a){var r=a("86cc").f,o=Function.prototype,s=/^\s*function ([^ (]*)/,l="name";l in o||a("9e1e")&&r(o,l,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-6fa60b26.752418f7.js.map