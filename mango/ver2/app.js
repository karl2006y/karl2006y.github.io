"use strict";
$('.loader-inner').loaders();
const vm = new Vue({
  el: "#app",
  data: {
    api: [],
    registerData: {
      userData: {},
      user2Data: {},
      count:1,
      isSame: false,
      city: "選擇...",
      area: "選擇...",
      city2: "選擇...",
      area2: "選擇...",
      allCity: [],
      areaList: [],
      area2List: [],
      areaShow: false,
      area2Show: false,
      

    },
    login:{
      userphone:"",
      password:"",
      loginBackApi:[]
    },
    cardLast5Num:[],
    show: "first",
    loading: false
  },
  created: function() {
    let self = this;
    self.loading = true;

    axios({
      methods: "get",
      url:
        "https://script.google.com/macros/s/AKfycbyAxehtbFWqje0TGMRMKteOvE2s0KCsVEboOVOGGjK5W6oQSdz_/exec?city=all"
    }).then(resp => {
      self.registerData.allCity = resp.data.data;
      self.loading = false;
    });
  },
  watch: {
    show: function() {
      let self = this;
      if(self.show=="historyList"){
        setTimeout(function(){self.getList();},2000);
   
      }

      
    },
    "registerData.city": function() {
      let self = this;
      self.registerData.areaShow = false;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbyAxehtbFWqje0TGMRMKteOvE2s0KCsVEboOVOGGjK5W6oQSdz_/exec?city=" +
          self.registerData.city
      }).then(resp => {
        self.registerData.areaList = resp.data.data;
        self.registerData.areaShow = true;
      });
    },
    "registerData.city2": function() {
      let self = this;
      self.registerData.area2Show = false;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbyAxehtbFWqje0TGMRMKteOvE2s0KCsVEboOVOGGjK5W6oQSdz_/exec?city=" +
          self.registerData.city2
      }).then(resp => {
        self.registerData.area2List = resp.data.data;
        self.registerData.area2Show = true;        
      });
    },
    "registerData.area": function() {
      let self = this;
      self.registerData.userData.address = self.registerData.city + self.registerData.area
    },
    "registerData.area2": function() {
      let self = this;
      if(self.registerData.city2!='不用填寫'){
        self.registerData.user2Data.address = self.registerData.city2 + self.registerData.area2 
      }
      
    },
    "registerData.isSame": function() {
      let self = this;

      if (self.registerData.isSame) {
        self.registerData.user2Data = self.registerData.userData;
        self.registerData.city2 = "不用填寫";
        self.registerData.area2 = "不用填寫";
      } else {
        self.registerData.user2Data = {};
        self.registerData.city2 = "選擇...";
        self.registerData.area2 = "選擇...";
      }
      
    }
  },
  methods: {
    getList: function(){
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbz-7KYcM8ZYDsGIQcb_TLyZTyUdTYyunSUnYOEPxA/exec?method=getList&recphone=" +self.registerData.userData.phone 
      }).then(resp => {
        self.api = resp.data;
        self.loading = false;
      });
    },
    cardLast5NumHandler: function(id){
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
        "https://script.google.com/macros/s/AKfycbz-7KYcM8ZYDsGIQcb_TLyZTyUdTYyunSUnYOEPxA/exec?method=addCardLast5Num&id=" + id + "&cardlast5num=" + self.cardLast5Num[id]
          
      }).then(resp => {
        self.loading = false;
        self.getList();
      });

    },
    checkPassword: function(){
      let self = this;
      return self.registerData.userData.password == self.registerData.userData.repassword && self.registerData.userData.password != "" &&  self.registerData.userData.repassword != ""&& self.registerData.userData.password != undefined &&  self.registerData.userData.repassword != undefined
    },
   
    addUser: function() {
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbwJXlWfM0YZ4mN2uU2a1kEp9y6UWl_DvTuTIWD51JXLoHjlGvg/exec?method=addUser&name="+self.registerData.userData.name+"&phone="+self.registerData.userData.phone+"&email="+self.registerData.userData.email+"&address="+self.registerData.userData.address+"&password="+self.registerData.userData.password+"&recPer="+self.registerData.userData.recPer
          
      }).then(resp => {
        self.api = resp.data;
        self.login.userphone = self.registerData.userData.phone;
        self.login.password = self.registerData.userData.password;
        self.loginHandler()
        self.addBuy()
        self.loading = false;
      });
    },

    addBuy: function() {
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
        "https://script.google.com/macros/s/AKfycbz-7KYcM8ZYDsGIQcb_TLyZTyUdTYyunSUnYOEPxA/exec?method=addBuy&recPhone="+self.registerData.userData.phone+"&name="+self.registerData.user2Data.name+"&phone="+self.registerData.user2Data.phone+"&address="+self.registerData.user2Data.address+"&note="+self.registerData.note+"&count="+self.registerData.count
          
      }).then(resp => {
        if(login.loginBackApi.status){
          self.show = "historyList";
        }
        self.loading = false;
      });
    },

    loginHandler: function() {
      let self = this;
      self.loading = true;
      // self.api[self.currentChangeId-1].status=self.currentChangeStatus;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbwJXlWfM0YZ4mN2uU2a1kEp9y6UWl_DvTuTIWD51JXLoHjlGvg/exec?method=check&id="+self.login.userphone+"&password="+self.login.password
        }).then(resp => {
          self.login.loginBackApi = resp.data;
          if(self.login.loginBackApi.status){
            self.show = "historyList";
            self.registerData.userData = self.login.loginBackApi.data;
          }
          self.loading = false;
        });

    },
    loginedBuyHandler: function(){
      let self = this;
      self.registerData.userData = self.login.loginBackApi.data;
      self.registerData.count = 1;

      self.show = "register";
    }
  }
});
