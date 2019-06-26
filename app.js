const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
const db = require('./db/models/Schema')
//api to find all creatures

app.get('/api/creature',(req, res, next)=>{
    db.Creature.find((err, doc)=>{
        if(err){
            console.log("Error comes to Find doc!!",err)
        }
        else{
            console.log("Doc find successfully...",doc)
            res.json({Docs : doc});
        }
    })

})

//api to get one
app.get('/api/creature/:id',(req, res, next)=>{
db.Creature.findOne({ id : req.params.id},(err, doc)=>{
    if(err){
        console.log("Error occur during findOne!!!",err)
    }
    else{
        console.log("Record found successfully...");
        res.json(doc);
    }
})
})

//api to add new creature
app.post('/api/creature',(req, res, next)=>{
    let newCreature = new db.Creature(req.body);
    newCreature.save((err,doc)=>{
        if(err){
            console.log('Error to save the doc',err)
        }
        else{
            console.log('Doc save successfully...',doc.name)
            res.json(doc)
        }
    })


})

//api to delete one
app.delete('/api/creature/:id',(req, res, next)=>{
let CreatureId = req.params.id;
db.Creature.findOneAndRemove({
    _id :CreatureId
})
.populate("Creature")
.exec((err,deleteCreature)=>{
    res.json(deleteCreature)
})
})

//api to update one
app.put('/api/creature/:id',(req, res, next)=>{
    let creatureId = req.params.id;
    db.Creature.findOne({
        _id : creatureId
    },(err, foundCreature)=>{
        if(err){
            console.log("Error is found and update!!!!",err);
        }
        else{
            foundCreature.name = req.body.name || foundCreature.name;
            foundCreature.type = req.body.type || foundCreature.name;
            foundCreature.habitat = req.body.habitat || foundCreature.habitat;
            foundCreature.numLegs = req.body.numLegs || foundCreature.numLegs;
            foundCreature.isDangerous = req.body.isDangerous || foundCreature.isDangerous;
            foundCreature.imageUrl = req.body.imageUrl || foundCreature.imageUrl;
            console.log("Updating creature",foundCreature.name);
            foundCreature.save((err, Creature)=>{
                if(err){
                    console.log("updating error",err)
                }
                else{
                    console.log("Updated creature..",Creature.name);
                    res.json(Creature);
                }
            });
        }
    })

})


app.listen(process.env.PORT || 3000, (err)=>{
    if(err){
        console.log("server not started...",err)
    }
    else{
        console.log("Server started successfully....")
    }
})