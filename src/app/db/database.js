const mongoose = require('mongoose');
const connectionProperties = { 
    url: "mongodb://root:d3s3nv@localhost:27017/musica_catalogo?authSource=admin",
    options:  {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    }
};

const _ = mongoose.connect(connectionProperties.url, connectionProperties.options);

const connectionTest = () => {     
    return db().then(() => true).catch((err) => {
        console.log('Error: ', err);
        return false;
    });
};

module.exports = { connectionTest };