const express= require('express')
const router =express.Router()
const {TOdo}=require('../models/todo.schema')
const jwt =require('jsonwebtoken')
const {ValidateToken}=require('../middlewares/validate-token.middleware')
const user = {
    name:"marina",
    id: 1
}

//const todos =[]
router.post('/',ValidateToken,async(req,res)=>{
      //const authorization= req.headers.authorization
     // if(!authorization)  res.status(401).json({msg:"Missing Token"})
     // const token = authorization.split(" ")[1]
     // try{
      //  const user= jwt.verify(token,'msreivtx')
        const {title,content}=req.body;
        const todo=await new TOdo({
            title,content ,publisher:req.user
        })
        todo.save()
          res.status(200).json({todo})      
     // }
     // catch(err){
    //console.log(err)
        //  res.status(401).json({msg:"Invalid Token"})
    //  }
      

  /*

   /*  const {title , content}=req.body
     const todo={
         title, content ,publisher: user
     }
     todos.push(todo);
     res.status(200).json({todos})*/
});

router.get('/',async (req,res)=>{
    const todo=  await TOdo.find();
    res.status(200).json({todo})
});


router.get('/:id',async(req,res)=>{
     const {id}= req.params
     try{
        const todo =await TOdo.findById(id)
        if (!todo)  res.status(404).json({ msg: 'Article Not Found' })
        res.status(200).json({todo})
     }
     catch(err){
         console.log(err);
         res.status(400).json({msg: "Invalid Id"})
     }
     
});

 

router.put('/:id',ValidateToken,async (req,res)=>{
    const {id}=req.params;
    const{title,content}=req.body;
    const user=req.user;
    const update={}
    if(title)
    {
        update.title=title;
    }

    if(content)
    {
        update.content=content
    }
    const todo=await TOdo.findOneAndUpdate({
        _id:id,
        'publisher.id':user.id
    },update,{new:true})
    if (!todo) return res.status(404).json({ msg: 'todo not found with given id' });
 
    res.status(200).json({todo})
})

router.delete('/:id',ValidateToken,async(req,res)=>{
    const {id}=req.params;
    const user=req.user
    const todo= await TOdo.findOneAndDelete({
        _id:id,
        'publisher.id':user.id
    })
    if (!todo) return res.status(404).json({ msg: 'todo not found with given id' });

	res.status(200).json({msg: 'Todo Deleted Successfully',});
})

module.exports=router