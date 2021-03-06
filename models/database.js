const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://noor:noor@localhost:5432/lime';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  "CREATE TABLE users(																	\
  		id 								Numeric 					NOT NULL,			\
  		accessToken				TEXT							NOT NULL,			\
	  	name 							TEXT				 			NOT NULL,			\
	  	affiliation 			TEXT,														\
	  	about 						TEXT,														\
	  	role 							TEXT				 			NOT NULL,			\
	  	image 						TEXT				 			NOT NULL,			\
	  	portfolio 				TEXT 							NOT NULL,			\
	  	chat_link 				TEXT 							NOT NULL,			\
	  	PRIMARY KEY (id)																	\
	  );																									\
																												\
		CREATE TABLE announcements(													\
	  	id 								SERIAL 						NOT NULL,			\
	  	header 						TEXT				 			NOT NULL,			\
	  	message 					TEXT							NOT NULL,			\
	  	timestamp 				TEXT				 			NOT NULL,			\
	  	user_id						INTEGER						NOT NULL,			\
	  	PRIMARY KEY (id),																  \
	  	Foreign KEY (user_id) REFERENCES users(id)				\
	  );																									\
																												\
		CREATE TABLE courses(																\
	  	id 								SERIAL 						NOT NULL,			\
	  	title 						TEXT				 			NOT NULL,			\
	  	source 						TEXT				 			NOT NULL,			\
	  	description 			TEXT							NOT NULL,			\
	  	image 						TEXT				 			NOT NULL,			\
	  	course_link 			TEXT 							NOT NULL,			\
	  	chat_link 				TEXT 							NOT NULL,			\
	  	PRIMARY KEY (id)																	\
	  );																									\
																												\
		CREATE TABLE users_courses(													\
	  	course_id 				INTEGER 					NOT NULL,			\
	  	user_id 					INTEGER     			NOT NULL,			\
	  	PRIMARY KEY (course_id, user_id),									\
	  	Foreign KEY (course_id) REFERENCES courses(id),		\
	  	Foreign KEY (user_id) REFERENCES users(id)				\
	  );",
	function(err, result) {
		if (err) {
			console.log(err);
		}
	}
);
query.on('end', () => { client.end(); });