const _ = require('lodash');
const convertSnakeToCamel = require('../modules/convertSnakeToCamel');

//createPost, getList, getPost, updatePost, deletePost
const createPost = async (client, title, contents, category) => {
    const { rows } = await  client.query(
        `
        INSERT INTO "test_table" (title, contents, category)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [title, contents, category],
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getList = async (client, category) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM "test_table"
        WHERE category = $1
        `,
        [category]
    );
    return convertSnakeToCamel.keysToCamel(rows);
};

const getPost = async (client, key) => {
    const { rows } = await client.query(
        `
        SELECT *
        FROM "test_table"
        WHERE id = $1
        `,
        [key]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updatePost = async (client, key, title, contents, category) => {
    const { rows } = await client.query(
        `
        UPDATE "test_table"
        SET title = $2, contents = $3, category = $4
        WHERE id = $1
        RETURNING *
        `,
        [key, title, contents, category]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deletePost = async (client, key) => {
    const { rows } = await client.query(
        `
        DELETE FROM "test_table"
        WHERE id = $1
        RETURNING *
        `,
        [key]
    );
    return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = {
    createPost,
    getList,
    getPost,
    updatePost,
    deletePost
};