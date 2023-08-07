import { google } from "googleapis";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message, feedbackType, contactEmail } = req.body;

    if (
      !["bug", "suggestion", "other", "appreciate"].includes(feedbackType) ||
      !message
    ) {
      res.status(422).json({ error: "Invalid input." });
      return;
    }

    let fields = [feedbackType, contactEmail, message];

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: (process.env.GOOGLE_SERVICE_PRIVATE_KEY as string).replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Sheet1!A2:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [Object.values(fields)],
      },
    });

    res.status(200).json({ success: "success" });
    return;
  } else {
    res.status(400).json({ error: "Invalid method!" });
  }
}
