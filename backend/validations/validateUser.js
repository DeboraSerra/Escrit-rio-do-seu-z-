const validateUser = (req, res, next) => {
  const { email, password, name } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });
  if (!email) return res.status(400).json({ message: 'email is required' });
  if (!password) return res.status(400).json({ message: 'password is required' });
  const isValidEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!isValidEmail) return res.status(400).json({ message: 'invalid email' });
  const isValidPass = password.length >= 6 && password.match(/\w+\W+/g);
  if (!isValidPass) return res.status(400).json({ message: 'invalid password' });
  next();
};

module.exports = validateUser;
