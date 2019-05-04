
module.exports = function(sequelize, Sequelize) {

	var Rentor = sequelize.define('rentor', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		user_id: { type: Sequelize.INTEGER,notEmpty: true},
		zipcode: { type: Sequelize.INTEGER,notEmpty: true},
		loc_description: {type:Sequelize.TEXT},
		age: {type:Sequelize.INTEGER},
		age_min: {type:Sequelize.INTEGER},
		age_max: {type:Sequelize.INTEGER},
		values_level: {type:Sequelize.INTEGER},
		price: {type:Sequelize.INTEGER},
		gender : {type:Sequelize.TEXT},
		gender_opt : {type:Sequelize.TEXT}




});
console.log("rentor---------------------");
	return Rentor;

}
