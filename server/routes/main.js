const express = require('express');
//we are gonna use express router so that our app.js does not bloat
const router = express.Router();
const Post = require('../models/Post');


//making the public folder public:
express.static('public')

let nextPage = null;
let hasNextPage = false;

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




 router.get('' , async (req, res) =>{
    //rendering data or passing data
    const locals = {
         title: "NodeJs Blog",
         description: "Simple Blog created with NodeJs, express & mongodb"
     }


     try{
         const data = await Post.find();
         res.render('index', {locals , data});
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