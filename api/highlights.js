export default async function handler(req, res) {
  try {
    const apiUrl = "https://www.scorebat.com/video-api/v3/feed/?token=MTY5ODlfMTcwNjMzNzE2Nl8xYTU0MzFjYmU0ZWRiM2Q1ZDRmMTFmYjhhYWE5Y2RmZjQxMTUyM2I5";
    const response = await fetch(apiUrl);
    const data = await response.json();

    // تأكد إن فيه بيانات فعلاً
    if (!data || !data.response) {
      return res.status(500).json({ error: "لم يتم العثور على بيانات صحيحة من API" });
    }

    // فلترة المباريات لإزالة روابط Dailymotion
    const filtered = data.response.map(match => {
      const safeVideos = match.videos.filter(v => !v.embed.includes("dailymotion"));
      return { ...match, videos: safeVideos };
    }).filter(match => match.videos.length > 0);

    res.status(200).json({ response: filtered });
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب البيانات", details: err.message });
  }
}
