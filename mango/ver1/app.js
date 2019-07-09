"use strict";

const vm = new Vue({
  el : '#app',
  data : {
    api : [],
    show: false,
    currentChangeId:0,
    currentChangeStatus:"",
    checkedNames:[ "尚未出貨" ],
  },
  created: function() { this.getAllTeacher() },
  // watch: {
  //   currentChangeId: function (val) {
  //     this.changeStatus();
  //     this.getAllTeacher();
  //   },
  //   currentChangeStatus: function (val) {
  //     this.changeStatus();
  //     this.getAllTeacher();
  //   },
  // },

  methods : {
    getAllTeacher : function() {
      let self = this;
      self.show=false;
      axios({
        methods: 'get',
        url: 'https://script.google.com/macros/s/AKfycbzNWg_m6xmdZUSBKxb8cOXL5OVpJnho5Oxkb0KDA2PM80UJa0g/exec'
      })
      .then((resp) => {
        self.api = resp.data.data
      self.show=true;
      ;
      });
    },
    changeStatus : function() {
      let self = this;
      self.show=false;
      // self.api[self.currentChangeId-1].status=self.currentChangeStatus;
      axios({
        methods: 'get',
        url: 'https://script.google.com/macros/s/AKfycbwJyxE9olyV7uIMIyxygjxWUm8aGS0mZ3m2z7wkfe1pPCIf2lzl/exec?id='+self.currentChangeId+'&status='+self.currentChangeStatus
      });
      self.getAllTeacher();
      self.show=true;

   
     
    
    }
  }
});