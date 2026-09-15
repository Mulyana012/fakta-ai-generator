"use client";

import { useEffect, useState } from "react";

const C = [
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

const P = ["YouTube Shorts", "TikTok", "Facebook Reels", "Instagram Reels"];
const S = ["Mengejutkan", "Mind-blowing", "Edukatif", "Misterius", "Santai", "Viral"];
const D = ["30 detik", "45 detik", "60 detik", "90 detik"];

type Scene = {
  scene: number;
  visual: string;
  narration: string;
};

type Item = {
  fact?: string;
  title: string;
  hook: string;
  script: string;
  scenes: Scene[];
  titles: string[];
  description: string;
  hashtags: string[];
  cta: string;
};

const pack = (x: Item, i: number) =>
  `FAKTA #${i + 1}
${x.title}

HOOK
${x.hook}

SCRIPT
${x.script}

SCENE & PROMPT VISUAL
${x.scenes
  .map((s) => `Scene ${s.scene}: ${s.visual}\nNarasi: ${s.narration}`)
  .join("\n")}

JUDUL ALTERNATIF
${x.titles.join("\n")}

DESKRIPSI
${x.description}

HASHTAG
${x.hashtags.join(" ")}

CTA
${x.cta}`;

function Icon({
  children,
  size = 20,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <span
      className="icon"
      style={{ width: size, height: size, fontSize: size * 0.72 }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

export default function Home() {
  const [k, setK] = useState("");
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [cat, setCat] = useState(C[0]);
  const [plat, setPlat] = useState(P[0]);
  const [style, setStyle] = useState(S[0]);
  const [dur, setDur] = useState(D[1]);
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState("1");
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const v = localStorage.getItem("fakta-ai-key");
    if (v) {
      setK(v);
      setSaved(true);
    }
  }, []);

  const save = () => {
    if (!k.trim()) return;
    localStorage.setItem("fakta-ai-key", k.trim());
    setSaved(true);
  };

  const gen = async () => {
    setBusy(true);
    setErr("");
    setItems([]);

    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: k,
          category: cat,
          platform: plat,
          style,
          duration: dur,
          topic,
          count: Number(count),
        }),
      });

      const d = await r.json();
      if (!r.ok) throw Error(d.error);
      setItems(d.items || []);
    } catch (e: any) {
      setErr(e.message || "Gagal membuat konten.");
    } finally {
      setBusy(false);
    }
  };

  const cp = async (text: string, label = "Konten") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      window.setTimeout(() => setCopied(""), 1800);
    } catch {
      setErr("Tidak bisa menyalin. Coba lagi.");
    }
  };

  const allText = items.map(pack).join("\n\n════════════════════\n\n");

  return (
    <main>
      <nav className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <span>✦</span>
          </div>
          <div>
            <div className="brand-name">
              FAKTA <em>AI</em>
            </div>
            <div className="brand-sub">Generator konten pintar</div>
          </div>
        </div>

        <div className="top-status">
          <span className="status-dot" />
          <span>Siap digunakan</span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-copy">
          <div className="eyebrow">
            <Icon>✦</Icon>
            AI CONTENT STUDIO
          </div>

          <h1>
            Ubah satu ide menjadi{" "}
            <span>konten siap posting.</span>
          </h1>

          <p>
            Buat fakta menarik, hook, script, visual, judul, deskripsi,
            hashtag, dan CTA dalam satu proses.
          </p>

          <div className="feature-row">
            <div className="feature-chip">
              <span>⚡</span>
              <div>
                <strong>Cepat</strong>
                <small>& mudah</small>
              </div>
            </div>
            <div className="feature-chip">
              <span>✦</span>
              <div>
                <strong>Kreatif</strong>
                <small>berbasis AI</small>
              </div>
            </div>
            <div className="feature-chip">
              <span>◎</span>
              <div>
                <strong>Siap</strong>
                <small>posting</small>
              </div>
            </div>
            <div className="feature-chip">
              <span>↗</span>
              <div>
                <strong>Multi</strong>
                <small>platform</small>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card art-main">
            <div className="art-card-top">
              <span className="mini-logo">✦</span>
              <span className="mini-lines" />
            </div>
            <div className="art-title-line" />
            <div className="art-title-line short" />
            <div className="art-body-line" />
            <div className="art-body-line" />
            <div className="art-body-line small" />
            <div className="art-pill">AI READY</div>
          </div>
          <div className="art-float art-spark">✦</div>
          <div className="art-float art-hash">#</div>
          <div className="art-float art-play">▶</div>
        </div>
      </section>

      <section className="panel premium-panel key-panel">
        <div className="section-head">
          <div className="section-icon key-icon">🔑</div>
          <div>
            <h2>Gemini API Key</h2>
            <p>Gunakan API Key Gemini milik Anda sendiri.</p>
          </div>
          {saved && (
            <div className="saved-badge">
              <span>✓</span> Tersimpan
            </div>
          )}
        </div>

        <div className="key-input-wrap">
          <input
            type={showKey ? "text" : "password"}
            value={k}
            onChange={(e) => {
              setK(e.target.value);
              setSaved(false);
            }}
            placeholder="Tempel API Key Gemini di sini"
            aria-label="API Key Gemini"
          />
          <button
            type="button"
            className="ghost-icon"
            onClick={() => setShowKey(!showKey)}
            aria-label={showKey ? "Sembunyikan API Key" : "Tampilkan API Key"}
          >
            {showKey ? "◉" : "◌"}
          </button>
          <button type="button" className="save-key" onClick={save}>
            Simpan Key
            <span>→</span>
          </button>
        </div>

        <div className="security-note">
          <span>✓</span>
          <span>Key disimpan di browser perangkat Anda.</span>
        </div>
      </section>

      <section className="panel premium-panel">
        <div className="section-head">
          <div className="section-icon settings-icon">⚙</div>
          <div>
            <h2>Pengaturan Konten</h2>
            <p>Atur karakter konten sebelum AI mulai bekerja.</p>
          </div>
        </div>

        <div className="grid">
          <label>
            <span>Kategori</span>
            <div className="select-wrap">
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                {C.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <b>⌄</b>
            </div>
          </label>

          <label>
            <span>Platform</span>
            <div className="select-wrap">
              <select value={plat} onChange={(e) => setPlat(e.target.value)}>
                {P.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <b>⌄</b>
            </div>
          </label>

          <label>
            <span>Gaya konten</span>
            <div className="select-wrap">
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                {S.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <b>⌄</b>
            </div>
          </label>

          <label>
            <span>Durasi</span>
            <div className="select-wrap">
              <select value={dur} onChange={(e) => setDur(e.target.value)}>
                {D.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <b>⌄</b>
            </div>
          </label>

          <label>
            <span>Jumlah konten</span>
            <div className="select-wrap">
              <select value={count} onChange={(e) => setCount(e.target.value)}>
                {["1", "5", "10", "20"].map((x) => (
                  <option key={x} value={x}>
                    {x} konten
                  </option>
                ))}
              </select>
              <b>⌄</b>
            </div>
          </label>

          <label className="wide">
            <span>
              Topik khusus <i>opsional</i>
            </span>
            <div className="topic-wrap">
              <span>✎</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: fakta laut yang mengejutkan"
                maxLength={500}
              />
              <small>{topic.length}/500</small>
            </div>
          </label>
        </div>

        <button
          type="button"
          className="generate"
          disabled={!k.trim() || busy}
          onClick={gen}
        >
          <span className="generate-icon">{busy ? "◌" : "✦"}</span>
          <span>{busy ? "AI sedang membuat konten..." : "GENERATE FAKTA"}</span>
          {!busy && <span className="generate-arrow">→</span>}
        </button>

        {!k.trim() && (
          <div className="helper-message">
            🔒 Simpan API Key terlebih dahulu untuk mengaktifkan generator.
          </div>
        )}

        {err && <div className="error">⚠️ {err}</div>}
      </section>

      {items.length > 0 && (
        <section className="results-section">
          <div className="resultbar">
            <div>
              <div className="result-kicker">HASIL GENERATOR</div>
              <h2>
                Konten <span>siap posting.</span>
              </h2>
              <p>{items.length} paket konten berhasil dibuat oleh AI.</p>
            </div>

            <button
              type="button"
              className="copy-all"
              onClick={() => cp(allText, "Semua konten")}
            >
              <span>▣</span>
              {copied === "Semua konten" ? "Tersalin!" : "Copy Semua"}
            </button>
          </div>

          {items.map((x, i) => (
            <article className="result-card" key={i}>
              <div className="result-card-head">
                <div className="result-number">
                  <span>FAKTA</span>
                  <strong>#{String(i + 1).padStart(2, "0")}</strong>
                </div>

                <button
                  type="button"
                  className="copy-content"
                  onClick={() => cp(pack(x, i), `Konten ${i + 1}`)}
                >
                  <span>▣</span>
                  {copied === `Konten ${i + 1}` ? "Tersalin!" : "Copy Konten"}
                </button>
              </div>

              <h3>{x.title}</h3>

              <div className="content-block hook-block">
                <div className="block-label">
                  <span>🎯</span>
                  HOOK
                </div>
                <p>{x.hook}</p>
              </div>

              <div className="content-block script-block">
                <div className="block-label">
                  <span>📝</span>
                  SCRIPT
                </div>
                <pre>{x.script}</pre>
              </div>

              <div className="subsection-title">
                <span>🎬</span>
                SCENE & PROMPT VISUAL
              </div>

              <div className="scene-list">
                {x.scenes.map((s) => (
                  <div className="scene" key={s.scene}>
                    <div className="scene-number">{String(s.scene).padStart(2, "0")}</div>
                    <div className="scene-content">
                      <strong>Scene {s.scene}</strong>
                      <p>{s.visual}</p>
                      <small>
                        <b>Narasi:</b> {s.narration}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="details-grid">
                <div className="detail-box">
                  <div className="block-label">
                    <span>✦</span>
                    JUDUL ALTERNATIF
                  </div>
                  <ol>
                    {x.titles.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </div>

                <div className="detail-box">
                  <div className="block-label">
                    <span>📣</span>
                    CTA
                  </div>
                  <p>{x.cta}</p>
                </div>

                <div className="detail-box full">
                  <div className="block-label">
                    <span>▤</span>
                    DESKRIPSI
                  </div>
                  <p>{x.description}</p>
                </div>

                <div className="detail-box full">
                  <div className="block-label">
                    <span>#</span>
                    HASHTAG
                  </div>
                  <p className="tags">{x.hashtags.join(" ")}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <footer>
        <div className="footer-brand">✦ FAKTA AI</div>
        <span>Generator Konten Fakta Unik • HP & Laptop</span>
      </footer>
    </main>
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
