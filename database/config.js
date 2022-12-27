const mongoose = require('mongoose');
const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, );
        console.log('Base de datos conectada');
    } catch (err) {
        console.log(err);
        throw new Error("error");
    }
}

module.exports = {
    dbConnect
}