import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

const cors = Cors({
  methods: ["POST"],
  origin: "https://fmhy.netlify.app",
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await runMiddleware(req, res, cors);

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

    await sheets.spreadsheets.values.append({
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
