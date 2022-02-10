import { json } from "remix";
import Airtable from "airtable";

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }

  const payload = await request.json();
  console.log(payload);

  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appGBMJd8O9jA8OAt"
  );

  base("Table 2").create(
    [
      {
        fields: {
          first_name: payload.firstName,
          last_name: payload.lastName,
          favorite_color: payload.favoriteColor,
        },
      },
    ],
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach((record) => console.log(record.getId()));
    }
  );

  return json({ success: true }, 200);
};
