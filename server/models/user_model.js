const moment = require("moment");
const db = require("../config/db_con");

const user = (data) => {};

user.postDetail = (data) => {
  return new Promise((resolve, reject) => {
    var nowDateTime = moment().format("YYYY-MM-DD HH:mm:ss")
    const entry_data = {
      Name: data.Name ? data.Name : "",
      Email: data.Email ? data.Email : "",
      Age: data.Age ? data.Age : "",
      created_at : nowDateTime
    };
    const queryStr = "INSERT INTO users SET ?";
    db.query(queryStr, entry_data, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    }); 
  });
};

user.getDetails = (data) => {
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
user.deletedData = (data) => {
  return new Promise((resolve, reject) => {
    const queryStr = "SELECT * FROM users WHERE status = 0 AND id =?";
    // filter = []
    db.query(queryStr,data.user_id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.getDetailsbyId = (data) => {
  return new Promise((resolve, reject) => {
    const queryStr = "SELECT * FROM users WHERE id=? AND status =1";
    db.query(queryStr, data.id, (err, result) => {
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
    const updatedData = {
      Name: data.Name ? data.Name : "",
      Email: data.Email ? data.Email : "",
      Age: data.Age ? data.Age : "",
      
    };
    const queryStr = "UPDATE users SET ? WHERE id=?";
    const filter = [updatedData, data.id];
    db.query(queryStr, filter, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  });
};

user.deleteDetails = (data) => {
  return new Promise((resolve, reject) => {
    const queryStr = "UPDATE users SET status = 0 WHERE id=?";
    db.query(queryStr, data.user_id, (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  }); 
};

module.exports = user;
