export const middleware = (req,res,next)=>{
      const {name} = req.body
  if(name != 'Raghuram'){
      res.status(404).json({msg:'name is wrong'})
      return
  }
 
  next()

}