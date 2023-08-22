const express = require('express');
//we are gonna use express router so that our app.js does not bloat
const router = express.Router();
const Post = require('../models/Post');
const axios = require('axios');


//making the public folder public:
express.static('public')

let nextPage = null;
let hasNextPage = false;


const jokesurl = "https://cloud.syncloop.com/tenant/1691731675822/packages.handson3.api.getJokes.main"; 
const quotesurl = "https://cloud.syncloop.com/tenant/1691731675822/packages.handson3.api.getQuotes.main";
const token = "5zX/2VXijNuKmwQIwaM2mTxLIUcrMw/l8djfBMZyBOklB5bXVUH6+fd+qV8hA0QG0cMfuZKeddg0zztf2o72KCfkU3U+npM8xcBKwFSXdFXMDvzqQ8xx+XlowQzNckqU/VGIPb1ctNf2R2Ku5dG1GeFugAV/jSNHWf3r+MkLlA1o/Np3A/h3lDKWnNtHfnV+Xt7YPzvtR9P3G9rn/1GAYELiL5ykIpNYyRoHI2FQEN356Jx+gM9v9/WOfJ0yJ3hRufDNDRBdMcOLJ06gVRTaj6p3cTxK8K1nZwacKJQn/Y7BK9hvsPZdOZlRh6jiPcFKqpVyxKpa0Y2dCiErOhtmfnLUNWYVDCbPF2pTOkh5EqwHDnPTQ4C8W3yjDL4jYLhVFiBI1JN0DydSrlWCUOrG1VwrxKbZ22urEKOhBKsHyehpdwMP3kK/VPNg81jpGaabOjZ4zdVZQEREKCyEsBmX51Xar+THMkDq+9ka9KtljORblsQIVBg4wViLiVnV5etR";
/*
*GET /
*HOME 
*/

// //Routes
// router.get('' , async (req, res) =>{
//     //rendering data or passing data
//     try {
//     const locals = {
//         title: "NodeJs Blog",
//         description: "Simple Blog created with NodeJs, express & mongodb"
//     }

//     let perPage = 5;
//     let page = req.query.page ||  1;

//     const data = await Post.aggregate([{ $sort: { createdAt: -1 } } ])
//     .skip(perPage * page - perPage)
//     .limit(perPage)
//     .exec();

//     // const count = await Post.count();
//     // nextPage = parseInt(page) + 1;
//     // hasNextPage = nextPage <= Math.ceil(count / perPage);
    
//      res.render('index', {
//          locals,
//          data,
//        current: page,
//        nextPage : hasNextPage ? nextPage : null
//     });
    
    
       
//         res.render('index', {locals , data});
//     }catch (error) {
//         console.log(error);
//     }

// });


const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, express & mongodb" 
}




 router.get('' , async (req, res) =>{
    //rendering data or passing data
   


     try{
         const data = await Post.find();

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        //getting jokes response
        const responseJoke = await axios.get( 
          jokesurl,
          config
        )
        
        const joke = responseJoke.data.response.jsonDoc.joke;
   
        
        //getting quotes response 
        const responseQuote = await axios.get( 
            quotesurl,
            config
        )
        const quote = responseQuote.data.response.jsonDoc.quoteText;
        
        res.render('index', {locals , data , quot: quote , jok: joke});

    }catch (error) {
         console.log(error);
     }

});





/*
*GET /
*Post :id
*/

router.get('/post/:id' , async (req, res) =>{

        //rendering data or passing data

    
    
        try{

        

        let slug = req.params.id;

           const data = await Post.findById({_id: slug});
             

           const locals = {
            title: data.title ,
             description: "Simple Blog created with NodeJs, express & mongodb"
        }   
          
           
           res.render('post', {locals , data});
         }catch (error) {
             console.log(error);
         }
    });
    


/*
* POST /
* Post - searchTerm
*/

router.post('/search' , async (req, res) =>{
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
        res.render("search", {
            data ,
            locals,
        });

    }catch (error) {
        console.log(error);
    }

});



router.get('/about' , (req, res) =>{
    res.render('about');
});

module.exports = router;




// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"
//         },
//         {
//             title:"build real-time , event-driven applications in Node.js",
//             body: "Socket.io: Learn how to use Socket.io to build real-time , event-driven applications in Node.js."
//         },
//         {
//             title:"Discover how to use Express.js" ,
//             body: "Discover how to use Express.js , a popular Node.js web framework, to build web applications."
//         },
//         {
//             title: "Asynchronous Programming with Node.js",
//             body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for "
//         },
//         {
//             title: "NodeJs Limiting Network traffic" ,
//             body: "Lean how to limit network tarffic."
//         },
//         {
//             title: "Learn Morgan - HTTP Request logger for NodeJs",
//             body:"Learn Morgan."
//         },
//         {
//             title: "Building APIs with Node.js",
//             body: "Learn how to use Node.js to build RESTful APIs using frameworks like EJS express mongodb"
//         },
//         {
//             title: "Deployment of Node.js applications" ,
//             body: "Understand the different ways to deploy your Node.js applications"
//         }

//     ])




// }
// insertPostData();