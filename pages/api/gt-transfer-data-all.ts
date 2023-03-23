import fs from "fs";
import path from "path";

export default async function (req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      `/public/data/all_data.json`
    );
    const dataBuffer = fs.createReadStream(filePath);

    await new Promise(function (resolve) {
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=all_data.json",
        "Content-Type",
        "application/json"
      );
      dataBuffer.pipe(res);
      dataBuffer.on("end", resolve);
    });
  } catch (err) {
    res.status(400).json({ error: true, message: err });
    res.end();
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}


