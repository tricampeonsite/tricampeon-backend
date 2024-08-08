
// @params dataRecived = String
export default (dataRecived) => {
    const urlRegex = /https?:\/\/[^\s"]+/g;
    const url = dataRecived.match(urlRegex);

    return url[0]
}