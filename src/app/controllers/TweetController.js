import Tweet from '../models/Tweet';
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken"

class TweetController {
  // Index 
  async index(req, res) {
    try {
      const tweets = await Tweet.findAll({

        where: {
          user_id: req.userId,
          check: false
        }

      });
      return res.json(tweets);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar tweets.' });
    }
  }

  // Store  
  async store(req, res) {
    

    const { tweet } = req.body;

    console.log('Esse foi seu tweet:', tweet);
    
    if (!tweet) {
      return res.status(400).json({ error: 'O campo tweet é obrigatório.' });
    }

    try {      
      const newTweet = await Tweet.create({
        tweet,
        check: false,
        user_id: req.userId,

        
      });

      return res.status(201).json(newTweet);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Erro ao criar tweet.' });
    }
  }

  // Update 
  async update(req, res) {
    const { id } = req.params;
    const { tweet } = req.body;
    
    if (!tweet) {
      return res.status(400).json({ error: 'O campo tweet é obrigatório.' });
    }

    try {
      const updatedTweet = await Tweet.update(
        { tweet },
        {
          where: {
            id: id,
            user_id: req.userId
          }
        }
      );

      return res.json(updatedTweet);
    } catch (error) {
      
      console.log(error);
      
      return res.status(500).json({ error: 'Erro ao atualizar tweet.' });
    }
  }

  // Delete
  async delete(req, res) {
    const { id } = req.params;
    try {
      const resp = await Tweet.destroy({
        where: {
          id: id,
          user_id: req.userId
        }
      });


      return res.json(resp);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar tweet.' });
    }
  }
}

export default new TweetController();
