import { Schema, model } from 'mongoose';

const matchesSchema = new Schema({
    _id: {
        require: true,
        type: String,
        unique: true
    },
    matchStatus: {
        require: true,
        enum: [ "FINISHED", "SCHEDULED", "PLAYING"],
        type: String
    },
    channels: {
        type: [{
                name: String,
                altName: String
            }],
        require: true
    },
    localTime: {
        type: String,
        require: true
    },
    matchTime: String,
    contestants: {
        type:{
            homeTeam,
            awayTeam,
        },
        require: true
    },
    goals: {
        type: {
            homeScore,
            awayScore
        },
        require: true
    },
    stage: String,
    matchDateText: {
        type: String,
        require: true
    },
    venue: {
        type: String,
        require: true,
    },
    tournamentId: {
        require: true,
        type: String,
    },
    competitionName: {
        type: String
    }
},
{
    timestamps: true,
    versionKey: false
})

export default model('Matches', matchesSchema);

[
    {
        "id": "7cj6fwyow6bd9m6xrvegv1yxg",
        "matchStatus": "FINISHED",
        "linkProps": {
            "href": "/futbol/champions-league-2023-2024/paris-saint-germain-borussia-dortmund-7cj6fwyow6bd9m6xrvegv1yxg/",
            "title": "Ir a ficha del partido PSG vs. Dortmund"
        },
        "channels": [
            {
                "name": "foxsports",
                "altName": "Fox Sports"
            },
            {
                "name": "espn",
                "altName": "ESPN"
            },
            {
                "name": "star+",
                "altName": "Star+"
            }
        ],
        "localTime": "16:00 hs",
        "matchTime": "Finalizado",
        "previousMatchResults": "Partido de ida: 0-1",
        "contestants": {
            "homeTeam": {
                "imgProps": {
                    "src": "https://media-canchallena.glanacion.com/escudo/r/2b3mar72yy8d6uvat1ka6tn3r.png",
                    "sources": [
                        {
                            "minWidth": 768,
                            "srcSet": "https://media-canchallena.glanacion.com/escudo/r/2b3mar72yy8d6uvat1ka6tn3r.png?width=64"
                        },
                        {
                            "minWidth": 320,
                            "srcSet": "https://media-canchallena.glanacion.com/escudo/r/2b3mar72yy8d6uvat1ka6tn3r.png?width=48"
                        }
                    ],
                    "alt": "PSG"
                },
                "code": "PSG",
                "name": "PSG",
                "nameUrl": "Paris Saint-Germain",
                "id": "2b3mar72yy8d6uvat1ka6tn3r",
                "redCards": 0,
                "country": "Francia"
            },
            "awayTeam": {
                "imgProps": {
                    "src": "https://media-canchallena.glanacion.com/escudo/y/dt4pinj0vw0t0cvz7za6mhmzy.png",
                    "sources": [
                        {
                            "minWidth": 768,
                            "srcSet": "https://media-canchallena.glanacion.com/escudo/y/dt4pinj0vw0t0cvz7za6mhmzy.png?width=64"
                        },
                        {
                            "minWidth": 320,
                            "srcSet": "https://media-canchallena.glanacion.com/escudo/y/dt4pinj0vw0t0cvz7za6mhmzy.png?width=48"
                        }
                    ],
                    "alt": "Dortmund"
                },
                "code": "DOR",
                "name": "Dortmund",
                "nameUrl": "Borussia Dortmund",
                "id": "dt4pinj0vw0t0cvz7za6mhmzy",
                "redCards": 0,
                "country": "Alemania"
            }
        },
        "goals": {
            "homeScore": 0,
            "awayScore": 1
        },
        "preMatchPredictions": [
            {
                "type": "Home",
                "probability": "60.5"
            },
            {
                "type": "Away",
                "probability": "19.4"
            },
            {
                "type": "Draw",
                "probability": "20.0"
            }
        ],
        "cards": {
            "homeCards": {
                "redCards": 0
            },
            "awayCards": {
                "redCards": 0
            }
        },
        "shareProps": {
            "localTeam": "PSG",
            "awayTeam": "Dortmund",
            "matchId": "7cj6fwyow6bd9m6xrvegv1yxg",
            "sport": "futbol",
            "tournament": "champions-league",
            "matchDate": "2024-05-07"
        },
        "penalties": {},
        "stage": "Semifinales",
        "stageid": "ee7kkvgjhdzrbtd115lqdad5g",
        "matchDateText": "2024-05-07 16:00:00",
        "venue": "Parc des Princes",
        "week": null,
        "coverageLevel": "15",
        "tournamentId": "eaf2z13av1rs0jbwnnxfapdec",
        "competitionName": "Champions League"
    }

]