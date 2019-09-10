/************************************************************
Javascript Basics 
************************************************************/ 

// ## Variables
// Weakly Typed - no explicit type assignment, data types can be switched dynamically 
// Object Oriented 
// Versatile language - run in browser and on a PC/Server

var name = 'Name';
console.log(name); 

// use let similar to var 
let age = 30;

// use const as much as possible 
// if never plan to change the variable reference 
const hasHobbies = true;

// ## Functions
function summarizeUser(name, age, hasHobbies) {
    return ('Name is' + name + 'age is' + age + 'has hobbies' + hasHobbies);
}

console.log(summarizeUser(name, age, hasHobbies));


// Arrow function
const summarizeUser2 = (name, age, hasHobbies) => {
    return ('Name is' + name + 'age is' + age + 'has hobbies' + hasHobbies);
};

// supports this keyword 


// short form of function 
const add = (a,b) => a+b;


// ## Objects & Methods 
// objects
// methods 
const person = {
    name: "Max",
    age: 29,
    // method of the object 
    greet() {
        console.log('Hi' + this.name); // use this. to access properties 
    }
};

person.greet(); // call on the object and execute as a function 
console.log(person);


// ## Arrays 
// arrays 
const hobbies = ['a','b','c'];
for (let hobby of hobbies) {
    console.log(hobby);
}

// use map here to edit each item 
// map takes a function which executes on every element of the array 
console.log(hobbies.map(hobby => 'Hobby:' + hobby)); 
console.log(hobbies); 

// objects and reference types
// primitize and reference types - objects and arrays are reference types 
// so we can edit array without violating the const 
hobbies.push('Programming');
console.log(hobbies); 

// rest and spread operators 
// spread operators, it takes the arraya and pull out all the elements 
// copy an array using spread operator ...
const copiedArray = [...hobbies]; // [hobbies] will yield [['a','b','c']]
console.log(copiedArray); 

const copiedArray = hobbies.slice(); // use slice operator

// copy an object 
const copiedPerson= {...person};
console.log(copiedPerson);

// use rest operator
const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3]; 
}
// merge multiple arguments into an array 
const toArray = (...args) => {
    return args; 
}; 


// ## Destructuring 

// object destructuring 
const person = {
    name: "Max",
    age: 29,
    // can also include function 
    greet() {
        console.log('Hi, I am' + this.name);
    }
};

person.greet(); 
console.log(person);


const printName = (personData) => {
    console.log(personData.name);
}

printName(person);

// if we are only interested in the name
const printName = ({name}) => {
    console.log(name);
}

printName(person);

// via object destructuring 
const {name, age} = person; 
console.log(name, age); 

// destructure arrays 
const hobbies = ['Sports', 'Ball'];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2); 

const fetchData = callback => {
    setTimeout(() => {
        callback('Done');
    }, 1500); 
}


// ## Async 
// async code - if it doesn't finish immediately 

// promise chaining
// then 
setTimeout(() => { 
    console.log('Time is done');
    fetchData()
        .then(text => {
            console.log(text);
            return fetchData().then;
        })
        .then(text2 => {
            console.log(text2); 
        }); 
}, 2000);

setTimeout(()=> {}, 2000)

// promises 
const fetchData = () => {
    // Promise constructor function
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            callback('Done');
        }, 1500); 
    }); 
    return promise; // return immediately after promise is created 
}


