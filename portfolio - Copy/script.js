class Person {
    constructor(name, age, income) {
        this.name = name;
        this.age = age;
        this.income = income;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }
}

class Developer extends Person {
    constructor(name, age, income, field, company) {
        super(name, age, income);  
        this.field = field;
        this.company = company;
    }

    greet() {
        console.log(`Hello ${this.name}, welcome to ${this.company}`);
    }
}

let dev1 = new Developer("Ali", 23, 12000, "Frontend", "Google");

console.log(dev1);
dev1.greet();