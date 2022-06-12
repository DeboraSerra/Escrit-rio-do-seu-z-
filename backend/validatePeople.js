const validateName = (req, res, next) => {
  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) return res.status(400).json({ message: 'Invalid name' });
  next();
}

const validateBirthday = (req, res, next) => {
  const { birthday } = req.body;
  console.log({birthday});
  if (!birthday) return res.status(400).json({ message: 'Invalid birthday' });
  const isValid = birthday.match(/^\d{4}-\d{2}-\d{2}/g);
  if (!isValid) return res.status(400).json({ message: 'Invalid birthday' });
  next();
}

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Invalid email' });
  const isValid = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!isValid) return res.status(400).json({ message: 'Invalid email' });
  next();
}

module.exports = { validateName, validateEmail, validateBirthday };
