// Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyDpoBAyxS50EyCJVaE7hFN7JjdKjm5Ce90",
  authDomain: "library-9836a.firebaseapp.com",
  databaseURL: "https://library-9836a.firebaseio.com",
  projectId: "library-9836a",
  storageBucket: "library-9836a.appspot.com",
  messagingSenderId: "308716423146",
  appId: "1:308716423146:web:a165bf2f3dc3c3f4d41493",
  measurementId: "G-PLT2HSTMDQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();

// bookReference
let bookRef = database.ref("Books/");

function addBookToFirebase(title, author, numPages, didRead) {
  database.ref("Books/" + title).set(
    {
      title: title,
      author: author,
      numPages: numPages,
      didRead: didRead,
    },
    function (error) {
      // Completion Callback
      // This will let you know if your data throws an error
      if (error) {
        console.log("The Write Failed.");
      }
    }
  );
}

// Change the status in Firebase
database.ref("Books/" + book.title).update({
  didRead: false,
});

database.ref("Books/" + book.title).update({
  didRead: true,
});

// Remove from the firebase database
database.ref("Books/" + book.title).remove();

addBookToFirebase(title, author, numPages, didRead);

// 'value' event to read a static snapshot of the contents at a given path,
// as they existed at the time of the event. It's triggered once when the
// listener is attatched and again every time the data, including children, changes.

// event callback is passed a snapshot containing all data at that location
bookRef.on("value", function (snapshot) {
  // Integrate Firebase database with myLibrary
  if (myLibrary.length === 0) {
    // `snapshot.val()` will retrieve the data in the snapshot
    let firebaseBooks = snapshot.val();
    for (let bookProperty in firebaseBooks) {
      book = firebaseBooks[bookProperty];
      // Add it to myLibrary
      myLibrary.push(book);
    }
    render();
  }
});
