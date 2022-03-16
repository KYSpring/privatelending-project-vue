// 本文件用于下载聚法数据
// 1、获取聚法数据清单，来自：formattedcasedict.json
// 2、使用axios进行聚法接口调用，发起http请求；
// 3、将2中请求的数据使用Node文件系统进行读写并存入本地；
// 补充说明，若某些访问因各种原因失败，本文件可以多次运行多次发起请求。

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const qs = require('qs')

const caseListPath = path.join(__dirname, '../resource/formattedCaseDict.json')
const caseList = require(caseListPath)
const caseKeys = Object.keys(caseList)
async function getPeiceData (url, key, outPath, logFile, index) {
  const res = await axios({
    method: 'post',
    url: url,
    data: qs.stringify({
      case_id: caseList[key].param
    }),
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 8899
    }
  })
  let content = JSON.stringify(res.data)
  if (res.data.code === 0) {
    fs.writeFile(outPath, content, err => {
      if (err) {
        fs.writeFile(logFile, '写Json文件出错：' + key + '\n', { flag: 'a+' }, err2 => {})
        throw new Error('写Json文件出错：' + key)
      } else {
        console.log('创建文件' + index + ':' + key + '成功！')
      }
    })
  } else {
    fs.writeFile(logFile, '请求返回失败:' + key + '\n', { flag: 'a+' }, err2 => {})
    throw new Error('请求返回失败' + res.data.code)
  }
}
try {
  let index = 0
  let logFile = path.join(__dirname, '../resource/')
  logFile = logFile + 'logFile.txt'

  caseKeys.forEach(key => {
    let outPath = path.join(__dirname, '../resource/jufaLinkData/')
    outPath = outPath + key + '.json'
    if (caseList[key].type === 'jufa') {
      index += 1
      if (!fs.existsSync(outPath)) {
        const url = caseList[key].url
        getPeiceData(url, key, outPath, logFile, index)
      }
    }
  })
  fs.writeFile(logFile, 'jufa案例数量:' + index + '\n', { flag: 'a+' }, err2 => {})
} catch (e) {
  console.log(e.message)
}
