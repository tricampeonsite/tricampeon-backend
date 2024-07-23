export default (title, img, url, setKey) => {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="//ssl.p.jwpcdn.com/player/v/8.26.0/jwplayer.js"></script>
<script> jwplayer.key = 'XSuP4qMl+9tK17QNb+4+th2Pm9AWgMO/cYH8CI0HGGr7bdjo';</script>
<script src="https://cdn.jsdelivr.net/npm/jwplayer@8.20.0/jwplayer.min.js"></script>
<title>Video Player - Tricampeón</title>
</head>

<body>
<style>
</style>
<div id="player"></div>

<script>
    var playerInstance = jwplayer("player");
    var urlVideo = "${url}";

    const getURL = async () => {
        try {
            const setupPlayer = () => {
                playerInstance.setup({
                    playlist: [{
                        "title": "${title}",
                        "description": "Eventos en TRICAMPEÓN",
                        "image": "${img}",
                        "sources": [{
                            "default": false,
                            "type": "dash",
                            "file": "${url}",
                            "drm": ${setKey()},
                            "label": "0"
                        }]
                    }],
                    width: "100%",
                    height: "100%",
                    aspectratio: "16:9",
                    autostart: true,
                    cast: {},
                    sharing: {}
                });
            };

            setupPlayer();

            playerInstance.on('error', (error) => {
                console.error('Ocurrió un error en la conexión. Error: ', error);

            });

            playerInstance.on('play', () => {
                console.log('Comenzó la reproducción de video ...');
            });

        } catch (error) {
            console.error(error);
        }
    };

    getURL();
</script>

</body>

</html>
    `
}