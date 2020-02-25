const cloudar = requirePlugin("cloudar");

Page({
  data: {
    result: "",
    giftVisibility: false
  },
  async start() {
    // this.setData({'giftVisibility':true})
    const { identifier, metadata } = await cloudar.startCloudar();
    const { data: { projectId, sceneId } } = JSON.parse(metadata);
    this.setData({'giftVisibility':true})
    const result = JSON.stringify({
      collectionId: projectId,
      identifier,
      sceneId,
    }, null, "\t");
    this.setData({ result });
  },
  stop() {
    cloudar.stopCloudar();
  },
  error(e) {
    if (e && e.detail && e.detail.detail && e.detail.detail.errMsg) {
      if (e.detail.detail.errMsg.includes("auth")) {
        const page = this;
        wx.showModal({
          title: "提示",
          content: "请给予“摄像头”权限",
          success() {
            wx.openSetting({
              success({ authSetting: { "scope.camera": isGrantedCamera } }) {
                if (isGrantedCamera) {
                  wx.redirectTo({ url: '/' + page.__route__ });
                } else {
                  wx.showToast({ title: "获取“摄像头”权限失败！", icon: "none" });
                }
              }
            });
          }
        });
      }
    }
  }
})
