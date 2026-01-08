import React from 'react';

const CGU = () => {
  return (
    <div className="min-h-screen">
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 md:mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl">
          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Objet</h2>
              <p className="text-gray-600 mb-4">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les conditions d'accès et d'utilisation des services proposés par CYNA sur le site web.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Acceptation des CGU</h2>
              <p className="text-gray-600 mb-4">
                L'utilisation du site implique l'acceptation pleine et entière des présentes CGU. En cas de non-acceptation, l'utilisateur ne doit pas utiliser le service.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Services proposés</h2>
              <p className="text-gray-600 mb-4">
                CYNA propose des solutions de sécurité SaaS incluant EDR, XDR, SOC, Threat Intelligence et SIEM. Les caractéristiques détaillées de chaque service sont disponibles sur le site.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Abonnements</h2>
              <p className="text-gray-600 mb-4">
                Les services sont proposés sous forme d'abonnements mensuels ou annuels. Les prix sont indiqués en euros TTC. Les abonnements sont renouvelés automatiquement sauf résiliation.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Obligations de l'utilisateur</h2>
              <p className="text-gray-600 mb-4">
                L'utilisateur s'engage à utiliser les services conformément à leur destination et à ne pas porter atteinte aux droits de tiers.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propriété intellectuelle</h2>
              <p className="text-gray-600 mb-4">
                Tous les éléments du site sont protégés par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Responsabilité</h2>
              <p className="text-gray-600 mb-4">
                CYNA ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'impossibilité de l'utiliser.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Modification des CGU</h2>
              <p className="text-gray-600 mb-4">
                CYNA se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur le site.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact</h2>
              <p className="text-gray-600">
                Pour toute question relative aux CGU, vous pouvez nous contacter à contact@cyna.fr
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGU;
