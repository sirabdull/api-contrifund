
const ContributionModel = require('../Models/contributionModel');
const { v4: uuidv4 } = require('uuid');

// Create a new contribution
const createContribution = async(req, res) => {
  //  create a new contribution
  try{
  const { contribution_type, contribution_description,contribution_amount, contribution_title } = req.body;

  const ContributionExist = await ContributionModel.findOne({
    where: {
      contribution_title: contribution_title
    }
  });
  if (ifContributionExist) {
    res.status(400).json({
      status: false,
      message: "Contribution already exist",
    });
  }
  const newContribution = await ContributionModel.create({
    contribution_id: uuidv4(),
    contribution_type,
    contribution_description,
    contribution_amount,
    contribution_title
  });
  res.status(201).json({
    status: true,
    message: "Contribution created successfully",
    data: {
      contribution_title,
      contribution_description,
      contribution_amount,
      contribution_type
    },
  });
} catch (error) {
  res.status(500).json({
    status: false,
    message: error.message
  })
}
  };


// Read all contributions
const getAllContributions = (req, res) => {
  //  get all contributions
};

// Read a single contribution
const getContributionById = (req, res) => {
  //  get a single contribution by ID
};

// Update a contribution
const updateContribution = (req, res) => {
  // update a contribution
  try{
  const { contribution_id } = req.params;
  if(!contribution_id) throw new Error('contribution not found')

  const updateContribution = ContributionModel.update(req.body, {
    where: {
      contribution_id: contribution_id
    }
  });
  res.status(200).json({
    status: true,
    message: "Contribution updated successfully",
    data: updateContribution
  })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    })
  }
};

// Delete a contribution
const deleteContribution = async(req, res) => {
  //  delete a contribution
  try{
  const { contribution_id } = req.params;
  if(!contribution_id) throw new Error('contribution not found');
  
  const deleteContribution = await ContributionModel.destroy({
      where: {
          contribution_id: contribution_id
      }
  });

  res.status(200).json({
      status: true,
      message: "Contribution deleted successfully",
      data: deleteContribution
  })
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    })
  }
};

module.exports = {
  createContribution,
  getAllContributions,
  getContributionById,
  updateContribution,
  deleteContribution,
};
