const moment = require("moment");
const db = require("../config/db_con");

const user = {};

user.postDetail = (data) => {
  return new Promise((resolve, reject) => {
    const nowDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const entryData = {
      Name: data.Name || "",
      Email: data.Email || "",
      Age: data.Age || "",
      created_at: nowDateTime,
      image_path: data.image_path || null
    };

    const queryStr = "INSERT INTO users SET ?";
    db.query(queryStr, entryData, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.getDetails = () => {
  return new Promise((resolve, reject) => {
    const queryStr = "SELECT * FROM users WHERE status = 1";
    db.query(queryStr, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.getDetailsbyId = (id) => {
  return new Promise((resolve, reject) => {
    const queryStr = "SELECT * FROM users WHERE id = ? AND status = 1";
    // console.log("Data by ID-->",queryStr)
    db.query(queryStr, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.getallDetailsbyId = (id) => {
  return new Promise((resolve, reject) => {
    const queryStr = "SELECT * FROM users WHERE id = ? AND status = 1";
    console.log("Data by ID-->",queryStr)
    db.query(queryStr, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.updateDetails = (data) => {
  return new Promise((resolve, reject) => {
    const nowDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const updatedData = {
      Name: data.Name || "",
      Email: data.Email || "",
      Age: data.Age || "",
      image_path: data.image_path || null,
      updated_at: nowDateTime
    };

    const queryStr = "UPDATE users SET ? WHERE id = ?";
    db.query(queryStr, [updatedData, data.id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.deleteDetails = (id) => {
  return new Promise((resolve, reject) => {
    const queryStr = "UPDATE users SET status = 0 WHERE id = ?";
    db.query(queryStr, [id], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

module.exports = user;
