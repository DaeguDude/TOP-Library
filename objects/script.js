let user = new Object(); // Object Constructor Syntax
let user = {}; // Object literal

let user = {
  // name - property and the value of 'John'
  // age property and the value of 30
  name: "John",
  age: 30
};

// You can add, remove and read files from it any time
user.isAdmin = true;

// To remove a property...
delete user.age;

// Accessing the property
let user = {
  name: "John",
  age: 30
}

let key = prompt("What do you want to know about the user?", "name");
user[key];

// But you can't...
// user.key

