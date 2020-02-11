
class Section {
    constructor(sectionName) {
        this.sectionName = sectionName
        this.sectionTotalHits = 0
        this.sectionTotalErrors = 0
    }

    getSectionName() {
        return this.sectionName
    }

    getTotalHits() {
        return this.sectionTotalHits
    }

    getTotalErrors() {
        return this.sectionTotalErrors
    }

    setSectionName(sectionName) {
        this.sectionName = sectionName
    }

    setTotalHits(totalHits) {
        this.sectionTotalHits = totalHits
    }

    setTotalErrors(totalErrors) {
        this.sectionTotalErrors = totalErrors
    }

    incrementTotalHits() {
        this.sectionTotalHits++
    }

    incrementTotalErrors() {
        this.sectionTotalErrors++
    }
}

module.exports = {
    Section: Section
}