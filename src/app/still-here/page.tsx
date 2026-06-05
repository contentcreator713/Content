import SubscribeForm from "./SubscribeForm";

const posts = [
  {
    slug: "3am-thoughts",
    tag: "Anxiety",
    tagColor: "#06B6D4",
    date: "June 3, 2026",
    title: "3 a.m. thoughts that don't go anywhere",
    excerpt:
      "There's a specific kind of awake that only happens at 3 a.m. Not tired enough to sleep, not alert enough to do anything. Just... stuck in the loop.",
    readTime: "4 min read",
  },
  {
    slug: "nothing-to-show-for-it",
    tag: "Daily Life",
    tagColor: "#2563EB",
    date: "May 28, 2026",
    title: "A whole week went by and I have nothing to show for it",
    excerpt:
      "I keep waiting for the version of me that has it together. I'm starting to think she's not coming. And I'm not sure whether that's devastating or a relief.",
    readTime: "6 min read",
  },
  {
    slug: "the-word-fine",
    tag: "Honesty",
    tagColor: "#06B6D4",
    date: "May 19, 2026",
    title: "I said I was fine and nobody pushed back. That's the problem.",
    excerpt:
      "Fine is the most overused lie in the English language. We all know it. We all say it anyway. I've been saying it for months and I'm exhausted by it.",
    readTime: "5 min read",
  },
  {
    slug: "small-wins",
    tag: "Growth",
    tagColor: "#2563EB",
    date: "May 11, 2026",
    title: "The shower was the win today. That's it. That was the whole day.",
    excerpt:
      "Nobody tells you that some days, just getting clean counts as an accomplishment. I'm telling you. It counts. You can write it down.",
    readTime: "3 min read",
  },
];

