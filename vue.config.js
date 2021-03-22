//POUR LE PROBLEME DE CONSOLE SUR MAC
//example: GET http://172.31.7.153:8080/sockjs-node/info?t=1555922702538 net::ERR_CONNECTION_TIMED_OUT
module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 8080,
        public: '0.0.0.0:8080'
    },
    publicPath: "/"
}
