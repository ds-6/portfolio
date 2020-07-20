const express = require('express');

const app = express();
app.listen(process.env.PORT||3000,()=>{
    console.log('Listening...')
});

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.get('/', (req,res)=>{
    res.render('index');
})