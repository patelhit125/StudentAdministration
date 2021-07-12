'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('departments', [
      {
        id: 1,
        deptName: "Shri K D Pathak Block",
        deptBlock: "A",
        deptBranch: "Mathematics",
        createdAt: "2021-07-07 11:31:29",
        updatedAt: "2021-07-07 11:31:29"
      },
      {
        id: 2,
        deptName: "A M Naik Block",
        deptBlock: "B",
        deptBranch: "Information Technology",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 3,
        deptName: "J D Raval Block",
        deptBlock: "C",
        deptBranch: "Electrical",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 4,
        deptName: "Dr. C L Patel Block",
        deptBlock: "C",
        deptBranch: "Civil",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 5,
        deptName: "Er. V C Patel Block",
        deptBlock: "D",
        deptBranch: "Structural",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 6,
        deptName: "Mr. P B Patel Block",
        deptBlock: "E",
        deptBranch: "Computer",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 7,
        deptName: "Er. P H Rana Block",
        deptBlock: "F",
        deptBranch: "Production",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 8,
        deptName: "Er. B M Vyas Block",
        deptBlock: "G",
        deptBranch: "Mechanical",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 9,
        deptName: "Dr. A K Aggarwal Block",
        deptBlock: "H",
        deptBranch: "Electronics and Communication",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      },
      {
        id: 10,
        deptName: "Shri A M Mankad Block",
        deptBlock: "I",
        deptBranch: "Electronics",
        createdAt: "2021-07-07 11:31:32",
        updatedAt: "2021-07-07 11:31:32"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
