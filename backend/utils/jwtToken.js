export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();

    const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
    res.header('Access-Control-Allow-Origin', 'https://6680a26de36167717b13f95d--dulcet-churros-9aeffe.netlify.app');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res
      .status(statusCode)
      .cookie(cookieName, token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      })
      .json({
        success: true,
        message,
        user,
        token,
      });
  };
  
  