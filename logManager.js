
const fs = require('fs')
const chalk = require('chalk')

const Section = require('./model/section.js').Section
const User = require('./model/user.js').User

const regex = /"(.*?)"/g // Regex to know if there is an http request

const SUCCESS_STATUS_CODE = [200, 201, 202, 203, 204, 205, 206, 207, 208, 226]

/**
 * Load the log file at the specified logPath
 * @param logPath 
 */
const loadLog = (logPath) => {
    try {
        return fs.readFileSync(logPath).toString().split('\n')
    } catch (e) {
        console.log(chalk.red.inverse('This log file does not exist.'))
        return null
    }
}

/**
 * Get the website section from a line of the log
 * @param logLine
 */
const getSection = (logLine) => {
    if (logLine.match(regex) != null) {
        return '/' + logLine.match(regex)[0].split(' ')[1].split('/')[1]
    } else {
        return null
    }
}

/**
 * Get the user from a line of the log
 * @param logLine 
 */
const getUser = (logLine) => {
    if (logLine.match(regex) != null) {
        return (logLine.split(' ')[2])
    } else {
        return null
    }
}

/**
 * Get the status code from a line of the log
 * @param logLine 
 */
const getStatusCodeLog = (logLine) => {
    return logLine.split(' ')[8]
}

/**
 * Dislay the current date
 */
const displayCurrentDate = () => {
    const currentDate = new Date()
    console.log('\n--- Reporting at ' + currentDate.getDate() + '/' + String(currentDate.getMonth()+1) + '/' + currentDate.getFullYear() + ':' + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds() + ' ---')
}

/**
 * Generate a summary of the user's website using the log
 * @param logs 
 */
const generateInterestingSummary = (logs) => {
    var usersData = new Map()

    logs.forEach((log) => {
        const user = getUser(log)

        if (user != null) {
            if (usersData.get(user) === undefined) {
                usersData.set(user, new User(user))
            }

            usersData.get(user).incrementUserHits()
        }
    })

    console.log('\n--- A global user summary ---')
    usersData.forEach((user) =>{
        console.log(user.getUserName() + ' hit the website ' + user.getUserHits() + ' times.')
    })
}

/**
 * Generate a reporting of each section failures using the log
 * @param logs 
 * @param lastLogIndex : last index read from the log, to only use the log generated during the last 10 seconds
 */
const getSectionsFailures = (logs, lastLogIndex) => {
    var sectionsData = new Map()

    for (lastLogIndex; lastLogIndex < logs.length; lastLogIndex++) {
        const currentSection = getSection(logs[lastLogIndex])

        if (currentSection != null) {
            if (sectionsData.get(currentSection) === undefined) {
                sectionsData.set(currentSection, new Section(currentSection))
            }

            sectionsData.get(currentSection).incrementTotalHits()

            // Check if the hit is not an error
            if (SUCCESS_STATUS_CODE.indexOf(parseInt(getStatusCodeLog(logs[lastLogIndex]))) == -1) sectionsData.get(currentSection).incrementTotalErrors()
        }
    }

    displayCurrentDate()

    sectionsData.forEach(section => {
        console.log('Section : ' + section.getSectionName() + ' | Error rates : ' + String((100 * section.getTotalErrors() / section.getTotalHits()).toFixed(2)) + '%')
    })

    return lastLogIndex
}


/**
 * Using the data enter in the program, generate a report of a log
 * @param currentLogPath 
 * @param interestingSummary 
 */
const generateReport = (currentLogPath, interestingSummary) => {

    var lastLogIndex = 0
    var logs = loadLog(currentLogPath)

    if (logs !== null) {
        // Get the last log index when the script is started 
        // in order the flush all the previous logs in the file
        lastLogIndex = logs.length

        // Realize a task every 10 second
        setInterval(() => {
            logs = loadLog(currentLogPath)
            lastLogIndex = getSectionsFailures(logs, lastLogIndex)
            if (interestingSummary) {
                generateInterestingSummary(logs)
            }
        }, 10000)
    }
}

module.exports = {
    generateReport: generateReport
}