// HealthBookletPrint.jsx
// The printable template. Pure: give it the booklet data, it renders A5 pages.
//
//   mode="pages"    -> one A5 page per sheet (print on A5 paper, or "Booklet"
//                      option in the printer driver / Acrobat)
//   mode="booklet"  -> pages imposed 2-up on A4 landscape in saddle-stitch
//                      order. Print double-sided, "flip on short edge",
//                      fold the stack in half and staple the spine.
//
// Arabic booklets open from the right, so the imposition is mirrored.
//
// Used by the dashboard (الكتيب الصحي): the preview renders it on screen, and
// <BookletPrintPortal> in Dashboard.jsx renders it alone for window.print().

import React from "react";

const BRAND = "#2D5A4E";
const BRAND_DARK = "#1e3e36";
const BRAND_LIGHT = "#E8F0EE";

const CATEGORY = {
  summary: { label: "ملخص", color: BRAND },
  followup: { label: "متابعة طبية", color: "#b54708" },
  diet: { label: "الغذاء", color: "#1a7f4b" },
  activity: { label: "الحركة", color: "#1d63b8" },
  sleep: { label: "النوم والراحة", color: "#6941c6" },
  lifestyle: { label: "نمط الحياة", color: "#9a3412" },
};

const STATUS = {
  normal: { label: "طبيعي", color: "#1a8a4a", bg: "#e8f8f0" },
  borderline: { label: "حدّي", color: "#b54708", bg: "#fff4e0" },
  high: { label: "مرتفع", color: "#c0392b", bg: "#ffecea" },
  low: { label: "منخفض", color: "#c0392b", bg: "#ffecea" },
};

const COMORBIDITY_AR = {
  diabetes: "السكري",
  hypertension: "ارتفاع الضغط",
  dyslipidemia: "ارتفاع الدهون",
  ckd: "مرض الكلى المزمن",
  cad: "أمراض القلب",
  fatty_liver: "الكبد الدهني",
  asthma: "الربو",
  copd: "الانسداد الرئوي",
  hypothyroid: "قصور الغدة الدرقية",
};

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ar-SA-u-ca-gregory-nu-latn", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

/* ─── Pagination ───────────────────────────────────────────────────────── */

// Rough capacity of one A5 page in characters of advice text. If items
// overflow in your font, lower this number.
const ADVICE_PAGE_BUDGET = 1450;
const ITEM_OVERHEAD = 140; // title, tag, "because" line, spacing
const LAB_ROWS_PER_PAGE = 13;

function chunkAdvice(items) {
  const pages = [];
  let cur = [];
  let used = 0;
  for (const it of items) {
    const cost = it.body.length + ITEM_OVERHEAD;
    if (cur.length && used + cost > ADVICE_PAGE_BUDGET) {
      pages.push(cur);
      cur = [];
      used = 0;
    }
    cur.push(it);
    used += cost;
  }
  if (cur.length) pages.push(cur);
  return pages;
}

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

export function buildPages(data) {
  const items = (data.items ?? []).filter((i) => i.included !== false);
  const pages = [{ type: "cover" }, { type: "snapshot" }];
  chunk(data.labs ?? [], LAB_ROWS_PER_PAGE).forEach((rows, i) =>
    pages.push({ type: "labs", rows, cont: i > 0 }),
  );
  chunkAdvice(items).forEach((list, i) =>
    pages.push({ type: "advice", list, cont: i > 0 }),
  );
  pages.push({ type: "goals" }, { type: "followup" });

  // back cover is always last; pad with notes pages to a multiple of 4
  const total = pages.length + 1;
  const pad = (4 - (total % 4)) % 4;
  for (let i = 0; i < pad; i++) pages.push({ type: "notes" });
  pages.push({ type: "back" });
  return pages;
}

/** Saddle-stitch order for a right-to-left booklet. Returns [[left, right], ...]
 *  sheet sides in print order (front, back, front, back...). */
export function imposeRTL(n) {
  const sides = [];
  for (let s = 0; s < n / 4; s++) {
    sides.push([2 * s, n - 1 - 2 * s]); // front of sheet s
    sides.push([n - 2 - 2 * s, 2 * s + 1]); // back of sheet s (short-edge flip)
  }
  return sides;
}

/* ─── Page bodies ──────────────────────────────────────────────────────── */

const PageShell = ({ children, num, total, plain }) => (
  <div className={plain ? "hb-page hb-page-plain" : "hb-page"}>
    <div className="hb-page-inner">{children}</div>
    {!plain && (
      <div className="hb-footer">
        <span>وقتنا · خطتك الصحية</span>
        <span>
          {num} / {total}
        </span>
      </div>
    )}
  </div>
);

