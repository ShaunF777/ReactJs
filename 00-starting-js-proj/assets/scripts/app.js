import { apiKey } from './util.js';

console.log(apiKey);

// Objects 
const user = {
    name: "Max",
    age: 34,
    // Methods are functions within an object
    greet() {
        console.log("Hello!");
        console.log(this.age);
    }
};

console.log(user.name);
user.greet();

// Classes create generic blueprints for object creation  
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
// Methods also
    greet() {
        console.log('Hi');
    }
}

// Then create/populate objects
const user1 = new User("Manuel", 35);
console.log(user1);
user1.greet();