import { databaseConnect, addDocument } from "../../helpers/db-util";


async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await databaseConnect();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed." });
      return;
    }

    try {
      await addDocument(client, 'newsletter', { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed." });
      return;
    }

    res.status(201).json({ message: "Signed up successfully!" });
  }
}

export default handler;
