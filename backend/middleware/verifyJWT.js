import jwt from "jsonwebtoken";
 const verifyToken = (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token scaduto' });
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Token non valido' });
        } else {
          return res.status(401).json({ message: 'Errore nella verifica del token' });
        }
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};
 export default verifyToken;