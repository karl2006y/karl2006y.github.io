var vConsole = new VConsole();
// liff.init(
//   data => {
//     // Now you can call LIFF API
//     const userId = data.context.userId;
//     Logger("userId: ", userId);
//   },
//   err => {
//     // LIFF initialization failed
//   }
// );
function Logger(data) {
  console.log('v2',data);
}
const vm = new Vue({
  el: "#app",
  data: {
    api: [],
    liff: [],
    userId: "",
    api: {},
    customerData: {},
    nowPage: "",
    registerData: {
      userData: {
        name: "林裕凱",
        birthday: "1998-10-25",
        phone: "0931509777",
        email: "karl2015y@gmail.com",
        address: "臺中市北區國豐街133號",
        recPer: "郭培聖",
        lineId: ""
      },
      count: 1,
      isSame: false,
      city: "選擇...",
      area: "選擇...",
      allCity: [],
      areaList: [],
      cityShow: true,
      areaShow: false,
      allShow: false
    },
    loading: true
  },
  created: function() {
 

    let self = this;
    self.loading = true;
    liff.init(
      data => {
        // Now you can call LIFF API
        self.userId = data.context.userId;
      },
      err => {
        // LIFF initialization failed
      }
    );
    // self.userId = "U729a733b259f5e529339bf36b9f3da13";
   

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
    userId: function() {
      let self = this;
      Logger(self.userId + "載入成功");
    Logger( "vue: ",self);
      self.isCustomer();
    },
    "registerData.city": function() {
      let self = this;
      self.registerData.areaShow = false;
      self.registerData.cityShow = false;

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
    "registerData.area": function() {
      let self = this;
      self.registerData.userData.address =
        self.registerData.city + self.registerData.area;
      self.registerData.areaShow = false;
      self.registerData.allShow = true;
    }
  },

  methods: {
    isCustomer: function() {
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbwJXlWfM0YZ4mN2uU2a1kEp9y6UWl_DvTuTIWD51JXLoHjlGvg/exec?method=isCustomer&id=" +
          self.userId
      }).then(resp => {
        self.api = resp.data;
        if (self.api.status) {
          self.customerData = self.api;
          self.api = {};
          self.nowPage='history'
          self.loading = false;
          Logger("會員");
        } else {
          self.api = {};
          self.nowPage = "register";
          self.loading = false;
          Logger("非會員");
        }
      });
    },
    registerHandler: function() {
      let self = this;
      self.loading = true;
      axios({
        methods: "get",
        url:
          "https://script.google.com/macros/s/AKfycbwJXlWfM0YZ4mN2uU2a1kEp9y6UWl_DvTuTIWD51JXLoHjlGvg/exec?method=register&name=" +
          self.registerData.userData.name +
          "&birthday=" +
          self.registerData.userData.birthday +
          "&phone=" +
          self.registerData.userData.phone +
          "&email=" +
          self.registerData.userData.email +
          "&address=" +
          self.registerData.userData.address +
          "&recPer=" +
          self.registerData.userData.recPer +
          "&lineId=" +
          self.userId
      }).then(resp => {
        self.api = resp.data;
        if (self.api.status) {
          self.customerData = self.api;
          self.nowPage='history'
          self.api = {};
          self.loading = false;
          Logger("註冊成功");
        }
      });
    }
  }
});
