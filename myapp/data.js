/*
this.state: {

    //HOME:
    featuredCat: [{name: "Spring", imageURL: "image1.jpg"}, {name: "Popular", imageURL: "image2.jpg"}, {name: "Featured Items", imageURL: "image3.jpg"}],
    randomItems: [
        { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring", blurb: "Here's my spring print", quantity: 2 },
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
        { itemID: '123459', name: "Painting", price: 20, artistName: "jen", imageURL: 'painting.jpg', cat: "Prints", blurb: "This is a cool painting", quantity: 3 },
        { itemID: '123450', name: "Cool Print", price: 30, artistName: "jen", imageURL: 'print.jpg', cat: "Prints", blurb: "Great print", quantity: 4 },
    ],
    email: 'jen@email.com',

    //NAV:
    allCat: ["Prints", "Pillows", "Embroidery", "Wallpaper", "Curtains", "Spring", "Popular", "Featured Items"],

    //FEATURED CAT:
    catItems: [
        { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring", blurb: "Here's my spring print", quantity: 2 },
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
    ],
    email: 'jen@email.com',

    //SEARCH RESULTS:
    query: "print",
    searchItems: [
        { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", imageURL: 'print.jpg', cat: "Spring", blurb: "Here's my spring print", quantity: 2 },
    ],
    email: 'jen@email.com',

    //SEARCH BAR
    query: "",

    //ACCOUNT BUTTON
    firstName: "Jen",
    email: 'jen@email.com',

    //CONNECT BUTTON

    //CART BUTTON
    email: 'jen@email.com',

    //ITEM DETAILS
    itemID: '123457',
    imageURL: 'embroidery.jpg',
    name: "Awesome Emproidery",
    blurb: "Best embroidery ever!",
    artistName: "caro",
    price: "100"

    //CART

    add shipping info here: 
    
    cartItems: [
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
    ]

    //CHECKOUT COMPLETE
    cartItems: [
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
    ]

    //ACCOUNT PAGE
    itemsBought: [ 
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
     ],
    firstName: "Jen",
    email: 'jen@email.com',

    //ARTIST PROFILE
    artistProfile: {
        artistName: "caro", 
        bio: "I'm a cool artist", 
        location: "Montreal, QC", 
        imageURL: "mypic.jpg", 
        items: [
            { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
            { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
        ],
    }

    //ARTIST ACCOUNT PAGE
    artistProfile: {
        artistName: "caro", 
        bio: "I'm a cool artist", 
        location: "Montreal, QC", 
        imageURL: "mypic.jpg", 
        items: [
            { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
            { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
        ],
    }

    //ORDERS
    orders: [
        { orderID: "#123782", buyerName: "Joe", itemID: ['123457','123458'], total: 100, date: "May 15, 2018", fulfilled: false },
    ]

    //CREATE LISTING
    artistName: "aisha",
    name: 'print'
    price: 100,
    cat: "Prints",
    blurb: "cool print",
    quantity: 1,
    imageURL: 'image.jpg'

    //ACCOUNT PAGE
    itemsBought: [ 
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
     ],
    firstName: "jen",
    email: 'jen@email.com',
   // userID: '123456789',

    //LOGIN
    lEmail: 'jen@email.com',
    lPassword: '123456'

    //SIGN UP
    sFirstName: 'jen',
    sLastName: 'o'
    sEmail: 'jen@email.com',
    sPassword: '123456',
    sPasswordConf: '123456'

    //ARTIST LOGIN
    lEmail: 'jen@email.com',
    lPassword: '123456'

    //ARTIST SIGN UP
    sName: 'jen',
    sEmail: 'jen@email.com',
    sPassword: '123456',
    sPasswordConf: '123456',
    sDescription: "I'm an artist",
    sLocation: 'Montreal, QC',
    sImageURL1: 'image1.jpg',
    sImageURL2: 'image2.jpg',
    sImageURL3: 'image3.jpg',

    //USER SIGN UP COMPLETE 

    //ARTIST SIGN UP COMPLETE

    //EDIT LISTING
    artistName: "aisha",
    name: 'print'
    price: 100,
    cat: "Prints",
    blurb: "cool print",
    quantity: 1,
    imageURL: 'image.jpg'

    //CHECK OUT COMPLETE
    buyerID: '123456789'
    orderID: "#123782",
    cartItems: [
        { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
        { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb: "Check out my pillow", quantity: 1 },
    ],
    cartTotal: 200,
    
}
*/