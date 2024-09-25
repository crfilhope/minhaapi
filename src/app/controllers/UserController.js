import User from '../models/User';

class UserController {
  //create
  
  async store (req, res) {

    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    } catch (e){

      return res.status(400).json({
        error: e.message
      });
    }
  }

  // Index
  async index(req, res){
    try {
      const users = await User.findAll({attributes: ['id', 'name', 'email']});

 

      return res.json({ users });
    } catch(e){
      return res.json(null);
    }
  }

  //Show
  async show(req, res){
    try{

      const users = await User.findByPk(req.body.id);


      return res.json(users);
    } catch(e){
      return res.json(null); 
    }
  }
  // Update 
  async update(req, res){
    const { id } = req.params
    const { name, email } = req.body

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({
          error: ['Usuário não existe']
        })
      }

      const novosDados = await User.update({ name, email }, {
        where: {
          id: id
        }
      });
      
      return res.json(novosDados);
    } catch(e){
      return res.json(null);
    }
  }


  async delete(req,res){

    try{
      const userDelete = await User.destroy({ where: { id: req.body.id} });

      return res.status(200).json(userDelete);
    }catch(e){
      return res.status(400).json({error: e.message});
    }
  }
}


export default new UserController();