const H = ({ children, sub }) => (
  <div className="hb-h">
    <h2>{children}</h2>
    {sub && <p>{sub}</p>}
  </div>
);

function Cover({ data }) {
  return (
    <div className="hb-cover">
      <div className="hb-cover-brand">وقتنا</div>
      <div className="hb-cover-title">خطتك الصحية الشخصية</div>
      <div className="hb-cover-sub">
        مبنية على فحوصاتك وعمرك الحيوي وحالتك الصحية ونمط حياتك
      </div>
      <div className="hb-cover-card">
        <Row k="الاسم" v={data.patient?.name} />
        {data.patient?.mrn ? <Row k="رقم الملف" v={data.patient.mrn} /> : null}
        <Row
          k="العمر"
          v={data.patient?.age != null ? `${data.patient.age} سنة` : "—"}
        />
        <Row k="التاريخ" v={fmtDate(data.date ?? new Date())} />
      </div>
    </div>
  );
}

const Row = ({ k, v }) => (
  <div className="hb-row">
    <span className="hb-row-k">{k}</span>
    <span className="hb-row-v">{v || "—"}</span>
  </div>
);

function Snapshot({ data }) {
  const bio = data.bio;
  const gap = bio
    ? Math.round((bio.biologicalAge - bio.actualAge) * 10) / 10
    : null;
  const topFactors = (bio?.factors ?? []).slice(0, 4);
  return (
    <>
      <H sub="نظرة سريعة على وضعك الصحي اليوم">صورتك الصحية</H>
      {bio ? (
        <div className="hb-ages">
          <div className="hb-age">
            <div className="hb-age-n">{bio.actualAge}</div>
            <div className="hb-age-l">عمرك الفعلي</div>
          </div>
          <div
            className="hb-age hb-age-bio"
            style={{ borderColor: gap > 0 ? "#c0392b" : "#1a8a4a" }}
          >
            <div
              className="hb-age-n"
              style={{ color: gap > 0 ? "#c0392b" : "#1a8a4a" }}
            >
              {bio.biologicalAge}
            </div>
            <div className="hb-age-l">عمرك الحيوي</div>
          </div>
        </div>
      ) : (
        <div className="hb-box">
          لم يُحسب العمر الحيوي بعد لعدم اكتمال الفحوصات المطلوبة.
        </div>
      )}
      {bio && (
        <p className="hb-lead">
          {gap > 0
            ? `جسمك يعمل كأنه أكبر بـ ${gap} سنة. هذا قابل للتحسن.`
            : gap < 0
              ? `جسمك يعمل كأنه أصغر بـ ${Math.abs(gap)} سنة. أحسنت!`
              : "عمرك الحيوي مطابق لعمرك الفعلي."}
        </p>
      )}
      {topFactors.length > 0 && (
        <>
          <h3 className="hb-h3">أكثر ما أثّر على عمرك الحيوي</h3>
          {topFactors.map((f, i) => (
            <div className="hb-factor" key={i}>
              <span>{f.label}</span>
              <span className="hb-muted">{f.value}</span>
              <span style={{ color: f.impactColor ?? BRAND, fontWeight: 700 }}>
                {f.impact}
              </span>
            </div>
          ))}
        </>
      )}
      <h3 className="hb-h3">حالتك الصحية</h3>
      <div className="hb-chips">
        {(data.comorbidities ?? []).length ? (
          data.comorbidities.map((c) => (
            <span className="hb-chip" key={c}>
              {COMORBIDITY_AR[c] ?? c}
            </span>
          ))
        ) : (
          <span className="hb-muted">لا توجد أمراض مزمنة مسجلة</span>
        )}
        {data.bmi ? (
          <span className="hb-chip hb-chip-alt">
            مؤشر كتلة الجسم {data.bmi}
          </span>
        ) : null}
      </div>
    </>
  );
}

