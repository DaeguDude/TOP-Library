// Firebase Realtime Database Get Started
// https://firebase.google.com/docs/database/web/start

// How to Read and Write Data on the Web
// https://firebase.google.com/docs/database/web/read-and-write


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDpoBAyxS50EyCJVaE7hFN7JjdKjm5Ce90",
  authDomain: "library-9836a.firebaseapp.com",
  databaseURL: "https://library-9836a.firebaseio.com",
  projectId: "library-9836a",
  storageBucket: "library-9836a.appspot.com",
  messagingSenderId: "308716423146",
  appId: "1:308716423146:web:a165bf2f3dc3c3f4d41493",
  measurementId: "G-PLT2HSTMDQ"
};

// Initialize Firebase
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();



function writeBookData(title, author, numPages, isRead) {
  database.ref('Book/' + title).set({
    title: title,
    author: author,
    numPages: numPages,
    isRead: isRead
  }, function(error) {
    // Completion Callback
    // This will let you know if your data has been successfully written to the
    // database
    if (error) {
      console.log('The Write Failed.');
    } else {
      console.log('It has been successfully saved in your database.');
    }
  });
}


var bookRef = firebase.database().ref('Book/');
// 'value' event to read a static snapshoht of the contents at a given path,
// as they existed at the time of the event. It's triggered once when the
// listener is attatched and again every time the data, including children, changes.

// event callback is passed a snapshot containing all data at that location
bookRef.on('value', function(snapshot) {
  // `snapshot.val()` will retrive the data in the snapshot
  console.log(snapshot.val());
})

// ------------------------------------------------------------------------
// UPDATE DATA
// ------------------------------------------------------------------------
// var BookData = {
//   title: 'Who moved my cheese?',
//   id: 1,
//   body: 'yes',
//   author: 'IDK'
// }

// var newPostKey = firebase.database().ref().child('Book').push().key;
// var updates = {}
// updates['Book/' + newPostKey] = BookData


// firebase.database().ref().update(updates);

// ------------------------------------------------------------------------
// DELETE DATA
// ------------------------------------------------------------------------
// The simplest way to delete data is to call remove() on a reference to the 
// location of that data.
// database.ref('Book/Grit').remove();

// Now it's time Time. How will you update the value of isRead?
// Change the value of 'isRead' in the book 'Mindset' to 'No'.
// firebase.database().ref('Book/Mindset/isRead');

// var bookTitle = 'Mindset';
// var BookData = {
//   author: 'Carol Dweck',
//   isRead: 'No',
//   numPages: 324,
//   title: "Mindset"
// }

// var updates = {}
// updates['Book/' + bookTitle] = BookData;
// database.ref().update





