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
  console.log('v5',data);
}
function getpara(paraName){
  
//先取得網址字串，假設此頁網址為「index.aspx?id=U001&name=GQSM」
var url = location.href;

//再來用去尋找網址列中是否有資料傳遞(QueryString)
if(url.indexOf('?')!=-1)
{
    var id = "";
    //在此直接將各自的參數資料切割放進ary中
    var ary = url.split('?')[1].split('&');
    //此時ary的內容為：
    //ary[0] = 'id=U001'，ary[1] = 'name=GQSM'
    
    //下迴圈去搜尋每個資料參數
    for(i=0;i<=ary.length-1;i++)
    {
        //如果資料名稱為id的話那就把他取出來
        if(ary[i].split('=')[0] == paraName)
            return ary[i].split('=')[1]
    }
    return undefined
    
}

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
      allShow: false,
      historyUrl: 'line://app/1595482888-YOMDD2xP',
    },
    loading: true
  },
  created: function() {
    Logger(getpara('recPer'))
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
    nowPage: function() {
      let self = this;
      Logger("換頁");
      if(self.nowPage=='history'){
        Logger("換頁2");
        liff.openWindow({
          url: self.historyUrl + "?lineId=" + self.userId,
          external:false
        });
      }
    },
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