function Labs({ page }) {
  return (
    <>
      <H sub={page.cont ? null : "أحدث نتائجك خلال آخر سنة"}>
        نتائج فحوصاتك{page.cont ? " (تابع)" : ""}
      </H>
      <table className="hb-table">
        <thead>
          <tr>
            <th>الفحص</th>
            <th>النتيجة</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          {page.rows.map((r) => {
            const st = STATUS[r.status] ?? STATUS.normal;
            return (
              <tr key={r.key}>
                <td>{r.label}</td>
                <td className="hb-ltr">
                  {r.value} <small>{r.unit}</small>
                </td>
                <td>
                  <span
                    className="hb-pill"
                    style={{ color: st.color, background: st.bg }}
                  >
                    {st.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function Advice({ page }) {
  return (
    <>
      <H sub={page.cont ? null : "مرتبة حسب الأهمية لك"}>
        نصائحك{page.cont ? " (تابع)" : ""}
      </H>
      {page.list.map((it, i) => {
        const cat = CATEGORY[it.category] ?? CATEGORY.lifestyle;
        return (
          <div
            className="hb-advice"
            key={i}
            style={{ borderInlineStartColor: cat.color }}
          >
            <div className="hb-advice-top">
              <span className="hb-tag" style={{ color: cat.color }}>
                {cat.label}
              </span>
              {it.priority === 1 && (
                <span className="hb-tag hb-tag-hot">أولوية</span>
              )}
            </div>
            <div className="hb-advice-title">{it.title}</div>
            <div className="hb-advice-body">{it.body}</div>
            {it.because && (
              <div className="hb-because">السبب: {it.because}</div>
            )}
          </div>
        );
      })}
    </>
  );
}

function Goals({ data }) {
  const goals = (data.goals ?? []).filter(Boolean);
  while (goals.length < 3) goals.push("");
  return (
    <>
      <H sub="ضع علامة ✓ في كل أسبوع تحقق فيه الهدف">أهدافي لـ 12 أسبوعاً</H>
      {goals.map((g, i) => (
        <div className="hb-goal" key={i}>
          <div className="hb-goal-title">
            <span className="hb-goal-n">{i + 1}</span>
            {g || <span className="hb-line" />}
          </div>
          <div className="hb-weeks">
            {Array.from({ length: 12 }, (_, w) => (
              <div className="hb-week" key={w}>
                <div className="hb-week-box" />
                <small>{w + 1}</small>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h3 className="hb-h3">قياساتي</h3>
      <table className="hb-table hb-track">
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>الوزن</th>
            <th>الضغط</th>
            <th>السكر</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }, (_, i) => (
            <tr key={i}>
              <td />
              <td />
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function FollowUp({ data }) {
  return (
    <>
      <H>المتابعة</H>
      <div className="hb-box">
        <Row
          k="موعد المراجعة القادم"
          v={data.followUpDate ? fmtDate(data.followUpDate) : ""}
        />
        <Row
          k="الفحوصات المطلوبة قبله"
          v={data.nextLabs ?? "إعادة فحوصات العمر الحيوي"}
        />
      </div>
      <h3 className="hb-h3">اطلب الإسعاف فوراً (997) عند</h3>
      <ul className="hb-warn">
        <li>ألم في الصدر يستمر أكثر من 5 دقائق أو يمتد للذراع أو الفك</li>
        <li>ضعف أو تنميل مفاجئ في جهة من الجسم، أو صعوبة في الكلام</li>
        <li>ضيق تنفس شديد أو إغماء</li>
        <li>سكر أقل من 70 لا يتحسن بعد تناول سكر سريع، أو مع تشوش في الوعي</li>
      </ul>
      <h3 className="hb-h3">ملاحظة الطبيب</h3>
      <div className="hb-note">{data.doctorNote || ""}</div>
      <div className="hb-sign">
        <div>
          <div className="hb-sign-line">{data.doctorName ?? ""}</div>
          <small>اسم الطبيب</small>
        </div>
        <div>
          <div className="hb-sign-line" />
          <small>التوقيع</small>
        </div>
      </div>
      <p className="hb-disclaimer">
        هذه النصائح عامة ومبنية على نتائجك، وراجعها طبيبك. لا توقف أو تغيّر أي
        دواء دون استشارته.
      </p>
    </>
  );
}

const Notes = () => (
  <>
    <H>ملاحظاتي</H>
    {Array.from({ length: 16 }, (_, i) => (
      <div className="hb-ruled" key={i} />
    ))}
  </>
);

function Back({ data }) {
  return (
    <div className="hb-back">
      <div className="hb-cover-brand" style={{ color: BRAND }}>
        وقتنا
      </div>
      <p>تابع نتائجك وعمرك الحيوي ونصائحك في تطبيق وقتنا</p>
      {(data.clinic?.name || data.clinic?.phone) && (
        <div className="hb-box">
          <div>{data.clinic.name}</div>
          <div className="hb-ltr">{data.clinic.phone}</div>
        </div>
      )}
    </div>
  );
}

function PageBody({ page, data }) {
  switch (page.type) {
    case "cover":
      return <Cover data={data} />;
    case "snapshot":
      return <Snapshot data={data} />;
    case "labs":
      return <Labs page={page} />;
    case "advice":
      return <Advice page={page} />;
    case "goals":
      return <Goals data={data} />;
    case "followup":
      return <FollowUp data={data} />;
    case "notes":
      return <Notes />;
    case "back":
      return <Back data={data} />;
    default:
      return null;
  }
}

/* ─── Main ─────────────────────────────────────────────────────────────── */

export default function HealthBookletPrint({ data, mode = "booklet" }) {
  const pages = buildPages(data);
  const total = pages.length;
  const rendered = pages.map((p, i) => (
    <PageShell
      key={i}
      num={i + 1}
      total={total}
      plain={p.type === "cover" || p.type === "back"}
    >
      <PageBody page={p} data={data} />
    </PageShell>
  ));

  return (
    <div className="hb-root" dir="rtl">
      <style>{CSS(mode)}</style>
      {mode === "booklet"
        ? imposeRTL(total).map(([l, r], i) => (
            // physical left/right on paper, so this row is LTR on purpose
            <div className="hb-sheet" dir="ltr" key={i}>
              <div className="hb-half" dir="rtl">
                {rendered[l]}
              </div>
              <div className="hb-half" dir="rtl">
                {rendered[r]}
              </div>
            </div>
          ))
        : rendered.map((p, i) => (
            <div className="hb-a5" key={i}>
              {p}
            </div>
          ))}
    </div>
  );
}

/* ─── Styles ───────────────────────────────────────────────────────────── */

const CSS = (mode) => `
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
@page { size: ${mode === "booklet" ? "A4 landscape" : "A5"}; margin: 0; }
.hb-root { font-family: 'Tajawal', 'Noto Naskh Arabic', Tahoma, sans-serif; color: #1f2933;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.hb-root * { box-sizing: border-box; }

.hb-sheet { width: 297mm; height: 210mm; display: flex; background: #fff; page-break-after: always; break-after: page; overflow: hidden; }
.hb-half { width: 148.5mm; height: 210mm; }
.hb-a5 { width: 148mm; height: 210mm; background: #fff; page-break-after: always; break-after: page; overflow: hidden; }
@media screen {
  .hb-root { background: #d9dee5; padding: 16px; }
  .hb-sheet, .hb-a5 { margin: 0 auto 16px; box-shadow: 0 2px 10px rgba(0,0,0,.15); }
  .hb-sheet .hb-half:first-child { border-right: 1px dashed #c3c9d1; }
}
@media print { .hb-root { background: none; padding: 0; } .hb-noprint { display: none !important; } }

.hb-page { width: 100%; height: 100%; display: flex; flex-direction: column; padding: 11mm 10mm 7mm; }
.hb-page-inner { flex: 1; overflow: hidden; }
.hb-footer { display: flex; justify-content: space-between; font-size: 8pt; color: #8a94a3; border-top: 1px solid #e4e8ee; padding-top: 2.5mm; }

.hb-h { margin-bottom: 4mm; }
.hb-h h2 { margin: 0; font-size: 15pt; font-weight: 800; color: ${BRAND_DARK}; }
.hb-h p { margin: 1mm 0 0; font-size: 9pt; color: #6b7684; }
.hb-h3 { font-size: 10.5pt; color: ${BRAND}; margin: 5mm 0 2mm; }
.hb-lead { font-size: 10.5pt; font-weight: 700; text-align: center; margin: 3mm 0; }
.hb-muted { color: #6b7684; font-size: 9pt; }
.hb-ltr { direction: ltr; unicode-bidi: isolate; }

.hb-page-plain { padding: 0; }
.hb-cover { height: 100%; padding: 22mm 12mm 16mm; background: ${BRAND_DARK}; color: #fff; display: flex; flex-direction: column; }
.hb-cover-brand { font-size: 26pt; font-weight: 800; letter-spacing: .5px; }
.hb-cover-title { font-size: 21pt; font-weight: 800; margin-top: 30mm; line-height: 1.3; }
.hb-cover-sub { font-size: 10.5pt; opacity: .8; margin-top: 3mm; line-height: 1.6; }
.hb-cover-card { margin-top: auto; background: rgba(255,255,255,.1); border-radius: 3mm; padding: 4mm 5mm; }
.hb-cover-card .hb-row { border-color: rgba(255,255,255,.15); }
.hb-cover-card .hb-row-k { color: rgba(255,255,255,.7); }

.hb-row { display: flex; justify-content: space-between; padding: 1.8mm 0; border-bottom: 1px solid #e4e8ee; font-size: 10pt; }
.hb-row:last-child { border-bottom: 0; }
.hb-row-k { color: #6b7684; }
.hb-row-v { font-weight: 700; }

.hb-ages { display: flex; gap: 4mm; }
.hb-age { flex: 1; text-align: center; border: 1.5px solid #e4e8ee; border-radius: 3mm; padding: 4mm 0; }
.hb-age-n { font-size: 28pt; font-weight: 800; line-height: 1; color: #4b5563; }
.hb-age-l { font-size: 9pt; color: #6b7684; margin-top: 1.5mm; }
.hb-factor { display: flex; justify-content: space-between; gap: 2mm; font-size: 9.5pt; padding: 1.6mm 0; border-bottom: 1px solid #eef1f4; }
.hb-factor span:first-child { flex: 1; }

.hb-chips { display: flex; flex-wrap: wrap; gap: 1.5mm; }
.hb-chip { background: ${BRAND_LIGHT}; color: ${BRAND}; border-radius: 10mm; padding: 1mm 3mm; font-size: 9pt; font-weight: 700; }
.hb-chip-alt { background: #f1f3f6; color: #374151; }
.hb-box { background: #f6f8fa; border-radius: 2.5mm; padding: 3mm 4mm; font-size: 10pt; }

.hb-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
.hb-table th { text-align: right; font-size: 8.5pt; color: #6b7684; font-weight: 500; padding: 1.5mm 1mm; border-bottom: 1.5px solid #d6dbe1; }
.hb-table td { padding: 2.2mm 1mm; border-bottom: 1px solid #eef1f4; }
.hb-table small { color: #8a94a3; font-size: 7.5pt; }
.hb-pill { border-radius: 10mm; padding: .6mm 2.4mm; font-size: 8pt; font-weight: 700; }
.hb-track td { height: 8mm; border: 1px solid #d6dbe1; }

.hb-advice { border-inline-start: 1.2mm solid; background: #fafbfc; border-radius: 2mm; padding: 2.6mm 3.5mm; margin-bottom: 3mm; break-inside: avoid; }
.hb-advice-top { display: flex; gap: 2mm; margin-bottom: .8mm; }
.hb-tag { font-size: 7.5pt; font-weight: 700; }
.hb-tag-hot { color: #c0392b; }
.hb-advice-title { font-size: 11pt; font-weight: 800; margin-bottom: 1mm; }
.hb-advice-body { font-size: 9.5pt; line-height: 1.65; }
.hb-because { font-size: 8pt; color: #6b7684; margin-top: 1.2mm; }

.hb-goal { margin-bottom: 4mm; }
.hb-goal-title { display: flex; align-items: center; gap: 2mm; font-size: 10pt; font-weight: 700; margin-bottom: 2mm; }
.hb-goal-n { width: 5.5mm; height: 5.5mm; border-radius: 50%; background: ${BRAND}; color: #fff; display: inline-flex; align-items: center; justify-content: center; font-size: 8pt; flex: none; }
.hb-line { flex: 1; border-bottom: 1px solid #9aa3ae; height: 5mm; }
.hb-weeks { display: flex; gap: 1.3mm; }
.hb-week { flex: 1; text-align: center; }
.hb-week-box { height: 6.5mm; border: 1px solid #b8c0ca; border-radius: 1mm; }
.hb-week small { font-size: 6.5pt; color: #8a94a3; }

.hb-warn { margin: 0; padding-inline-start: 5mm; font-size: 9.3pt; line-height: 1.6; color: #7a271a; }
.hb-note { min-height: 24mm; border: 1px solid #d6dbe1; border-radius: 2mm; padding: 2.5mm; font-size: 9.5pt; line-height: 1.6; white-space: pre-wrap; }
.hb-sign { display: flex; gap: 8mm; margin-top: 5mm; text-align: center; }
.hb-sign > div { flex: 1; }
.hb-sign-line { border-bottom: 1px solid #6b7684; height: 7mm; font-size: 10pt; }
.hb-sign small { font-size: 8pt; color: #6b7684; }
.hb-disclaimer { font-size: 7.5pt; color: #8a94a3; margin-top: 4mm; line-height: 1.5; }

.hb-ruled { border-bottom: 1px solid #dfe3e8; height: 9mm; }
.hb-back { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 4mm; font-size: 10pt; color: #4b5563; }
`;
