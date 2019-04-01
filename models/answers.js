
module.exports = function(sequelize, Sequelize) {

	var Answer = sequelize.define('answer', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		user_id: { type: Sequelize.INTEGER,notEmpty: true},
		source: { type: Sequelize.STRING,notEmpty: true},
		question_code: {type:Sequelize.TEXT},
		answer : {type:Sequelize.TEXT}

});
console.log("answers---------------------");
	return Answer;

}
