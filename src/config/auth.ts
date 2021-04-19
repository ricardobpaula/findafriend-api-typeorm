const jwtConfig = {
      secret: String(process.env.APP_SECRET),
      expiresIn: 60000*2, //60000 = 1min
    }

export default jwtConfig