//JavaScript Assignment #1: Strings
const name = "Oluwatomi";
const nickName = "tommy";
console.log(name.length)
console.log(`Hello, my name is ${name}`);
console.log(`When my friends see me they shout ${nickName.toUpperCase()}!`);

// NUMBERS
// Challenge 1
const number = 15;
const result = (((number * 2) + 8) / 2) - number;
console.log(result);

//Challenge 2
const pie = 3.1416;
const radius = 5;
const circleArea = (pie * (radius ** 2)).toFixed(4);
console.log(`The area of a circle with a given radius of 5 is ${circleArea}`);

//JavaScript Assignment #2: Boolean
// Challenge 1
const personAge = Math.round(Math.random() * 100);
const isAdult = personAge < 60;
const isElderly = personAge > 60;

console.log(`Is Mikun who is ${personAge} years old an adult: ${isAdult}`);
console.log(`Is Chike who is ${personAge} years old elderly: ${isElderly}`);

if (isAdult) {
    console.log("This person is an adult");
} else if (isElderly) {
    console.log("This person is elderly")
} else {
    console.log("This person is a child");
}

// Challenge 2
const lyrics = "Baba we thank you oooo🎵";

const includesThankYou = lyrics.includes("thank you");
console.log(includesThankYou);
const includesWe = lyrics.includes("We");
console.log(includesWe);
const includesBaba = lyrics.includes("Baba");
console.log(includesBaba);
const includesFood = lyrics.includes("food");
console.log(includesFood);

const isTypical = includesThankYou || includesWe || includesBaba || includesFood;
const isVeryTypical = includesThankYou && includesWe && includesBaba && includesFood;

if (isTypical) {
    console.log("This song is typical");
} else if (isVeryTypical) {
    console.log("This song is very typical");
} else {
    console.log("This song is not typical");
}

//JavaScript Assignment #3: Conditional
const movieTitle = "Emperor Owner of the Mask";
const isScary = false;
const isRomantic = true;
const isFunny = true;

if (isScary && isRomantic) {
    if (isFunny) {
        console.log(`${movieTitle} is both funny romantic, and scary!`);
    } else {
        console.log(`${movieTitle} is both romantic and scary!`);
    }
} else if (isRomantic) {
    if (isFunny) {
        console.log(`${movieTitle} is both funny and romantic!`);
    } else {
        console.log(`${movieTitle} is romantic`);
    }
} else if (isScary) {
    if (isFunny) {
        console.log(`${movieTitle} is both funny and scary!`);
    } else {
        console.log(`${movieTitle} is scary`);
    }

} else {
    if (isFunny) {
        console.log(`${movieTitle} is funny but neither romantic nor scary!`);
        // return;
    } else {
        console.log(`${movieTitle} is neither funny, romantic nor scary`);
    }

};

// JavaScript Assignment #4: Loops
// Challenge #1
const wordList = ["every", "word", "in", "this", "array", "should", "be", "capitalized"];

let firstCharList = "";
let wordArray = [];

for (word of wordList) {
    firstCharList += word.charAt(0).toUpperCase();
    wordArray.push((word.toUpperCase()));
}

console.log(firstCharList);
console.log(wordArray);

// Challenge #2
for (let i = 0; i < 10; i++) {
    if (i % 3 === 0) {
        console.log(`${i} divisible by 3 is true`);
    }
    else {
        console.log(`${i} divisible by 3 is false`);
    }
}

