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
        deptName: "A. M. Naik Block",
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
