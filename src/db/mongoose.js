const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connect = (uri) => {
    console.log(uri, " : uri");
    try {
        mongoose.connect(uri, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('db connected');
    } catch (error) {
        console.log(error.message);
        process.exit(0)
    }
}

module.exports = connect;