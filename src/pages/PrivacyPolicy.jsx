import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Politique de Confidentialité</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Collecte des données</h2>
              <p className="text-gray-600 mb-4">
                CYNA collecte et traite les données personnelles nécessaires à la fourniture de ses services de sécurité SaaS. 
                Les données collectées incluent notamment : nom, prénom, adresse email, adresse postale, informations de paiement.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Utilisation des données</h2>
              <p className="text-gray-600 mb-4">
                Les données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>La gestion de votre compte et de vos abonnements</li>
                <li>La facturation et le traitement des paiements</li>
                <li>La fourniture des services de sécurité souscrits</li>
                <li>L'envoi d'informations relatives à nos services</li>
                <li>Le respect de nos obligations légales et réglementaires</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Conservation des données</h2>
              <p className="text-gray-600 mb-4">
                Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, 
                et conformément aux obligations légales applicables. Les données de facturation sont conservées pendant 10 ans conformément 
                aux obligations comptables.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des données</h2>
              <p className="text-gray-600 mb-4">
                CYNA ne vend pas vos données personnelles. Nous pouvons partager vos données avec :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Nos prestataires de services (hébergement, paiement) dans le cadre strict de leurs missions</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vos droits</h2>
              <p className="text-gray-600 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="text-gray-600 mb-4">
                Pour exercer ces droits, contactez-nous à : contact@cyna.fr
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sécurité</h2>
              <p className="text-gray-600 mb-4">
                CYNA met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles 
                contre tout accès non autorisé, perte, destruction ou altération.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact</h2>
              <p className="text-gray-600">
                Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter à contact@cyna.fr
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
