
class User {
    constructor(userName) {
        this.userName = userName
        this.userHits = 0
    }

    getUserName() {
        return this.userName
    }

    getUserHits() {
        return this.userHits
    }

    setUserName(userName) {
        this.userName = userName
    }

    setUserHits(userHits) {
        this.userHits = userHits
    }

    incrementUserHits() {
        this.userHits++
    }

}

module.exports = {
    User: User
}