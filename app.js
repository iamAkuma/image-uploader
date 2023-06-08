const express = require('express');
const multer = require('multer');
const ejs = require( 'ejs');
const path = require('path');

//Set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));

    }
});

//Init Upload
const upload = multer({
    storage: storage,
    limits: {filesize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

//Check File Type
function checkFileType(file, cb){
    //Allowed extension
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mimetype
    const mimetype = filetypes.test(file.mimetype)
}

//Init app
const app  = express();

//EJS
app.set('view engine', 'ejs');

//Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/uploads', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg: err
            });
        } else{
            console.log(req.file);
            res.send('test');
        }
    });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));