const { CredentialsUtil } = require('../../projectUtils');

module.exports = {
    authorName: CredentialsUtil.generateAuthorName(),
    authorLogin: CredentialsUtil.generateAuthorLogin(),
    authorEmail: CredentialsUtil.generateEmail(),
}