import { MongoClient } from "mongodb";
import { databaseConnect, getComments, addDocument } from "../../../helpers/db-util";



async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await databaseConnect();
  } catch (error) {
    res.status(500).json({ message: "Error while connecting to database." });
    return;
  }

  if (req.method === "POST") {
    // add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      !text ||
      name.trim() === "" ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Error, invalid inputs." });
      client.close();
      return;
    }

    const newComment = { email, name, text, eventId };

    let result;

    try {
      result = await addDocument(client, 'comments', newComment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while saving comment to database." });
    }

    res.status(201).json({ message: "Added comment.", comment: newComment });
  } else if (req.method === "GET") {
    try {
      const comments = await getComments(client, {eventId: eventId}, { _id: -1 });
      res.status(200).json({ comments: comments });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }

    
  }

  client.close();
}

export default handler;
