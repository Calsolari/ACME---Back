//Import da bibiblioteca do prisma client 
const { PrismaClient } = require('@prisma/client')

//Instanciando a classe PrismaClient
const prisma = new PrismaClient()

//Função para inserir um filme no Banco de Dados
const insertDiretor = async (dadosDiretor) => {

    try {
        let sql

        if (dadosDiretor.data_falecimento == null ||
            dadosDiretor.data_falecimento == undefined ||
            dadosDiretor.data_falecimento == ''
        ) {

            sql = `insert into tbl_diretor( 
                                          nome,
                                          biografia,
                                          data_nascimento,
                                          foto,
                                          id_sexo
                                          ) values (
                                                    '${dadosDiretor.nome}',
                                                    '${dadosDiretor.biografia}',
                                                    '${dadosDiretor.data_nascimento}',
                                                    '${dadosDiretor.foto}',
                                                    '${dadosDiretor.id_sexo}'
                                                    )`

        } else {

            sql = `insert into tbl_diretor( 
                                              nome,
                                              biografia,
                                              data_nascimento,
                                              data_falecimento,
                                              foto,
                                              id_sexo
                                             ) values (
                                                       '${dadosDiretor.nome}',
                                                       '${dadosDiretor.biografia}',
                                                       '${dadosDiretor.data_nascimento}',
                                                       '${dadosDiretor.data_falecimento}',
                                                       '${dadosDiretor.foto}',
                                                       '${dadosDiretor.id_sexo}'
                                            )`

        }

        //$executeRawUnsafe() - serve para executar scripts sql que não retornam valores (insert, update e delete)
        //$queryRawUnsafe() - serve para executar scripts sql que RETORNAM dados do BD (select)
        let result = await prisma.$executeRawUnsafe(sql)
        
        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const updateDiretor = async (idDiretor, dadosDiretor) => {

    let sql

    try {

        //Validação para verificar se a data de relançamento é vazia, pois devemos ajustar o script SQL para o BD --- > 
        //OBS: essa condição é provisória, já que iremos tratar no BD com uma procedure

        if (dadosDiretor.data_falecimento == null ||
            dadosDiretor.data_falecimento == undefined ||
            dadosDiretor.data_falecimento == ''
        ) {

            sql = `update tbl_diretor set 
                                                nome = '${dadosDiretor.nome}',
                                                biografia = '${dadosDiretor.biografia}',
                                                data_nascimento = '${dadosDiretor.data_nascimento}',
                                                foto = '${dadosDiretor.foto}',
                                                id_sexo = '${dadosDiretor.id_sexo}'
                                                where id = ${idDiretor}`

        } else {

            sql = `update tbl_diretor set
                                                   nome = '${dadosDiretor.nome}',
                                                   biografia = '${dadosDiretor.biografia}',
                                                   data_nascimento = '${dadosDiretor.data_nascimento}',
                                                   data_falecimento = '${dadosDiretor.data_falecimento}',
                                                   foto = '${dadosDiretor.foto}',

                                                   id_sexo = '${dadosDiretor.id_sexo}'
                    where id = ${idDiretor}`

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
        let sql = 'select CAST(id as DECIMAL)as id from tbl_diretor order by id desc limit 1'

        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        if (rsDiretores) {
            return rsDiretores[0].id // Corrigindo para retornar o ID corretamente
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const selectByIdDiretor = async (id) => {

    try {
        let sql = `select * from tbl_diretor where id=${id}`

        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        return rsDiretores
    } catch (error) {
        return false
    }
}

const deleteDiretor = async (id) => {

    const idDiretor = id
    
    try {
         let sql = `delete from tbl_diretor where id = ${idDiretor}`
    
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


const selectAllDiretores = async () => {

    try {
        let sql = 'select * from tbl_diretor'

        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        return rsDiretores
    } catch (error) {
        return false
    }

}

const selectByNomeCompletoDiretor = async (nome) => {
    try {
        let sql = `select * from tbl_diretor where nome like '%${nome}%'`
        
        let rsDiretores = await prisma.$queryRawUnsafe(sql)

        return rsDiretores
    } catch (error) {
        return false
    }
}



module.exports = {
    insertDiretor,
    selectId,
    updateDiretor,
    deleteDiretor,
    selectAllDiretores,
    selectByIdDiretor,
    selectByNomeCompletoDiretor
}
