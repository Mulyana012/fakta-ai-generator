"use client";

import { useEffect, useState } from "react";

const CATEGORIES = [
  "Fakta Unik",
  "Fakta Hewan",
  "Fakta Sains",
  "Fakta Sejarah",
  "Fakta Luar Angkasa",
  "Fakta Psikologi",
  "Fakta Tubuh Manusia",
  "Fakta Indonesia",
  "Fakta Misterius",
  "Fakta Aneh",
  "Acak",
];

const PLATFORMS = [
  "YouTube Shorts",
  "TikTok",
  "Facebook Reels",
  "Instagram Reels",
];

const STYLES = [
  "Mengejutkan",
  "Mind-blowing",
  "Edukatif",
  "Misterius",
  "Santai",
  "Viral",
];

const DURATIONS = [
  "30 detik",
  "45 detik",
  "60 detik",
  "90 detik",
];

function makeFullText(item: any, index: number) {
  return `FAKTA #${index + 1}

${item.title}

HOOK
${item.hook}

SCRIPT
${item.script}

SCENE & PROMPT VISUAL
${item.scenes
  .map(
    (scene: any) =>
      `Scene ${scene.scene}: ${scene.visual}
Narasi: ${scene.narration}`
  )
  .join("\n")}

JUDUL ALTERNATIF
${item.titles.join("\n")}

DESKRIPSI
${item.description}

HASHTAG
${item.hashtags.join(" ")}

CTA
${item.cta}`;
}

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);

  const [category, setCategory] = useState(CATEGORIES[0]);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("1");

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedKey = localStorage.getItem("fakta-ai-key");

    if (storedKey) {
      setApiKey(storedKey);
      setSaved(true);
    }
  }, []);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      setError("Masukkan API Key Gemini terlebih dahulu.");
      return;
    }

    localStorage.setItem("fakta-ai-key", apiKey.trim());
    setSaved(true);
    setError("");
  };

  const removeApiKey = () => {
    localStorage.removeItem("fakta-ai-key");
    setApiKey("");
    setSaved(false);
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Berhasil disalin!");
    } catch {
      alert("Gagal menyalin. Silakan salin secara manual.");
    }
  };

  const generateContent = async () => {
    if (!apiKey.trim()) {
      setError("Masukkan API Key Gemini terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    setItems([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey,
          category,
          platform,
          style,
          duration,
          topic,
          count: Number(count),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Gagal membuat konten."
        );
      }

      setItems(data.items || []);
    } catch (err: any) {
      setError(
        err?.message ||
          "Terjadi kesalahan saat menghubungi Gemini."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <nav>
        <div className="logo">
          🧠 <strong>FAKTA AI</strong>
        </div>

        <span>Generator Konten Fakta Unik</span>
      </nav>

      <section className="hero">
        <div className="pill">⚡ TANPA LOGIN</div>

        <h1>
          Ubah satu ide menjadi{" "}
          <em>konten siap posting.</em>
        </h1>

        <p>
          Buat judul, hook, script, prompt visual,
          deskripsi, hashtag dan CTA dalam sekali klik.
        </p>
      </section>

      <section className="panel">
        <h2>🔑 Gemini API Key</h2>

        <p>
          Gunakan API Key Gemini milik Anda sendiri.
          API Key disimpan secara lokal di browser.
        </p>

        <div className="keyrow">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setSaved(false);
            }}
            placeholder="Tempel API Key Gemini di sini"
          />

          <button onClick={saveApiKey}>
            Simpan Key
          </button>

          {saved && (
            <button
              className="remove"
              onClick={removeApiKey}
            >
              Hapus
            </button>
          )}
        </div>

        {saved && (
          <small className="ok">
            ● API Key tersimpan di perangkat ini
          </small>
        )}
      </section>

      <section className="panel">
        <h2>⚙️ Pengaturan Konten</h2>

        <p>
          Tentukan jenis konten yang ingin dibuat oleh AI.
        </p>

        <div className="grid">
          <label>
            Kategori

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Platform

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value)
              }
            >
              {PLATFORMS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Gaya Konten

            <select
              value={style}
              onChange={(e) =>
                setStyle(e.target.value)
              }
            >
              {STYLES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Durasi

            <select
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
            >
              {DURATIONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Jumlah Konten

            <select
              value={count}
              onChange={(e) =>
                setCount(e.target.value)
              }
            >
              {["1", "5", "10", "20"].map((item) => (
                <option key={item}>
                  {item} konten
                </option>
              ))}
            </select>
          </label>

          <label className="wide">
            Topik Khusus{" "}
            <span>(opsional)</span>

            <input
              value={topic}
              onChange={(e) =>
                setTopic(e.target.value)
              }
              placeholder="Contoh: fakta laut yang mengejutkan"
            />
          </label>
        </div>

        <button
          className="generate"
          disabled={!apiKey.trim() || loading}
          onClick={generateContent}
        >
          {loading
            ? "⏳ AI sedang membuat konten..."
            : "🔥 GENERATE FAKTA SEKARANG"}
        </button>

        {error && (
          <div className="error">
            ⚠️ {error}
          </div>
        )}
      </section>

      {items.length > 0 && (
        <section className="results">
          <div className="resultbar">
            <div>
              <h2>✨ Hasil Konten</h2>

              <p>
                {items.length} konten siap digunakan
              </p>
            </div>

            <button
              onClick={() =>
                copyText(
                  items
                    .map((item, index) =>
                      makeFullText(item, index)
                    )
                    .join(
                      "\n\n════════════════════\n\n"
                    )
                )
              }
            >
              📋 Copy Semua
            </button>
          </div>

          {items.map((item, index) => (
            <article
              className="card"
              key={index}
            >
              <div className="cardtop">
                <span>
                  FAKTA #{index + 1}
                </span>

                <button
                  onClick={() =>
                    copyText(
                      makeFullText(item, index)
                    )
                  }
                >
                  📋 Copy Konten
                </button>
              </div>

              <h3>{item.title}</h3>

              <div className="box">
                <b>🎯 HOOK</b>

                <p>{item.hook}</p>
              </div>

              <b>📝 SCRIPT</b>

              <pre>{item.script}</pre>

              <b>
                🎬 SCENE & PROMPT VISUAL
              </b>

              {item.scenes?.map(
                (scene: any) => (
                  <div
                    className="scene"
                    key={scene.scene}
                  >
                    <strong>
                      Scene {scene.scene}
                    </strong>

                    <p>
                      {scene.visual}
                    </p>

                    <small>
                      Narasi:{" "}
                      {scene.narration}
                    </small>
                  </div>
                )
              )}

              <b>
                💡 JUDUL ALTERNATIF
              </b>

              <ul>
                {item.titles?.map(
                  (title: string) => (
                    <li key={title}>
                      {title}
                    </li>
                  )
                )}
              </ul>

              <b>📄 DESKRIPSI</b>

              <p>
                {item.description}
              </p>

              <b>#️⃣ HASHTAG</b>

              <p className="tags">
                {item.hashtags?.join(" ")}
              </p>

              <b>📢 CTA</b>

              <p>{item.cta}</p>
            </article>
          ))}
        </section>
      )}

      <footer>
        FAKTA AI GENERATOR • HP & Laptop
      </footer>
    </main>
  );
}
