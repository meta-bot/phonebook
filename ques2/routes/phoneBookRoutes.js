const contactValidator = require('../validators/contactNumberValidator');
const phoneNumberValidator = new contactValidator();
const phoneBookServices = require('../services/phoneBookService');

function phoneRouter(router) {
    router.get('/',(req, res) => {
        res.send("Hello phone Book user");
    });

    router.put('/addContact', async (req, res) => {

        const {name, number} = req.body;
        try {
            await phoneBookServices.addContact(name, number);
            res.status(200).send({
                success: true,
                message: 'contact added',
                name,
                number
            });
        } catch (e) {

            console.error(e);
            res.status(400).send({
                success: false,
                error: e
            });
        }

    });

    router.delete('/deleteContact', async (req, res) => {

        const {number} = req.body;
        try {
            await phoneBookServices.deleteContact(number);
            res.status(200).send({
                success: true,
                message: 'contact removed',
                number
            });
        } catch (e) {
            res.status(400).send({
                success: false,
                error: e
            });
        }
    });

    router.post('/getContactDetails', async (req, res) => {

        const {number} = req.body;
        try {
            const contactDetails = await phoneBookServices.getContactDetails(number);

            res.status(200).send({
                success: true,
                contactDetails
            });
        } catch (e) {
            res.status(400).send({
                success: false,
                error: e
            });
        }
    });

    router.get('/getAll', async(req, res) => {
        try{
            const contactList = await phoneBookServices.getAllContact();

            res.status(200).send({
                success: true,
                contactList
            });

        } catch (e) {
            res.status(400).send({
                success: false,
                error: e
            });
        }
    });

    router.post('/updateContact', async (req, res) => {
        try{
            const {name, currNumber, newNumber} = req.body;


            await phoneBookServices.updateContact(currNumber, newNumber, name);
            res.status(200).send({
                success: true,
                message: 'number updated'
            });

        } catch (e) {
            res.status(400).send({
                success: false,
                error: e
            });
        }
    });

}

module.exports = phoneRouter;
