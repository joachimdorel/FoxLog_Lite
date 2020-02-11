const yargs = require('yargs')
const chalk = require('chalk')
const logManager = require('./logManager.js')

// Default log path
var currentLogPath = "/tmp/access.log"

yargs.command({
    command: '*',
    describe: 'Default Command',
    handler(argv) {

        // Checking the potential path of the file and if the user wants an interesting summary
        if (argv.path) {
            currentLogPath = argv.path
            console.log(chalk.green.inverse('Path updated to ' + argv.path))
        }

        const interestingSummary = (argv.interestingSummary == 'true') ? true : false // if the user want an interesting summary

        logManager.generateReport(currentLogPath, interestingSummary)
    }
})

yargs.parse()
