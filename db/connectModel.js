const {Sequelize} = require('sequelize');
const password = 'toor!@#123R'
// Instanciating Sequelize class => Manage and config database creating models
const sequelize = new Sequelize(`postgres://postgres.wotdyyymccicaspuxktw:${encodeURIComponent(password)}@aws-0-sa-east-1.pooler.supabase.com:6543/postgres`, 
    {
        dialect:'postgres',
        define: {
            schema: 'yweb'
        }
    }
);
// Exporting sequelize instance
module.exports = sequelize;