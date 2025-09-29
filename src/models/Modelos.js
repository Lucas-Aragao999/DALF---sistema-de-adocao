import { Sequelize } from 'sequelize';
import AnimalModel from './Animal.js';
import TutorModel from './Tutor.js';
import QuestionarioModel from './Questionario.js';
import PedidoAdocaoModel from './PedidoAdocao.js';
import DoacaoModel from './Doacao.js';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

export const Animal = AnimalModel(sequelize);
export const Tutor = TutorModel(sequelize);
export const Questionario = QuestionarioModel(sequelize);
export const PedidoAdocao = PedidoAdocaoModel(sequelize);
export const Doacao = DoacaoModel(sequelize);

// Associações
// Explicação das associações:
// - Um Tutor tem um Questionario.
// - Um Tutor pode ter vários Pedidos de Adoção.
// - Um Animal pode ter vários Pedidos de Adoção.
// A tabela PedidosAdocao serve como uma tabela de junção entre Tutores e Animais.

await sequelize.sync();

export default { sequelize, Animal, Tutor, Questionario, PedidoAdocao, Doacao };
