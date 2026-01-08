import React from 'react';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Mentions Légales</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl">
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
              <p className="text-gray-600">
                <strong>CYNA</strong><br />
                123 Rue de la Sécurité<br />
                75001 Paris, France<br />
                Téléphone: +33 1 23 45 67 89<br />
                Email: contact@cyna.fr
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de publication</h2>
              <p className="text-gray-600">
                Le directeur de publication est le représentant légal de CYNA.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
              <p className="text-gray-600">
                Le site est hébergé par un prestataire technique. Pour toute question relative à l'hébergement, contactez-nous.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection des données</h2>
              <p className="text-gray-600">
                Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous à contact@cyna.fr
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-600">
                Le site utilise des cookies pour améliorer l'expérience utilisateur. En continuant à naviguer sur le site, vous acceptez l'utilisation de cookies.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
