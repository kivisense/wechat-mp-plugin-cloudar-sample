Component({
  properties: {
    fps: {
      type: Number,
      default: 60,
    }
  },
  async ready() {
    const giftLoading = [];
    for (let i = 0; i <= 74; i++) {
      const name = `${i}`.padStart(5, '0');
      giftLoading.push(`../images/RedPacket/RedPacket_${name}.png`);
    }
    try {
      const { width: canvasWidth, height: canvasHeight } = await new Promise((r) => {
        const query = this.createSelectorQuery();
        query.select('#sequence').boundingClientRect(r);
        query.exec();
      })

      const { width: imageWidth, height: imageHeight } =  await new Promise((resolve, reject)=>{
        wx.getImageInfo({
          src: giftLoading[0],
          success (res) {
            resolve(res)
          },
          fail(e){
            reject(e)
          }
        })
      })
      const cxt = wx.createCanvasContext('image-sequence', this);
        let frameIndex = 0;
        const render = () => {
          if (frameIndex >= giftLoading.length) {
            frameIndex = 0;
          }
          cxt.drawImage(
            giftLoading[frameIndex++],
            0, 0,
            imageWidth, imageHeight,
            0, 0,
            canvasWidth, canvasHeight,
          );
          cxt.draw(false);
          setTimeout(render, 1000 / this.data.fps);
        };
        render();
    } catch (error) {
      console.error(error);
    }
  },
  detached(){

  },
  methods: {}
})