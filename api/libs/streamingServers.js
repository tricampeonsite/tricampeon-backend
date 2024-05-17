import parameters from "./parameters.js";

// @param getParameter_get = String URL
// @param server = undefined
export default (urlVideo, server) => {
    const { getParameter_get, getParameter_url, isStarPlusEvent, containMpdOrM3u8File } = parameters(urlVideo)
    // servidores
    let streamingServers_1 = ["//","//edge-live02-mun", "//edge-live01-bel", "//edge-live02-bel", "//edge-live11-hr", "//edge-live12-hr", "//edge-live13-hr", "//edge-live14-hr", "//edge-live15-hr", "//edge-live16-hr", "//edge-live17-hr", "//edge-live31-hr", "//edge-live32-hr", "//edge-live12-sl", "//edge-live13-sl", "//edge-live15-sl", "//edge-live16-sl", "//edge-live17-sl", "//edge-live31-sl", "//edge-live32-sl", "//edge-vod02-sl", "//edge-vod04-sl", "//edge9-sl", "//edge10-sl"];
    let streamingServers_2 = ["","edge-live01-mun", "edge-live01-bel", "edge-live11-hr", "edge-live12-hr", "edge-live13-hr", "edge-live14-hr", "edge-live15-hr", "edge-live16-hr", "edge-live17-hr", "edge-live31-hr", "edge-live32-hr", "edge-live34-hr", "edge-live11-sl", "edge-live12-sl", "edge-live13-sl", "edge-live15-sl", "edge-live16-sl", "edge-live17-sl", "edge-live31-sl", "edge-live32-sl", "edge-vod02-sl", "edge-vod04-sl", "edge-vod06-sl", "edge9-sl", "edge10-sl", "edge-vod01-hr", "edge-vod02-hr", "edge-vod03-hr", "edge-vod04-hr", "edge7-ccast-sl", "edge-live01-cen", "edge-live02-cen", "edge-live03-cen", "edge-mix01-cte", "edge-mix02-cte", "edge-vod01-cen", "edge-live01-coe", "edge-mix01-coe", "edge-mix02-coe", "edge-mix03-coe", "edge-mix04-coe", "edge-mix05-coe", "edge-mix01-ird", "edge-mix02-ird", "edge-mix01-mus", "edge-mix03-mus", "edge-live01-ros", "edge-live02-mun",  "edge-live02-bel",  "edge6-ccast-sl",   "edge-mix02-cte",  "edge-mix04-coe"];
    let streamingServers_3 = [getParameter_get]; // eventos de star+
    let streamingServers_4 = [urlVideo];

    const setStreamingServer = () => {
        if (isStarPlusEvent) {
            return streamingServers_3;
        } else if (getParameter_get) {
            return streamingServers_2;
        } else if (getParameter_url) {
            return streamingServers_1;
        } else if(containMpdOrM3u8File){
            return streamingServers_4;
        } else {
            return streamingServers_4
        }
    }

    server = setStreamingServer();

    return server;
}