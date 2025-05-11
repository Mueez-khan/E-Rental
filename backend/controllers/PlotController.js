 const PlotSchema = require("../models/PlotSchema");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

exports.createPlot = async (req, res) => {
  try {
    // console.log('Request Body:', req.body);
    // console.log('Request Files:', req.files);

    // Extracting plot details from request body
    const {
      location,
      price,
      description,
      perks,
      aboutPlace,
      guestDetails
    } = req.body;

    const images = req.files;
    const owner = req.user.id;
    console.log("User id " , owner)

    // console.log("Image details ", images);

    // Check for missing required fields
    if (
      !location ||
      !price ||
      !description ||
      !perks ||
      !aboutPlace ||
      !guestDetails ||
      !images 
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Handling image uploads
    let imageUrls = [];
    if (images && images.length > 0) {
      const imageUploadPromises = images.map(async (file) => {
        try {
          // Adjust parameters as needed
          const result = await uploadImageToCloudinary(file, "plots", 500, 80);
          // Delete the local file after uploading to Cloudinary
          fs.unlinkSync(file.path);
          return result.secure_url;
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error('Error uploading image to Cloudinary');
        }
      });
      imageUrls = await Promise.all(imageUploadPromises);
    }

    // Create a new plot object
    const newPlot = new PlotSchema({
      location,
      price,
      description,
      images: imageUrls, // Store uploaded images URLs
      perks,
      aboutPlace,
      guestDetails,
      owner 
    });

    // Save the new plot to the database
    await newPlot.save();

    // Send success response
    return res.status(200).json({
      success: true,
      message: "Plot created successfully!",
      plot: newPlot,
    });

  } catch (err) {
    console.error('Error creating plot:', err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};


exports.showAllPlots = async (req , res) =>{

  try{


    const response = await PlotSchema.find({});

    return res.status(200).json({
      success : true,
      message : "Data fetched successfully" , 
      data : response
    })


  }
  catch(err){

    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });

  }

}

// *********************************************
// *********************************************
// Find the specific plot by id 
// *********************************************
// *********************************************

exports.getPlotById = async (req , res) =>{

  try{


    const { id } = req.params;

    console.log("Param request " , req.params);
    console.log("Plot ID:", id);

    const plot = await PlotSchema.findById(id);

    if(!plot){

      return res.status(404).json({
        success: false,
        message : "Plot with this id is not present"
      })

    }


    return res.status(200).json({
      success : true,
      message : "Plot found successfully" , 
      plot
    })


  }
  catch(err){

    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });

  }

}

// *********************************************
// *********************************************
// Find and delete
// *********************************************
// *********************************************

exports.DeletePlot = async (req, res) => {
  try {
    const  plotId  = req.params.id;
    const owner = req.user.id;

      console.log("plot id  " , plotId);
      console.log("owner id  " , owner);

    // Find the plot by ID and owner
    const plot = await PlotSchema.findOne({ _id: plotId, owner });

    if (!plot) {
      return res.status(404).json({
        success: false,
        message: "Plot not found or you are not authorized to delete it",
      });
    }

    // Deleting images from Cloudinary
    const imageDeletePromises = plot.images.map(async (imageUrl) => {
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID from the URL
      try {
        await cloudinary.uploader.destroy(publicId); // Delete image from Cloudinary
      } catch (err) {
        console.error("Error deleting image from Cloudinary", err);
      }
    });
    await Promise.all(imageDeletePromises); // Wait for all images to be deleted

    // Delete plot from the database
    await PlotSchema.findByIdAndDelete(plotId);

    return res.status(200).json({
      success: true,
      message: "Plot deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting plot:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};
// *********************************************
// *********************************************
// update the plot 
// *********************************************
// *********************************************

exports.updatePlot = async (req, res) => {
  try {
    console.log("Request body: ", req.body);
console.log("Request files: ", req.files);

    const plotId = req.params.id;
    const owner = req.user.id; // Assuming req.user contains authenticated user's details
    const { location, price, description, perks, aboutPlace, guestDetails } = req.body;
    console.log("Request body: ", req.body);
    const images = req.files;
    console.log("Request files: ", req.files);

    // Find the plot by ID and owner
    const plot = await PlotSchema.findOne({ _id: plotId, owner });
    if (!plot) {
      return res.status(404).json({
        success: false,
        message: "Plot not found or you are not authorized to update it",
      });
    }

    // Handling new image uploads (if any)
    let imageUrls = plot.images; // Keep existing images by default
    if (images && images.length > 0) {
      // Upload new images to Cloudinary
      const imageUploadPromises = images.map(async (file) => {
        try {
          const result = await uploadImageToCloudinary(file, "plots", 500, 80);
          fs.unlinkSync(file.path); // Delete local file after upload
          return result.secure_url;
        } catch (err) {
          throw new Error("Error uploading image to Cloudinary");
        }
      });
      const newImageUrls = await Promise.all(imageUploadPromises);
      imageUrls = [...imageUrls, ...newImageUrls]; // Merge new images with existing ones
    }

    // Create an object with updated values
    const updatedData = {
      location: location || plot.location,
      price: price || plot.price,
      description: description || plot.description,
      perks: perks || plot.perks,
      aboutPlace: aboutPlace || plot.aboutPlace,
      guestDetails: guestDetails || plot.guestDetails,
      images: imageUrls,
    };

    // Find the plot and update it
    const updatedPlot = await PlotSchema.findByIdAndUpdate(
      plotId,
      { $set: updatedData },
      { new: true, runValidators: true } // Return updated document and run schema validation
    );

    if (!updatedPlot) {
      return res.status(404).json({
        success: false,
        message: "Plot update failed.",
      });
    }

    console.log("Plot updated and saved to database:", updatedPlot);
    return res.status(200).json({
      success: true,
      message: "Plot updated successfully",
      plot: updatedPlot,
    });
  } catch (err) {
    console.error("Error updating plot:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
};




exports.getPaginatedPlots = async (req , res) =>{

  try {
    const limit = parseInt(req.query.limit) || 20; // default to 20 plots
    const page = parseInt(req.query.page) || 1; // default to first page
    const skip = (page - 1) * limit;

    const plots = await PlotSchema.find().skip(skip).limit(limit);
    const total = await PlotSchema.countDocuments(); // total number of plots

    res.status(200).json({
      success: true,
      message: "Plots fetched successfully",
      data: plots,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching plots",
    });
  }

}


// controllers/plotController.js

exports.getPlotById = async (req, res) => {
  try {
    const plotId = req.params.id;
    const plot = await PlotSchema.findById(plotId);
    if (!plot) {
      return res.status(404).json({
        success: false,
        message: "Plot with this ID not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Plot found successfully",
      plot,
    });
  } catch (err) {
    console.error('Error fetching plot details:', err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the plot",
    });
  }
};



exports.getPlotsByUser = async (req, res) => {
  try {
    const owner = req.params;
    console.log("User req" , req.user.id);


    console.log("User id : " , owner.id);
    const plots = await PlotSchema.find({ owner: owner.id});
    res.status(200).json({ success: true, plots });


  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching plots" });
  }
};



// *********************************************
// *********************************************
// Find the recent plots 
// *********************************************
// *********************************************




exports.recentProperty = async (req , res) =>{

  try{

    // const data = await PlotSchema.find({});

    const data = await PlotSchema.find({}).sort({ createdAt: -1}).limit(20).exec();

  //  const data = PlotSchema.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
  //     console.log( post );
  //   });

    console.log("Response :" , data);

    return res.status(200).json({
      success : true,
      message : "Recent plot fetched Successfully",
      data
    })

  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }


}