<template>
 <div id='bkg'>
    <div id='top-bar'>
      <!-- 顶部导航区 -->
      <div id='title' style="cursor:pointer" v-on:click="backToIndex()">民间借贷裁判规则库</div>
      <div v-if="screenWidth > 750" id='search-bar'>
        <el-input placeholder="请输入搜索内容" v-model="searchContent" class="input-with-select">
          <el-select id="selectbar" v-model="select" slot="prepend" :placeholder="searchLabel">
            <el-option label="争议焦点" value="jiaodian"></el-option>
            <el-option label="裁判观点" value="guandian"></el-option>
            <el-option label="裁判依据" value="yiju"></el-option>
          </el-select>
          <el-button slot="append" type="primary" sytle="width: 100vw;" icon="el-icon-search" v-on:click="submitQuery()"></el-button>
        </el-input>
      </div>
      <el-button v-else slot="reference" id='circlesearch' type="primary" sytle="width: 3vw;" icon="el-icon-search" @click="seabarVisible = true"></el-button>
      <el-dialog
        :visible.sync="seabarVisible"
        width="90%" :modal="false">
        <el-input placeholder="请输入搜索内容" v-model="searchContent" class="input-with-select">
            <el-select id="selectbar" v-model="select" slot="prepend" :placeholder="searchLabel">
              <el-option label="裁判观点" value="guandian"></el-option>
              <el-option label="裁判依据" value="yiju"></el-option>
            </el-select>
            <el-button slot="append" type="primary" sytle="width: 3em;" icon="el-icon-search" @click="submitQuery()"></el-button>
        </el-input>
      </el-dialog>
    </div>
    <div id="welcome">
      <el-row style="width:90%"  type="flex" justify="center">
        <!-- 内容展示区 -->
        <div id="viewContent" :style="{width: widthData}">
          <el-col :span="24" >
            <el-row type="flex" justify="space-between">
              <el-col :span="21" style="margin:1em 2em">
                <div id="content-icon">
                  <i class="el-icon-notebook-2"></i>
                  <span float='left' style="margin-right:2em;font-size:2.2vh;">裁判规则/观点列表</span>
                  <el-select float='left' v-model="searchClass" @change="handleCommand" style="width:20vh;" placeholder="争议类型选择">
                    <el-option
                      :label="item" :value="item" v-for="(item, classID) in classList" :key="classID">
                      <span style="font-size:2vh;">{{item}}</span>
                    </el-option>
                  </el-select>
                  <el-select float='left' v-model="selectIssue" @change="handleIssue" style="width:20vh" placeholder="争议焦点选择">
                    <el-option
                      :label="issue" :value="issue" v-for="(issue,issueId) in issueListItems" :key="issueId">
                    </el-option>
                    <span style="font-size:2vh;">{{issue}}</span>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="3">
                <div id="reply">
                  <span>
                    <i class="el-icon-document-copy"></i>
                    <el-button id="replyClick"  type="text" @click="dialogVisible = true">反馈意见</el-button>
                  </span>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
          <div style="margin:0 2em" v-loading="loading" >
            <el-card style = "margin-top:1em" v-for="(item,index) in searchRes[0]" :key="index" shadow="hover" id="listcard">
              <span style="font-size:2vh;font-weight:bold;margin-right:0.5em">观点/规则 {{index.replace(/[^\d]/g,' ')}}</span>
              <el-tag type="primary"><span style="font-size:1.8vh;">{{item["争议一级"]}}</span></el-tag>
              <el-tag type="success"><span style="font-size:1.8vh;">{{item["争议二级"]}}</span></el-tag>
              <el-tag type="warning"><span style="font-size:1.8vh;">{{item["争议焦点"]}}</span></el-tag>
              <el-collapse v-model="activeNames[index]">
              <el-collapse-item name="1">
                <template slot="title">
                  <span style="font-size:1.8vh;font-weight:bold"><i class="el-icon-success" style="margin-right:0.5em"></i>裁判观点</span>
                </template>
                <div style="font-size:1.8vh;" v-if = "!item['裁判观点']">暂无内容</div>
                <div v-else style="font-size:1.8vh;">{{item['裁判观点']}}</div>
              </el-collapse-item>
              <el-collapse-item name="2">
                <template slot="title">
                  <span style="font-size:1.8vh;font-weight:bold"><i class="el-icon-success" style="margin-right:0.5em"></i>裁判依据</span>
                </template>
                <div style="font-size:1.8vh;" v-if = "!item['裁判依据']">暂无内容</div>
                <div style="font-size:1.8vh;" v-else>{{item['裁判依据']}}</div>
              </el-collapse-item>
              <el-collapse-item name="3">
                <template slot="title">
                  <span style="font-size:1.8vh;font-weight:bold"><i class="el-icon-success" style="margin-right:0.5em"></i>法官说理</span>
                </template>
                <div style="font-size:1.8vh;" v-if = "!item['说理']">暂无内容</div>
                <div style="font-size:1.8vh;" v-else>{{item['说理']}}</div>
              </el-collapse-item>
              <el-collapse-item name="4">
                <template slot="title">
                  <span style="font-size:1.8vh;font-weight:bold"><i class="el-icon-success" style="margin-right:0.5em"></i>司法判例</span>
                </template>
                <div style="font-size:1.8vh;" v-if = "!item['判例']">暂无内容</div>
                <div style="font-size:1.8vh;" v-else>{{item['判例']}}</div>
              </el-collapse-item>
              </el-collapse>
            </el-card>
          </div>
          </el-col>
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
    <el-dialog
      title="反馈意见"
      :visible.sync="dialogVisible"
      :width="replyWidth">
      <el-input
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10}"
          placeholder="请输入您的宝贵建议 (提交新增裁判观点，请注明案号来源；如果有修改意见，请注明裁判观点序号)"
          v-model="textarea">
        </el-input>
      <el-form  :model="commentForm" style="margin-top: 2em">
        <el-form-item label-width="12em" label="联系方式：" size="small">
          <el-input v-model="commentForm.contact" placeholder="手机、邮箱等"></el-input>
        </el-form-item>
        <el-form-item label-width="12em" label="单位及职务：" size="small">
          <el-input v-model="commentForm.workplace" placeholder="单位及职务"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose(false)">取 消</el-button>
          <el-button type="primary" @click="handleClose(true)">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  name: 'Welcome',
  // components: { test },
  data () {
    return {
      isSearchControversyFocusLink: '', // 判断是否直接通过首页tag跳转而来
      search_str: '',
      searchContent: '',
      select: '',
      searchLabel: '搜索主题',
      searchClass: '',
      classID: '',
      classList: [],
      issueList: [],
      selectIssue: '',
      activeNames: {},
      dialogVisible: false,
      textarea: '',
      searchRes: [], // 便于监听
      url: 'http://188.131.144.236:7777/privatelending/', // 服务器端口
      // url: 'http://127.0.0.1:5000/privatelending/', // 本地测试接口
      loading: true,
      screenWidth: document.body.clientWidth,
      seabarVisible: false,
      commentForm: {
        contact: '',
        workplace: ''
      }
    }
  },
  computed: {
    issueListItems () {
      return this.issueList[this.classID]
    },
    widthData () {
      if (this.screenWidth > 750) {
        return '80%'
      } else {
        return '100%'
      }
    },
    replyWidth () {
      if (this.screenWidth > 750) {
        return '40%'
      } else {
        return '80%'
      }
    }
  },
  methods: {
    handleCommand (command) {
      if (this.select === 'guandian') {
        this.searchLabel = '裁判观点'
      } else if (this.select === 'yiju') {
        this.searchLabel = '裁判依据'
      } else if (this.select === 'jiaodian') {
        this.searchLabel = '争议焦点'
      } else {
        this.searchLabel = '裁判观点'
      }
      this.searchClass = command
      this.classID = this.classList.findIndex((val) => val === this.searchClass)
      this.getData({search_str: this.searchContent, search_field_type: this.searchLabel, search_class: this.searchClass})
    },
    handleIssue (command) {
      this.searchLabel = '争议焦点'
      this.searchContent = command
      this.getData({search_str: this.searchContent, search_field_type: this.searchLabel, search_class: this.searchClass})
    },
    handleClose (flag) {
      if (flag) {
        if (!this.textarea) {
          this.$message.error('请输入内容哦~')
        } else {
          this.dialogVisible = false
          this.$axios.post(this.url + 'submitComment',
            Qs.stringify({comment_data: this.textarea, contact: this.commentForm.contact, workplace: this.commentForm.workplace}),
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then((response) => {
              if (response.data.state) {
                this.$message({message: '提交成功，谢谢支持~', type: 'success'})
              } else {
                this.$message({message: '提交出错啦~' + response.data.info, type: 'warning'})
              }
            })
        }
      } else {
        this.dialogVisible = false
      }
      this.textarea = ''
      this.commentForm = {
        contact: '',
        workplace: ''
      }
    },
    submitQuery () {
      if (this.select === 'guandian') {
        this.searchLabel = '裁判观点'
      } else if (this.select === 'yiju') {
        this.searchLabel = '裁判依据'
      } else if (this.select === 'jiaodian') {
        this.searchLabel = '争议焦点'
      } else {
        this.searchLabel = '裁判观点'
      }
      if (this.searchContent) {
        this.getData({search_str: this.searchContent, search_field_type: this.searchLabel, search_class: this.searchClass})
      } else {
        this.$message({message: '查询字段为空哦~', type: 'warning'})
      }
      this.seabarVisible = false
    },
    getClassList () {
      this.$axios.get(this.url + 'getClassList', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          if (response.data.state) {
            // this.$message({message: '获取类别标签成功~', type: 'success'})
            this.classList = response.data.info[0]
            this.issueList = response.data.info[1]
            // console.log(this.issueList[0])
          } else {
            this.$message({message: '获取类别标签失败啦~' + response.data.info, type: 'warning'})
          }
        })
    },
    backToIndex () {
      this.$router.push({
        path: '/'
      })
    },
    receiveParams () {
      this.isSearchControversyFocusLink = this.$route.query.isSearchControversyFocusLink
      this.searchClass = this.$route.query.search_class
      this.search_field_type = this.$route.query.search_field_type
      this.searchContent = this.$route.query.searchContent
      if (this.isSearchControversyFocusLink === 'true') {
        this.selectIssue = this.searchContent
      } else {
        this.selectIssue = ''
      }
    },
    getData (pa) {
      pa = Qs.stringify(pa)
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
    }
  },
  watch: {
    select: function (newval) {
      if (newval === 'guandian') {
        this.searchLabel = '裁判观点'
      } else {
        this.searchLabel = '裁判依据'
      }
      this.getData({search_str: this.searchClass, search_field_type: this.searchLabel, search_class: this.searchClass})
    },
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          console.log(that.screenWidth)
          that.timer = false
        }, 400)
      }
    }
  },
  created: function () {
    this.receiveParams()
    this.getData({search_str: this.searchContent, search_field_type: this.search_field_type, search_class: this.searchClass})
    this.getClassList()
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  }
}
</script>

<style scoped>
  .el-select { width: 8em; border: 0;}
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .input-with-select {
    font-size: 1.8vh;
  }
  .input-with-select .el-input-group__prepend {
    font-size: 1.8vh;
    background-color: #fff;
  }
  .el-button--primary {
    background: #1F589B;
    border-radius: 2px;
    border: 1px solid #FFFFFF;
  }
  .el-card{
    border-color:skyblue;
  }
  .el-collapse{
    margin-top: 1em;
  }
  #search-bar {
    width: 40%;
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
#content-icon{
    top: 2em;
    left: 2em;
    font-size: 1.6em;
    font-family:"Microsoft YaHei",sans-serif;
}
#reply{
  top: 1em;
  right: 2em;
}
#replyClick{
  font-size: 1.2vh;
  color: #1F589B;
  font-family:"Microsoft YaHei",sans-serif;
  width: 5em;
}
#listcard{
  margin:1em,2em
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
