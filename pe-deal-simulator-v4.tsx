import React, { useState } from "react";
import {
  Building2, Info, TrendingUp, TrendingDown, Award,
  Lock, RotateCcw, Stamp, Newspaper, FileSearch, Scale, Wrench,
  BarChart2, HandCoins
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
--------------------------------------------------------------- */
const C = {
  paper: "#EDE7D8", ink: "#1C2541", inkSoft: "#3A4566", gold: "#A6763D",
  goldDark: "#7E5A2C", red: "#8C3B2E", green: "#3F6B4F", line: "#C9BFA0",
  cardBg: "#F7F3E8", panel: "#F1ECDD",
};
const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
`;
const fontSerif = "'Source Serif 4', Georgia, serif";
const fontMono = "'IBM Plex Mono', monospace";
const fontSans = "'Inter', system-ui, sans-serif";

/* ---------------------------------------------------------------
   GLOSSARY
--------------------------------------------------------------- */
const GLOSSARY = {
  EV: "Enterprise Value — the total value of the business (equity + debt − cash).",
  EBITDA: "Earnings Before Interest, Tax, Depreciation & Amortisation — the core profit measure used to price a deal.",
  Multiple: "The number you multiply EBITDA by to get EV. Paying a higher multiple means paying more for the same profit.",
  Leverage: "How much of the purchase is funded with debt vs your equity. More debt = smaller equity cheque, wider swings either way.",
  MOIC: "Multiple on Invested Capital — how many times your invested capital you got back.",
  IRR: "Internal Rate of Return — your annualised return, accounting for how long the money was tied up.",
  Comps: "Comparable transactions — recent deals for similar businesses, used as a reference point for what this one might be worth.",
  Covenant: "A condition in the loan agreement — here, a ceiling on Net Debt/EBITDA. Breach it and you owe the lender an equity cure or a waiver.",
  "Rollover equity": "Management reinvest part of their sale proceeds into the new equity structure, so they're incentivised alongside you.",
  "W&I insurance": "Warranty & Indemnity — protects against breaches of seller warranties post-completion. Here modelled as a holdback that's released, or claimed against, at exit.",
  "Dividend recap": "Refinancing the company mid-hold to raise fresh debt against its (by-now lower) leverage and paying the proceeds out as a dividend to the sponsor.",
  "Cash sweep": "Using spare cash flow, after interest and mandatory repayments, to pay down acquisition debt early.",
  "Add-back": "A cost stripped out of reported EBITDA because it's considered one-off or non-recurring — inflates EBITDA if not scrutinised.",
};
function Term({ word, children }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative" }}>
      <span onClick={() => setOpen(!open)} style={{ borderBottom: `1px dotted ${C.gold}`, cursor: "pointer", color: C.goldDark, fontWeight: 600 }}>
        {children}
      </span>
      {open && (
        <span style={{ position: "absolute", zIndex: 50, left: 0, top: "1.4em", width: 230, background: C.ink, color: C.paper, fontFamily: fontSans, fontSize: 12.5, lineHeight: 1.4, padding: "8px 10px", borderRadius: 6, boxShadow: "0 6px 16px rgba(0,0,0,0.35)" }}>
          {GLOSSARY[word]}
        </span>
      )}
    </span>
  );
}
function Expand({ label = "Why this matters", children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 8 }}>
      <button onClick={() => setOpen(!open)} style={{ fontSize: 12.5, color: C.goldDark, background: "none", border: "none", padding: 0, display: "flex", alignItems: "center", gap: 4, fontFamily: fontSans, cursor: "pointer" }}>
        <Info size={13} /> {open ? "Hide detail" : label}
      </button>
      {open && <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 6, lineHeight: 1.55, background: C.panel, padding: "9px 11px", borderRadius: 6 }}>{children}</div>}
    </div>
  );
}

/* ---------------------------------------------------------------
   COMPANY & ECONOMICS DATA
--------------------------------------------------------------- */
const COMPANY = {
  name: "Meridian Testing Group",
  sector: "Business Services — Compliance Testing",
  teaser: "A specialist provider of compliance and safety testing to mid-market manufacturers. Founder (60) wants a full exit ahead of retirement. Sticky, contracted revenue; the business has never been professionalised beyond the founder's personal network.",
  revenue: 28.0, reportedEbitda: 6.0, trueEbitda: 5.65, marketMultiple: 8.0,
  comps: [6.5, 7.8, 8.4, 9.0],
};

const DD_BUDGET = 150;
const DD_WORKSTREAMS = [
  { key: "financial", label: "Financial DD", icon: FileSearch, cost: 60, summary: "Quality of earnings, working capital, forecast integrity.",
    findings: ["Reported EBITDA of £6.0m includes ~£350k of one-off items (office relocation, an insurance claim). True run-rate EBITDA looks closer to £5.65m.",
      "Cash conversion is strong at ~90% of EBITDA — a good sign for how fast acquisition debt could be repaid."] },
  { key: "commercial", label: "Commercial DD", icon: BarChart2, cost: 50, summary: "Market position, customer base, growth durability.",
    findings: ["The top 3 customers make up 55% of revenue. One contract worth 18% of revenue is up for renewal in ~14 months, with no long-term agreement signed.",
      "The core market is growing 4–5% a year with no major disruptive entrants identified — supports a base-case growth assumption rather than an aggressive one."] },
  { key: "legal", label: "Legal DD", icon: Scale, cost: 25, summary: "Contracts, litigation exposure, regulatory compliance.",
    findings: ["A historic data-handling compliance gap was identified. Remediating it now, before completion, would cost an estimated £200k."] },
  { key: "operational", label: "Operational DD", icon: Wrench, cost: 25, summary: "Systems, people, cost base.",
    findings: ["Lab scheduling inefficiencies are inflating overtime costs by an estimated £150k a year — a clear, quick cost-out opportunity post-completion."] },
];

const FUND_TARGET = { moic: 2.5, irr: 0.20 };
const LEVEL_THRESHOLDS = [
  { name: "Analyst", xp: 0 }, { name: "Associate", xp: 25 }, { name: "VP", xp: 55 },
  { name: "Principal", xp: 90 }, { name: "Partner", xp: 130 },
];
function levelFor(xp) {
  let current = LEVEL_THRESHOLDS[0];
  for (const l of LEVEL_THRESHOLDS) if (xp >= l.xp) current = l;
  return { current, next: LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.indexOf(current) + 1] };
}

const GROWTH_OPTIONS = [
  { key: "low", label: "Low case — 2.0%/yr", value: 0.02 },
  { key: "base", label: "Base case — 4.5%/yr", value: 0.045 },
  { key: "high", label: "High case — 7.0%/yr", value: 0.07 },
];

// Interest priced by risk; mandatory amort is a fixed % of the ORIGINAL loan each year (like a real TLA);
// sweepPct is the share of positive free cash flow swept into extra voluntary repayment.
const LEVERAGE_OPTIONS = [
  { key: "low", label: "Low leverage (2.5x Debt/EBITDA)", debtMultiple: 2.5, interestRate: 0.075, mandatoryAmortRate: 0.05, sweepPct: 0.70 },
  { key: "medium", label: "Medium leverage (4.0x Debt/EBITDA)", debtMultiple: 4.0, interestRate: 0.090, mandatoryAmortRate: 0.05, sweepPct: 0.60 },
  { key: "high", label: "High leverage (5.5x Debt/EBITDA)", debtMultiple: 5.5, interestRate: 0.105, mandatoryAmortRate: 0.05, sweepPct: 0.50 },
];

const TRANSACTION_COST_RATE = 0.03; // legal + advisory fees on entry, % of EV
const EXIT_FEE_RATE = 0.02;         // advisory fees on exit, % of exit EV
const MGMT_ROLLOVER_RATE = 0.10;    // management's pro-rata equity share if they roll over
const WI_HOLDBACK_RATE = 0.05;      // % of sponsor proceeds held back for warranty claims
const WI_CLAIM_CHANCE = 0.15;       // chance a warranty claim actually eats the holdback

const FOCUS_OPTIONS = [
  { key: "growth", label: "Push commercial growth", growthAdj: 0.015, cashAdj: -0.04 },
  { key: "cost", label: "Cost & efficiency focus", growthAdj: 0, cashAdj: 0.05 },
  { key: "steady", label: "Steady state — no major change", growthAdj: 0, cashAdj: 0 },
];

const EXIT_ROUTES = [
  { key: "trade", label: "Trade sale to a strategic buyer", multipleAdj: -0.3, variance: 0.05 },
  { key: "secondary", label: "Secondary buyout to another PE fund", multipleAdj: 0.2, variance: 0.10 },
  { key: "ipo", label: "IPO", multipleAdj: 0.9, variance: 0.22 },
];

const PREP_OPTIONS = [
  { key: "dataroom", label: "Clean and organise the data room", cost: 30, bump: 0.2 },
  { key: "management", label: "Prepare management for buyer meetings", cost: 20, bump: 0.15 },
  { key: "narrative", label: "Build out the growth narrative", cost: 0, bump: 0.1 },
  { key: "rush", label: "Rush it — go to market as-is", cost: 0, bump: -0.3 },
];

/* ---------------------------------------------------------------
   HELPERS
--------------------------------------------------------------- */
const fmtM = (n) => `£${n.toFixed(2)}m`;
const fmtX = (n) => `${n.toFixed(2)}x`;
const fmtPct = (n) => `${(n * 100).toFixed(1)}%`;
const rand = () => Math.random();

/* ---------------------------------------------------------------
   UI ATOMS
--------------------------------------------------------------- */
function Card({ children, style }) {
  return <div style={{ background: C.cardBg, border: `1px solid ${C.line}`, borderRadius: 8, padding: 16, boxShadow: "0 1px 3px rgba(28,37,65,0.08)", ...style }}>{children}</div>;
}
function OptionButton({ selected, onClick, title, sub, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", textAlign: "left", padding: "10px 12px", marginBottom: 8, borderRadius: 6,
      border: `1.5px solid ${selected ? C.gold : C.line}`,
      background: selected ? "#F1E4CC" : disabled ? "#EDE9DC" : "#FBF8F1", fontFamily: fontSans, opacity: disabled ? 0.5 : 1,
    }}>
      <div style={{ fontWeight: 600, color: C.ink, fontSize: 14.5 }}>{title}</div>
      {sub && <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{sub}</div>}
    </button>
  );
}
function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "12px 16px", borderRadius: 6, border: "none",
      background: disabled ? "#B8AF98" : C.ink, color: C.paper, fontFamily: fontSans,
      fontWeight: 600, fontSize: 14.5, letterSpacing: 0.3, opacity: disabled ? 0.6 : 1,
    }}>{children}</button>
  );
}
function SectionLabel({ step, total, title }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {step && <div style={{ fontFamily: fontMono, fontSize: 11, color: C.gold, letterSpacing: 1 }}>STEP {step} OF {total}</div>}
      <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 19 }}>{title}</div>
    </div>
  );
}
function NewsCard({ headline, body }) {
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 6, padding: 12, background: "#FBF8F1", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <Newspaper size={14} color={C.goldDark} />
        <span style={{ fontFamily: fontMono, fontSize: 10.5, color: C.goldDark, letterSpacing: 1 }}>MARKET UPDATE</span>
      </div>
      <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>{headline}</div>
      <div style={{ fontSize: 13.5, color: C.inkSoft, lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}
function BigStat({ label, value, good }) {
  return (
    <div style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 6, background: good ? "#E7EFE9" : "#F3E4E0", border: `1px solid ${good ? C.green : C.red}` }}>
      <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkSoft }}>{label}</div>
      <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 22, color: good ? C.green : C.red }}>{value}</div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>{good ? <TrendingUp size={14} color={C.green} /> : <TrendingDown size={14} color={C.red} />}</div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN APP
--------------------------------------------------------------- */
export default function PEDealSimulator() {
  const [phase, setPhase] = useState("intro");
  const [xpHistory, setXpHistory] = useState([]);
  const totalXP = xpHistory.reduce((s, x) => s + x, 0);
  const { current: levelInfo, next: nextLevel } = levelFor(totalXP);

  const [ddSelected, setDdSelected] = useState([]);
  const ddSpend = ddSelected.reduce((s, k) => s + DD_WORKSTREAMS.find((w) => w.key === k).cost, 0);
  const has = (k) => ddSelected.includes(k);

  const [ebitdaBasis, setEbitdaBasis] = useState(null);
  const [chosenMultiple, setChosenMultiple] = useState(null);
  const [growthKey, setGrowthKey] = useState(null);
  const [offerMultiple, setOfferMultiple] = useState(null);

  const [leverageKey, setLeverageKey] = useState(null);
  const [mgmtRollover, setMgmtRollover] = useState(null); // true | false | null
  const [econ, setEcon] = useState(null);
  const [icCondition, setIcCondition] = useState(null); // null | { key, text }
  const [icSubmitted, setIcSubmitted] = useState(false);

  const [year, setYear] = useState(1);
  const [ebitdaCurrent, setEbitdaCurrent] = useState(0);
  const [debtBalance, setDebtBalance] = useState(0);
  const [additionalEquity, setAdditionalEquity] = useState(0);
  const [distributions, setDistributions] = useState(0);
  const [dividendRecapTaken, setDividendRecapTaken] = useState(false);
  const [covenantBreachCount, setCovenantBreachCount] = useState(0);
  const [macroDrift, setMacroDrift] = useState(0);
  const [journal, setJournal] = useState([]);
  const [focusKey, setFocusKey] = useState(null);
  const [pendingEvent, setPendingEvent] = useState(null);
  const [yearOutcome, setYearOutcome] = useState(null);
  const [genericEventPool, setGenericEventPool] = useState(["competitor", "macro", "boltOn", "poach"]);
  const [boltOnBump, setBoltOnBump] = useState(0);

  const [prepKey, setPrepKey] = useState(null);
  const [exitRouteKey, setExitRouteKey] = useState(null);
  const [exitResult, setExitResult] = useState(null);

  function log(line) { setJournal((j) => [...j, line]); }

  function toggleDd(key) {
    const item = DD_WORKSTREAMS.find((w) => w.key === key);
    setDdSelected((sel) => {
      if (sel.includes(key)) return sel.filter((k) => k !== key);
      if (ddSpend + item.cost > DD_BUDGET) return sel;
      return [...sel, key];
    });
  }

  function submitOffer() {
    setOfferMultiple(chosenMultiple);
    if (chosenMultiple < 7.0) setPhase("counter");
    else acceptDeal(chosenMultiple);
  }
  function acceptDeal(finalMultiple) {
    const basis = ebitdaBasis === "adjusted" ? COMPANY.trueEbitda : COMPANY.reportedEbitda;
    setOfferMultiple(finalMultiple);
    log(`Offer accepted at ${fmtX(finalMultiple)} on ${ebitdaBasis === "adjusted" ? "adjusted" : "reported"} EBITDA of ${fmtM(basis)}.`);
    setPhase("ic");
  }
  function walkAway() { setPhase("lost"); }

  function getIcCondition() {
    if (!has("financial")) return { key: "reserve", text: "Unverified earnings quality — IC requires a 10% of EV price-adjustment reserve added to your equity funding." };
    if (!has("legal")) return { key: "wi", text: "Unresolved legal exposure — IC requires an enhanced 10% W&I holdback at exit (vs the standard 5%)." };
    if (!has("commercial")) return { key: "leverage", text: "Unverified customer concentration risk — IC caps leverage at Medium." };
    return null;
  }
  function submitToIc() {
    const condition = getIcCondition();
    setIcCondition(condition);
    setIcSubmitted(true);
    log(condition ? `IC approved subject to a condition: ${condition.text}` : "IC approved without conditions — strong diligence coverage.");
  }

  function lockStructure() {
    const basis = ebitdaBasis === "adjusted" ? COMPANY.trueEbitda : COMPANY.reportedEbitda;
    const entryEV = basis * offerMultiple;
    const lev = LEVERAGE_OPTIONS.find((l) => l.key === leverageKey);
    const entryDebt = basis * lev.debtMultiple;
    const fullEntryEquity = entryEV - entryDebt;
    const transactionCosts = entryEV * TRANSACTION_COST_RATE;
    const icReserve = icCondition && icCondition.key === "reserve" ? entryEV * 0.10 : 0;
    const mgmtShare = mgmtRollover ? fullEntryEquity * MGMT_ROLLOVER_RATE : 0;
    const sponsorEntryEquity = fullEntryEquity - mgmtShare + transactionCosts + icReserve;
    const growth = GROWTH_OPTIONS.find((g) => g.key === growthKey).value - (mgmtRollover ? 0 : 0.005);

    setEcon({ entryEbitda: basis, entryEV, entryDebt, fullEntryEquity, sponsorEntryEquity, transactionCosts, icReserve, mgmtRollover, growth, leverage: lev });
    setEbitdaCurrent(basis);
    setDebtBalance(entryDebt);
    log(`Structured with ${lev.label.toLowerCase()} at ${fmtPct(lev.interestRate)} cash interest. ${mgmtRollover ? "Management rolled 10% of equity forward — better alignment, smaller cheque." : "Management fully cashed out — you carry all execution risk alone."} Sponsor equity: ${fmtM(sponsorEntryEquity)}${icReserve > 0 ? ` (incl. ${fmtM(icReserve)} IC reserve)` : ""}.`);
    setYear(1);
    setPhase("year");
    prepareYearEvent(1);
  }

  function prepareYearEvent(yr) {
    if (yr === 1) {
      if (!has("financial")) {
        setPendingEvent({ headline: "One-off costs don't recur",
          body: "The relocation and insurance-claim costs that flattered last year's reported EBITDA won't recur. Underlying run-rate EBITDA normalises down by £350k this year — this is exactly what financial DD would have caught before you signed.",
          autoApply: () => ({ levelShock: -0.35 }) });
      } else setPendingEvent(genericEvent());
      return;
    }
    if (yr === 2) {
      if (has("commercial")) {
        setPendingEvent({ headline: "Contract renewal — customer at risk",
          body: "The customer representing 18% of revenue, flagged in commercial DD, is up for renewal. You've had time to prepare for this.",
          options: [
            { label: "Invest £100k in the relationship now", apply: () => ({ cashCost: 100, lossChance: 0.15 }) },
            { label: "Let the commercial team handle it as usual", apply: () => ({ cashCost: 0, lossChance: 0.45 }) },
          ] });
      } else {
        setPendingEvent({ headline: "Customer contract lapses without warning",
          body: "A contract worth a meaningful share of revenue wasn't renewed — nobody was tracking the renewal date. This is the kind of risk commercial DD exists to surface before you buy, not after.",
          autoApply: () => ({ surpriseLossChance: 0.45 }) });
      }
      return;
    }
    if (yr === 3) {
      if (has("legal")) {
        setPendingEvent({ headline: "No legal issues surface this year",
          body: "The compliance gap flagged in legal DD was remediated before completion for £200k. Nothing further to report — money well spent.",
          autoApply: () => ({}) });
      } else {
        setPendingEvent({ headline: "Regulatory compliance issue surfaces",
          body: "A historic data-handling gap — the same one legal DD would have found — has been flagged by a regulator. Remediation now costs £400k, roughly double what it would have cost pre-completion, plus management distraction this year.",
          autoApply: () => ({ cashCost: 400, growthAdj: -0.01 }) });
      }
      return;
    }
    setPendingEvent(genericEvent());
  }

  function genericEvent() {
    const pool = genericEventPool.length > 0 ? genericEventPool : ["competitor", "macro", "boltOn", "poach"];
    const idx = Math.floor(rand() * pool.length);
    const key = pool[idx];
    const remaining = pool.filter((_, i) => i !== idx);
    setGenericEventPool(remaining.length ? remaining : ["competitor", "macro", "boltOn", "poach"]);

    if (key === "competitor") return { headline: "A new competitor enters the market",
      body: "A well-funded entrant is targeting your customer base with aggressive pricing.",
      options: [
        { label: "Invest £150k to defend market position", apply: () => ({ cashCost: 150, growthAdj: 0.015 }) },
        { label: "Hold steady and monitor", apply: () => ({ cashCost: 0, growthAdj: -0.01 }) },
      ] };
    if (key === "macro") return { headline: "Macro slowdown softens demand",
      body: "A broader economic slowdown is denting client budgets across the sector.",
      options: [
        { label: "Cut costs to protect margin", apply: () => ({ cashAdj: 0.05, growthAdj: 0, macro: true }) },
        { label: "Keep investing through the cycle", apply: () => ({ cashAdj: 0, growthAdj: -0.01, macro: true }) },
      ] };
    if (key === "boltOn") return { headline: "A bolt-on acquisition becomes available",
      body: "A smaller competitor is open to being acquired and folded into the platform. This needs fresh equity, not operating cash flow.",
      options: [
        { label: "Pursue it (£500k fresh equity injection)", apply: () => ({ equityInjection: 500, levelShockUp: 0.4, exitMultipleBump: 0.15 }) },
        { label: "Pass for now", apply: () => ({}) },
      ] };
    return { headline: "A senior manager is approached by a competitor",
      body: "One of your key operational leaders has been offered a role elsewhere.",
      options: [
        { label: "Counter-offer to retain them (£50k)", apply: () => ({ cashCost: 50, growthAdj: 0 }) },
        { label: "Let them go", apply: () => ({ cashCost: 0, growthAdj: -0.01 }) },
      ] };
  }

  function resolveEvent(effectsFromChoice) {
    let effects = { ...(effectsFromChoice || {}) };
    if (pendingEvent.autoApply) effects = { ...effects, ...pendingEvent.autoApply() };
    if (effects.lossChance !== undefined) {
      const lost = rand() < effects.lossChance;
      effects.eventOutcomeNote = lost ? "Despite the effort, the customer still left. EBITDA takes a one-off hit this year." : "The relationship held — the contract renewed.";
      effects.levelShockPct = lost ? -0.10 : 0;
    }
    if (effects.surpriseLossChance !== undefined) {
      const lost = rand() < effects.surpriseLossChance;
      effects.eventOutcomeNote = lost ? "The customer has now formally left." : "The customer stayed, but only by luck.";
      effects.levelShockPct = lost ? -0.10 : 0;
    }
    if (effects.macro) setMacroDrift((d) => d - 0.15);
    finishYear(effects);
  }

  function finishYear(effects) {
    const focus = FOCUS_OPTIONS.find((f) => f.key === focusKey) || FOCUS_OPTIONS[2];
    let ebitda = ebitdaCurrent;
    if (effects.levelShock) ebitda += effects.levelShock;
    if (effects.levelShockUp) ebitda += effects.levelShockUp;
    if (effects.levelShockPct) ebitda *= 1 + effects.levelShockPct;

    const noise = (rand() * 2 - 1) * 0.01;
    const growthRate = econ.growth + focus.growthAdj + (effects.growthAdj || 0) + noise;
    const newEbitda = Math.max(0.1, ebitda * (1 + growthRate));

    const cashConversion = 0.85 + focus.cashAdj + (effects.cashAdj || 0) + (has("financial") ? 0.05 : 0);
    const interest = debtBalance * econ.leverage.interestRate;
    const cashCosts = (effects.cashCost || 0) / 1000;
    const fcf = newEbitda * cashConversion - interest - cashCosts;

    const mandatoryAmort = Math.min(debtBalance, econ.entryDebt * econ.leverage.mandatoryAmortRate);
    const debtAfterMandatory = debtBalance - mandatoryAmort;
    const sweepAmount = Math.max(0, fcf) * econ.leverage.sweepPct;
    let newDebt = Math.max(0, debtAfterMandatory - sweepAmount);

    if (effects.equityInjection) setAdditionalEquity((a) => a + effects.equityInjection / 1000);
    if (effects.exitMultipleBump) setBoltOnBump((b) => b + effects.exitMultipleBump);

    const covenantCeiling = econ.leverage.debtMultiple + 1.0;
    let covenantNote = null;
    if (newDebt / newEbitda > covenantCeiling) {
      const cure = newDebt - covenantCeiling * newEbitda;
      newDebt -= cure;
      setAdditionalEquity((a) => a + cure);
      setCovenantBreachCount((c) => c + 1);
      covenantNote = `Leverage covenant breached — an equity cure of ${fmtM(cure)} was required to stay within terms.`;
    }

    const outcome = {
      headline: pendingEvent.headline, note: effects.eventOutcomeNote || null, covenantNote,
      ebitdaBefore: ebitdaCurrent, ebitdaAfter: newEbitda, growthRate, fcf,
      debtBefore: debtBalance, debtAfter: newDebt,
    };

    log(`Year ${year}: ${pendingEvent.headline}. EBITDA ${fmtM(ebitdaCurrent)} → ${fmtM(newEbitda)} (${fmtPct(growthRate)} growth). Debt ${fmtM(debtBalance)} → ${fmtM(newDebt)}.${covenantNote ? " " + covenantNote : ""}`);

    setEbitdaCurrent(newEbitda);
    setDebtBalance(newDebt);
    setYearOutcome(outcome);
    setPendingEvent(null);
    setPhase("yearEnd");
  }

  function continueToNextYear() {
    const nextYr = year + 1;
    if (nextYr > 7) { setPhase("exitPrep"); return; }
    setYear(nextYr); setFocusKey(null); setPhase("year"); prepareYearEvent(nextYr);
  }

  function takeDividendRecap() {
    const targetDebt = ebitdaCurrent * econ.leverage.debtMultiple;
    const recapGross = Math.max(0, targetDebt - debtBalance);
    if (recapGross <= 0) return;
    const refiFee = recapGross * 0.02;
    const recapNet = recapGross - refiFee;
    setDebtBalance(targetDebt);
    setDistributions((d) => d + recapNet);
    setDividendRecapTaken(true);
    log(`Year ${year}: refinanced back to ${fmtX(econ.leverage.debtMultiple)} leverage and distributed ${fmtM(recapNet)} to the sponsor ahead of exit.`);
  }

  function runExit() {
    const prep = PREP_OPTIONS.find((p) => p.key === prepKey);
    const route = EXIT_ROUTES.find((r) => r.key === exitRouteKey);
    const variance = (rand() * 2 - 1) * route.variance;
    let exitMultiple = COMPANY.marketMultiple + macroDrift + route.multipleAdj + prep.bump + boltOnBump + variance;
    exitMultiple = Math.max(3, exitMultiple);
    const exitEV = ebitdaCurrent * exitMultiple;
    const fullExitEquity = Math.max(0, exitEV - debtBalance);
    const exitFee = exitEV * EXIT_FEE_RATE;
    const mgmtExitShare = econ.mgmtRollover ? fullExitEquity * MGMT_ROLLOVER_RATE : 0;
    const sponsorGross = Math.max(0, fullExitEquity - mgmtExitShare - exitFee);
    const wiRate = icCondition && icCondition.key === "wi" ? 0.10 : WI_HOLDBACK_RATE;
    const wiHoldback = sponsorGross * wiRate;
    const claim = rand() < WI_CLAIM_CHANCE;
    const sponsorNet = claim ? sponsorGross - wiHoldback : sponsorGross;

    const totalProceeds = sponsorNet + distributions;
    const totalInvested = econ.sponsorEntryEquity + additionalEquity;
    const moic = totalProceeds / totalInvested;
    const irr = Math.pow(Math.max(moic, 0.0001), 1 / year) - 1;
    const beatMoic = moic >= FUND_TARGET.moic;
    const beatIrr = irr >= FUND_TARGET.irr;

    let xp = 10;
    xp += Math.round((moic - FUND_TARGET.moic) * 10);
    xp += Math.round((irr - FUND_TARGET.irr) * 40);
    xp += ddSelected.length * 3;
    xp = Math.max(3, xp);
    setXpHistory((h) => [...h, xp]);

    const badges = [];
    if (moic >= 3) badges.push("3x Club");
    if (ddSelected.length === 3) badges.push("Thorough Diligence");
    if (leverageKey === "high" && beatMoic) badges.push("Nerves of Steel");
    if (offerMultiple < 7.0) badges.push("Disciplined Buyer");
    if (distributions > 0 && beatMoic) badges.push("Recap Play");
    if (covenantBreachCount > 0 && beatMoic) badges.push("Weathered the Storm");

    setExitResult({ exitMultiple, exitEV, fullExitEquity, exitFee, mgmtExitShare, wiHoldback, claim, sponsorNet, totalProceeds, totalInvested, moic, irr, beatMoic, beatIrr, xp, badges, holdYears: year });
    log(`Exit via ${route.label} at ${fmtX(exitMultiple)}. ${claim ? "A warranty claim consumed the W&I holdback." : "W&I holdback released in full — no claims."} MOIC ${fmtX(moic)}, IRR ${fmtPct(irr)}.`);
    setPhase("debrief");
  }

  function restart() {
    setPhase("intro");
    setDdSelected([]); setEbitdaBasis(null); setChosenMultiple(null); setGrowthKey(null);
    setOfferMultiple(null); setLeverageKey(null); setMgmtRollover(null); setEcon(null);
    setIcCondition(null); setIcSubmitted(false);
    setYear(1); setEbitdaCurrent(0); setDebtBalance(0); setAdditionalEquity(0); setDistributions(0);
    setDividendRecapTaken(false); setCovenantBreachCount(0); setMacroDrift(0); setJournal([]);
    setFocusKey(null); setPendingEvent(null); setYearOutcome(null);
    setGenericEventPool(["competitor", "macro", "boltOn", "poach"]); setBoltOnBump(0);
    setPrepKey(null); setExitRouteKey(null); setExitResult(null);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.paper, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(28,37,65,0.05) 1px, transparent 0)", backgroundSize: "18px 18px", fontFamily: fontSans, color: C.ink, padding: "20px 14px 60px" }}>
      <style>{FONT_IMPORT}</style>
      <div style={{ maxWidth: 480, margin: "0 auto 16px" }}>
        <div style={{ fontFamily: fontMono, fontSize: 11, color: C.gold, letterSpacing: 1.5, fontWeight: 600, marginBottom: 4 }}>
          PE DEAL SIMULATOR
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 20 }}>IC Memorandum</div>
          <div style={{ fontFamily: fontMono, fontSize: 11, color: C.inkSoft }}>CONFIDENTIAL</div>
        </div>
        <div style={{ height: 1, background: C.line, margin: "8px 0 10px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: fontMono, fontSize: 12 }}>
          <span>Level: <b>{levelInfo.name}</b></span>
          <span>XP: {totalXP}{nextLevel ? ` / ${nextLevel.xp}` : ""}</span>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto" }}>

        {phase === "intro" && (
          <Card>
            <div style={{ fontFamily: fontSerif, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Source it. Buy it. Run it. Sell it.</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: C.inkSoft, marginBottom: 12 }}>
              One company, the full lifecycle: due diligence, a <Term word="Comps">comps</Term>-based valuation, an
              offer and negotiation, leverage and management incentives, year-by-year ownership with real news
              events, and an exit with warranty risk and fees like a real deal has.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: C.inkSoft, marginBottom: 14 }}>
              Fund target: <b>{fmtX(FUND_TARGET.moic)} MOIC</b> / <b>{fmtPct(FUND_TARGET.irr)} IRR</b>.
            </p>
            <PrimaryButton onClick={() => setPhase("teaser")}>Open the deal</PrimaryButton>
          </Card>
        )}

        {phase === "teaser" && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={18} color={C.paper} />
              </div>
              <div>
                <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 18 }}>{COMPANY.name}</div>
                <div style={{ fontFamily: fontMono, fontSize: 11.5, color: C.inkSoft }}>{COMPANY.sector}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{COMPANY.teaser}</p>
            <div style={{ fontFamily: fontMono, fontSize: 13, lineHeight: 2 }}>
              <div>Revenue: <b>{fmtM(COMPANY.revenue)}</b></div>
              <div>Reported <Term word="EBITDA">EBITDA</Term>: <b>{fmtM(COMPANY.reportedEbitda)}</b></div>
            </div>
            <Expand label="What happens next?">
              You've got a fixed £{DD_BUDGET}k due diligence budget. It won't stretch to everything — and how
              much you cover will affect how much leverage the deal can carry.
            </Expand>
            <div style={{ marginTop: 14 }}><PrimaryButton onClick={() => setPhase("dd")}>Begin due diligence</PrimaryButton></div>
          </Card>
        )}

        {phase === "dd" && (
          <Card>
            <SectionLabel step={1} total={5} title="Due diligence" />
            <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 8 }}>
              Budget: <b>£{DD_BUDGET}k</b> total. Spent so far: <b>£{ddSpend}k</b>.
            </p>
            {DD_WORKSTREAMS.map((w) => {
              const Icon = w.icon; const selected = has(w.key);
              const disabled = !selected && ddSpend + w.cost > DD_BUDGET;
              return (
                <div key={w.key} style={{ marginBottom: 10 }}>
                  <button onClick={() => toggleDd(w.key)} disabled={disabled} style={{
                    width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 6,
                    border: `1.5px solid ${selected ? C.gold : C.line}`,
                    background: selected ? "#F1E4CC" : disabled ? "#EDE9DC" : "#FBF8F1", fontFamily: fontSans, opacity: disabled ? 0.5 : 1,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, fontSize: 14.5 }}><Icon size={14} color={C.goldDark} /> {w.label}</div>
                      <div style={{ fontFamily: fontMono, fontSize: 12.5 }}>£{w.cost}k</div>
                    </div>
                    <div style={{ fontSize: 12.5, color: C.inkSoft, marginTop: 2 }}>{w.summary}</div>
                  </button>
                  {selected && (
                    <div style={{ background: C.panel, borderRadius: 6, padding: "8px 11px", marginTop: 4, fontSize: 13, lineHeight: 1.5 }}>
                      {w.findings.map((f, i) => <div key={i} style={{ marginBottom: i < w.findings.length - 1 ? 6 : 0 }}>• {f}</div>)}
                    </div>
                  )}
                </div>
              );
            })}
            <Expand label="Why coverage matters later">
              Diligence coverage isn't just about what you learn now — the investment committee will size how
              much leverage they're comfortable underwriting based on how much of the business you actually checked.
            </Expand>
            <div style={{ marginTop: 10 }}><PrimaryButton onClick={() => setPhase("valuation")}>Proceed to valuation</PrimaryButton></div>
          </Card>
        )}

        {phase === "valuation" && (
          <Card>
            <SectionLabel step={2} total={5} title="Valuation" />
            <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 8 }}>Recent comparable deals in this sector traded at:</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {COMPANY.comps.map((m, i) => <div key={i} style={{ flex: 1, textAlign: "center", padding: "8px 0", background: C.panel, borderRadius: 6, fontFamily: fontMono, fontWeight: 600 }}>{fmtX(m)}</div>)}
            </div>
            <Expand label="How to use comps">
              The median here is around 8.1x. Push above it for reasons you found (clean earnings, durable
              growth); discount below it for risks you found or didn't get to check.
            </Expand>
            {has("financial") ? (
              <>
                <p style={{ fontSize: 13.5, marginTop: 14, marginBottom: 6 }}>Which EBITDA should the valuation use?</p>
                <OptionButton selected={ebitdaBasis === "reported"} onClick={() => setEbitdaBasis("reported")} title={`Reported — ${fmtM(COMPANY.reportedEbitda)}`} sub="Includes the one-off items financial DD flagged." />
                <OptionButton selected={ebitdaBasis === "adjusted"} onClick={() => setEbitdaBasis("adjusted")} title={`Adjusted — ${fmtM(COMPANY.trueEbitda)}`} sub="Strips out the one-off items — the true run-rate." />
              </>
            ) : (
              <div style={{ marginTop: 14, fontSize: 13.5, color: C.inkSoft }}>You skipped financial DD, so only the reported figure of {fmtM(COMPANY.reportedEbitda)} is visible to you.</div>
            )}
            <p style={{ fontSize: 13.5, marginTop: 14, marginBottom: 6 }}>Entry <Term word="Multiple">multiple</Term></p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
              {[6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((m) => (
                <button key={m} onClick={() => setChosenMultiple(m)} style={{ padding: "8px 12px", borderRadius: 6, fontFamily: fontMono, fontWeight: 600, border: `1.5px solid ${chosenMultiple === m ? C.gold : C.line}`, background: chosenMultiple === m ? "#F1E4CC" : "#FBF8F1" }}>{fmtX(m)}</button>
              ))}
            </div>
            <p style={{ fontSize: 13.5, marginTop: 16, marginBottom: 6 }}>Growth assumption for your model</p>
            {GROWTH_OPTIONS.map((g) => (
              <OptionButton key={g.key} selected={growthKey === g.key} onClick={() => setGrowthKey(g.key)} title={g.label} sub={g.key === "high" && !has("commercial") ? "Aggressive without commercial DD to support it." : undefined} />
            ))}
            <div style={{ marginTop: 10 }}>
              <PrimaryButton disabled={!chosenMultiple || !growthKey || (has("financial") && !ebitdaBasis)} onClick={() => { if (!has("financial")) setEbitdaBasis("reported"); setPhase("offer"); }}>
                Prepare offer
              </PrimaryButton>
            </div>
          </Card>
        )}

        {phase === "offer" && (
          <Card>
            <SectionLabel step={3} total={5} title="Offer" />
            <div style={{ fontFamily: fontMono, fontSize: 13, lineHeight: 2, marginBottom: 12 }}>
              <div>EBITDA basis: <b>{fmtM(ebitdaBasis === "adjusted" ? COMPANY.trueEbitda : COMPANY.reportedEbitda)}</b></div>
              <div>Multiple: <b>{fmtX(chosenMultiple)}</b></div>
              <div>Implied <Term word="EV">EV</Term>: <b>{fmtM((ebitdaBasis === "adjusted" ? COMPANY.trueEbitda : COMPANY.reportedEbitda) * chosenMultiple)}</b></div>
            </div>
            <PrimaryButton onClick={submitOffer}>Submit offer to the seller</PrimaryButton>
          </Card>
        )}

        {phase === "counter" && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><HandCoins size={18} color={C.gold} /><div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 18 }}>Seller counters</div></div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: C.inkSoft, marginBottom: 14 }}>
              Your bid at {fmtX(chosenMultiple)} came in below what the seller will accept given comps. They've countered at <b>{fmtX(7.3)}</b>. Accept, or walk away and preserve capital.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <PrimaryButton onClick={() => acceptDeal(7.3)}>Accept the counter at 7.3x</PrimaryButton>
              <button onClick={walkAway} style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: `1.5px solid ${C.line}`, background: "#FBF8F1", fontFamily: fontSans, fontWeight: 600, fontSize: 14.5 }}>Walk away</button>
            </div>
          </Card>
        )}

        {phase === "lost" && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Lock size={18} color={C.red} /><div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 18, color: C.red }}>Deal lost</div></div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: C.inkSoft, marginBottom: 14 }}>You walked away rather than meet the seller's price. No capital deployed, no return.</p>
            <PrimaryButton onClick={restart}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><RotateCcw size={15} /> Try a different approach</span></PrimaryButton>
          </Card>
        )}

        {phase === "ic" && (
          <Card>
            <SectionLabel title="Investment committee review" />
            <div style={{ background: C.panel, borderRadius: 6, padding: "10px 12px", marginBottom: 12, fontSize: 13.5, lineHeight: 1.7 }}>
              <div><b>Target:</b> {COMPANY.name}</div>
              <div><b>Proposed terms:</b> {fmtX(offerMultiple)} on {ebitdaBasis === "adjusted" ? "adjusted" : "reported"} EBITDA of {fmtM(ebitdaBasis === "adjusted" ? COMPANY.trueEbitda : COMPANY.reportedEbitda)}</div>
              <div><b>Growth case:</b> {GROWTH_OPTIONS.find((g) => g.key === growthKey)?.label}</div>
              <div style={{ marginTop: 6 }}><b>Diligence coverage:</b></div>
              {DD_WORKSTREAMS.map((w) => (
                <div key={w.key}>{has(w.key) ? "✓" : "—"} {w.label}{!has(w.key) ? " (not verified)" : ""}</div>
              ))}
            </div>
            {!icSubmitted ? (
              <PrimaryButton onClick={submitToIc}>Submit to IC</PrimaryButton>
            ) : (
              <>
                <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 14, color: icCondition ? C.gold : C.green, fontWeight: 600 }}>
                  {icCondition ? `Approved, subject to condition: ${icCondition.text}` : "Approved without conditions — strong diligence coverage."}
                </div>
                <PrimaryButton onClick={() => setPhase("structure")}>Proceed to structuring</PrimaryButton>
              </>
            )}
          </Card>
        )}

        {phase === "structure" && (
          <Card>
            <SectionLabel step={4} total={5} title="Deal structure" />
            <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 10 }}>How much of the purchase is funded with <Term word="Leverage">debt</Term> vs your equity?</p>
            {LEVERAGE_OPTIONS.map((o) => {
              const blockedByIc = o.key === "high" && icCondition && icCondition.key === "leverage";
              return (
                <OptionButton key={o.key} selected={leverageKey === o.key} disabled={blockedByIc}
                  onClick={() => setLeverageKey(o.key)} title={o.label}
                  sub={blockedByIc ? "Blocked by IC condition — leverage capped at Medium." : `${fmtPct(o.interestRate)} interest · covenant ceiling ${fmtX(o.debtMultiple + 1.0)}`} />
              );
            })}
            <p style={{ fontSize: 13.5, marginTop: 14, marginBottom: 6 }}>Offer management a <Term word="Rollover equity">rollover stake</Term>?</p>
            <OptionButton selected={mgmtRollover === true} onClick={() => setMgmtRollover(true)} title="Yes — 10% rollover" sub="Smaller cheque, better-aligned management, shared upside at exit." />
            <OptionButton selected={mgmtRollover === false} onClick={() => setMgmtRollover(false)} title="No — full cash exit for management" sub="You fund and keep 100% of equity, but carry execution risk alone." />
            {leverageKey && mgmtRollover !== null && (
              <Expand label="Sources & uses preview">
                {(() => {
                  const basis = ebitdaBasis === "adjusted" ? COMPANY.trueEbitda : COMPANY.reportedEbitda;
                  const entryEV = basis * offerMultiple;
                  const lev = LEVERAGE_OPTIONS.find((l) => l.key === leverageKey);
                  const debt = basis * lev.debtMultiple;
                  const fullEq = entryEV - debt;
                  const fees = entryEV * TRANSACTION_COST_RATE;
                  const mgmt = mgmtRollover ? fullEq * MGMT_ROLLOVER_RATE : 0;
                  const sponsor = fullEq - mgmt + fees;
                  return (
                    <div>
                      <div>Uses: {fmtM(entryEV)} purchase price + {fmtM(fees)} fees = {fmtM(entryEV + fees)}</div>
                      <div>Sources: {fmtM(debt)} debt + {fmtM(mgmt)} mgmt rollover + {fmtM(sponsor)} your equity</div>
                    </div>
                  );
                })()}
              </Expand>
            )}
            <div style={{ marginTop: 10 }}><PrimaryButton disabled={!leverageKey || mgmtRollover === null} onClick={lockStructure}>Complete the deal</PrimaryButton></div>
          </Card>
        )}

        {phase === "year" && pendingEvent && (
          <Card>
            <div style={{ fontFamily: fontMono, fontSize: 11, color: C.gold, letterSpacing: 1, marginBottom: 6 }}>YEAR {year} OF OWNERSHIP</div>
            <NewsCard headline={pendingEvent.headline} body={pendingEvent.body} />
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 13.5, marginBottom: 6 }}>Management focus this year</p>
              {FOCUS_OPTIONS.map((f) => <OptionButton key={f.key} selected={focusKey === f.key} onClick={() => setFocusKey(f.key)} title={f.label} />)}
            </div>
            {pendingEvent.options ? (
              <>
                <p style={{ fontSize: 13.5, marginBottom: 6 }}>Your response to the news above</p>
                {pendingEvent.options.map((o, i) => <OptionButton key={i} disabled={!focusKey} onClick={() => resolveEvent(o.apply())} title={o.label} />)}
              </>
            ) : (
              <PrimaryButton disabled={!focusKey} onClick={() => resolveEvent({})}>Close out year {year}</PrimaryButton>
            )}
          </Card>
        )}

        {phase === "yearEnd" && yearOutcome && (
          <Card>
            <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Year {year} — closed out</div>
            {yearOutcome.note && <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 6 }}>{yearOutcome.note}</p>}
            {yearOutcome.covenantNote && <p style={{ fontSize: 13.5, color: C.red, marginBottom: 6 }}>{yearOutcome.covenantNote}</p>}
            <div style={{ fontFamily: fontMono, fontSize: 13, lineHeight: 2, marginBottom: 10 }}>
              <div>EBITDA: {fmtM(yearOutcome.ebitdaBefore)} → <b>{fmtM(yearOutcome.ebitdaAfter)}</b> ({fmtPct(yearOutcome.growthRate)})</div>
              <div>Free cash flow: <b>{fmtM(yearOutcome.fcf)}</b></div>
              <div>Debt: {fmtM(yearOutcome.debtBefore)} → <b>{fmtM(yearOutcome.debtAfter)}</b></div>
              <div>Net Debt/EBITDA: <b>{fmtX(yearOutcome.debtAfter / yearOutcome.ebitdaAfter)}</b> (covenant {fmtX(econ.leverage.debtMultiple + 1.0)})</div>
            </div>
            <Expand label="Running paper value">
              At the entry multiple, current equity value is roughly {fmtM(Math.max(0, ebitdaCurrent * (offerMultiple || 8) - debtBalance))} against {fmtM(econ.sponsorEntryEquity + additionalEquity)} invested so far — a rough mark, not the real exit number.
            </Expand>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {year < 7 && <PrimaryButton onClick={continueToNextYear}>Continue to year {year + 1}</PrimaryButton>}
              {year >= 3 && !dividendRecapTaken && (
                <button onClick={takeDividendRecap} style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: `1.5px solid ${C.gold}`, background: "#F1E4CC", fontFamily: fontSans, fontWeight: 600, fontSize: 14.5 }}>
                  Refinance & take a dividend (one-time)
                </button>
              )}
              {year >= 3 && (
                <button onClick={() => setPhase("exitPrep")} style={{ width: "100%", padding: "12px 16px", borderRadius: 6, border: `1.5px solid ${C.line}`, background: "#FBF8F1", fontFamily: fontSans, fontWeight: 600, fontSize: 14.5 }}>
                  Begin exit prep instead
                </button>
              )}
              {year >= 7 && <div style={{ fontSize: 12.5, color: C.red }}>Fund life pressure — year 7 is the latest sensible exit point.</div>}
            </div>
          </Card>
        )}

        {phase === "exitPrep" && (
          <Card>
            <SectionLabel title="Exit preparation" />
            <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 10 }}>How do you want to present the business to buyers?</p>
            {PREP_OPTIONS.map((p) => <OptionButton key={p.key} selected={prepKey === p.key} onClick={() => setPrepKey(p.key)} title={p.label} sub={p.cost ? `Cost: £${p.cost}k` : undefined} />)}
            <div style={{ marginTop: 10 }}><PrimaryButton disabled={!prepKey} onClick={() => setPhase("exitSale")}>Go to market</PrimaryButton></div>
          </Card>
        )}

        {phase === "exitSale" && (
          <Card>
            <SectionLabel title="Exit route" />
            <p style={{ fontSize: 13.5, color: C.inkSoft, marginBottom: 10 }}>Market backdrop has drifted {macroDrift >= 0 ? "up" : "down"} {fmtX(Math.abs(macroDrift))} since you bought.</p>
            {EXIT_ROUTES.map((r) => (
              <OptionButton key={r.key} selected={exitRouteKey === r.key} onClick={() => setExitRouteKey(r.key)} title={r.label}
                sub={r.key === "trade" ? "Lower multiple, most certain" : r.key === "secondary" ? "Market multiple, moderate variance" : "Highest potential multiple, most volatile"} />
            ))}
            <Expand label="What happens at completion?">
              On top of the headline multiple, expect ~{fmtPct(EXIT_FEE_RATE)} in advisory fees and a{" "}
              <Term word="W&I insurance">5% warranty holdback</Term> that's released — or claimed against — after close.
            </Expand>
            <div style={{ marginTop: 10 }}><PrimaryButton disabled={!exitRouteKey} onClick={runExit}>Run the exit</PrimaryButton></div>
          </Card>
        )}

        {phase === "debrief" && exitResult && (
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Stamp size={18} color={C.gold} /><div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 19 }}>Exit — {COMPANY.name}</div></div>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <BigStat label="MOIC" value={fmtX(exitResult.moic)} good={exitResult.beatMoic} />
              <BigStat label="IRR" value={fmtPct(exitResult.irr)} good={exitResult.beatIrr} />
            </div>
            <div style={{ fontSize: 13.5, marginBottom: 12, color: exitResult.beatMoic && exitResult.beatIrr ? C.green : C.red }}>
              {exitResult.beatMoic && exitResult.beatIrr ? "Beat both fund targets." : exitResult.beatMoic || exitResult.beatIrr ? "Mixed result — beat one target, missed the other." : "Missed both fund targets on this one."}
            </div>
            <div style={{ fontFamily: fontMono, fontSize: 12.5, lineHeight: 2, color: C.inkSoft, marginBottom: 10 }}>
              <div>Exit EV {fmtM(exitResult.exitEV)} at {fmtX(exitResult.exitMultiple)}, less {fmtM(exitResult.exitFee)} fees{exitResult.mgmtExitShare > 0 ? `, less ${fmtM(exitResult.mgmtExitShare)} mgmt share` : ""}.</div>
              <div>W&I: {exitResult.claim ? `claim consumed ${fmtM(exitResult.wiHoldback)} holdback` : "released in full, no claims"}.</div>
              <div>Total invested: {fmtM(exitResult.totalInvested)} · Total returned: {fmtM(exitResult.totalProceeds)}</div>
            </div>
            <div style={{ fontFamily: fontMono, fontSize: 12, color: C.gold, marginBottom: 10 }}>+{exitResult.xp} XP</div>
            {exitResult.badges.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {exitResult.badges.map((b) => <div key={b} style={{ display: "flex", alignItems: "center", gap: 4, background: "#F1E4CC", border: `1px solid ${C.gold}`, borderRadius: 20, padding: "3px 10px", fontSize: 11.5 }}><Award size={12} color={C.goldDark} /> {b}</div>)}
              </div>
            )}
            <div style={{ fontFamily: fontSerif, fontWeight: 700, fontSize: 16, marginBottom: 6 }}>How this deal actually played out</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.7, color: C.inkSoft, marginBottom: 14 }}>
              {journal.map((line, i) => <div key={i} style={{ marginBottom: 6 }}>• {line}</div>)}
            </div>
            <PrimaryButton onClick={restart}><span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><RotateCcw size={15} /> Run a new deal</span></PrimaryButton>
          </Card>
        )}

      </div>
    </div>
  );
}
