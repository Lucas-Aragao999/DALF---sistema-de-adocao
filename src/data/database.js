// src/data/database.js

import { Sequelize, DataTypes } from 'sequelize';
import AnimalModel from '../models/Animal.js';
import TutorModel from '../models/Usuario.js'; // Usando o model Usuario.js para a tabela Tutores
import PedidoAdocaoModel from '../models/PedidoAdocao.js';
import QuestionarioModel from '../models/Questionario.js';
import DoacaoModel from '../models/Doacao.js';

// 1. Configuração da Conexão SQLite
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // O arquivo do banco de dados será criado aqui
    logging: false, // Descomente para ver os logs SQL
});

// 2. Inicialização dos Models
// Nota: Aqui usei 'Usuario' como nome do model para Tutores, conforme seu arquivo Usuario.js
export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize); 
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// 3. Definição das Associações (Relacionamentos)

// Tutor - PedidoAdocao (Um Tutor tem muitos Pedidos)
Tutor.hasMany(PedidoAdocao, { foreignKey: 'tutorId', as: 'pedidos' });
PedidoAdocao.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });

// Animal - PedidoAdocao (Um Animal tem muitos Pedidos)
Animal.hasMany(PedidoAdocao, { foreignKey: 'animalId', as: 'pedidos' });
PedidoAdocao.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

// Tutor - Questionario (Um Tutor tem UM Questionário)
// Adicionando um campo 'tutorId' ao Questionario, se não existir no model original.
Tutor.hasOne(Questionario, { foreignKey: 'tutorId', as: 'questionario' });
Questionario.belongsTo(Tutor, { foreignKey: 'tutorId', as: 'tutor' });


// 4. Sincronização (Cria as tabelas se não existirem)
// Recomenda-se rodar isso no app.js ou em um arquivo de inicialização.
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com SQLite estabelecida com sucesso.');
        await sequelize.sync({ alter: true }); // 'alter: true' tenta manter dados e atualizar o schema
        console.log('✅ Modelos sincronizados com o banco de dados.');
    } catch (error) {
        console.error('❌ Não foi possível conectar/sincronizar com o banco de dados:', error);
    }
}

initializeDatabase();

// Exportamos os models para serem usados nas rotas/controllers
export default { sequelize, Animal, Tutor, PedidoAdocao, Questionario, Doacao };