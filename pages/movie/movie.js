// pages/movie/movie.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth: 0,
    winHeight: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    movies: [],
    rpxR:1,
    imgUrls: [
      '../images/bg.jpg',
      '../images/cloud.jpg',
      '../images/bg.jpg',
      '../images/cloud.jpg'
    ]

  },
  switchNav: function (e) {
    var id = e.currentTarget.id;
    this.setData({ currentTab: id });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {

        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        page.setData({ rpxR: rpxR });
        var helfH = (clientHeight-45) *rpxR;
        var helfW = clientWidth * rpxR;


        page.setData({ winWidth: helfW});
        page.setData({ winHeight: helfH});
        console.log(page.data.winHeight);
      },
    })
    this.loadMovies();
  },

  loadMovies: function () {
    var page = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/coming_soon',
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        console.log(res);
        var subjects = res.data.subjects;
        var size = subjects.length;
        var len = parseInt(size / 3);
        var helfH = (((len + 1) * 230) - 45) * page.data.rpxR;
      
        console.log(subjects);
        page.setData({ movies: subjects });
        page.setData({ winHeight: helfH});

      }
    })
  },

  loadDetail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + id,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})