import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _infob_mw_atores from  "./infob_mw_atores.js";
import _infob_mw_comentarios from  "./infob_mw_comentarios.js";
import _infob_mw_filme_usuario from  "./infob_mw_filme_usuario.js";
import _infob_mw_filmes from  "./infob_mw_filmes.js";
import _infob_mw_lista from  "./infob_mw_lista.js";
import _infob_mw_lista_item from  "./infob_mw_lista_item.js";
import _infob_mw_usuario from  "./infob_mw_usuario.js";

export default function initModels(sequelize) {
  var infob_mw_atores = _infob_mw_atores.init(sequelize, DataTypes);
  var infob_mw_comentarios = _infob_mw_comentarios.init(sequelize, DataTypes);
  var infob_mw_filme_usuario = _infob_mw_filme_usuario.init(sequelize, DataTypes);
  var infob_mw_filmes = _infob_mw_filmes.init(sequelize, DataTypes);
  var infob_mw_lista = _infob_mw_lista.init(sequelize, DataTypes);
  var infob_mw_lista_item = _infob_mw_lista_item.init(sequelize, DataTypes);
  var infob_mw_usuario = _infob_mw_usuario.init(sequelize, DataTypes);
  
  //infob_amz_tbreporte_denuncia.belongsTo(infob_amz_tbdenuncia, { as: "id_denuncia_infob_amz_tbdenuncium", foreignKey: "id_denuncia"});
  //infob_amz_tbdenuncia.hasMany(infob_amz_tbreporte_denuncia, { as: "infob_amz_tbreporte_denuncia", foreignKey: "id_denuncia"});
 
  infob_mw_filmes.belongsTo(infob_mw_atores, { as: "infob_mw_atores", foreignKey: "id_filme"});

  infob_mw_filmes.belongsTo(infob_mw_comentarios, { as: "infob_mw_comentarios", foreignKey: "id_filme"});
  infob_mw_comentarios.hasMany(infob_mw_filmes, { as: "infob_mw_filmes", foreignKey: "id_filme"});

  infob_mw_usuario.belongsTo(infob_mw_comentarios, { as: "infob_mw_comentarios", foreignKey: "id_usuario"});
  infob_mw_comentarios.hasMany(infob_mw_usuario, { as: "infob_mw_usuario", foreignKey: "id_usuario"});

  infob_mw_filmes.belongsTo(infob_mw_filme_usuario, { as: "infob_mw_filme_usuario", foreignKey: "id_filme"});
  infob_mw_usuario.belongsTo(infob_mw_filme_usuario, { as: "infob_mw_filme_usuario", foreignKey: "id_usuario"});
  infob_mw_usuario.belongsTo(infob_mw_lista, { as: "infob_mw_lista", foreignKey: "id_usuario"});
  infob_mw_filmes.belongsTo(infob_mw_lista_item, { as: "infob_mw_lista_item", foreignKey: "id_filme"});
  infob_mw_lista.belongsTo(infob_mw_lista_item, { as: "infob_mw_lista_item", foreignKey: "id_lista"});
    
  
  return {
    infob_mw_atores,
    infob_mw_comentarios,
    infob_mw_filme_usuario,
    infob_mw_filmes,
    infob_mw_lista,
    infob_mw_lista_item,
    infob_mw_usuario,
  };
}
