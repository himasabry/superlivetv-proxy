export default async function handler(req, res) {
  try {
    // نجيب البيانات من ScoreBat لكن باستخدام وسيط عام لتجاوز القيود
    const proxyUrl = "https://corsproxy.io/?";
    const targetUrl = "https://www.scorebat.com/video-api/v3/feed/?token=MTY5ODlfMTcwNjMzNzE2Nl8xYTU0MzFjYmU0ZWRiM2Q1ZDRmMTFmYjhhYWE5Y2RmZjQxMTUyM2I5";

    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    const data = await response.json();

    if (!data || !data.response) {
      return res.status(500).json({ error: "⚠️ لم يتم العثور على بيانات حالياً من المصدر." });
    }

    // فلترة اللقطات التي لا تحتوي على Dailymotion
    const filtered = data.response
      .map(match => {
        const safeVideos = match.videos.filter(v => !v.embed.includes("dailymotion"));
        return { ...match, videos: safeVideos };
      })
      .filter(match => match.videos.length > 0);

    res.status(200).json({ response: filtered });
  } catch (err) {
    res.status(500).json({ error: "فشل في جلب البيانات", details: err.message });
  }
}
