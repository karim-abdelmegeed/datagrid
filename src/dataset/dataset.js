var faker = require('faker');
var data = [];

for (let i = 0; i < 10; i++) {
    data.push(
        {
            id: i+1,
            name: faker.name.findName(),
            email: faker.internet.email(),
            mobile: faker.phone.phoneNumber(),
            salary: faker.finance.amount(),
            birth: faker.date.past()
        }
    );
}

export default data