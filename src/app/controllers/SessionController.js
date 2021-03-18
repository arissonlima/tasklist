const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    // Verificando se existe certo email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não existe!' });
    }

    // Verifica se a senha não bate
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Usuário ou senha inválida!' });
    }

    const { id, name } = user;

    res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expireIn,
      }),
    });
  }
}

module.exports = new SessionController();
