const { gitDescribeSync } = require('git-describe')
const { version } = require('./package.json')
const { resolve, relative } = require('path')
const { writeFileSync } = require('fs-extra')

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
})

gitInfo.version = version

const file = resolve(__dirname, 'src', 'version.js')
writeFileSync(file,
    `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4).replace(/"/g, '\'')}
/* tslint:enable */
`, { encoding: 'utf-8' })

// eslint-disable-next-line no-console
console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`)