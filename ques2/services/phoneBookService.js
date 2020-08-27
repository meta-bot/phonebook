const assert = require('assert');
const contactValidator = require('../validators/contactNumberValidator');
const phoneNumberValidator = new contactValidator();

const {phoneBook} = require('../db/sequilizer');

exports.addContact = async (name, number) => {
    // check parameters
    assert(name, 'contact name not provided');
    assert(number, 'contact number not provided');
    assert(phoneNumberValidator.isBangladeshiPhoneNumber(number), 'not a valid bangladeshi number');

    // add it to the phone book
    return await phoneBook.findOrCreate({
        where: {
            name: name.trim(),
            number: number.trim()
        }
    }).catch(error => {throw error;});
};

exports.deleteContact = async (number) => {
    // check parameters
    assert(number, 'contact number not provided');
    assert(phoneNumberValidator.isBangladeshiPhoneNumber(number), 'not a valid bangladeshi number');

    return await phoneBook.destroy({
        where: {
            number: number.trim()
        }
    });
};

exports.getContactDetails = async (number) => {
    // check parameters
    assert(number, 'contact number not provided');
    assert(phoneNumberValidator.isBangladeshiPhoneNumber(number), 'not a valid bangladeshi number');

    return await phoneBook.findAll({
        where: {
            number: number.trim()
        }
    });
};

exports.updateContact = async (currentNumber, newNumber, name) => {
    assert(name, 'name not provided');
    assert(currentNumber && phoneNumberValidator.isBangladeshiPhoneNumber(currentNumber), 'invalid number');
    assert(newNumber && phoneNumberValidator.isBangladeshiPhoneNumber(newNumber), 'invalid new number');

    return await phoneBook.update({
        number: newNumber.trim(),
    },{
        where: {
            name: name.trim(),
            number: currentNumber.trim()
        }
    });
}

exports.getAllContact = async () => await phoneBook.findAll();