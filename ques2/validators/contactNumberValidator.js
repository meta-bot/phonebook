
class ContactNumberValidator {

    isBangladeshiPhoneNumber(number) {
        return /^(?:\+88|01)?(?:\d{11}|\d{13})$/.test(number);
    }
}

module.exports = ContactNumberValidator;