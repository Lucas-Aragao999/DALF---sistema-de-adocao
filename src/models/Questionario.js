import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Questionario = sequelize.define('Questionario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        empregado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        quantos_animais_possui: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        motivos_para_adotar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quem_vai_sustentar_o_animal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero_adultos_na_casa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numero_criancas_na_casa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idades_criancas: {
            type: DataTypes.STRING,
            get() {
                const raw = this.getDataValue('idades_criancas');
                return raw ? JSON.parse(raw) : [];
            },
            set(value) {
                this.setDataValue('idades_criancas', JSON.stringify(value));
            },
            allowNull: true // Assumindo que pode ser nulo se não houver crianças.
        },
        residencia_tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        proprietario_permite_animais: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        todos_de_acordo_com_adocao: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        responsavel_pelo_animal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        responsavel_concorda_com_adocao: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        ha_alergico_ou_pessoas_que_nao_gostam: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        gasto_mensal_estimado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valor_disponivel_no_orcamento: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tipo_alimentacao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        local_que_o_animal_vai_ficar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        forma_de_permanencia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        forma_de_confinamento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tera_brinquedos: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tera_abrigo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tera_passeios_acompanhado: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tera_passeios_sozinho: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        companhia_outro_animal: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        companhia_humana_24h: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        companhia_humana_parcial: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sem_companhia_humana: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sem_companhia_animal: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        o_que_faz_em_viagem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        o_que_faz_se_fugir: {
            type: DataTypes.STRING,
            allowNull: false
        },
        o_que_faz_se_nao_puder_criar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        animais_que_ja_criou: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destino_animais_anteriores: {
            type: DataTypes.STRING,
            allowNull: false
        },
        costuma_esterilizar: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        costuma_vacinar: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        costuma_vermifugar: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        veterinario_usual: {
            type: DataTypes.STRING,
            allowNull: false
        },
        forma_de_educar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        envia_fotos_e_videos_do_local: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        aceita_visitas_e_fotos_do_animal: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        topa_entrar_grupo_adotantes: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        concorda_com_taxa_adocao: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        data_disponivel_para_buscar_animal: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'questionarios',
        timestamps: true
    });

    return Questionario;
};