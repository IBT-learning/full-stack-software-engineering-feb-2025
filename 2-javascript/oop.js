const person = {
  name: "Alice",
  age: 25,
  hobbies: ["Singing", "Dancing", "Cooking"],
  greet: function () {
    return `Hello, my name is ${this.name} and age is ${this.age}`;
  },
};

// let HowAreYou = "How are you?"

// function Person(name, age){
//    this.name = name
//    this.age = age

//    function walk() {
//     return `${this.name} is walking`
//    }
// }

// const outcome = person.greet()
// console.log(outcome)

const person1 = {
  name: "Vincent",
  age: 25,
  hobbies: ["Singing", "Dancing", "Cooking"],
  greet: function () {
    return `Hello, my name is ${this.name} and age is ${this.age}`;
  },
};

const person2 = {
  name: "Adaobi",
  age: 25,
  hobbies: ["Singing", "Dancing", "Cooking"],
  greet: function () {
    return `Hello, my name is ${this.name} and age is ${this.age}`;
  },
};

const person3 = {
  name: "Chuks",
  age: 25,
  hobbies: ["Singing", "Dancing", "Cooking"],
  greet: function () {
    return `Hello, my name is ${this.name} and age is ${this.age}`;
  },
};

function hello(){
    function inner(){
        return "I am inner"
    }
    return inner
}

class User {
    constructor(name, state){
        this.name = name;
        this.state = state;
    }
    greet(){
        return "hello"
    }
    register(){
        return `${this.name} is registered successfully!!`
    }
    login(){
        return `${this.name} is logged in successfully!!`
    }
    logout(){
        return `Bye! ${this.name}, See you some other time`
    }
}

class Admin extends User{
    // constructor(name, state){
    //     this.name = name;
    //     this.state = state
    // }
    createUser(name, state){
        const user = new User(name, state)
        return user
    }
}

const vincent = new User("Vincent", "Lagos")
const Adaobi = new User("Adaobi", "Ogun")
const Joshua = new User("Joshua", "Ekiti")
const Peter = new User("Peter", "Abuja")
const Ayo = new User("Ayo", "Kebbi")

const Daniel = new Admin("Daniel", "Rivers")


// console.log(Ayo.createUser())

console.log(Daniel.login())
const Favour = Daniel.createUser("Favour", "Bayelsa")

console.log(Favour.login())





