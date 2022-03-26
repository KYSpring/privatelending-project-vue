<template>
 <div id='bkg'>
    <div id='top-bar'>
      <!-- 顶部导航区 -->
      <div id='title' style="cursor:pointer" v-on:click="backToIndex()">民间借贷裁判规则库</div>
    </div>
    <div id="welcome">
      <el-row  type="flex" justify="center" >
        <!-- 内容展示区 -->
        <div v-if="Object.keys(caseData).length" id="viewContent" :style="{width: widthData}">
            <el-col :span="24">
              <el-row :span="24" style="text-align:center;margin: 1rem 0;">
                <span class="caseTitle">{{caseData.attrs.title}}</span>
              </el-row>
              <el-row :span="24" class="caseSub" type="flex" justify="space-around" style="text-align:center">
                <el-col :span="7">{{caseData.attrs.case_no}}</el-col>
                <el-col :span="3">{{caseData.attrs.case_type}}</el-col>
                <el-col :span="6">{{caseData.attrs.court_name}}</el-col>
                <el-col :span="3">{{caseData.attrs.judgement_date}}</el-col>
              </el-row>

              <el-row justify="start" v-for="(seg,index) in caseData.segments" :key="index" style="margin: 1rem 2rem">
                <el-row class="casetxtLabel">
                  {{seg.label}}
                </el-row>
                <el-row :span="24" class="casetxt" v-for="(txtLine,id) in seg.txt" :key="id">{{txtLine}}</el-row>
              </el-row>
            </el-col>
        </div>
        <div v-else v-loading="loading"
             element-loading-text="数据加载中"
              id="viewContent" :style="{width: widthData}">
        </div>
      </el-row>
    </div>
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
</template>

<script>
export default {
  name: 'caseDetail',
  data () {
    return {
      screenWidth: document.body.clientWidth,
      param: {},
      caseData: {},
      loading: false
    }
  },
  computed: {
    widthData () {
      if (this.screenWidth > 750) {
        return '70%'
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
    // 数据本地化后的fetchdata
    fetchData (query) {
      this.loading = true
      const url = 'http://188.131.144.236:7777/privatelending/getCaseData' // 正式环境
      const caseKey = query.caseKey
      this.$axios.get(url, {
        params: {
          casekey: caseKey
        }
      }).then((response) => {
        let msg = response.statusText
        let statusCode = response.status
        this.caseData = response.data.info.info
        this.loading = false
        if (statusCode !== 200) {
          this.$message.error('访问数据失败:', msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
    // 旧的fetchdata
    // fetchData (query) {
    //   this.loading = true
    //   // const url = '/api' + query.url.split('.com')[1] // 测试环境
    //   const url = query.url // 正式环境
    //   console.log('url', url)
    //   let data = new FormData()
    //   data.append('case_id', query.param)
    //   this.$axios.post(url, data).then((response) => {
    //     let msg = response.data.msg
    //     let statusCode = response.data.code
    //     this.caseData = response.data.info
    //     this.loading = false
    //     console.log('caseData', this.caseData)
    //     if (statusCode) {
    //       this.$message.error('访问数据失败:', msg)
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  created () {
    this.fetchData(this.$route.query)
  }
}
</script>

<style scoped>
.casetxt {
  font-size: 2rem;
  margin:0rem 4rem;
  line-height: 4rem;
}
.casetxtLabel {
  font-size: 2.5rem;
  font-weight: bold;
  margin:2rem 3rem
}
.caseTitle {
  font-size:3rem;
  font-weight: bold;
}
.caseSub{
  font-size:2rem;
  margin: 1rem 0
}
  #title{
  width: 35rem;
  height: 1.2rem;
  font-size: 3rem;
  font-family: "Microsoft YaHei",sans-serif;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 1rem;
}
#icon{
  width: 2rem;
  height: 2.5rem;
  margin-right: 1rem;
}
#top-bar {
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 8rem;
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
    position: relative;
    min-height: 78vh;
    overflow: auto;
    background: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
#welcome {
  position: relative;
  width: 100%;
  background: #F0F2F5;
  margin-top:8vh;
  justify-content: center;
}
#bkg{
  margin: 0;
  width: 100vw;
  font-size:1rem;
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
    font-size: 0.6rem;
    color: #999999;
  }
  .support-box a {
    text-decoration: none;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.6rem;
    color: #999999;
  }
  .tip-box {
    margin-top:0.6vh;
    margin-bottom:2vh;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.6rem;
    color: #999999;;
  }
</style>
