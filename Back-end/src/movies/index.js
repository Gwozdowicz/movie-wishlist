'use strict';
var unirest = require("unirest");
var apiKey = require("../../config").apiKey

const errors = require('../errors');

exports.findLatest = (req, res, next) => {


  unirest.get('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-07-01&primary_release_date.lte=2020-01-01')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .query({ "api_key": apiKey})
  .end(function (response) {
    if (res.error) throw new Error(res.error);

 
    res.status(200).json(response.body)
  });

};

exports.findPopular= (req, res, next) => {
  unirest.get('https://api.themoviedb.org/3/discover/movie')
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .query({ "api_key": apiKey})
  .end(function (response) {
    if (res.error) throw new Error(res.error);
    res.status(200).json(response.body)
  });

}

exports.findById = (req, res, next) => {

  unirest.get(`https://api.themoviedb.org/3/movie/${Number(req.params.movie_id)}`)
  .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
  .query({ "api_key": apiKey})
  .end(function (response) {
    if (res.error) throw new Error(res.error);

    res.status(200).json(response.body)
  });

};



// exports.getTopRatedMovies= (req, res, next) => {
//   var search = new URLSearchParams();
//   search.set('api_key', this.apikey);
//   return this._jsonp.get('https://api.themoviedb.org/3/movie/top_rated?callback=JSONP_CALLBACK', {search})
//     .map(res => {
//       return res.json();
//     })
// }

// exports.searchMovies= (req, res, next) => {
//   // searchstr
//   var search = new URLSearchParams();
//   search.set('sort_by','popularity.desc');
//   search.set('query', searchStr);
//   search.set('api_key', this.apikey);
//   return this._jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK', {search})
//     .map(res => {
//       return res.json();
//     })
// }

// exports.getMovie= (req, res, next) => {
//   //id
//   var search = new URLSearchParams();
//   search.set('api_key', this.apikey);
//   return this._jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'?callback=JSONP_CALLBACK', {search})
//     .map(res => {
//       return res.json();
//     })
// }

// exports.getGenres= (req, res, next) => {
//   var search = new URLSearchParams();
//   search.set('language', 'en-US');
//   search.set('api_key', this.apikey);
//   return this._jsonp.get('https://api.themoviedb.org/3/genre/movie/list?callback=JSONP_CALLBACK', {search})
//     .map(res => {
//       return res.json();
//     })
// }

// exports.getMoviesByGenre= (req, res, next) => {
//   // id
//   var search = new URLSearchParams();
//   search.set('api_key', this.apikey);
//   return this._jsonp.get('https://api.themoviedb.org/3/genre/'+ id +'/movies?callback=JSONP_CALLBACK', {search})
//     .map(res => {
//       return res.json();
//     })
// }


