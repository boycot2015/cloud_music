/** 定义模块和变量**/
// const exec = require('child_process').exec // 异步子进程
const execSync = require('child_process').execSync // 同步子进程
const fs = require('fs') // 文件读取模块

const {
    versionPath,
    versionJsonPath,
    buildPath,
    autoPush,
    versionText,
    sinceTime
} = {
    versionPath: 'version.txt', // version路径
    versionJsonPath: './src/assets/js/version.json', // 项目日志输出路径
    buildPath: 'dist', // 打包的路径
    autoPush: true, // 写入版本信息之后是否自动提交git上
    versionText: require('./package.json').version, // version版本
    sinceTime: '2020-08-01' // version路径
}
const commitCurr = execSync('git show -s --format=%H').toString().trim() // 当前提交的版本号

/** 程序开始**/
var versionStr = '' // 版本信息字符串
// 如果versionPath存在，将先读取里边的版本信息
if (fs.existsSync(versionPath)) {
    versionStr += fs.readFileSync(versionPath).toString() + '\n'
} // 根据版本信息是已存在commit，进行不同处理
if (versionStr.indexOf(commitCurr) !== -1) {
    console.warn('\x1B[33m%s\x1b[0m', 'warming: 当前的git版本数据已经存在了!\n')
} else {
    const name = execSync('git log --since="' + sinceTime + '" -s --format=%cn').toString().trim().split('\n') // 姓名
    const email = execSync('git log --since="' + sinceTime + '" -s --format=%ce').toString().trim().split('\n') // 邮箱
    // let date = new Date(execSync('git log --since="2020-01-01" -s --format=%cd').toString()) // 日期
    const date = execSync('git log --since="' + sinceTime + '" -s --format=%cd').toString().split('\n')
    const message = execSync('git log --since="' + sinceTime + '" -s --format=%s').toString().trim().split('\n') // 说明
    const commit = execSync('git log --since="' + sinceTime + '" -s --format=%H').toString().trim().split('\n') // 当前提交的版本号
    const versionArr = []
    let versionIndex = 1
    const versions = versionText.split('.')
    versions.map(el => { el = parseInt(el) })
    name.some((el, i) => {
        const temObj = {}
        temObj.name = name[name.length - i - 1]
        temObj.date = date[name.length - i - 1]
        temObj.commit = commit[name.length - i - 1]

        // 合并代码提交统计为一次版本更新
        if (message[name.length - i - 1].indexOf('Merge') > -1) {
            if (parseInt(versions[2]) < 10) {
                versions[2] = parseInt(versions[2]) + 1
            } else if (parseInt(versions[1]) < 10) {
                versions[2] = 1
                versions[1] = parseInt(versions[1]) + 1
            } else {
                versions[1] = 1
                versions[0] = parseInt(versions[0]) + 1
            }
            temObj.name = `v${versions.join('.')}`
            temObj.version = versions.join('.')
        } else {
            temObj.email = email[name.length - i - 1]
            temObj.message = message[name.length - i - 1]
        }
        // console.log(versions, 'versions')
        versionArr.unshift(temObj)
    })
    versionArr.map((el, i) => {
        if (el.version) {
            versionStr += `${el.name}\ncommitId: ${el.commit}\n${new Array(60).join('*')}\n\n`
            versionIndex = 1
        } else {
            versionStr += `${versionIndex}. 作者:${el.name}<${el.email}>\n提交时间:${el.date}\n说明:${el.message}\ncommitId: ${el.commit}\n\n`
            versionIndex++
        }
    })
    // versionStr = `git:${commit}\n作者:${name}<${email}>\n说明:${message}\n${new Array(80).join('*')}\n${versionStr}`
    fs.writeFileSync(versionJsonPath, JSON.stringify({ data: versionArr, version: versions.join('.'), publicTime: date[0] }))
    fs.writeFileSync(versionPath, versionStr)
    // 写入版本信息之后，自动将版本信息提交到当前分支的git上
    if (autoPush) {
        execSync(`git commit ${versionPath} -m 自动提交版本信息`)
        execSync(`git commit ${versionJsonPath} -m 自动提交版本json信息`)
        execSync(`git push origin ${execSync('git rev-parse --abbrev-ref HEAD').toString().trim()}`)
    }
}
// 将version文件移植到打包文件中
if (fs.existsSync(buildPath)) {
    fs.writeFileSync(`${buildPath}/${versionPath}`, fs.readFileSync(versionPath))
}
// 程序执行结束
console.info('\x1B[32m%s\x1b[0m', ['██████╗ ███████╗██████╗ ███████╗ █████╗  ██████╗██╗   ██╗', '██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝', '██████╔╝█████╗  ██████╔╝███████╗███████║██║  ███╗╚████╔╝ ', '██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔══██║██║   ██║ ╚██╔╝  ', '██║     ███████╗██║  ██║███████║██║  ██║╚██████╔╝  ██║   ', '╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝   '].join('\n'))
