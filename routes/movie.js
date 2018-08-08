const express = require('express');
const router = express.Router();
//Models tanımlıyoruz
 const Movie = require('../models/Movie');

 //hepsini listele
router.get('/',(req,res)=>{

  const promise = Movie.find({});
  
  promise.then((data) => {
    
  res.json({data});
  }).catch((err) => {
  res.json(err);
  })
  
  });
  //between
  router.get('/between/start_year/end_year',(req,res)=>{
    const {start_year,end_year} = req.params;
    const promise = Movie.find(
      {
        year : {"$gte" : parseInt(start_year) , "$lte" : parseInt(end_year)}
      }
    );
    
    promise.then((data) => {
      
    res.json({data});
    }).catch((err) => {
    res.json(err);
    })
    
    });
//top10-ayrıyetten top10u uste yazmaklıyız yoksa movieıd olarka algılıyor
router.get('/top10',(req,res)=>{

  const promise = Movie.find({}).limit(10).sort({imdb_score  :-1});
  
  promise.then((data) => {
    
  res.json({data});
  }).catch((err) => {
  res.json(err);
  })
  
  });
//filmin detayı id ile
router.get('/:movie_id',(req,res,next)=>{

  const promise = Movie.findById(req.params.movie_id);
  
  promise.then((movie) => {
    if(!movie)
     next({ message:'The movie was not found',code:99});
  res.json({movie});
  }).catch((err) => {
  res.json(err);
  })
  });

router.delete('/:movie_id',(req,res,next)=>{

    const promise = Movie.findByIdAndRemove(req.params.movie_id);
    
    promise.then((movie) => {
      if(!movie)
       next({ message:'The movie was not found',code:99});
    res.json({movie});
    }).catch((err) => {
    res.json(err);
    })
    });

//guncellme
router.put('/:movie_id',(req,res,next)=>{

    const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new : true  //eger bunu yapmazsak degıstırdıgımız yer ilk postta direk gozukmez ama veritabanında istediğimiz sekilde olur
      }
    );
    
    promise.then((movie) => {
      if(!movie)
       next({ message:'The movie was not found',code:99});
    res.json({movie});
    }).catch((err) => {
    res.json(err);
    })
    });

 //post eklmee
router.post('/', (req, res, next) => {
  //const data = req.body;
 
  //const {title,imdb_score,category,country,year} = req.body;
  //const movie = new Movie({

    //title : title,
    //imdb_score: imdb_score,
    //category: category,
    //country: country,
    //year: year

  //});
  const movie = new Movie(req.body);
 
 
  /*movie.save((err,data)=>{
if(err)
  res.json(err);
  else
res.json(data);
  });
  //res.json(title);*/

const promise = movie.save();
promise.then((data) => {
  
res.json({status :1});
}).catch((err) => {
res.json(err);
})

});


module.exports = router;
