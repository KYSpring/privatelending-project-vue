<template>
    <div id="myEcharts">
      <div id="judgeViewQuantityDistributionEcharts">
        <!-- 裁判观点类型分布图 描述各类型下裁判观点的数量 -->
      </div>
      <div id="controversyFocusQuantityDistributionEcharts">
        <!-- 争议焦点类型分布图 描述各类型下争议焦点的数量 -->
      </div>
      <div id="judgeViewWordCloudEcharts">
        <!-- 裁判观点词云图 描述裁判观点中的高频词 -->
      </div>
    </div>
</template>

<script>
// import Qs from 'qs'
export default {
  name: 'Echarts',
  data () {
    return {
      url: 'http://127.0.0.1:11111/privatelending/', // 服务器端口
      screenWidth: document.body.clientWidth,
      controversyFocusQuantityDistributionData: '',
      courtLevelOption: [{
        value: '最高人民法院',
        label: '最高人民法院'
      }, {
        value: '高级人民法院',
        label: '高级人民法院'
      }, {
        value: '中级人民法院',
        label: '中级人民法院'
      }]
    }
  },
  watch: {
    screenWidth (val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          // console.log(that.screenWidth)
          that.timer = false
        }, 400)
      }
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
    this.drawJudgeViewQuantityDistributionEcharts()
    this.drawControversyFocusQuantityDistributionEcharts()
    this.drawJudgeViewWordCloudEcharts()
    // this.getData()
    // this.postData()
  },
  methods: {
    async getControversyFocusQuantityDistributionData () {
      // 获得争议焦点类型分布数据
      let controversyFocusQuantityDistributionDataUrl = '/api/privateLendingRules/controversyFocus/quantityDistribution'
      await this.$axios.post(controversyFocusQuantityDistributionDataUrl,
        {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
          console.log(response)
          if (response.data) {
            this.controversyFocusQuantityDistributionData = response.data
          } else {
            console.log('controversyFocusQuantityDistributionData error')
          }
        })
    },
    // async postData () {
    //   let url = '/api/simcase/statistics/focus/location'
    //   console.log('123')
    //   await this.$axios.post(url,
    //     JSON.stringify({court_level: '中级人民法院', court: '河北省石家庄市中级人民法院', province: '河北'}),
    //     {headers: {'Content-Type': 'application/json'}})
    //     .then((response) => {
    //       console.log(response)
    //     })
    //   console.log('456')
    // },
    async getJudgeViewQuantityDistributionEchartsData () {
      await this.$axios.get(this.videoGameSalesDataUrl, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response) => {
          if (response.data) {
            this.videoGameSalesData = response.data
          } else {
            console.log('error')
          }
        })
    },
    drawJudgeViewQuantityDistributionEcharts () {
      var judgeViewQuantityDistributionEcharts = this.$echarts.init(document.getElementById('judgeViewQuantityDistributionEcharts'))

      var judgeViewQuantityDistributionEchartsOption = {
        title: {
          text: '裁判观点类型分布图',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          // roseType: 'radius',
          label: {
            show: true,
            position: 'outside',
            // color: 'rgba(255, 255, 255, 0.3)'
            formatter: '{b}'
          },
          labelLine: {
            lineStyle: {
              color: '#000'
            },
            smooth: 0.2,
            length: 50,
            length2: 20
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200
          },
          data: [{'name': '民间借贷的主体包括金融机构之外的企业、自然人等。小额借贷公司、民间互助会不属于金融机构，其借贷关系属于民间借贷。', 'value': 61}, {'name': '《网络借贷信息中介机构业务活动管理暂行办法》第2条第2款：“本办法所称网络借贷是指个体和个体之间通过互联网平台实现的直接借贷。个体包含自然人、法人及其他组织。网络借贷信息中介机构是指依法设立，专门从事网络借贷信息中介业务活动的金融信息中介公司。该类机构以互联网为主要渠道，为借款人与出借人（即出借人）实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务。”', 'value': 30}, {'name': '<民法典》667条 借款合同是借款人向出借人借款，到期返还借款并支付利息的合同。', 'value': 10}]
        }]
      }
      judgeViewQuantityDistributionEcharts.setOption(judgeViewQuantityDistributionEchartsOption)
    },
    async drawControversyFocusQuantityDistributionEcharts () {
      await this.getControversyFocusQuantityDistributionData()
      var controversyFocusQuantityDistributionData = this.controversyFocusQuantityDistributionData
      // 删了下面这句
      // controversyFocusQuantityDistributionData = controversyFocusQuantityDistributionData[0]
      var controversyFocusQuantityDistributionEcharts = this.$echarts.init(document.getElementById('controversyFocusQuantityDistributionEcharts'))
      var controversyFocusQuantityDistributionEchartsOption = {
        title: {
          text: '争议焦点案件分布图',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // visualMap: {
        //   show: false,
        //   min: 1,
        //   max: 100,
        //   inRange: {
        //     colorLightness: [0, 1]
        //   }
        // },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: []
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          // roseType: 'radius',
          label: {
            show: true,
            position: 'outside',
            // color: 'rgba(255, 255, 255, 0.3)'
            formatter: '{b}'
          },
          labelLine: {
            lineStyle: {
              color: '#000'
            },
            smooth: 0.2,
            length: 50,
            length2: 20
          },
          // itemStyle: {
          //   color: '#c23531',
          //   shadowBlur: 200,
          //   shadowColor: 'rgba(0, 0, 0, 0.5)'
          // },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200
          },
          data: controversyFocusQuantityDistributionData
          // data: [{'name': '担保', 'value': 62}, {'name': '民间借贷的合同主体', 'value': 60}, {'name': '管辖', 'value': 43}, {'name': '民间借贷合同履行', 'value': 41}, {'name': '民间借贷关系的认定', 'value': 39}, {'name': '民间借贷合同效力', 'value': 28}, {'name': '民间借贷金额计算', 'value': 24}, {'name': '诉讼时效', 'value': 24}, {'name': '证据', 'value': 23}, {'name': '民间借贷合同变更', 'value': 21}, {'name': '涉虚假诉讼', 'value': 9}]
        }]
      }
      controversyFocusQuantityDistributionEcharts.setOption(controversyFocusQuantityDistributionEchartsOption)
    },
    drawJudgeViewWordCloudEcharts () {
      let judgeViewWordCloudEcharts = this.$echarts.init(document.getElementById('judgeViewWordCloudEcharts'))

      let judgeViewWordCloudEchartsOption = {
        title: {
          text: '争议焦点词云图',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#000'
          }
        },
        series: [{
          type: 'wordCloud',
          shape: 'pentagon',
          gridSize: 2,
          sizeRange: [12, 55],
          rotationRange: [-90, 90],
          rotationStep: 30, // 文本将通过rotationStep45在[-90,90]范围内随机旋转
          textStyle: {
            color: function () {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')'
            }
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          left: 'center',
          top: 'center',
          right: null,
          bottom: null,
          data: [{'name': '借贷与其他法律关系区分', 'value': 12}, {'name': '夫妻共同债务的认定', 'value': 11}, {'name': '保证意思的识别', 'value': 10}, {'name': '债权转让', 'value': 8}, {'name': '涉嫌犯罪与民事诉讼程序', 'value': 8}, {'name': '公司（含各类组织）的印章主体认定', 'value': 8}, {'name': '还款有效性判断', 'value': 7}, {'name': '还款义务承担', 'value': 7}, {'name': '诉讼时效中断事由', 'value': 7}, {'name': '出借款交付的证明', 'value': 7}, {'name': '借贷合意的证据', 'value': 7}, {'name': '非正式借贷协议的关系认定', 'value': 6}, {'name': '虚假诉讼的认定', 'value': 6}, {'name': '法定代表人借款时的当事人认定', 'value': 6}, {'name': '工作人员参与单位借贷关系时的主体', 'value': 6}, {'name': '债务抵销', 'value': 5}, {'name': '担保关系的认定', 'value': 5}, {'name': '利息的认定', 'value': 5}, {'name': '公司对外担保', 'value': 5}, {'name': '出借款偿还的证明', 'value': 4}, {'name': '抵押担保登记及其效力范围', 'value': 4}, {'name': '保证责任的承担、免除', 'value': 4}, {'name': '合同变更的认定', 'value': 4}, {'name': '买卖合同担保借贷协议', 'value': 4}, {'name': '间接代理中的当事人认定', 'value': 4}, {'name': '保证期间起算点', 'value': 4}, {'name': '非法债务不受保护', 'value': 4}, {'name': '保证的范围与效力', 'value': 4}, {'name': '借贷凭证未载名的出借人判定', 'value': 4}, {'name': '涉刑但合同有效的借贷', 'value': 4}, {'name': '职业放贷人及合同效力', 'value': 4}, {'name': '地域管辖的确定', 'value': 4}, {'name': '协议管辖的认定', 'value': 3}, {'name': '诉讼时效起算', 'value': 3}, {'name': '发放贷款的有效性', 'value': 3}, {'name': '自然人间民间借贷的成立', 'value': 3}, {'name': '借贷凭证载名的非实际借款人判定', 'value': 3}, {'name': '证明力大小采信', 'value': 3}, {'name': '夫妻共同债务的清偿', 'value': 3}, {'name': '本金实际数额的认定', 'value': 3}, {'name': '流质流押', 'value': 3}, {'name': '担保合同效力', 'value': 3}, {'name': '电子证据证明力', 'value': 3}, {'name': '多个担保的履行', 'value': 3}, {'name': '质押的设立', 'value': 3}, {'name': '鉴定意见证明力', 'value': 3}, {'name': '合同履行地管辖', 'value': 3}, {'name': '新债务人加入', 'value': 3}, {'name': '民间借贷的范围', 'value': 3}, {'name': '利息之外的费用', 'value': 3}, {'name': '公证债权文书争议的处理', 'value': 2}, {'name': '村委会借贷效力', 'value': 2}, {'name': '法人人格否定', 'value': 2}, {'name': '还款时间', 'value': 2}, {'name': '借贷合同定金', 'value': 2}, {'name': '还款顺序', 'value': 2}, {'name': '复印件证据', 'value': 2}, {'name': '约定利息的履行', 'value': 2}, {'name': '借贷关系中介平台（人）', 'value': 2}, {'name': '质押物范围与权利实现', 'value': 2}, {'name': '借贷关系的继承人', 'value': 2}, {'name': '对调解协议的受理', 'value': 2}, {'name': '立案审查的范围', 'value': 2}, {'name': '诉讼时效届满抗辩的放弃', 'value': 2}, {'name': '保证的实现', 'value': 2}, {'name': '复利的认定和效力', 'value': 2}, {'name': '借贷关系升级转化', 'value': 2}, {'name': '抵押权实现与消灭', 'value': 2}, {'name': '共同借款人的认定', 'value': 2}, {'name': '单位集资效力', 'value': 2}, {'name': '虚假诉讼的证明', 'value': 2}, {'name': '抵押物的范围', 'value': 2}, {'name': '债务免除', 'value': 2}, {'name': '间接证据证明力', 'value': 2}, {'name': '被告信息错误、下落不明', 'value': 2}, {'name': '非自然人间民间借贷的成立', 'value': 2}, {'name': '高利贷的认定\n', 'value': 2}, {'name': '违约责任', 'value': 2}, {'name': '限制民事行为能力人贷款的效力', 'value': 2}, {'name': '分公司、项目部、内设机构的借贷认定', 'value': 2}, {'name': '迟延还款时本金及利息计算', 'value': 2}, {'name': '证据合法性', 'value': 2}, {'name': '债务转移', 'value': 2}, {'name': '保证人的诉讼地位', 'value': 2}, {'name': '借贷合同附条件、期限', 'value': 2}, {'name': '一事不再理', 'value': 2}, {'name': '转贷借款效力', 'value': 2}, {'name': '非人民币借贷效力', 'value': 1}, {'name': '再审程序认定', 'value': 1}, {'name': '保证责任的消灭', 'value': 1}, {'name': '除斥期间', 'value': 1}, {'name': '停止计息事由', 'value': 1}, {'name': '送达的认定', 'value': 1}, {'name': '免证事实', 'value': 1}, {'name': '借贷凭证未载名的借款人判定', 'value': 1}, {'name': '票据作为款项支付方式', 'value': 1}, {'name': '级别管辖的确定', 'value': 1}, {'name': '基础合同实为借贷的利息认定', 'value': 1}, {'name': '民刑交叉案件的审理程序', 'value': 1}, {'name': '受胁迫、欺诈借贷', 'value': 1}, {'name': '抵押权诉讼时效', 'value': 1}, {'name': '无权代理的认定', 'value': 1}, {'name': '未约定利息时逾期利息的计算', 'value': 1}, {'name': '夫妻共同债权', 'value': 1}, {'name': '最长诉讼时效', 'value': 1}, {'name': '涉外民事案件的管辖', 'value': 1}, {'name': '担保合同的成立', 'value': 1}, {'name': '抵押与质押的区分', 'value': 1}, {'name': '不可抗力致逾期还款', 'value': 1}, {'name': '证人证言证明力', 'value': 1}, {'name': '心理测试辅助证明', 'value': 1}, {'name': '复写件证据', 'value': 1}, {'name': '共同诉讼的合并审理', 'value': 1}, {'name': '其他管辖的认定', 'value': 1}, {'name': '诉讼时效的强制性', 'value': 1}, {'name': '督促程序的适用范围', 'value': 1}, {'name': '非典型担保', 'value': 1}, {'name': '诉讼时效中止事由', 'value': 1}, {'name': '证据责任一般要求', 'value': 1}, {'name': '诉讼时效重新计算', 'value': 1}, {'name': '法人之间借贷效力', 'value': 1}, {'name': '权利放弃（不告不理）', 'value': 1}, {'name': '实现债权的费用', 'value': 1}, {'name': '不违反效力强制性规定借贷有效', 'value': 1}, {'name': '高额利息的折抵', 'value': 1}, {'name': '监护人代理借贷', 'value': 1}, {'name': '合同效力瑕疵的证明责任', 'value': 1}, {'name': '连带责任保证期间', 'value': 1}, {'name': '担保合同无效的后果', 'value': 1}, {'name': '当事人陈述证明力', 'value': 1}, {'name': '证据的关联性', 'value': 1}, {'name': '违约金数额调整', 'value': 1}, {'name': '保证合同的变更', 'value': 1}, {'name': '诉讼时效限制的例外', 'value': 1}, {'name': '质押物的损害赔偿', 'value': 1}, {'name': '第三人代为清偿', 'value': 1}, {'name': '同居共同债务的认定', 'value': 1}, {'name': '担保权的转移', 'value': 1}, {'name': '二审新证据采纳', 'value': 1}, {'name': '应诉管辖', 'value': 1}, {'name': '空白借贷协议签章行为认定', 'value': 1}, {'name': '虚假诉讼的处理', 'value': 1}, {'name': '发回重审的事由', 'value': 1}, {'name': '当事人是否适格', 'value': 1}, {'name': '二审提出新诉讼请求', 'value': 1}]
        }]
      }
      judgeViewWordCloudEcharts.setOption(judgeViewWordCloudEchartsOption)
    }
  },
  created: function () {
  }
}
</script>

<style>
  html, body {
    /* 获取浏览器的定高，body和div也就有了依赖 */
    margin: 0;
    height: 100%;
  }
  #myEcharts {
    /* background: #efefef; */
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;        /* flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式 */
    justify-content: center;    /* 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 */
    overflow: auto;
  }
  #judgeViewQuantityDistributionEcharts {
    height: 790px;
    width: 80%;
    /* background: yellow; */
  }
  #controversyFocusQuantityDistributionEcharts {
    height: 790px;
    width: 80%;
    /* background: yellow; */
  }
  #controversyFocusWordCloudEcharts {
    height: 790px;
    width: 80%;
    /* background: blue; */
  }
</style>
