import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-bg min-h-screen">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-border">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-primary">
              EnqIA
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-xl border border-border hover:bg-slate-50 transition"
            >
              Connexion
            </Link>

            <Link
              href="/register"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
              Plateforme intelligente d'enquêtes scientifiques
            </div>

            <h1 className="text-6xl font-extrabold leading-tight text-slate-900">
              Collectez des données.
              <br />
              Analysez des résultats.
              <br />
              Produisez de la recherche.
            </h1>

            <p className="mt-8 text-xl text-slate-600 leading-relaxed">
              Une plateforme moderne permettant aux chercheurs,
              universités et laboratoires de créer des enquêtes,
              recueillir des réponses et générer des analyses
              statistiques avancées.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="px-7 py-4 rounded-2xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Commencer gratuitement
              </Link>

              <Link
                href="/login"
                className="px-7 py-4 rounded-2xl border border-border hover:bg-white transition"
              >
                Se connecter
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl border border-border shadow-lg p-8">

              <h3 className="font-bold text-lg mb-6">
                Aperçu de la plateforme
              </h3>

              <div className="grid grid-cols-2 gap-5">

                <div className="p-6 rounded-2xl bg-indigo-50">
                  <p className="text-sm text-slate-500">
                    Enquêtes
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-indigo-600">
                    120+
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-sky-50">
                  <p className="text-sm text-slate-500">
                    Réponses
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-sky-600">
                    15K+
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50">
                  <p className="text-sm text-slate-500">
                    Chercheurs
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-emerald-600">
                    250+
                  </h2>
                </div>

                <div className="p-6 rounded-2xl bg-orange-50">
                  <p className="text-sm text-slate-500">
                    Répondants
                  </p>

                  <h2 className="text-4xl font-bold mt-2 text-orange-600">
                    10K+
                  </h2>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PROCESSUS */}
      <section className="bg-white py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">
              Comment fonctionne EnqIA ?
            </h2>

            <p className="text-slate-500 mt-4 text-lg">
              Trois étapes simples pour transformer vos données
              en résultats exploitables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-50 rounded-3xl p-8">
              <div className="text-5xl mb-4">📝</div>

              <h3 className="font-bold text-xl mb-3">
                Créer
              </h3>

              <p className="text-slate-600">
                Concevez des questionnaires avec questions
                ouvertes, choix multiples et échelles de Likert.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8">
              <div className="text-5xl mb-4">🌍</div>

              <h3 className="font-bold text-xl mb-3">
                Diffuser
              </h3>

              <p className="text-slate-600">
                Publiez vos enquêtes et recueillez des réponses
                auprès de vos participants.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8">
              <div className="text-5xl mb-4">📊</div>

              <h3 className="font-bold text-xl mb-3">
                Analyser
              </h3>

              <p className="text-slate-600">
                Visualisez instantanément les résultats à travers
                des statistiques et graphiques interactifs.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Fonctionnalités principales
          </h2>

          <p className="text-slate-500 mt-4">
            Tout ce dont vous avez besoin pour mener des enquêtes scientifiques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white border border-border rounded-3xl p-6">
            <h3 className="font-bold mb-3">
              Gestion des enquêtes
            </h3>

            <p className="text-slate-500">
              Création, publication et archivage.
            </p>
          </div>

          <div className="bg-white border border-border rounded-3xl p-6">
            <h3 className="font-bold mb-3">
              Réponses dynamiques
            </h3>

            <p className="text-slate-500">
              Formulaires générés automatiquement.
            </p>
          </div>

          <div className="bg-white border border-border rounded-3xl p-6">
            <h3 className="font-bold mb-3">
              Statistiques
            </h3>

            <p className="text-slate-500">
              Histogrammes, distributions et analyses.
            </p>
          </div>

          <div className="bg-white border border-border rounded-3xl p-6">
            <h3 className="font-bold mb-3">
              Exportation
            </h3>

            <p className="text-slate-500">
              CSV et Excel en un clic.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-indigo-600 rounded-[32px] p-12 text-center text-white">

            <h2 className="text-4xl font-bold mb-5">
              Prêt à lancer votre prochaine enquête ?
            </h2>

            <p className="text-indigo-100 mb-8 text-lg">
              Rejoignez EnqIA et simplifiez la collecte
              et l'analyse de vos données.
            </p>

            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-2xl font-semibold hover:bg-slate-100 transition"
            >
              Créer un compte
            </Link>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <h3 className="font-bold text-primary text-xl">
              EnqIA
            </h3>

            <p className="text-slate-500 text-sm mt-1">
              Plateforme de gestion d'enquêtes scientifiques.
            </p>
          </div>

          <div className="flex gap-6">
            <Link href="/login">
              Connexion
            </Link>

            <Link href="/register">
              Inscription
            </Link>
          </div>

        </div>
      </footer>
    </main>
  );
}