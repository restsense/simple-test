const API_BASE="/api/v1";

var initialContacts = [
    {
        name: "ana",
        phone: 12345
    },
    {
        name: "luis",
        phone: 23456
    }
];

function loadBackend(app,db){
    
    db.insert(initialContacts);

    app.get(API_BASE+"/loadInitialContacts",(req,res)=>{
        db.insert(initialContacts);
        res.sendStatus(200,"Ok");
    });


    app.get(API_BASE+"/contacts",(req,res)=>{

        db.find({},(err,contacts)=>{

            if(err){
                res.sendStatus(500,"Internal Error");
            }else{
                res.send(JSON.stringify(contacts.map((c)=>{
                    delete c._id;
                    return c;
                })));  
            }
        });
    });
    
    app.post(API_BASE+"/contacts",(req,res)=>{
        let contact = req.body;
        console.log("New POST with body:"+JSON.stringify(req.body,null,2));
        db.insert(contact);
        res.sendStatus(201,"Created");
    });

    app.delete(API_BASE+"/contacts/:name",(req,res)=>{
        let name = req.params.name;

        db.remove({ "name": name},{},(err,numRemoved)=>{
            if(err){
                res.sendStatus(500,"Internal Error");
            }else{
               if(numRemoved >= 1){
                    res.sendStatus(200,"Ok");
               } else {
                    res.sendStatus(404,"Not found");
               }
            }
        });
        
    });

    app.get("/data",(req,res)=>{

        let min = 1;
        let max = 200;
        let data = [];

        for(let i=0; i< 30; i++){
            let n = Math.floor(Math.random()*(max-min)+min);
            data.push({ v: n});
        }

        res.send(data);
    });

};

export { loadBackend };