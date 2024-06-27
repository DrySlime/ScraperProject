function getDomainName(weblink) {
    let parsedUrl = new URL(weblink);
    let hostname = parsedUrl.hostname;
    let domainParts = hostname.split('.').slice(-2);
    return domainParts.join('.');
}

module.exports = getDomainName;