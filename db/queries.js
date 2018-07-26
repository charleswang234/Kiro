require("dotenv").config();

var knex = require("knex")({
  client: "pg",
  connection: {
    host : "127.0.0.1",
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  }
});

module.exports = {
  getAllUsers: () => {
    return knex("users").select()
  },

  getUserInfo: (user_id) => {
    return knex('users')
      .where('id', user_id)
      .select()
  },

  getAllLandlords: () => {
    return knex('landlords')
      .select()
  }

  getAllTenants: () => {
    return knex('tenants')
      .select()
  }



  // getAllStudents: () => {
  //   return knex("students").select()
  // },

  // getStudentInfo: (student_id) => {
  //   return knex("students")
  //     .where("id", student_id)
  //     .select()
  // },

  // getAllLessonsByStudent: (student_id) => {
  //   return knex("lessons")
  //     .where("student_id", student_id)
  //     .select();
  // },

  // getLessonsInMonthByStudent: (student_id, startDate, endDate) => {
  //   return knex("lessons")
  //     .where("student_id", student_id)
  //     .whereBetween("date", [startDate, "2020-01-01"])
  // }
}