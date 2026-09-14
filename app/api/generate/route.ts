import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      apiKey,
      category,
      platform,
      style,
      duration,
      topic,
      count,
    } = body;

    if (!apiKey || !apiKey.trim()) {
      return NextResponse.json(
        {
          error: "API Key Gemini belum diisi.",
        },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      apiKey.trim()
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
    });

    const prompt = `
Anda adalah penulis konten fakta unik profesional
untuk video pendek media sosial.

Gunakan Bahasa Indonesia yang natural, menarik,
dan mudah dipahami.

Buat ${count || 1} paket konten fakta unik.

KATEGORI:
${category}

PLATFORM:
${platform}

GAYA:
${style}

DURASI:
${duration}

TOPIK:
${topic || "Pilih fakta unik yang menarik dan mengejutkan."}

ATURAN:

1. Jangan mengarang fakta.
2. Hindari informasi yang tidak dapat dipertanggungjawabkan.
3. Buat hook yang membuat penonton ingin terus menonton.
4. Script harus natural untuk voice-over.
5. Sesuaikan panjang script dengan durasi.
6. Buat 4-6 scene.
7. Setiap scene harus memiliki prompt visual yang detail.
8. Prompt visual tidak boleh meminta tulisan/teks
   di dalam gambar.
9. Buat 3 judul alternatif.
10. Buat deskripsi yang cocok untuk platform.
11. Buat 10-15 hashtag.
12. Buat CTA singkat.
13. Gunakan bahasa yang terasa seperti dibuat manusia.
14. Jangan menggunakan markdown.
15. Output HARUS JSON valid.

FORMAT:

{
  "items": [
    {
      "fact": "Fakta utama",
      "title": "Judul utama",
      "hook": "Hook pembuka",
      "script": "Script lengkap",
      "scenes": [
        {
          "scene": 1,
          "visual": "Prompt visual detail",
          "narration": "Narasi scene"
        }
      ],
      "titles": [
        "Judul alternatif 1",
        "Judul alternatif 2",
        "Judul alternatif 3"
      ],
      "description": "Deskripsi konten",
      "hashtags": [
        "#faktaunik",
        "#faktamenarik"
      ],
      "cta": "CTA"
    }
  ]
}

Keluarkan JSON saja.
Jangan gunakan tanda markdown seperti \`\`\`.
`;

    const result =
      await model.generateContent(prompt);

    const text =
      result.response.text().trim();

    const cleanText = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const data = JSON.parse(cleanText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini error:", error);

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Gagal membuat konten. Periksa API Key Gemini dan kuota API Anda.",
      },
      {
        status: 500,
      }
    );
  }
}
