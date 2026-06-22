// src/app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#070C14] min-h-screen text-[#EAF0FF] font-sans selection:bg-blue-600 selection:text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070C14]/70 border-b border-[#24314D]/50">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-base">E</span>
            <h1 className="text-xl font-black text-white tracking-wider uppercase">
              Enq<span className="text-blue-500">IA</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#A9B4CC] hover:text-white hover:bg-[#111A2E] border border-[#24314D]/60 transition-all"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg shadow-blue-600/10"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide uppercase">
              ✨ Plateforme intelligente d'enquêtes scientifiques
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white tracking-tight">
              Collectez des données.<br />
              Analysez la variance.<br />
              <span className="text-blue-500">Produisez la recherche.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#A9B4CC] leading-relaxed max-w-xl">
              Une infrastructure cloud moderne taillée pour les chercheurs, universités et laboratoires permettant de propulser des structures de questionnaires complexes et d'automatiser le traitement analytique descriptif.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-xl shadow-blue-600/20"
              >
                Commencer gratuitement
              </Link>

              <Link
                href="/login"
                className="px-6 py-3.5 rounded-xl bg-[#111A2E] border border-[#24314D] text-[#EAF0FF] hover:bg-[#1A2742] font-bold text-sm transition-all"
              >
                Démonstration
              </Link>
            </div>
          </div>

          {/* KPI METRICS OVERVIEW */}
          <div className="lg:col-span-5">
            <div className="bg-[#111A2E] rounded-3xl border border-[#24314D] shadow-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-bold text-white text-base tracking-wide border-b border-[#24314D]/60 pb-3">
                Activité globale du réseau
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#24314D]/70">
                  <p className="text-xs font-bold text-[#A9B4CC] uppercase tracking-wide">Enquêtes</p>
                  <h2 className="text-3xl font-black mt-2 text-blue-400 font-mono">120+</h2>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#24314D]/70">
                  <p className="text-xs font-bold text-[#A9B4CC] uppercase tracking-wide">Réponses</p>
                  <h2 className="text-3xl font-black mt-2 text-white font-mono">15K+</h2>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#24314D]/70">
                  <p className="text-xs font-bold text-[#A9B4CC] uppercase tracking-wide">Chercheurs</p>
                  <h2 className="text-3xl font-black mt-2 text-emerald-400 font-mono">250+</h2>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B1220] border border-[#24314D]/70">
                  <p className="text-xs font-bold text-[#A9B4CC] uppercase tracking-wide">Répondants</p>
                  <h2 className="text-3xl font-black mt-2 text-amber-400 font-mono">10K+</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES BLOCK */}
      <section className="bg-[#0B1220] py-20 border-y border-[#24314D]/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Comment fonctionne EnqIA ?
            </h2>
            <p className="text-sm text-[#A9B4CC]">
              Trois piliers techniques configurés pour maximiser l'efficience de vos collectes empiriques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111A2E] border border-[#24314D]/70 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-lg">📝</div>
              <h3 className="font-bold text-white text-base">1. Modélisation</h3>
              <p className="text-xs text-[#A9B4CC] leading-relaxed">
                Concevez des structures complexes intégrant questions conditionnelles, réponses textuelles libres, choix multiples et matrices de Likert standardisées.
              </p>
            </div>

            <div className="bg-[#111A2E] border border-[#24314D]/70 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">🌍</div>
              <h3 className="font-bold text-white text-base">2. Administration</h3>
              <p className="text-xs text-[#A9B4CC] leading-relaxed">
                Déployez vos campagnes d'enquêtes via des liens cryptés sécurisés assurant l'intégrité, le chiffrement et l'anonymisation des métadonnées.
              </p>
            </div>

            <div className="bg-[#111A2E] border border-[#24314D]/70 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-lg">📊</div>
              <h3 className="font-bold text-white text-base">3. Exploration</h3>
              <p className="text-xs text-[#A9B4CC] leading-relaxed">
                Générez des distributions et visualisez instantanément les indicateurs statistiques (médiane, moyenne) via des graphiques vectoriels interactifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES LIST */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Fonctionnalités coeurs</h2>
          <p className="text-sm text-[#A9B4CC]">Les outils indispensables exigés par l'analyse académique moderne.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#111A2E]/60 border border-[#24314D]/50 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-sm text-white">Gestion native</h4>
            <p className="text-xs text-[#A9B4CC]/80 leading-relaxed">Création intuitive, archivage à chaud et isolation granulaire des bases d'enquêtes.</p>
          </div>
          <div className="bg-[#111A2E]/60 border border-[#24314D]/50 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-sm text-white">Formulaires Typés</h4>
            <p className="text-xs text-[#A9B4CC]/80 leading-relaxed">Génération dynamique côté client adaptée aux contraintes d'accessibilité RGPD.</p>
          </div>
          <div className="bg-[#111A2E]/60 border border-[#24314D]/50 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-sm text-white">Rapports Croisés</h4>
            <p className="text-xs text-[#A9B4CC]/80 leading-relaxed">Filtres sociodémographiques par genre, datation ou tranches d'âges personnalisées.</p>
          </div>
          <div className="bg-[#111A2E]/60 border border-[#24314D]/50 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-sm text-white">Pipelines d'exports</h4>
            <p className="text-xs text-[#A9B4CC]/80 leading-relaxed">Extraction brute normalisée aux formats CSV et tableurs Excel complexes (XLSX).</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[2rem] p-10 text-center border border-blue-500/30 shadow-2xl space-y-6">
            <h2 className="text-3xl font-black text-white tracking-tight">
              Prêt à lancer votre prochaine enquête scientifique ?
            </h2>
            <p className="text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Rejoignez EnqIA dès aujourd'hui. Centralisez vos protocoles d'échantillonnage et gagnez un temps précieux sur le traitement des données brutes.
            </p>
            <div className="pt-2">
              <Link
                href="/register"
                className="inline-block px-6 py-3 bg-white hover:bg-[#EAF0FF] text-blue-900 font-extrabold text-sm rounded-xl transition-all shadow-xl active:scale-95"
              >
                Créer mon compte chercheur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#24314D]/50 bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-center sm:text-left">
            <h3 className="font-black text-white uppercase tracking-wider text-sm">Enq<span className="text-blue-500">IA</span></h3>
            <p className="text-[#A9B4CC]/70 mt-1">Système d'administration et de gestion d'enquêtes scientifiques.</p>
          </div>

          <div className="flex gap-6 font-semibold text-[#A9B4CC]">
            <Link href="/login" className="hover:text-white transition-colors">Connexion</Link>
            <Link href="/register" className="hover:text-white transition-colors">S'inscrire</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}