<template>
 <div id='bkg'>
    <div id='top-bar'>
      <!-- 顶部导航区 -->
      <div id='title' style="cursor:pointer" v-on:click="backToIndex()">民间借贷裁判规则库</div>
    </div>
    <div id="welcome">
      <el-row style="width:90%"  type="flex" justify="center">
        <!-- 内容展示区 -->
        <div id="viewContent" :style="{width: widthData}">
            {{showData}}
        </div>
      </el-row>
      <div class="index-footer">
      <!-- 底栏容器 -->
        <div class="support-box">
          <span class="technology-support-tip">技术支持</span>
          <img height="18" width="60" src='@/assets/tsinghua@2x.png'>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="https://beian.miit.gov.cn/" class="technology-support-tip">京ICP备2021010617号 </a>
        </div>
        <div class="tip-box">
          <span calss="new-version-tip">请使用最新版本Chrome浏览器</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'caseDetail',
  data () {
    return {
      screenWidth: document.body.clientWidth,
      param: {},
      caseData: {}
    }
  },
  computed: {
    showData () {
      return this.caseData
    },
    widthData () {
      if (this.screenWidth > 750) {
        return '80%'
      } else {
        return '100%'
      }
    }
  },
  methods: {
    backToIndex () {
      this.$router.push({
        path: '/'
      })
    },
    fetchData (query) {
      console.log(query)
      const url = '/api' + query.url.split('.com')[1]
      console.log('url', url)
      let data = new FormData()
      data.append('case_id', query.param)
      this.$axios.post(url, data).then((response) => {
        console.log('response.data', response.data)
        let msg = response.data.msg
        let statusCode = response.data.code
        this.caseData = response.data.info
        this.loading = false
        if (statusCode) {
          this.$message.error('访问数据失败:', msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetchData(this.$route.query)
  }
}
</script>

<style scoped>
  .el-select { width: 8em; border: 0;}

  .input-with-select {
    font-size: 1.8vh;
  }
  #title{
  width: 10em;
  height: 1.2em;
  font-size: 3em;
  font-family: "Microsoft YaHei",sans-serif;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1em;
}
#icon{
  width: 2em;
  height: 2.5em;
  margin-right: 1em;
}
#top-bar {
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 8vh;
  background: #1F589B;
  border: 1px solid #E6E6E6;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
}
#viewContent{
    overflow: auto;
    background: #FFFFFF;
    float: left;
  }
#welcome {
  position: absolute;
  width: 100%;
  background: #F0F2F5;
  margin:8vh 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#bkg{
  margin: 0;
  width: 100vw;
  font-size:1vh;
  position: relative;
}
.index-footer {
    background: #F0F2F5;
    height: 8%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  }
.support-box {
    margin-top:2vh;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.6em;
    color: #999999;
  }
  .support-box a {
    text-decoration: none;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.6em;
    color: #999999;
  }
  .tip-box {
    margin-top:0.6vh;
    margin-bottom:2vh;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.6em;
    color: #999999;;
  }
</style>
