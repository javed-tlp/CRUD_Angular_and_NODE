const model = require("../models/user_model");


exports.postData = async (req, res) => {
  try {
    const result = await model.postDetail(req.body);
    res.send({ message: "Data Added successfully", data:result });
  } catch (error) {
    console.log(error);
  }
};

exports.getData = async (req, res) => {
  try {
    const result = await model.getDetails(req.body);
    res.send({ message: "Data Get sucessfully:--", data: result, data1:req.body });
  } catch (error) {
    console.log(error);
  }
};

exports.getDatabyid = async (req, res) => {
  try {
    req.body.id = req.params.id;
    result = await model.getDetailsbyId(req.body);
    res.send({ message: "fethed sucessfully", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.updateData = async (req, res) => {
  try {
    req.body.id = req.params.id;
    const result = await model.updateDetails(req.body);
    res.send({ message: "updated sucessfully", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteData=async (req,res)=>{
    try {
        req.body.id=req.params.id
        const result= await model.deleteDetails(req.body)
        if(result.affectedRows >=1){
          var resultdata = await model.deletedData(req.body)
        }
        
        res.send({message:"deleted sucessfully", data:result, data2 :resultdata, Req_Body:req.body})
        
    } catch (error) {
        console.log(error)
    }
}

exports.uploadFile = async (req, res) => {
  try {
    console.log('Upload route triggered');
    console.log('File info:', req.file);
    console.log('Request params:', req.params);

    // Check if file was uploaded
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).send({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const userId = req.params.id;

    console.log('File path:', filePath);
    console.log('User ID:', userId);

    // Save image path in the user's record
    const result = await model.saveUserImagePath({ id: userId, image_path: filePath });

    console.log('Database update result:', result);
    res.send({ message: "File uploaded successfully", data: result });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).send({ message: "File upload failed", error: error.message });
  }
};

