import mongoose from 'mongoose';
import { HTTP_STATUS } from '../../../constants/api.contants.js'


class MongoContainer {
    #model;

    constructor(collection, schema) {
        this.#model = mongoose.model(collection, schema);
    }


    async getAll() {
        const documents = await this.#model.find().lean();
        return documents;
    }

    async getById(id) {
        const document = await this.#model.findOne({ _id: id }, { __v: 0 });
        if (!document) {
            const message = `Resource with id ${id} not found`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return document;
    }

    async addProduct(item) {
        const newDocument = new this.#model(item);
        return await newDocument.save();
    }

    async updateProduct(id, item) {
        const updatedDocument = await this.#model.updateOne(
            { _id: id },
            { $set: { ...item } }
        );
        if (!updatedDocument.matchedCount) {
            const message = `Resource with id ${id} does not exists`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return updatedDocument;
    }

    async deleteProduct(id) {
        const deletedDocument = await this.#model.deleteOne({ _id: id });
        if (!deletedDocument.deletedCount) {
            const message = `Resource with id ${id} does not exists`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return deletedDocument;
    }
}

export default MongoContainer;