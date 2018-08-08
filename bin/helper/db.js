const mongoose = require ('mongoose');

module.exports = () => {

    mongoose.connect('mongodb://movieuser:hasan0134@ds115592.mlab.com:15592/movie-api');
    mongoose.connection.on('open',()=> {

    console.log('Mongo:DB : Connected ')

});
mongoose.connection.on('error',(err)=> {

    console.log('Mongo:DB : Error ',err)

});

mongoose.Promise = global.Promise;
}