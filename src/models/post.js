const knex = require("knex")(
    require("../../knexfile")[process.env.NODE_ENV || "development"]
);
const ValidationError = require("../errors/validationError");

class Post {
    constructor(data) {
        this.text = data.text;
        this.garden_id = data.garden_id;
        this.author = data.author;
    }

    async save() {
        const res = await knex
            .returning(["text", "garden_id", "author", "id"])
            .insert({
                text: this.text,
                garden_id: this.garden_id,
                author: this.author
            })
            .into("posts");
        return res[0];
    }

    static async getById(id) {
        if (isNaN(id) || id < 0) {
            throw new ValidationError("Invalid post ID");
        }
        const post = await knex("posts")
            .select()
            .where("id", id)
            .first();
        return post;
    }

    static async getByGardenId(id) {
        if (isNaN(id) || id < 0) {
            throw new ValidationError("Invalid garden ID");
        }
        const posts = await knex("posts")
            .select()
            .where("garden_id", id);
        return posts;
    }
}

module.exports = Post;