const router = require('express').Router();
const userController = require('../controllers/userController.js');
const authenticate = require('../middleware/authenticate.js');
const admin = require('../middleware/admin.js');


//GET - Return all Users in the DB

router.get('/', admin, async (req, res) => {
    try {
        res.json(await userController.findAllUsers())
    }catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
});


//POST - Creates a new user

router.post('/', async (req,res) => {
    try {
        const user = req.body;
        console.log(user);
        res.json(await userController.createUser(user))
    }catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
})


// Find users by email
router.post("/email", authenticate, async (req, res) => {
    try {
      let email = req.body.email;
      res.json(await userController.findByEmail(email));
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  });



//Modify a user
router.put('/', authenticate, async (req, res)=> {
    try {
        const data = req.body;
        res.json(await userController.modifyUser(data));
        
    } catch (err) {
        return res.status(500).json({
            mensaje: err.message
        });
    }
});


  
module.exports = router;