export default function StillHerePage() {
  return (
    <div
      style={{
        background: "#0F172A",
        color: "#FFFFFF",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: 1.7,
        minHeight: "100vh",
      }}
    >
      {/* ── Nav ───────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(15,23,42,0.9)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: 20,
              background: "linear-gradient(135deg, #FFFFFF 30%, #06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Still Here
          </span>
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {["Posts", "About", "Subscribe"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: 13,
                  color: item === "Subscribe" ? "#06B6D4" : "#94A3B8",
                  textDecoration: "none",
                  fontWeight: item === "Subscribe" ? 600 : 400,
                  letterSpacing: item === "Subscribe" ? "0.5px" : undefined,
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────── */}
      <header
        style={{
          padding: "96px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* glow blobs */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,99,235,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#06B6D4",
              marginBottom: 24,
            }}
          >
            A blog · Mental health &amp; daily life
          </p>
          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(56px, 12vw, 96px)",
              lineHeight: 1,
              background: "linear-gradient(135deg, #FFFFFF 30%, #06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: 28,
            }}
          >
            Still Here
          </h1>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(17px, 2.5vw, 21px)",
              color: "#94A3B8",
              lineHeight: 1.8,
              marginBottom: 40,
            }}
          >
            A blog about the stuff most people keep to themselves — the anxiety
            that won&apos;t quiet down, the days that feel impossible, and the
            messy work of figuring out how to keep going anyway.
          </p>
          <a
            href="#posts"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #2563EB, #06B6D4)",
              borderRadius: 100,
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.5px",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(37,99,235,0.35)",
            }}
          >
            Read the blog
          </a>
        </div>
      </header>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Pull quote ────────────────────────────────── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.07))",
            border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 20,
            padding: "40px 44px",
            marginBottom: 72,
            boxShadow: "0 0 40px rgba(37,99,235,0.08)",
          }}
        >
          <blockquote
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(18px, 2.5vw, 22px)",
              lineHeight: 1.8,
              color: "#FFFFFF",
              borderLeft: "3px solid #06B6D4",
              paddingLeft: 24,
              margin: 0,
            }}
          >
            Still Here exists to make the people who are struggling feel less
            alone — not by offering answers, but by being honest about the
            questions.
          </blockquote>
        </div>

        {/* ── Posts ─────────────────────────────────────── */}
        <section id="posts" style={{ marginBottom: 80 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#06B6D4",
              marginBottom: 28,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            Recent Posts
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {posts.map((post, i) => (
              <article
                key={post.slug}
                style={{
                  background:
                    i === 0
                      ? "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(6,182,212,0.06))"
                      : "rgba(255,255,255,0.03)",
                  border:
                    i === 0
                      ? "1px solid rgba(37,99,235,0.28)"
                      : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20,
                  padding: i === 0 ? "36px 36px" : "28px 32px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: post.tagColor,
                      background: `${post.tagColor}18`,
                      padding: "4px 10px",
                      borderRadius: 100,
                      border: `1px solid ${post.tagColor}40`,
                    }}
                  >
                    {post.tag}
                  </span>
                  <span style={{ fontSize: 12, color: "#475569" }}>
                    {post.date}
                  </span>
                  <span style={{ fontSize: 12, color: "#334155" }}>·</span>
                  <span style={{ fontSize: 12, color: "#475569" }}>
                    {post.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: i === 0 ? "clamp(20px, 3vw, 26px)" : 18,
                    lineHeight: 1.3,
                    color: "#FFFFFF",
                    marginBottom: 12,
                  }}
                >
                  {post.title}
                </h2>

                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    fontSize: 15,
                    color: "#94A3B8",
                    lineHeight: 1.8,
                    marginBottom: 20,
                  }}
                >
                  {post.excerpt}
                </p>

                <a
                  href={`#${post.slug}`}
                  style={{
                    fontSize: 13,
                    color: "#06B6D4",
                    textDecoration: "none",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── About ─────────────────────────────────────── */}
        <section id="about" style={{ marginBottom: 80 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#06B6D4",
              marginBottom: 28,
              paddingBottom: 12,
              borderBottom: "1px solid rgba(6,182,212,0.2)",
            }}
          >
            About This Blog
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: 17,
                color: "#CBD5E1",
                lineHeight: 1.9,
                marginBottom: 20,
              }}
            >
              This is a blog about the stuff most people keep to themselves —
              the anxiety that won&apos;t quiet down, the days that feel
              impossible to get through, and the slow, messy work of figuring
              out how to keep going anyway.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#64748B",
                lineHeight: 1.8,
              }}
            >
              No advice columns. No silver linings forced onto dark days. Just
              honest writing from someone who&apos;s still in the middle of it,
              hoping it finds someone who needed to hear they&apos;re not alone.
            </p>
          </div>
        </section>

        {/* ── Subscribe ─────────────────────────────────── */}
        <section id="subscribe" style={{ marginBottom: 80 }}>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,58,95,0.8) 100%)",
              border: "1px solid rgba(6,182,212,0.2)",
              borderRadius: 24,
              padding: "56px 40px",
              textAlign: "center",
              boxShadow: "0 0 60px rgba(37,99,235,0.12)",
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 11,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#06B6D4",
                marginBottom: 16,
              }}
            >
              No spam. Ever.
            </p>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(24px, 4vw, 36px)",
                marginBottom: 12,
                color: "#FFFFFF",
              }}
            >
              Get new posts in your inbox
            </h2>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: 16,
                color: "#94A3B8",
                marginBottom: 36,
                maxWidth: 420,
                margin: "0 auto 36px",
              }}
            >
              When something new goes up, you&apos;ll be the first to know.
              That&apos;s it.
            </p>
            <SubscribeForm />
          </div>
        </section>
      </div>

      {/* ── Footer ────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: 18,
            background: "linear-gradient(135deg, #FFFFFF 30%, #06B6D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 8,
          }}
        >
          Still Here
        </p>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: 13,
            color: "#475569",
            marginBottom: 20,
          }}
        >
          Raw. Real. Still going.
        </p>
        <p style={{ fontSize: 12, color: "#334155" }}>
          © 2026 Still Here · All rights reserved
        </p>
      </footer>
    </div>
  );
}
