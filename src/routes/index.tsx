import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, Crown, Star, Sparkles, ChevronDown, X, Play } from "lucide-react";
import bannerAsset from "@/assets/banner.png.asset.json";
import { trackInitiateCheckout } from "@/lib/xPixel";
const banner = bannerAsset.url;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "O CEO Milionário e a Amante Secreta — Assista Agora" },
      { name: "description", content: "Acesso imediato aos 24 episódios dublados por apenas R$ 4,99." },
      { property: "og:title", content: "O CEO Milionário e a Amante Secreta" },
      { property: "og:description", content: "Acesso imediato aos 24 episódios dublados por apenas R$ 4,99." },
      { property: "og:image", content: banner },
      { name: "twitter:image", content: banner },
    ],
  }),
  component: Index,
});

const PREMIUM_URL = "https://pay.lowify.com.br/checkout?product_id=JtqtRQ&offer_slug=vfdc048";
const BASIC_URL = "https://pay.lowify.com.br/checkout?product_id=JtqtRQ&offer_slug=d6l93je";

const NOTIF_NAMES = [
  "Mariana S.", "Carlos R.", "Juliana P.", "Fernanda L.", "Ricardo M.",
  "Beatriz O.", "Lucas A.", "Ana Paula", "Roberto T.", "Camila F.",
  "Patricia G.", "Diego N.", "Larissa V.", "Bruno H.", "Sandra K.",
];
const NOTIF_CITIES = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador",
  "Fortaleza", "Brasília", "Porto Alegre", "Recife", "Manaus",
];
const NOTIF_ACTIONS = [
  "acabou de garantir o acesso completo",
  "comprou o Pacote Premium",
  "desbloqueou os 24 episódios",
  "garantiu o acesso vitalício",
  "começou a assistir agora",
];

function Countdown() {
  const [time, setTime] = useState({ m: 19, s: 43 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => {
        if (t.m === 0 && t.s === 0) return { m: 19, s: 43 };
        if (t.s === 0) return { m: t.m - 1, s: 59 };
        return { m: t.m, s: t.s - 1 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="w-full bg-primary text-primary-foreground text-center text-sm font-semibold py-2.5 flex items-center justify-center gap-3">
      <span>Essa promoção acaba em</span>
      <span className="bg-black/30 px-2.5 py-1 rounded-md font-mono tabular-nums">
        {fmt(time.m)}:{fmt(time.s)}
      </span>
    </div>
  );
}

function VSL() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://player.vimeo.com/api/player.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch {} };
  }, []);
  return (
    <div className="mx-auto w-full max-w-[360px]">
      <div style={{ padding: "133.33% 0 0 0", position: "relative" }}>
        <iframe
          src="https://player.vimeo.com/video/1202353342?badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          title="O Ceo Milionário e a Amante Secreta"
        />
      </div>
    </div>
  );
}

function UpsellPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="pop-in relative w-full max-w-sm rounded-2xl border border-gold/40 bg-card p-6 shadow-[0_0_60px_-10px_oklch(0.78_0.14_80/0.5)]">
        <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition">
          <X size={20} />
        </button>
        <div className="text-center text-[11px] tracking-[0.25em] text-muted-foreground mb-4">PREVIEW</div>
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 text-gold px-3 py-1 text-xs font-bold uppercase tracking-wide">
            <Crown size={14} /> Upgrade Premium
          </span>
        </div>
        <h3 className="text-center text-2xl font-bold mb-3">Pacote Premium</h3>
        <div className="text-center">
          <div className="text-gold text-4xl font-extrabold">R$ 9,99</div>
          <div className="text-xs text-muted-foreground mt-1">Acesso VITALÍCIO</div>
        </div>
        <div className="my-5 rounded-xl border border-border bg-background/60 p-4">
          <div className="text-[11px] font-bold tracking-wider text-muted-foreground mb-3">INCLUI:</div>
          <ul className="space-y-2.5 text-sm">
            {["+3500 mini-séries", "Lançamentos Diários", "Acesso Vitalício", "Nunca mais pague por uma série!"].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <a href={PREMIUM_URL} className="block w-full text-center rounded-xl bg-gradient-to-b from-gold to-[oklch(0.65_0.14_70)] text-gold-foreground font-bold py-3.5 hover:brightness-110 transition">
          QUERO O PREMIUM
        </a>
        <a href={BASIC_URL} className="block w-full text-center rounded-xl bg-white text-black font-semibold py-3 mt-3 hover:bg-white/90 transition">
          Quero só a oferta básica
        </a>
      </div>
    </div>
  );
}

type Notif = { id: number; name: string; city: string; action: string };

