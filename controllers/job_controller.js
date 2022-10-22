const Jobs = require("../model/job");
const {StatusCodes} = require("http-status-codes")


const Get_all_job = async (req, res) => {
  const { name, id } = req.user;
  const job = await Jobs.find({}).sort('createdAt');
  res.json(job);
};

const Create_Job = async (req, res) => {
  const { userId } = req.user;
  const newjob = { ...req.body, createdBy: userId };
  const job = await Jobs.create(newjob);
  res.status(StatusCodes.CREATED).json(job);
};


const Get_job = async (req, res) => {
  const { id } = req.params;
  console.log(req.params)
  const job = await Jobs.find({_id:id});
  // job[0].createdBy = 50
  res.json(job);
};

module.exports = { Get_all_job, Create_Job,Get_job };
