const config = {
    port:process.env.PORT || 8080,
    ACAO:"https://malakandcarzone.herokuapp.com",
    database: {
      debug: false,
      connection:'mongodb://israr.mcz:Computer2018@ds157223.mlab.com:57223/mcz_db'
     
    },
    logger: {
      level: "debug",
      format: 'combined'
    }
   
  };
  
  module.exports = config;