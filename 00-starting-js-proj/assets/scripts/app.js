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
Arrays can be mixed data types, and even have more arrays within them
const hobbies = ["Sports", "Cooking", "Reading"];
console.log(hobbies[0]) //log array items by number "Sports"
hobbies.push("Working") // add "Working" to the back at index 3
console.log(hobbies) // should display all 4 items
const index = hobbies.findIndex((item) => {
    return item === "Sports"; // will go through hobbies, check if true & return index number 
});
console.log(index); // will log "0" for the index number ist found
// this can also be written shorter
const index2 = hobbies.findIndex(item => item === "Sports");

const numbers = [4,8,12,16];
console.log(numbers[3])
console.log(numbers) // logs 4, 8, 12, 16
const ind4 = numbers.findIndex(item => item === 16);
console.log(ind4); 
numbers.pop() // remove the last item from the back of list
numbers.shift() // remove the first item from the front of list
numbers.push(20) // add to the back of list
numbers.unshift(2) // add to the front of list
console.log(numbers)
console.log(ind4); // logs FALSE

//map new array with the additional "!" to each value
const newhobbies = hobbies.map(item => item + "!");
console.log(newhobbies); // logs Sports!, Cooking!, Reading!, Working!

//map() can transform an array into new array of key:value ojects 
const newobjects = hobbies.map(item => ({text: item}));
console.log(newobjects); // logs 3 objects with key:value pairs
*/

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

/*
//27. If ,else if and else control
const password = prompt('Please enter the password');
if (password === 'Jan') {
    console.log('Jan works')
} else if ( password === 'Koos') {
    console.log('Koos also works')
} else {
    console.log('Incorrect Password')
}

// For loops
const hobbies = ["pianting", "jogging"];
for (const hobby of hobbies) {
    console.log(hobby);
} */

//29. Functions as values 
function handleTimeout1() {
    console.log("Timed out");
}

const handleTimeout2 = () => {
    console.log("Timed out...again");
}

setTimeout(handleTimeout1,2000);
setTimeout(handleTimeout2,4000);
setTimeout(() => {
    console.log("Timed out one more time")
},6000);

// Get the output container element
        const outputDiv = document.getElementById('output');

        // --- 1. Named Function Declaration ---
        // This is a standard function declaration.
        // It can be passed by its name, just like a variable.
        function showMessage(message) {
            console.log(`Named function: ${message}`);
            const p = document.createElement('p');
            p.textContent = `Named function: ${message}`;
            outputDiv.appendChild(p);
        }

        // --- 2. Named Arrow Function ---
        // A modern, concise way to declare a function.
        // It's assigned to a constant, so it also has a name.
        const showStyledMessage = (message) => {
            console.log(`Arrow function (named): ${message}`);
            const p = document.createElement('p');
            p.textContent = `Arrow function (named): ${message}`;
            p.classList.add('font-semibold', 'text-blue-600');
            outputDiv.appendChild(p);
        };
        
        // --- 3. The "Higher-Order" Function ---
        // This function takes another function as an argument, called 'callback'.
        // It performs an action and then "calls back" the provided function.
        function processData(data, callback) {
            console.log("Processing data...");
            // Simulate some work
            const processedString = `The processed data is: ${data.toUpperCase()}`;
            // Now we call the function that was passed in!
            callback(processedString);
        }
        
        // --- Examples of passing functions as values ---
        
        // Example 1: Passing the named function 'showMessage'
        // We pass the function name 'showMessage' without parentheses.
        // The 'processData' function will call it later.
        setTimeout(() => {
            console.log("--- Calling processData with named function (showMessage) ---");
            processData("hello world", showMessage);
        }, 1000);
        
        // Example 2: Passing the named arrow function 'showStyledMessage'
        // Just like the named function, we pass its constant name.
        setTimeout(() => {
            console.log("--- Calling processData with named arrow function (showStyledMessage) ---");
            processData("javascript is fun", showStyledMessage);
        }, 3000);

        // Example 3: Passing an anonymous function expression directly
        // This function has no name and is defined right inside the argument list.
        setTimeout(() => {
            console.log("--- Calling processData with anonymous function expression ---");
            processData("inline function", function(message) {
                console.log(`Anonymous function expression: ${message}`);
                const p = document.createElement('p');
                p.textContent = `Anonymous function expression: ${message}`;
                p.classList.add('italic', 'text-red-500');
                outputDiv.appendChild(p);
            });
        }, 5000);

        // Example 4: Passing an anonymous arrow function directly (the most common modern way)
        // This is a concise, inline function, which is very common in modern JavaScript.
        setTimeout(() => {
            console.log("--- Calling processData with anonymous arrow function ---");
            processData("callbacks are powerful", (message) => {
                console.log(`Anonymous arrow function: ${message}`);
                const p = document.createElement('p');
                p.textContent = `Anonymous arrow function: ${message}`;
                p.classList.add('underline', 'text-purple-600');
                outputDiv.appendChild(p);
            });
        }, 7000);
