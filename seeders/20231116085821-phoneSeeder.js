"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Phones", [
      {
        name: "Samsung Galaxy S23",
        brandID: 1,
        spesification: "CPU Speed: 3.36Hz,2.8GHz,2GHz || CPU Type: Octa Core || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Samsung Galaxy S22",
        brandID: 1,
        spesification: "CPU Speed: 3.36Hz,2.8GHz,2GHz || CPU Type: Octa Core || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Oppo A32S",
        brandID: 2,
        spesification: "CPU Speed: 3.36Hz,2.8GHz,2GHz || CPU Type: Octa Core || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Oppo Find X",
        brandID: 2,
        spesification: "CPU Speed: 3.36Hz,2.8GHz,2GHz || CPU Type: Octa Core || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Iphone 13",
        brandID: 3,
        spesification: "Bionic 14 || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Iphone 14",
        brandID: 3,
        spesification: "Bionic 15 || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Xiaomi mi 11",
        brandID: 4,
        spesification: "CPU Speed: 3.36Hz,2.8GHz,2GHz || CPU Type: Octa Core || Resolution:2340 x 1080 (FHD+)",
      },
      {
        name: "Xiaomi mi 12",
        brandID: 4,
        spesification: "CPU Speed: 3.36Hz,2.8GHz,2GHz || CPU Type: Octa Core || Resolution:2340 x 1080 (FHD+)",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
