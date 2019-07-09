var vConsole = new VConsole();
const vm = new Vue({
  el: "#app",
  data: {
    api: [],
    registerData: {
      userData: {},
      user2Data: {},
      count: 1,
      isSame: false,
      city: "選擇...",
      area: "選擇...",
      city2: "選擇...",
      area2: "選擇...",
      allCity: [],
      areaList: [],
      area2List: [],
      areaShow: false,
      area2Show: false
    },
    login: {
      userphone: "",
      password: "",
      loginBackApi: []
    },
    cardLast5Num: [],
    show: "first",
    loading: false
  },
  created: function() {
    let self = this;
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
    liff
      .getProfile()
      .then(profile => {
        const name = profile.displayName;
        console.log("name: ", name);
      })
      .catch(err => {
        console.log("error", err);
      });
  },
  watch: {
    show: function() {
      let self = this;
      if (self.show == "historyList") {
        setTimeout(function() {
          self.getList();
        }, 2000);
      }
    }
  },
  methods: {
    getList: function() {
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbz-7KYcM8ZYDsGIQcb_TLyZTyUdTYyunSUnYOEPxA/exec?method=getList&recphone=" +
          self.registerData.userData.phone
      }).then(resp => {
        self.api = resp.data;
        self.loading = false;
      });
    }
  }
});
