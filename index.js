// const Joi = require("joi");
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: process.env.IP,
    port: process.env.PORT,
    routes:{
        cors: true
    }
});

server.start(function(){
    console.log('Server running at:', server.info.uri);
});

let firebase = require("firebase");

 const config = ({
 	apiKey: "AIzaSyAo2l3FgtsW5XrpDCyluFjk8UXvk0SVgSk",
   authDomain: "booklending-d34e8.firebaseapp.com",
   databaseURL: "https://booklending-d34e8.firebaseio.com",
   projectId: "booklending-d34e8",
   storageBucket: "booklending-d34e8.appspot.com",
   messagingSenderId: "992185607188",
   
 });

firebase.initializeApp(config);

let db = firebase.database();
const book = db.ref('book');

db.ref('book').set({
    1:{
    	Title:  "Mana",
        Id:  "",
        Author :  "Koike",
        Genre: "Science Fiction",
        publication_info: "April 1, 2017",
        Availability: "yes"
    },
	2:{
    	Title:  "Hinaaaa",
        Id:  "",
        Author :  "hiiiii",
        Genre: "Science Fiction",
        date_published: "March 1, 2017",
        Availability: "no"
    }
});
  

module.exports =[
	{
	    method: 'GET',
	    path: '/',
	    handler: function (request, response) {
	        return 'Hello, world!';
	    }
	},
	{
		method: 'GET',
	    path: '/book',
	    handler: function (request, response) {
	        return firebase.database().ref('book').once('value').then(function(snapshot) {
			  return (snapshot.val());
			  
			})
	    }
	},
	{
      method:'DELETE',
      path:'/book',
      handler:function(request,response){
          return firebase.database().ref("book").child('value').remove();
      }

  },
  {
   method: 'GET',
    path: '/book/{bookID}',
    handler: function(request, reply) {
        return firebase.database().ref('books/' + request.params.bookID);
        book.on('value', function (data) {
            return reply(data);
        });
    }
    }
    


       
]