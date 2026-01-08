import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">À propos de CYNA</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h2>
              <p className="text-gray-600 mb-4">
                CYNA est une entreprise spécialisée dans les solutions de sécurité SaaS pour les entreprises. Notre mission est de protéger les organisations contre les cybermenaces grâce à des solutions innovantes et performantes.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos solutions</h2>
              <p className="text-gray-600 mb-4">
                Nous proposons une gamme complète de solutions de sécurité :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li><strong>EDR</strong> - Endpoint Detection & Response pour la protection des terminaux</li>
                <li><strong>XDR</strong> - Extended Detection & Response pour une protection étendue</li>
                <li><strong>SOC</strong> - Security Operations Center managé 24/7</li>
                <li><strong>Threat Intelligence</strong> - Intelligence sur les menaces en temps réel</li>
                <li><strong>SIEM</strong> - Gestion centralisée des événements de sécurité</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre expertise</h2>
              <p className="text-gray-600 mb-4">
                Notre équipe d'experts certifiés (CISSP, CEH, GCIH) travaille 24/7 pour assurer la sécurité de nos clients. Nous sommes certifiés ISO 27001 et conformes au RGPD.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
              <p className="text-gray-600">
                Pour en savoir plus sur nos solutions ou pour une démonstration, n'hésitez pas à nous contacter à contact@cyna.fr ou au +33 1 23 45 67 89.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
