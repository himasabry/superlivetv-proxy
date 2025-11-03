export default async function handler(req, res) {
  try {
    const apiUrl = "https://www.scorebat.com/video-api/v3/feed/?token=MTY5ODlfMTcwNjMzNzE2Nl8xYTU0MzFjYmU0ZWRiM2Q1ZDRmMTFmYjhhYWE5Y2RmZjQxMTUyM2I5";
    const response = await fetch(apiUrl);
    const data = await response.json();

    const filtered = data.response.filter(match =>
      match.videos.some(v => !v.embed.includes("dailymotion"))
    );

    res.status(200).json({ response: filtered });
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب البيانات", details: err.message });
  }
}
