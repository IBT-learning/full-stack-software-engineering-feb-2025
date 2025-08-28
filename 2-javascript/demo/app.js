// console.log("Loading external JavaScript file");

// let btn = document.getElementById("btn");
// let heading = document.getElementById("heading")
// btn.addEventListener("click", function(){
//     heading.innerHTML = "Oh I just got changed"
//     heading.style.color = "red";
// })

// Variables
// let name = "Olawale";
// let state = "Lagos";
// const PI = 3.14;
// let country = "Nigeria";
// console.log(name + " stays in " + state + " state")
// console.log("My name is " + name)
// console.log("My country is " + country)
// name = "Ugochi";
// console.log("My name is " + name)
// country = "Ghana"
// console.log("My country is now " + country)
// var

// let age = 18;
// let firstName = "Cornelius";
// let lastName = "Paul";
// let isAdult = age >= 18;

// let fruits = ["Apple", "Banana", "Orange"];
// let last_name = "Ogunleye";
// let FullName = firstName + " " + last_name;
// if (isAdult) {
//     console.log(typeof isAdult)
//     fruits[1] = "Mango";
//     console.log("You are an adult and your age is ", age);
// console.log("new string created", firstName.toUpperCase())
// console.log("You can vote and your age is ", age)
// console.log("My name is ", firstName.toLowerCase())
// console.log("fruits is ", fruits)
// console.log("firstName is still ", firstName)
// console.log("The number of characters in your name is ", firstName.length)
// console.log("Your initials are ", firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase())

// } else {
//     console.log("You are not an adult yet, your age is ", age);
// console.log(firstName.slice(0, 3))
// console.log(firstName[3])
// console.log(fruits[2])
// console.log( firstName.charAt(3))
// console.log("Individuals below 18 cannot vote yet. Your age is ", age)
// console.log(firstName.charCodeAt(0))
// let studentId = 70;
// studentId = 80;
// const schoolName = "IBT";
// let name =  ""
// let isPresent = (studentId > 60);

// let students = ["Olawale", "Ugochi", "Cornelius"];
// students = ["Olawale", "Ugochi", "Cornelius"];
// let student1 = students[1];
// console.log("Number of students currently enrolled is ", students.length, students);
// students.push("Vincent")
// console.log("Now the number of students enrolled is ", students.length, students);
// console.log(students.pop());
// console.log("Now the number of students enrolled is ", students.length, students);
// console.log(typeof isPresent)

// console.log(Boolean(" "))

// objects
// let person1 = {
//     name: "Rinsola",
//     state: "Ogun",
//     age: 15,
//     hasVoterId: true,
//     isAdult: true
// }

// let person2 = {
//     name: "Olawale",
//     state: "Abuja",
//     age: 25,
//     hasVoterId: false,
//     isAdult: true,
// }

// let person3 = {
//     name: "Ugochi",
//     state: "Lagos",
//     age: 19,
//     hasVoterId: true,
//     isAdult: true,
// }

// person1["name"] = "Rinsola"

// let nameOfPerson = person1.name;
// delete person3.state

// console.log("Name of person is ", nameOfPerson);
// console.log("Person 3 is from ", person3);

// let people = [person1, person2, person3]

// operators
// let first = 201
// let second = 200
// let isDivisble =  first <= second
// let randomNumber = Math.trunc(Math.random() * 100);
// console.log(isDivisble)

// logical operators
// let firstName1 = "Chuks"
// let firstName2 = "Olawale";
// let result = firstName1 && firstName2;
// console.log("Result is ", result);

// let people2 = [
//     {name: "Cornelius", state: "Lagos", age: 17, isAdult: false},
//     {name: "Daniel", state: "Abuja", age: 35, isAdult: true},
//     {name: "Ekuvero", state: "Lagos", age: 29, isAdult: true},
//     "Hello World!",
//     12345,
//     ["apple", "banana", "orange"]
// ]

// console.log(people2[5])
// Boolean
// console.log(typeof true)
// console.log(Boolean("hello"))
// let castedNum = Number("13")
// let myArr = Array(1,2,3,4,5,6,7,8,9,10)
// console.log(castedNum, typeof castedNum)
// console.log(myArr, typeof myArr)
// let acceptableAge = 18;
// let voters = []
// let underAge = []
// let nonAccredited = []

// // conditionals if, else if, else
// // if condition logic
// if (person1.age >= acceptableAge && person1.hasVoterId ) {
//     voters.push(person1)
// } else if (person1.age < acceptableAge) {
//     underAge.push(person1)
// }
// else {
//     nonAccredited.push(person1)
// }

// if (person2.age >= acceptableAge && person2.hasVoterId ) {
//     voters.push(person2)
// } else if (person2.age < acceptableAge) {
//     underAge.push(person2)
// }
// else {
//     nonAccredited.push(person2)
// }

// if (person3.age >= acceptableAge && person3.hasVoterId ) {
//     voters.push(person3)
// } else if (person3.age < acceptableAge) {
//     underAge.push(person3)
// }
// else {
//     nonAccredited.push(person3)
// }
// let color = "black"
// switch (color) {
//     case "red":
//         console.log("The color is red")
//         break
//     case "green":
//         console.log("The color is green")
//         break
//     case "blue":
//         console.log("The color is blue")
//         break
//     default:
//         console.log("Color is unknown")
// }

