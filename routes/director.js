const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// models dahil et
const Director = require("../models/Director");

/* GEThepsi */
router.get("/", (req, res, next) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: "movies", //connection adı
        localField: "_id",
        foreignField: "director_id",
        as: "movies" //nereye atancagı
      }
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true //filmi olmasada gelsin diye
      }
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio"
        },
        movies: {
          $push: "$movies"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies"
      }
    }
  ]);

  promise
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res.json(err);
    });
});

//ekleme
router.post("/", (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/director_id", (req, res, next) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },

    {
      $lookup: {
        from: "movies", //connection adı
        localField: "_id",
        foreignField: "director_id",
        as: "movies" //nereye atancagı
      }
    },
    {
      $unwind: {
        path: "$movies",
        preserveNullAndEmptyArrays: true //filmi olmasada gelsin diye
      }
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio"
        },
        movies: {
          $push: "$movies"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies"
      }
    }
  ]);

  promise
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res.json(err);
    });
});
//guncelleme
router.put("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true //eger bunu yapmazsak degıstırdıgımız yer ilk postta direk gozukmez ama veritabanında istediğimiz sekilde olur
  });

  promise
    .then(director => {
      if (!director) next({ message: "The director was not found", code: 99 });
      res.json({ director });
    })
    .catch(err => {
      res.json(err);
    });
});
router.delete("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise
    .then(director => {
      if (!director) next({ message: "The director was not found", code: 99 });
      res.json({ director });
    })
    .catch(err => {
      res.json(err);
    });
})
module.exports = router;
