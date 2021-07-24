import {Request, Response} from 'express';
import db from "../database/connections";

export default class DbController{
    async dbSearch(request: Request, response: Response){
        const body = request.body;
        body.filtros = body.filtros.filter(function(obj:any){
            for (var key in obj) {
                if (obj[key] === null || obj[key] === '') return false;
            }
            return true;
        });

        let query = await db.select(body.selections).from('personagem')
        .fullOuterJoin('episodio_personagem', 'personagem.id_personagem', 'episodio_personagem.id_personagem_ref')
        .fullOuterJoin('localizacao', 'personagem.localizacao_personagem', 'localizacao.id_localizacao')
        .fullOuterJoin('episodios', 'episodio_personagem.id_episodio_ref', 'episodios.id_episodio')
        .where(function () {
            body.filtros.forEach( (item: any) => {
                
                if(Object.keys(item).length !== 0){
                    if(item.comparator !== 'like'){
                    //@ts-ignore
                    this.where(item.selection, item.comparator, item.constraint)
                    }
                    else{
                        //@ts-ignore
                        this.where(item.selection, 'like', `%${item.constraint}%`)
                    }
                }
            })
        }).distinct();

        return response.status(201).json({return: query});
    }
}