//Extra Challenge (FizzBuzz)
for (let i = 0; i <= 40; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// JavaScript Assignment #5: Functions
//Challenge #1: Capitalize
function capitalize(word) {
    return word.toUpperCase();
}
console.log(capitalize("hello"));

//Challenge #2: Percentage Calculator
function percentCalc(amount, percentage) {
    const result = (amount * percentage) / 100;
    return result;
}
console.log(percentCalc(200, 20));

//Challenge #3: Divisible
function divisible(dividend, divisor) {
    if (dividend % divisor === 0) {
        return true;
    } else {
        return false;
    }
}
console.log(divisible(13, 3));

//Challenge #4: Friend, Enemy
function greeting(firstName, status = "enemy") {
    if (status.toLowerCase() === "friend") {
        return (`Hello ${firstName}!`);
    } else if (status.toLowerCase() === "enemy") {
        return (`Go away ${firstName}!`)
    } else {
        return (`${firstName}, where belongeth thou? 😒`)
    }
}
console.log(greeting("Gold", ""));

//JavaScript Assignment #6: Objects
// Challenge #1: Accessing Data

const restaurant = {
    name: "Gigi's Pizza Shack",
    address: "123 Main St, Portland OR 97200",
    tags: ["pizza", "family", "dine-in", "take-out", "arcade"],
    website: "http://www.gigispizza.com/",
    staff: {
        owner: {
            name: "Gigi",
            "phone number": "123-234-3456",
        },
        manager: {
            name: "Rose",
            "phone number": "234-345-4567",
        },
        chef: {
            name: "Musa",
            "phone number": "345-456-5678",
        },
    },
}

console.log(`The restaurant's name is ${restaurant.name}`);
console.log(restaurant.tags[2]);
console.log(`The chef's name is ${restaurant.staff.chef.name}`);

for (tag in restaurant.tags) {
    console.log(restaurant.tags[tag]);
}

// Challenge #2: Updating Data
restaurant.address = "1234 Nowhere Street, Unknown Space";

restaurant.staff.sousChef = {
    name: "Oluwatomi",
    "phone number": "123-456-789"
}
delete restaurant.website;
// console.log(restaurant);

// Challenge #3: Creating a new object
const menu = {
    seafood: 30.00,
    "white rice": 20.00,
    sushi: 15.00,
    plantain: 2.00,
    dessert: 50.00,
    order: (array) => {

        const result = [];
        for (item of array) {
            const input = item.toLowerCase();
            if (input in menu) {
                result.push(menu[input]);
            } else {
                return (`Sorry, ${item} is not on the menu list`);
            }
        }
        return (`The total price is $${result.reduce((acc, num) => acc + num, 0)}`);
    }
}

// Extra challenges (optional)
restaurant["menu"] = menu;

console.log(restaurant.menu.order(["seafood", "PLantain", "sushi"]))

//JavaScript Assignment #8: Callbacks
//Challenge #1: Practice .filter()
const numbers = [1,2,3,4,5,6,7,8,9,10];
const output = numbers.filter(item=> item > 7
)
console.log(output); 

const evenNumbers = numbers.filter(item => item % 2 === 0);
console.log(evenNumbers);

const divByThree = numbers.filter(item=> item % 3=== 0);
console.log(divByThree);

// Challenge #2: Practice .map()
const squares = numbers.map(item => item ** 2);
console.log(squares);

const squareRoots = numbers.map(item=> item / 2);
console.log(squareRoots);

//Challenge #3: Using .filter() to filter objects
const prices = [
  { product: "shoes", price: 50, inStock: true },
  { product: "light bulb", price: 3, inStock: true },
  { product: "stuffed animal", price: 15, inStock: false },
  { product: "jacket", price: 75, inStock: false },
  { product: "keychain", price: 4, inStock: true },
]

const cheap = [];
prices.filter((item) => {
    if(item.price < 20) {
        cheap.push(item["product"]);
    }
});

const inStock = [];
prices.filter((item) => {
    if(item.inStock) {
        inStock.push(item.product);
    }
});

const cheapInStock  = [];
prices.filter((item) => {
    if(item.inStock && item.price < 20) {
        cheapInStock.push(item.product);
    }
})

console.log(cheap);
console.log(inStock);
console.log(cheapInStock);

//Challenge #4: Using .map() to map objects
let sale = prices.map((item)=> {
    if (item.price > 10) {
        return (`${item.product} are on sale for only $${(item.price * 25) / 100}`);
    }
    
})

const newValue = sale.filter((item)=> {
    item !== undefined;
})

console.log(newValue);