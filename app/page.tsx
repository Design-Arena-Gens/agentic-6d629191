import AnimatedBackground from "@/app/components/AnimatedBackground";
import VaultCanvas from "@/app/components/VaultCanvas";
import SecureIntakeForm from "@/app/components/SecureIntakeForm";

export default function Page() {
  return (
    <main>
      <AnimatedBackground />
      <section className="container" style={{ paddingTop: 40, paddingBottom: 20 }}>
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Logo />
              <div style={{ fontWeight: 600 }}>AccrueFlow?</div>
            </div>
            <div className="helper">Timeless Intelligence Platform v2.0</div>
          </div>
        </div>
      </section>

      <section className="container" style={{ display: "grid", gap: 24, gridTemplateColumns: "1.2fr 1fr" }}>
        <div className="card" style={{ padding: 28 }}>
          <div className="h2" style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>Design & Engineering Teams</div>
          <div className="h1" style={{ fontWeight: 650 }}>The Digital Private Bank</div>
          <div style={{ height: 10 }} />
          <div className="helper" style={{ maxWidth: 680 }}>
            Frictionless, unbiased, and secure. Purchase $15k dossiers with no calls, no meetings. Absolute trust, rendered.
          </div>
          <div style={{ height: 18 }} />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href="#intake">Commence Secure Intake</a>
            <button className="btn">View Dossier Standard</button>
          </div>
        </div>
        <VaultCanvas />
      </section>

      <section id="intake" className="container" style={{ paddingTop: 10, paddingBottom: 80 }}>
        <SecureIntakeForm />
      </section>
    </main>
  );
}

function Logo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
