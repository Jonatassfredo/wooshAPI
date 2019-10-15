const variables = {
    Api: {
        port: process.env.PORT || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://admin:HPsfrpym2oq37LB0@cluster0-sdisf.mongodb.net/test?retryWrites=true&w=majority'
    },
    Security: {
        secretyKey: 'd41d8cd98f00b204e9800998ecf8427e|7aef61337bcee2fe773aa78b40afacbc'
    }
}
module.exports = variables;