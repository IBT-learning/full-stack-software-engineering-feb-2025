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
        // this.size = 7
    }
    greet(){
        return "hello"
    }
    #helper() {
      return 3 + 4
    }
    register(){
        return `${this.name} is registered successfully!!`
    }
    getHelper(){
      return this.#helper()
    }
    login(){
        return `${this.name} is logged in successfully!! ${this.#helper()}`
    }
    logout(){
        return `Bye! ${this.name}, See you some other time`
    }
    static describe(){
      return "I am from User class"
    }
}

class Admin extends User{
    constructor(name, state, isAdmin){
        super(name, state)
        this.isAdmin = isAdmin
        this.hi = "hello"
        this.accessKey = "89065"
    }
    login(){
      if(this.accessKey === "89066"){
        return super.login()
      } else return "cannot log in"
    }
    createUser(name, state){
        const user = new User(name, state)
        return user
    }
}

const vincent = new User("Vincent", "Lagos")
// console.log(new Array(3,5,89))
const Adaobi = new User("Adaobi", "Ogun")
const Joshua = new User("Joshua", "Ekiti")
const Peter = new User("Peter", "Abuja")
const Ayo = new User("Ayo", "Kebbi")

// console.log(User.describe())

// User.describe()

const Daniel = new Admin("Daniel", "Rivers", true)
console.log(Daniel.login())
// console.log(Daniel.state)


// console.log(Ayo.createUser())

// console.log(Daniel.login())
const Favour = Daniel.createUser("Favour", "Bayelsa")

// console.log(Favour.login())





