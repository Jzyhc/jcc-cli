/*
 * @Author       : jincheng
 * @Date         : 2021-05-28 14:52:43
 * @LastEditTime : 2021-05-28 16:16:56
 * @LastEditors  : jincheng
 * @FilePath     : /cat-cli/lib/create.js
 */

const path = require('path');
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./Generator')
// 执行创建
module.exports = async function (name, options) {
  
  // 当前目录
  const cwd  = process.cwd();

  // 创建后的目录
  const targetAir  = path.join(cwd, name)

  // 判断创建后的目录是否存在
  if(fs.existsSync(targetAir)){
    // 是否为强制创建
    if(options.force){
      // 删除
      await fs.remove(targetAir)
    }else{
      // 是否覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  } 

  const generator = new Generator(name,targetAir)

  generator.create()
  
}