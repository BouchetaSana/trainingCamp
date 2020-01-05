const {User,validate}=require("../models/user")
const{Revenu}=require("../models/revenu")
const bcrypt=require("bcryptjs")
const store=require("store")


async function login(req,res){
    
    const user = await User.findOne({ Username: req.body.Username })
          if (!user) return res.status(401).json({error:"Invalid username or password "}) 
          const validPassword = await bcrypt.compare(req.body.password, user.password);
           if (validPassword ){ 
              const token = user.generateAuthToken();
              store.set("token", { token: token });
              res.header("x-auth-token", token).status(200).send({
                token:token
              });
             }
             else{
               return res.status(401).json({error:"Invalid password "});
             }      
          }
      

  async function register(req,res){
    const { error } = validate(req.body);
    if (error) return res.status(401).send(error.details[0].message);
  
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
  
    user = new User({
      Fullname: req.body.Fullname,
      Username: req.body.Username,
      password: req.body.password,
      email: req.body.email,
    
    });
    user.password = await bcrypt.hash(user.password, 10);
    if (!(user.password)) return  res.status(500).json(errors);
    user.save().then((res)=>{
      console.log(user)
      res.status(201).send({
        _id: user._id,
        name: user.name,
        email: user.email
      });
    }).catch(err => {
      
console.log(err)     
res.send(user) })
}



async function affiche(req,res){
  const users=await User.find();
  return res.send(users)
}


async function addRevenu(req,res){
  let ladate=new Date()
  let revenu= new Revenu({
    montant:req.body.montant,
    date:(ladate.getDate()+"/"+(ladate.getMonth()+1)+"/"+ladate.getFullYear()),
    tag:req.body.tag
  })
   revenu.save().then((err,succ)=>{
     res.status(200).send(revenu)
   })

}
module.exports={login,register,affiche,addRevenu};