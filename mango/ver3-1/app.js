var vConsole = new VConsole();
liff.init(
  data => {
    // Now you can call LIFF API
    const userId = data.context.userId;
    console.log("userId: ", userId);
  },
  err => {
    // LIFF initialization failed
  }
);

const vm = new Vue({
  el: "#app",
  data: {
    api: [],
    liff: [],
  },
  created: function() {
    let self = this;
    self.liff =  window.liff;
    console.log(self.liff);
  },
  watch: {
    // show: function() {
    //   let self = this;
    //   if (self.show == "historyList") {
    //     setTimeout(function() {
    //       self.getList();
    //     }, 2000);
    //   }
    // }
  },
  methods: {
    // getList: function() {
    //   let self = this;
    //   self.loading = true;
    //   axios({
    //     methods: "get",
    //     url:
    //       "https://script.google.com/macros/s/AKfycbz-7KYcM8ZYDsGIQcb_TLyZTyUdTYyunSUnYOEPxA/exec?method=getList&recphone=" +
    //       self.registerData.userData.phone
    //   }).then(resp => {
    //     self.api = resp.data;
    //     self.loading = false;
    //   });
    // }
  }
});
