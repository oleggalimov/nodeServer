const expr = require ('express');
const hbs = require ('hbs');
let app = expr();
app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamer', (text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    //перехват входящих запросов
    console.log(`Событие: ${new Date().toString()} произошло`);
    console.log(`${req.method} ${req.url} ${req.cookies}`);
    next();
});
//заглушка на все случаи жизни
app.use((req,res,next)=>{
    res.render('maintenace.hbs');
});

app.use(expr.static(__dirname+'/views'));
app.get(
    '/',
    (req,res)=>{
        console.log('Get for root dir');
        console.log(req.headers);
        // res.send('<h1>Hellow Express!</h1>');
        res.send({
            age:27,
            name:'Oleg'
        });
    }
);
app.get(
    '/about',
    (req, res)=>{
        res.render('about.hbs', {
            title: 'MyPage',
            version: process.env.version
        });
    }
);

app.listen(8080, ()=>{console.log('Server is up on 8080 port')});
