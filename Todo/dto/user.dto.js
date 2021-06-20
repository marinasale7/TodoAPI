 function UserDTO({_id,name,email,createdAt}){
        return{
            id :_id,
            name,
            email,
            createdAt
        }      
   
               
 }

 module.exports={UserDTO}