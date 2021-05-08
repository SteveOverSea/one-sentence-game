const Client = require("../database");

class StoryDate {
    async index() {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM stories";

            const result = await conn.query(sql);
            
            conn.release();

            return result.rows;
        } catch (error) {
            console.log(error);
        }
    }

    async show(id) {
        try {
            const sql = `SELECT * FROM stories WHERE id=${id};`;
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();

            return result.rows[0];

        } catch (error) {
            console.log(error);
        }
    }

    async create(storyData) {
        try {
            const { 
                title,
                sentences,
                last_sentence,
                is_end,
                is_locked,
                score
            } = storyData;

            const sql = `INSERT INTO stories (title, sentences, last_sentence, is_end, is_locked, score) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;

            const conn = await Client.connect()

            const result = await conn
            .query(sql, [title, sentences, last_sentence, is_end, is_locked, score]);

        const story = result.rows[0]

        conn.release()

        return story;
        
        } catch (error) {
            console.log(error);
        }
    }

    async edit(id, storyData) {
        let updateSql = "";
        let counter = 1;
        let updateVal = [];

        // ordering mattery!
        for (const key in storyData) {
            updateSql += `${key}=$${counter++},`;
            updateVal.push(storyData[key]);
        }

        updateSql = updateSql.substring(0, updateSql.length - 1);

        try {
            const sql = `UPDATE stories SET ${updateSql} WHERE id=${id} RETURNING *`;
            const conn = await Client.connect();
            const result = await conn.query(sql, updateVal);
            conn.release();
            return result.rows[0];

        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const sql = `DELETE FROM stories WHERE id=${id} RETURNING *;`;
            const conn = await Client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = StoryDate;