// console.log("Number of votes = ", voters.length)
// let voterNames = voters.map((voter) => voter.name).join(" and ")
// console.log("The names of people that voted successfully are", voterNames)
// console.log("Number of Non Accredited Voters = ", nonAccredited.length)
// console.log("Number of Underage turn ups = ", underAge.length)

// Loops
// For loop
// let x = 1
// let items = [1, 2, 8, 6, 4, 5, 89, 4]
// let rooms = 5
// let sum = 0
// for (let i = 0; i < items.length; i++ ) {
//     let result = "The index of " + items[i] + " is " + i
//     console.log(result)
// }
// for (let index in items) {
//     console.log(index)
//     console.log(items[index])
// }

// for (let val of items) {
//     console.log(val)
// }

// console.log(sum)

// while
// while do
// let counter = 0;

// while (counter < 10) {
//     console.log("running ", counter)
//     // counter = counter + 1
//     counter++
// }

// while do
// while (counter < 0) {
//     if (counter === 6) {
//         counter++
//         continue
//     }
//     console.log("running while", counter)
//     counter++
//     // counter = counter + 1
// }

// do {
//     if (counter === 6) {
//         counter++
//         continue
//     }
//     console.log("running do while ", counter)
//     counter++
//     // counter = counter + 1
// } while (counter < 0)

// Functions
let firstNum = 9;
let secondNum = 25;

let result = firstNum + secondNum;

// console.log(result)

let thirdNum = 56;
let fourthNum = 70;

function addNums(myNum1, myNum2) {
  // console.log(45 + 67)
  // let num1 = 88
  // let num2 = 7
  return myNum1 + myNum2;
}

function sumOfArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return "The sum of " + arr + " is " + sum;
}

let array1 = [3, 6, 8, 90, 88, 7];
let array2 = [9, 67, 7, 9];
let array3 = [7, 9, 0, 34];

// console.log(sumOfArray(array1))
// console.log(sumOfArray(array2))
// console.log(sumOfArray(array3))

function initials(first, second) {
  let initial = first.charAt(0).toUpperCase() + second.charAt(0).toUpperCase();
  return "Hello, " + first + "!\n" + "Your Initials is " + initial;
}

// console.log(initials("Ugochi", "Ndimele"))

// call execute invoke

// console.log(addNums(7,5) * 2)
// console.log(addNums(88, 7))
// console.log(addNums(88, 6) / 2)
// console.log(addNums(1, 3))
// console.log(addNums(8, 10))
// console.log(addNums(12, 45))
// console.log(addNums(77, 9))

// es6
// let const
// for (let i = 0; i < 10; i++) {
//     console.log(i)
// }
// console.log("I can still access i here", i)

let firstName = "Olawale";
let lastName = "Ogunleye";

let fullName = firstName + " " + lastName;
let full = `${firstName} ${lastName}`; // Template literals
// console.log(full);

// array destructuring
let students = [
  "Olawale",
  "Ugochi",
  "Cornelius",
  "Vincent",
  "Adaobi",
  "Israel",
];
let student1 = students[0];
let student2 = students[1];
let student3 = students[2];
// console.log(`Student 1 is ${student1}, Student 2 is ${student2}, Student 3 is ${student3}`);
let [studentA, studentB, studentC, ...others] = students;
let items = [78, 67, 55, 60];
[items[0], items[1]] = [items[1], items[0]]; // destructuring
// console.log([...students, "apple", "orange", ...items])
// console.log(students.concat(items))
// console.log(items)
// console.log(a, b);
// let temp = items[0];
// items[0] = items[1] // [67, 67]
// items[1] = temp; // [67, 67]
// console.log(items);
// console.log(`Student A is ${studentA}, Student B is ${studentB}, Student C is ${studentC}`);
// console.log(others)

// object destructuring
let title = "hello";
let studentObj = {
  name: "Israel",
  age: 20,
};
const post = {
  title: "This is my first post",
  author: {
    name: "Vincent Shalom",
    location: {
      state: "Ogun",
      country: "Nigeria",
    },
  },
  views: 8,
  created_at: "26-05-2025",
  comments: [
    { title: "Hello", content: "This is not correct" },
    { title: "I agree", content: "I agree 100%" },
  ],
};
let { title: postTitle, views } = post;

const products = [{title: "men cloth", price: 500}, {title: "men cloth", price: 500}]

// console.log(views)

// let newObj = {...studentObj}
// console.log("before studentobj", studentObj)
// console.log("before newObj", newObj)
// studentObj.name = "Olawale"
// console.log("updated studentobj", studentObj)
// console.log("updated", newObj)

function doSomething(name = "John", state = "Lagos") {
  let result = `Hello ${name.toUpperCase()}!!, Welcome to class.\n You are from ${state} state`;
  return result;
}
const anotherThing = (name = "John", state = "Lagos") => {
  let result = `Hello ${name.toUpperCase()}!!, Welcome to class.\n You are from ${state} state`;
  return result;
};
// console.log(anotherThing("Vincent"));

// Array methods
// map, forEach, find, reduce, filter
// let newStudents = students.map((item, i) => { return `${item.toUpperCase()} is at position ${i+1}`})
// console.log(items.find((item) => {return item % 5 === 0}))
console.log(students.filter((student) => { return student.length > 7}))

// console.log(newStudents)
