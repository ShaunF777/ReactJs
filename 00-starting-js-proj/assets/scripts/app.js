import { apiKey } from './util.js';

console.log(apiKey);

/*
// Objects 
const user = {
    name: "Max",
    age: 34,
    // Methods are functions within an object
    greet() {
        console.log("Hi I'm " + this.name + ", aged " + this.age + ".");
        console.log(this.age);
    }
};

console.log(user.name);
user.greet();

// Classes are generic blueprints for object creation  
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
// Methods also
    greet() {
        console.log('Hi ' + this.name);
    }
}

// Then create/populate objects
const user1 = new User("Manuel", 35);
console.log(user1);
user1.greet();*/

/* Arrays/Lists come with many utility methods using object .notation
const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[0])
hobbies.push("Working") 
console.log(hobbies)
const indreading = hobbies.findIndex((item) => {
    return item === "Reading";
});
console.log(indreading);

const numbers = [4,8,12,16];
console.log(numbers[3])
numbers.push(20) // add to the back of list
console.log(numbers)
const ind4 = numbers.findIndex(item => item === 16);
console.log(ind4);

//map new list with additions to each value
const newhobbies = hobbies.map(item => item + " for fun");
console.log(newhobbies);

//map transforms into new list of key: value ojects 
const newobjects = hobbies.map(item => ({text: item}));
console.log(newobjects); */

/*
// Destructuring syntax for arrays or lists
const user1 = ["shaun","fourie"];
const userN = user1[0]; // manual destructuring
const userL = user1[1]; // manual destructuring
console.log(userN + userL);
//VS
const [newUserN, newUserL] = ["shaun","fourie"]; // Destructure inline, pulling out values by order 
console.log(newUserN + newUserL);

// Destructuring syntax for objects
const user2 = {
    name: "Max",
    age: 34
};
const u2N = user2.name; // Manual destructuring
const u2A = user2.age;  // Manual destructuring
//VS
const {name, age} = { // Destructure inline, pulling out values by name 
name: "Max",
age: 34
};
console.log(name + age)

const {name: newname, age: newage} = { // Destructure inline, with alliases
name: "Max",
age: 34
};
console.log(newname + newage) */

/*... Spread Operator for Arrays
const names = ["Mike", "Victor"];
const moreNames = ["Julius", "Andre"];
//const mergeNames = [names, moreNames]; // Would just create a nested Array
//VS
const mergeNames = [...names, ...moreNames]; // Use ...spread operator to create a new list without nesting
//... Pulls out all the values in comma seperated form, to reuse elsewhere  
console.log(mergeNames)

//... Spread Operator for Objects
const user3 = {
    name: "Max",
    age: 34
};

const user4 = {
    isAdmin: true, 
    ...user3};
console.log(user4); */

