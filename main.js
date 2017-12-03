// const Joi = require("joi");
const Hapi = require('hapi');

const server = new Hapi.Server();


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

book.set([   
    {
    	Title: "ABC",
        Id:  "1",
        Author :  "Koike",
        Genre: "Mystery",
        publication_info: "April 1, 2017",
        Availability: "yes"
    },
        {
    	Title: "DEF",
        Id:  "2",
        Author :  "Koike",
        Genre: "History",
        publication_info: "April 1, 2017",
        Availability: "yes"
    },
        {
    	Title: "GHI",
        Id:  "3",
        Author :  "Koike",
        Genre: "Mystery",
        publication_info: "April 1, 2017",
        Availability: "yes"
    },
        {
    	Title:  "JKL",
        Id:  "4",
        Author :  "Koike",
        Genre: "History",
        publication_info: "April 1, 2017",
        Availability: "yes"
    },
        {
    	Title:  "IJK",
        Id:  "5",
        Author :  "Koike",
        Genre: "History",
        publication_info: "April 1, 2017",
        Availability: "yes"
    },
]);


server.connection({
    host: process.env.IP,
    port: process.env.PORT,
    routes:{
        cors: true
    }
});


server.route([
{
    path: '/',
    method: 'GET',
    handler: getBooks
},
{
    path: '/book/get/{Id}',
    method: 'GET',
    handler: getBookById
},
{
    path: '/book/genre/{Genre}',
    method: 'GET',
    handler: getBookByGenre
},

{
    path:'/book/update/{Id}',
    method:'GET',
    handler: updateBookTitle
},

{
    path:'/book/delete/{Id}',
    method:'GET',
    handler: deleteBook
},
{
    path:'/book/new',
    method:'GET',
    handler: addNewBook
}

]);


function getBooks (request, reply) {
     return book.once('value')
        .then(function(snapshot) {
	       return reply (snapshot.val());
	})
}

function getBookById (request, reply) {
    let bookId = request.params.Id;
    bookId = bookId - 1 ;
     return db.ref('book/' + bookId ).once('value')
        .then(function(snapshot) {
	       return reply (snapshot.val());
	})
}

function getBookByGenre (request, reply) {

    let bookGenre = request.params.bookGenre;

     return db.ref().child('book').orderByChild('genre').endAt(request.params.genre).once('value').then(function(snap){
	        	return(snap.val());
	       
	})
}

function updateBookTitle(request, reply){
    let bookId = request.params.Id;
    
    db.ref('book/' + bookId).set({
        "Title":"Hina",
        "Id":  bookId,
        "Author" :  "Koike",
        "Genre": "History",
        "Publication_info": "April 1, 2017",
        "Availability": "yes"
    })
    .then(function(){
        reply ("Book ID number -" + bookId + " updated");
    })

}

function deleteBook(request, reply){
    let bookId = request.params.Id;
    bookId = bookId - 1 ;
    db.ref('book/' + bookId).remove()
    .then(function(){
        reply ("Book ID number -" + bookId + " deleted");
    })
}

function addNewBook(request, reply){
    db.ref('book/').push({
        "Title":"Hina2",
        "Id": "New",
        "Author" :  "Koike",
        "Genre": "History",
        "Publication_info": "April 1, 2017",
        "Availability": "yes"
    })
    .then(function(){
        reply ("New Book Added");
    })
}

server.start(function()
{
    
    console.log('Server running at:', server.info.uri);
});
