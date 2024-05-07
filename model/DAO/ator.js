//Import da bibiblioteca do prisma client 
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe PrismaClient
const prisma = new PrismaClient()

//Função para inserir um filme no Banco de Dados
const insertAtor = async (dadosAtor) => {
    try {
       
        let sql

        //Validação para verificar se a data de falecimento é vazia
        if (dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == undefined ||
            dadosAtor.data_falecimento == ''
        ) {
            sql = `insert into tbl_ator (
                                        nome, 
                                        nome_artistico, 
                                        foto, 
                                        data_nascimento, 
                                        biografia, 
                                        sexo, 
                                        id_sexo
                                        ) values (
                                                  '${dadosAtor.nome}', 
                                                  '${dadosAtor.nome_artistico}', 
                                                  '${dadosAtor.foto}',
                                                  '${dadosAtor.data_nascimento}', 
                                                  '${dadosAtor.biografia}',
                                                  '${dadosAtor.sexo}', 
                                                  '${dadosAtor.id_sexo}'
                                                )`
        } else {
            sql = `insert into tbl_ator (
                                        nome, 
                                        nome_artistico, 
                                        foto, 
                                        data_nascimento,
                                        data_falecimento, 
                                        biografia, 
                                        sexo, 
                                        id_sexo
                                        ) values (
                                            '${dadosAtor.nome}', 
                                            '${dadosAtor.nome_artistico}', 
                                            '${dadosAtor.foto}',
                                            '${dadosAtor.data_nascimento}',
                                            '${dadosAtor.data_falecimento}',  
                                            '${dadosAtor.biografia}',
                                            '${dadosAtor.sexo}', 
                                            '${dadosAtor.id_sexo}'
                                                )`
        }

        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

const updateAtor = async (idAtor, dadosAtor) => {
    let sql
    try {
        // Validação para verificar se a data de relançamento é vazia, pois devemos ajustar o script SQL para o BD
        if (dadosAtor.data_falecimento == null ||
            dadosAtor.data_falecimento == undefined ||
            dadosAtor.data_falecimento == '') {
            sql = `update tbl_ator set 
                                                nome = '${dadosAtor.nome}',
                                                nome_artistico =  '${dadosAtor.nome_artistico}',
                                                foto = '${dadosAtor.foto}',
                                                data_nascimento = '${dadosAtor.data_nascimento}',
                                                biografia = '${dadosAtor.biografia}',
                                                sexo = '${dadosAtor.sexo}',
                                                id_sexo = '${dadosAtor.id_sexo}'
                                                where id = ${idAtor}`
        } else {
            sql = `update tbl_ator set
                                                   nome = '${dadosAtor.nome}',
                                                   nome_artistico =  '${dadosAtor.nome_artistico}',
                                                   foto = '${dadosAtor.foto}',
                                                   data_nascimento = '${dadosAtor.data_nascimento}',
                                                   data_falecimento = '${dadosAtor.data_falecimento}',
                                                   biografia = '${dadosAtor.biografia}',
                                                   sexo = '${dadosAtor.sexo}',
                                                   id_sexo = '${dadosAtor.id_sexo}'
                                                   where id = ${idAtor}`
        }
        
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}


const selectId = async () => {
    try {
        let sql = 'select CAST(id as DECIMAL)as id from tbl_ator order by id desc limit 1'

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        if (rsAtores) {
            return rsAtores[0].id // Corrigindo para retornar o ID corretamente
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdAtor = async (id) => {
    try {
        let sql = `select * from tbl_ator where id=${id}`

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}


const deleteAtor = async (id) => {
    const idAtor = id
    
    try {
         let sql = `delete from tbl_ator where id = ${idAtor}`
    
         let result = await prisma.$executeRawUnsafe(sql)
    
         if (result) {
             return true
        } else {
            return false
         }
    } catch (error) {
        return false
    }
}




const selectAllAtores = async () => {
    try {
        let sql = 'select * from tbl_ator'

        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}


const selectByNomeCompletoAtor = async (nome) => {

    try {
        let sql = `select * from tbl_ator where nome like '%${nome}%'`
        
        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}

const selectByNomeArtisticoAtor = async (nome_artistico) => {
    try {
        let sql = `select * from tbl_ator where nome_artistico like '%${nome_artistico}%'`
        
        let rsAtores = await prisma.$queryRawUnsafe(sql)

        return rsAtores
    } catch (error) {
        return false
    }
}


module.exports = {
    insertAtor,
    selectId,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtor,
    selectByNomeCompletoAtor,
    selectByNomeArtisticoAtor
}
