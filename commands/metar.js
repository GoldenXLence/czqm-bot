module.exports = {
    name: 'metar',
    description: 'fetches metar for a specific airport',
    execute(message, args, config, Discord, mongoose, eventSchema, client, permissions) {
        const https = require('https')
        const options = {
            hostname: 'metar.vatsim.net',
            port: 443,
            path: `/search_metar.php?id=${args[1]}`,
            method: 'GET'
        }

        const req = https.request(options, res => {
            //console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                var metarEmbed = {
                    title: `METAR`,
                    author: {
                        name: 'CZQM FIR',
                        icon_url: 'http://czqm.ca/images/imageTitleLeft.png',
                        url: 'http://czqm.ca',
                    },
                    fields: [
                        {
                            name: `${args[1].toUpperCase()} METAR`,
                            value: `${d}`
                        }
                    ]
                }

                message.channel.send({ embed: metarEmbed })
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.end()
    },
};