import { MongoClient } from "mongodb";

export async function databaseConnect() {
    const client = await MongoClient.connect("mongodb+srv://cailean:Mj1995!!@next-js.7ryby5t.mongodb.net/events?retryWrites=true&w=majority");

    return client;
}


export async function addDocument (client, collection, document) {
    const db = client.db();

    const result = await db.collection(collection).insertOne(document);

    return result;
}


export async function getComments (client, filter={}, sort) {
    const db = client.db();

    const result = await db.collection("comments").find(filter).sort(sort).toArray();

    return result;
}