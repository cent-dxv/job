const mongoose = require("mongoose");
const user = require("./user")

const { Schema } = mongoose;

const job_Schema = new Schema(
  {
    company: {
      type: String,
      required: [true, "company name must specified"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "postion must be specified"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["interview", "decliend", "pending"],
      required: [true, "status fo the job is missing"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "creator name of a job is missing"],
    },
  },
  { timestamps: true }
);

// job_Schema.pre('init', async function (job) {
//   console.log('this fired after you ran a find query');
//   // job.company= "50"
//   // job.position= "50"
//   // job.status= "50"
//   // job.createdBy= "50"
//   // job.createdAt= "202"
//   // job.updatedAt = "50"
//   // job.createdBy = '50'
//   job.Hrr ="cvsdv"
//   job.Hr =await user.findOne(job.createdBy);



//   console.log(job);
// return job
 
// });

module.exports = mongoose.model("Job", job_Schema);
