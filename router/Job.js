const express = require("express");

const {
  Get_all_job,

  Create_Job,
  Get_job
} = require("../controllers");

router = express.Router();
router.route("/").get( Get_all_job).post( Create_Job);
router.route("/:id").get(Get_job)

module.exports = router;
