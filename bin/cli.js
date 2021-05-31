#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

program
  .command('create <app-name>') // 设置创建命令
  .description('create a new project') // -- help 的时候展示的信息
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist') // 定义选项
  .action((name, options) => {
    require('../lib/create')(name, options)
  });

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]') // 修改帮助信息的首行提示，name 属性也可以从参数中推导出来

program
  // 监听 --help 执行
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('jcc', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv);