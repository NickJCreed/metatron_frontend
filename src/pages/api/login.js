// /pages/api/login.js
import { ThirdwebAuth } from "@thirdweb-dev/auth";
import admin from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json"; // Download from Firebase Console

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const thirdwebAuth = new ThirdwebAuth({
  domain: "your-domain.com",
  privateKey: process.env.THIRDWEB_PRIVATE_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { payload } = req.body;

      // Verify the payload with Thirdweb
      const address = await thirdwebAuth.verify(payload);

      // Create a custom token for Firebase
      const token = await admin.auth().createCustomToken(address);

      res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Authentication failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
