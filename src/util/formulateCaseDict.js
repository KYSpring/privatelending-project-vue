// 单独运行的用于形成新的case_dict的脚本
const fs = require('fs') // 文件模块
const path = require('path') // 系统路径模块

// 处理已经有接口的数据
const sourceFile = path.join(__dirname, '../resource/case_dict_with_result.json')
let caseWithResDict = require(sourceFile)

Object.keys(caseWithResDict).forEach(key => {
  caseWithResDict[key] = {
    type: 'jufa',
    url: 'http://qingfa.fajuhe.com/home/caseDetail',
    param: caseWithResDict[key]
  }
})

// 处理只有外部链接的数据
const sourcecsv = path.join(__dirname, '../resource/case_outer_link.csv')
const rawcsvdata = fs.readFileSync(sourcecsv, 'utf-8')
const lines = rawcsvdata.split(/\r?\n/)
lines.forEach(item => {
  let items = item.split(',')
  let key = items[1]
  let url = items[2]
  caseWithResDict[key] = {
    type: 'outer',
    url: url,
    param: ''
  }
})

// 生成最终json文件
var targetfile = path.join(__dirname, '../resource/formattedCaseDict.json')
console.log('case数量', Object.keys(caseWithResDict).length)
const content = JSON.stringify(caseWithResDict)
fs.writeFile(targetfile, content, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('创建成功！')
  }
})
