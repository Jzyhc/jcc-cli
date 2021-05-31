/*
 * @Author       : jincheng
 * @Date         : 2021-05-28 15:57:12
 * @LastEditTime : 2021-05-28 16:01:04
 * @LastEditors  : jincheng
 * @FilePath     : /cat-cli/lib/http.js
 */

const axios = require('axios');

axios.interceptors.response.use(res=>{
  return res.data;
})

async function getRepoList() {
  return axios.get('https://api.github.com/orgs/zhurong-cli/repos')
}

async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}