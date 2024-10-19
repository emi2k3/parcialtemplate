import { FastifyPluginAsync } from "fastify";
import { ComentarioSchema } from "../../types/comentarios.js";
import { query } from "../../services/db.js";


const comentariosRoutes: FastifyPluginAsync = async (
    fastify,
    opts
): Promise<void> => {
    fastify.get("/", {
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            const response = await query("SELECT * FROM comentarios")
            return reply.status(200).send(response.rows);
        },
    });

    // Todos los comentarios de un usuario
    fastify.get("/usuarios", {
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const usuarioid = request.user.id_usuario;
            const response = await query(`SELECT * FROM comentarios where id_usuario=$1`, [usuarioid])
            return reply.status(200).send(response.rows);
        },
    });

    //Consigo todos los comentarios por el id de una tarea 
    fastify.get("/usuario/tarea/:idtarea", {
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const usuarioid = request.user.id_usuario;
            const idtareas = (request.params as { idtarea: string }).idtarea;
            const response = await query(`SELECT * FROM comentarios where id_usuario=$1 AND id_tarea=$2`, [usuarioid, idtareas])
            return reply.status(200).send(response.rows);
        },
    });
    fastify.post("/", {
        schema: {
            body: ComentarioSchema
        },
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const comentario = request.body as ComentarioSchema;
            try {
                await query("INSERT INTO comentarios(id_tarea, id_usuario, fecha_ingresado, titulo, descripcion) VALUES($1, $2, $3, $4, $5)", [comentario.id_tarea, comentario.id_usuario, comentario.fecha_ingresado,
                comentario.titulo, comentario.descripcion]);
                return reply.status(201).send(request.body);
            } catch (error) {
                return reply.status(500).send(error);
            }
        },
    });
    fastify.put("/:id", {
        onRequest: [fastify.verifyJWT, fastify.verifyCommentCreator],
        handler: async function (request, reply) {
            const id_comentario = (request.params as { id: string }).id;
            const comentario = request.body as ComentarioSchema;
            try {
                await query("UPDATE comentarios SET id_tarea = $1 , id_usuario = $2 , fecha_ingresado = $3 , titulo = $4 , descripcion =$5 WHERE id_comentario=$6", [comentario.id_tarea, comentario.id_usuario, comentario.fecha_ingresado,
                comentario.titulo, comentario.descripcion, id_comentario]);
                return reply.status(200).send(request.body);
            } catch (error) {
                return reply.status(500).send(error);
            }
        },
    });
    fastify.delete("/:id", {
        onRequest: [fastify.verifyJWT, fastify.verifyCommentCreator],
        handler: async function (request, reply) {
            const id_comentario = (request.params as { id: string }).id;
            try {
                await query("DELETE from comentarios WHERE id_comentario=$1", [id_comentario]);
                return reply.status(204).send();
            } catch (error) {
                return reply.status(500).send(error);
            }
        }
    });

};
export default comentariosRoutes;
