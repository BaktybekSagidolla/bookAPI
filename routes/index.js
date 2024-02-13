var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const { Author, RequestHistory, collection, LoginSchema } = require('../config'); // Ensure your config file exports these models correctly
require('dotenv').config();

var router = express.Router();
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));

const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY;

// Function to fetch books by query
async function fetchBooksBy(query, type) {
    const baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    const url = `${baseUrl}?q=${type}:${encodeURIComponent(query)}&key=${googleBooksApiKey}&maxResults=10`;

    try {
        const response = await axios.get(url);
        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching data from Google Books API:', error.response ? error.response.data : error.message);
        throw error;
    }
}

router.get('/books/search', async (req, res) => {
    const history = await RequestHistory.find({}).sort({timestamp: -1}).limit(10);
    res.render('index', { books: [], history });
});

router.post('/books/search', async (req, res) => {
    const { fname, lname } = req.body;
    const query = `${fname} ${lname}`;
    const type = 'author';

    try {
        let author = await Author.findOne({ firstName: fname, lastName: lname });
        if (!author) {
            author = new Author({ firstName: fname, lastName: lname });
            await author.save();
        }

        let existingHistory = await RequestHistory.findOne({ searchQuery: query });
        if (!existingHistory) {
            const newHistoryEntry = new RequestHistory({ searchQuery: query });
            await newHistoryEntry.save();
        }

        const books = await fetchBooksBy(query, type);
        const history = await RequestHistory.find({}).sort({timestamp: -1}).limit(10);
        res.render('index', { books, history });
    } catch (error) {
        console.error('Error:', error);
        const history = await RequestHistory.find({}).sort({timestamp: -1}).limit(10);
        res.status(500).render('index', { error: 'Failed to process request.', books: [], history });
    }
});






router.get('/background', async (req, res) => {
  try {
      const weatherDescription = req.query.description || 'default'; 
      const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: {
              client_id: 'JgBCMwQwwWnuVoP1c2qpWA28F9kLzovaO6kR9LsTwkQ',
              query: weatherDescription,
          },
      });

      const imageUrl = response.data.urls.regular;
      res.json({ imageUrl });
  } catch (error) {
      console.error('Ошибка при получении изображения:', error.message);
      res.status(500).json({ error: 'Ошибка при получении изображения' });
  }
});


router.get("/signup",(req,res)=>{
    res.render("signUp",{ message: '' })
})

router.get("/",(req,res)=>{
    res.render("signin",{ message: '' })
})

router.get("/signin",(req,res)=>{
    res.render("signin",{ message: '' })
})


router.post("/signup",async(req,res) =>{
    const username = req.body.username;
    const password2 = req.body.password2
    const time = new Date()
    const data = new collection({
        name : req.body.username,
        password : req.body.password,
        creationDate: formattedDateTime(time)
    })
    const existingUser = await collection.findOne({name: data.name})
    if(existingUser){
        return res.render('signUp', { message: 'User already exists' });
    }
    if(data.password != password2){
        return res.render('signUp', { message: 'Passwords do not match' });
    }
    else{
    const userdata = await data.save()
    console.log(userdata)
    res.redirect(`/books/search?username=${username}`);
}

    if(existingUser){
        return res.render('signUp', { message: 'User already exists' }); // Use return here
    }
    if(data.password != password2){
        return res.render('signUp', { message: 'Passwords do not match' }); // And here
    }
    else{
        const userdata = await data.save();
        console.log(userdata);
        return res.redirect(`/books/search?username=${username}`); // And also ensure to return here
    }
});


router.post("/signin", async(req,res)=>{
    console.log(req.body);
    const username = req.body.username;
    console.log(username);
    const check = await collection.findOne({ name: username });

    if(!check){
        return res.render("signin",{ message: "User name cannot found" }); // Use return here
    }
    else if(req.body.password != check.password){
        return res.render("signin",{ message: 'Wrong Password' }); // And here
    }
    else if(check.deletionDate != null){
        return res.render("signin",{ message: 'Your account was deleted ' }); // And also here
    }
    else{
        if(check.isAdmin == true){
            res.redirect("/admin")
        }
        else{
        res.redirect(`/books/search?username=${username}`)}
    }

})

router.get('/admin', async (req, res) => {
    try {
        const users = await collection.find({});
        res.render('admin', { users: users });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/admin/edit/:id', async (req, res) => {
    try {
        const user = await collection.findById(req.params.id);
        res.render('editUser', { user: user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/admin/edit/:id', async (req, res) => {
    try {
        const check  = await collection.findOne({name: req.body.username});
        if(!check){
            res.redirect('/admin');
        }
        
        const currentDate = new Date();
        await collection.findByIdAndUpdate(req.params.id, { 
            isAdmin: req.body.isAdmin,
            name: req.body.username, 
            password: req.body.password,
            updateDate: formattedDateTime(currentDate)
        });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/admin/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const currentDate = new Date();
        await collection.findByIdAndUpdate(req.params.id, { 
            deletionDate: formattedDateTime(currentDate)
        });
        res.redirect('/admin');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/admin/add', async (req, res) => {
    try {
    let isAdmin = false
    if(req.body.isAdmin == "on"){
        isAdmin = true
    }
    console.log(isAdmin)
    const time = new Date()
        const newUser = new collection({
            isAdmin: isAdmin,
            name: req.body.username,
            password: req.body.password,
            creationDate: formattedDateTime(time)
        });
        await newUser.save();
        res.redirect('/admin',);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

function formattedDateTime(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}






module.exports = router;