function Notifications() {
  const [notifs, setNotifs] = useState<Notif[]>([]);
  useEffect(() => {
    let id = 0;
    const push = () => {
      const n: Notif = {
        id: ++id,
        name: NOTIF_NAMES[Math.floor(Math.random() * NOTIF_NAMES.length)],
        city: NOTIF_CITIES[Math.floor(Math.random() * NOTIF_CITIES.length)],
        action: NOTIF_ACTIONS[Math.floor(Math.random() * NOTIF_ACTIONS.length)],
      };
      setNotifs((prev) => [...prev, n]);
      setTimeout(() => setNotifs((prev) => prev.filter((x) => x.id !== n.id)), 6000);
    };
    const first = setTimeout(push, 3000);
    const iv = setInterval(push, 15000);
    return () => { clearTimeout(first); clearInterval(iv); };
  }, []);
  return (
    <div className="fixed left-4 bottom-4 z-[90] flex flex-col gap-2 pointer-events-none">
      {notifs.map((n) => (
        <div key={n.id} className="notif-in pointer-events-auto flex items-center gap-3 bg-card border border-border rounded-xl shadow-2xl px-3 py-2.5 max-w-[320px]">
          <img src={banner} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
          <div className="text-xs leading-tight">
            <div className="font-semibold text-foreground">{n.name} de {n.city}</div>
            <div className="text-muted-foreground">{n.action}</div>
            <div className="text-[10px] text-primary mt-0.5">há poucos segundos</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left rounded-xl border border-primary/40 bg-card/60 px-4 py-3.5 hover:border-primary transition">
      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-sm">{q}</span>
        <ChevronDown size={18} className={`text-primary transition-transform ${open ? "rotate-180" : ""}`} />
      </div>
      {open && <p className="text-sm text-muted-foreground mt-3">{a}</p>}
    </button>
  );
}

function Index() {
  const [upsellOpen, setUpsellOpen] = useState(false);

  const features = [
    { icon: Star, title: "Conteúdo Premium", desc: "Séries do My Drama, Reelshort, Dramashort, Shortdrama, Dramaware, Dramabox e Dorama" },
    { icon: Zap, title: "Multi-dispositivo", desc: "Assista em celular, TV, tablet ou computador" },
    { icon: ShieldCheck, title: "Sem Limitações", desc: "Sem anúncios, sem travamentos, qualidade top" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Countdown />

      <main className="mx-auto max-w-xl px-5 py-8 space-y-10">
        {/* Hero */}
        <section className="text-center space-y-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            O CEO Milionário e a Amante<br />Secreta...
          </h1>
          <p className="text-muted-foreground text-base">
            O CEO milionário descobriu que a "garota irresponsável" do hospital era sua esposa secreta!
          </p>
          <div className="flex justify-center">
            <div className="relative w-64 rounded-2xl overflow-hidden border border-border shadow-2xl">
              <img src={banner} alt="O CEO Milionário e a Amante Secreta" width={1024} height={1024} className="w-full h-auto" />
            </div>
          </div>
        </section>

        {/* VSL */}
        <section className="space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-primary font-bold">
            <Play size={14} /> Assista o trailer
          </div>
          <VSL />
          <p className="text-center text-sm text-muted-foreground">Clique para assistir</p>
        </section>

        {/* Offer */}
        <section className="rounded-2xl border border-primary/50 bg-card p-6 space-y-5 shadow-[0_0_40px_-10px_oklch(0.62_0.22_295/0.5)]">
          <h2 className="text-center text-2xl font-bold leading-snug">
            Clique abaixo para acessar o<br />conteúdo completo!
          </h2>
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Pagamento único</div>
            <div className="text-5xl font-extrabold">R$ 4,99</div>
          </div>
          <div className="h-px bg-border" />
          <ul className="space-y-3 text-sm">
            {[
              "Acesso imediato aos 24 episódios dublados de O CEO Milionário e a Amante Secreta",
              "Todos os episódios liberados dos melhores apps",
              "Novo Lançamento",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => { trackInitiateCheckout(); setUpsellOpen(true); }}
            className="w-full rounded-xl bg-primary text-primary-foreground font-bold py-4 text-base hover:brightness-110 transition shadow-lg"
          >
            QUERO COMPLETO
          </button>
        </section>

        {/* What you get */}
        <section className="space-y-5">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">O Que Você Vai Receber</h2>
            <p className="text-muted-foreground text-sm">Acesso completo a todo conteúdo premium, sem limites</p>
          </div>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-4 flex gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="rounded-2xl border border-border bg-card p-6 text-center space-y-3">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
            <ShieldCheck size={28} className="text-primary" />
          </div>
          <h2 className="text-xl font-bold">Garantia de 7 Dias</h2>
          <p className="text-sm text-muted-foreground">
            Se você não ficar 100% satisfeito com o acesso, devolvemos seu dinheiro integralmente em até 7 dias após a compra.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-primary font-medium pt-1">
            <span>✓ Sem burocracia</span>
            <span>✓ Devolução imediata</span>
            <span>✓ Sem perguntas</span>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-center text-2xl font-bold mb-4">Perguntas Frequentes</h2>
          <Faq q="Como funciona o acesso?" a="Após a confirmação do pagamento, você recebe acesso imediato no seu e-mail com o link para assistir todos os episódios." />
          <Faq q="Posso assistir em quantos dispositivos?" a="Você pode assistir em celular, tablet, TV ou computador. Sem limite de dispositivos." />
          <Faq q="O pagamento é recorrente?" a="Não. É um pagamento único de R$ 4,99 (ou R$ 9,99 no plano vitalício). Sem mensalidades." />
          <Faq q="E se eu não gostar?" a="Você tem 7 dias de garantia. Se não gostar, devolvemos 100% do valor sem perguntas." />
        </section>

        {/* Final CTA */}
        <section className="text-center space-y-4 pb-6">
          <button
            onClick={() => { trackInitiateCheckout(); setUpsellOpen(true); }}
            className="w-full rounded-xl bg-primary text-primary-foreground font-bold py-4 hover:brightness-110 transition shadow-lg"
          >
            QUERO ASSISTIR AGORA
          </button>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Sparkles size={14} className="text-primary" />
            <span>Pagamento 100% seguro</span>
          </div>
        </section>
      </main>

      <UpsellPopup open={upsellOpen} onClose={() => setUpsellOpen(false)} />
      <Notifications />
    </div>
  );
}
