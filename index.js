var express = require("express");
var app =express();
var bodyparser = require('body-parser');
var jsondata= require('./movies.json');
var _und = require('underscore');

app.use(bodyparser.urlencoded({ extended:true}));

app.use(bodyparser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/',function(req,res){
    res.json(jsondata);

})
router.post('/postdata',function(req,res){
    if(req.body.id && req.body.first_name)
    {

    jsondata.push(req.body);
    res.json(jsondata)

    }else{
        console.log('please put some value to insert');
    }
    router.put('/updatedata/:id',function(req,res){
        if(req.params.id)
        {
            _und.each(jsondata,function(elem,index){
                if(req.params.id===elem.id){
                    elem.first_name="ranisharma";
                    elem.Director="BA";
                }
            })
            res.json(jsondata)
        }
    })
})

app.use('/api',router);
app.listen(port);