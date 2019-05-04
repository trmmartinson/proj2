
module.exports = function(sequelize, Sequelize) {

	var Rentee = sequelize.define('rentee', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		user_id: { type: Sequelize.INTEGER,notEmpty: true},
		radius: { type: Sequelize.INTEGER,notEmpty: true},
		zipcode: { type: Sequelize.INTEGER,notEmpty: true},
		values_level: { type: Sequelize.INTEGER,notEmpty: true},
                age: {type:Sequelize.INTEGER},
                age_min: {type:Sequelize.INTEGER},
                age_max: {type:Sequelize.INTEGER},
		price_min: { type: Sequelize.INTEGER,notEmpty: true},
		price_max: { type: Sequelize.INTEGER,notEmpty: true},
		gender: {type:Sequelize.TEXT},
		gender_opt: {type:Sequelize.TEXT}




});
console.log("rentee---------------------");
	return Rentee;

}
