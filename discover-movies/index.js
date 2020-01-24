const config = require('../config');
const { discoverMovie } = require('./movieApi');

function loadMovieRoute(app) {
  app.post('/discover-movies', function(req, res) {
    console.log('[GET] /discover-movies');
    const kind = req.body.conversation.memory['recording'].type;

    const genreId = req.body.conversation.memory['genre'].id;

    const language = req.body.conversation.memory['language'];

    const isoCode = language.short.toLowerCase();

    return discoverMovie(kind, genreId, isoCode)
      .then( function(movie_response) {
        console.log(movie_response)
        res.json({
          replies: movie_response
        });
      })
      .catch(function(err) {
        console.error('movieApi::discoverMovie error: ', err);
      });
  });
}

module.exports = loadMovieRoute;
