const prefix = (path) => {
    let prefix = null;
    switch (process.env.NODE_ENV) {
      // ts-jest registers ts-node
      case "test":
        prefix = "src";
        break;
      // development uses tsc-watch now
      case "development":
      case "production":
      default:
        prefix = "dist/src";
        break;
    }
  
    return `${prefix}/${path}`;
  };
  
    
    module.exports = {
      type: 'mysql',
      host: process.env.DBHOST,
      port: Number(process.env.DBPORT),
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DBDATABASE,
      synchronize: true,
      logging: false,
      entities: [prefix('{entity,domain,projection,models}/**/*.*')],
      migrations: [prefix('migration/**/*.*')],
      subscribers: [prefix('{subscriber,domain,projection}/**/*.*')],
      cli: {
        entitiesDir: prefix('{entity,domain,projection,models}'),
        migrationsDir: prefix('migration'),
        subscribersDir: prefix('{subscriber,domain,projection,models}'),
      },
    };
  
    