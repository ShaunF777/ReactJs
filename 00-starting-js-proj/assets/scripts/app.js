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
user1.greet();
*/

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
numbers.push(20)
console.log(numbers)
const ind4 = numbers.findIndex(item => item === 16);
console.log(ind4);

const newhobbies = hobbies.map(item => item + " for fun");
console.log(newhobbies);

const newobjects = hobbies.map(item => ({text: item}));
console.log(newobjects);