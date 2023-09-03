require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');
const { mongo } = require('mongoose');
const axios = require('axios');
const Post = require('./server/models/Post');



const app = express();
const PORT = 5000 || process.env.PORT;

const locals = {
    title: "TheApiGuys",
    description: "Simple Blog created with NodeJs, express & mongodb" 
}


const quotesurl = "https://cloud.syncloop.com/tenant/1691731675822/packages.handson3.api.getQuotes.main";
const jokesurl = "https://cloud.syncloop.com/tenant/1691731675822/packages.handson3.api.getJokes.main";
const token = "5zX/2VXijNuKmwQIwaM2mTxLIUcrMw/l8djfBMZyBOklB5bXVUH6+fd+qV8hA0QG0cMfuZKeddg0zztf2o72KCfkU3U+npM8xcBKwFSXdFXMDvzqQ8xx+XlowQzNckqU/VGIPb1ctNf2R2Ku5dG1GeFugAV/jSNHWf3r+MkLlA1o/Np3A/h3lDKWnNtHfnV+Xt7YPzvtR9P3G9rn/1GAYELiL5ykIpNYyRoHI2FQEN356Jx+gM9v9/WOfJ0yJ3hRufDNDRBdMcOLJ06gVRTaj7YLdpeW+wzBQn8saIoGR3OFHtXx0BIRm3gLwcqNnwnMTkCLja3/pz09McKZpbysfXLUNWYVDCbPF2pTOkh5EqwHDnPTQ4C8W3yjDL4jYLhVFiBI1JN0DydSrlWCUOrG1VwrxKbZ22urEKOhBKsHyehpdwMP3kK/VPNg81jpGaabV6q6D3XTJKrpUJFP1ZrTW3yAO4EeZgGtH/XQpa5BYe7patUaM1oFaNcad/JbiM38";

//Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//here we will store all our html , css , javascript
app.use(express.static('public'));


// //Templating Engine
// app.use(expressLayout);
// app.set('layout', './layouts/main');
// app.set('view engine', 'ejs');

// app.use('/',require('./server/routes/main'));


app.get('/about' , (req, res) =>{
    res.render('about.ejs');
});

app.get('/quotes', (req, res) => {
    res.render('quotes.ejs')
});


  
app.get('/resources' , (req, res) => {
    res.render('resources.ejs')
});



app.get('/disorder' , (req, res) => {
    res.render('disorder.ejs')
});

app.get('/helplines' , (req, res) => {
    res.render('helplines.ejs')
})

app.get('/jokes' , (req, res) => {
    res.render('jokes.ejs')
})


app.post('/jokes', async (req, res) =>{

     try{

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        //getting jokes response

        const responseJoke = await axios.get(jokesurl,config );
        
        const joke = responseJoke.data.response.jsonDoc.joke;
   
        
        //getting quotes response 
        // const responseQuote = await axios.get( 
        //     quotesurl,
        //     config
        // )
        // const quote = responseQuote.data.response.jsonDoc.quoteText;
        
        res.render('jokes.ejs', 
        {
            jok: joke
        });

    }catch (error) {
         console.log(error);
     }

});

app.post('/quotes', async (req, res) =>{

    try{
       
       const config = {
           headers: { Authorization: `Bearer ${token}` }
       };
       
       
  
       
       //getting quotes response 
       const responseQuote = await axios.get( 
           quotesurl,
           config
        )
       const quote = responseQuote.data.response.jsonDoc.quoteText;
       
       res.render('quotes.ejs', 
       {
           quot: quote
       });

   }catch (error) {
        console.log(error);
    }

});




app.get('/organisation' , (req, res) => {
    res.render('organisation.ejs')
})

app.get('' , async (req, res) => {
    try {
        const data = await Post.find();

        res.render('index.ejs' , {locals , data})
    } catch (error){
        console.log(error);
    };
})

app.get('/post/:id' , async (req, res) =>{

    //rendering data or passing data



    try{

    

    let slug = req.params.id;

       const data = await Post.findById({_id: slug});
         

       const locals = {
        title: data.title ,
         description: "Simple Blog created with NodeJs, express & mongodb"
    }   
      
       
       res.render('post.ejs', {locals , data});
     }catch (error) {
         console.log(error);
     }
});

app.post('/search' , async (req, res) =>{
    //rendering data or passing data
    try{
    const locals = {
        title: "Search",
        description: "Simple Blog created with NodeJs, express & mongodb"
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/^a-zA-Z0-9 ]/g,"")
    console.log(searchTerm)
    
        const data = await Post.find({
            $or: [
                {title: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });
        res.render("search.ejs", {
            data ,
            locals,
        });

    }catch (error) {
        console.log(error);
    }

});

app.listen(PORT , () =>{
    console.log(`App listening on port ${PORT}`);
});
