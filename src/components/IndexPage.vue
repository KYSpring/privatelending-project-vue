<template>
  <div id="index-page">
    <div class="index-header" :style="{backgroundImage:'url('+indexBgImg+')'}">
      <!-- 顶栏容器包括标题和搜索栏 -->
      <div class="title">民间借贷裁判规则库</div>
      <div class="search-bar">
        <el-input placeholder="请输入搜索内容" v-model="searchContent" class="search-input-with-select">
          <el-select v-model="searchSelect" slot="prepend" :placeholder="searchLabel">
            <el-option label="争议焦点" value="jiaodian"></el-option>
            <el-option label="裁判观点" value="guandian"></el-option>
            <el-option label="裁判依据" value="yiju"></el-option>
          </el-select>
          <el-button slot="append" class="search-button" icon="el-icon-search" v-on:click="submitQuery()"></el-button>
        </el-input>
      </div>
    </div>
    <div class="index-main">
    <!-- 主要区域容器包括导航栏 -->
      <div class="navigation-bar">
      <!-- 导航栏 -->
        <el-tabs :tab-position="tabPosition"  v-model="default_tab" class="category-tabs">
          <el-tab-pane v-for="(categoryName, categoryIndex) in categoryList"
            :key="categoryIndex"
            :label="categoryName"
            :name="categoryName"
            >
            <span slot="label" class="tabs-font">{{categoryName}}</span>
            <div class="controversy-focus-link-group">
              <div class="controversy-focus-link-box"
                v-for="(controversyFocusName, controversyFocusId) in controversyFocusList[categoryIndex]"
                :key="controversyFocusId">
                <el-link type="info" style="font-size:2rem" v-on:click="searchControversyFocus(categoryName, controversyFocusName)">{{controversyFocusName}}</el-link>
                <el-divider direction="vertical"></el-divider>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
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
import indexBgImg from '@/assets/index_header_background.jpg'
export default {
  name: 'Welcome',
  data () {
    return {
      url: 'http://188.131.144.236:7777/privatelending/', // 服务器端口
      // url: 'http://127.0.0.1:5000/privatelending/', // 本地测试接口
      searchContent: '',
      searchSelect: '',
      tabPosition: 'left',
      default_tab: '',
      is_stretch: 'true',
      searchLabel: '搜索主题',
      tag_colors: [], // 需要提前预设
      controversyFocusTagList: [],
      categoryList: [], // 类别标签
      controversyFocusList: [], // 争议焦点标签
      indexBgImg: indexBgImg
    }
  },
  methods: {
    submitQuery () {
      if (this.searchSelect === 'guandian') {
        this.searchLabel = '裁判观点'
      } else if (this.searchSelect === 'yiju') {
        this.searchLabel = '裁判依据'
      } else if (this.searchSelect === 'jiaodian') {
        this.searchLabel = '争议焦点'
      } else {
        this.searchLabel = '裁判观点'
      }
      if (this.searchContent) {
        this.$router.push({
          path: '/SearchPage',
          query: {
            isSearchControversyFocusLink: 'false',
            searchContent: this.searchContent,
            search_field_type: this.searchLabel,
            search_class: ''
          }
        })
      } else {
        this.$message({message: '查询字段为空哦~', type: 'warning'})
      }
    },
    getData (pa) {
      // pa = Qs.stringify(pa)
      setTimeout(() => {
        this.loading = true
        this.$axios.post(this.url + 'dataQuery', pa, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((response) => {
          this.$set(this.searchRes, 0, response.data)
          this.loading = false
          if (!Object.keys(this.searchRes[0]).length) {
            this.$message.error('访问数据失败')
          } else {
            Object.keys(this.searchRes[0]).forEach((key) => {
              this.$set(this.activeNames, key, ['1', '2'])
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }, 100)
    },
    getClassList () {
      this.$axios.get(this.url + 'getClassList', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          if (response.data.state) {
            // this.$message({message: '获取类别标签成功~', type: 'success'})
            this.categoryList = response.data.info[0]
            this.controversyFocusList = response.data.info[1]
            this.default_tab = this.categoryList[0] // 默认选中第一个tab
          } else {
            this.$message({message: '获取类别标签失败啦~' + response.data.info, type: 'warning'})
          }
        })
    },
    searchControversyFocus (categoryName, controversyFocusName) {
      // this.getData({search_str: controversyFocusName, search_field_type: '争议焦点', search_class: ''})
      this.$router.push({
        path: '/SearchPage',
        query: {
          isSearchControversyFocusLink: 'true',
          search_class: categoryName,
          searchContent: controversyFocusName,
          search_field_type: '裁判观点'
        }
      })
    }
  },
  created: function () {
    // this.getData({search_str: '', search_field_type: '裁判观点', search_class: this.searchClass})
    this.getClassList()
  }
}
</script>

<style>
  #index-page {
    position: absolute;
    font-size:1rem;
    margin: 0;
    background: gray;
    height: 100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
    overflow: auto;
  }
  .index-header {
    height: 30%;
    width: 100%;
    background: #2f4876;
    display: flex;
    flex-direction: column;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  }
  .index-main {
    background: #FFFFFF;
    width: 100%;
    height: 62%;
    margin: 0 auto;
    display: flex;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
    overflow: auto;
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
  .title {
    height: 50%;
    width: 80%;
    display: flex;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
    color: #FFFFFF;
    font-size: 5rem;
  }
  .title-img {
    /* align-items: center; */
    height: 55%;
    width: 70%;
  }
  .search-bar {
    display: flex;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
    width: 60%;
  }
  .el-select {
    width: 8vw;
    border: 0;
  }
  .search-input-with-select {
    font-size: 2rem;
    border: 0;
  }
  .el-button {
    width: 6vw;
  }
  .navigation-bar {
    width: 60%;
    display: flex;
    justify-content: left;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  }
  .category-tabs {
    display: flex;
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
  }
  .tabs-font{
    font-size: 2rem;
  }
  .controversy-focus-link-group {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: auto;
  }
  .el-link {
    font-size: 1rem;
  }
  .controversy-focus-link-box {
    margin: 1rem 0.8rem;
  }
.support-box {
    margin-top:2rem;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;
  }
  .support-box a {
    text-decoration: none;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;
  }
  .tip-box {
    margin-top:0.6rem;
    margin-bottom:2rem;
    font-family: Fantasy;
    font-weight: 400;
    font-size: 0.8rem;
    color: #999999;;
  }
</style>
