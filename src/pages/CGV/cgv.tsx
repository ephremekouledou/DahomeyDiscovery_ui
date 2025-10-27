import { useEffect, useState } from "react";
import { Flex, Anchor, Card, Typography, Divider, Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useLocation } from "react-router-dom";
import FloatingCartButton from "../../components/dededed/PanierButton";

const { Title, Paragraph } = Typography;

const CGV = () => {
  const { pathname } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const anchorItems = [
    {
      key: "service-client",
      href: "#service-client",
      title: "Service Clients",
    },
    {
      key: "assistance-urgence",
      href: "#assistance-urgence",
      title: "Assistance d'urgence",
    },
    {
      key: "compensation",
      href: "#compensation",
      title: "Compensation anticipée",
    },
    { key: "hotels", href: "#hotels", title: "Conditions Hôtels" },
    { key: "voitures", href: "#voitures", title: "Location de voitures" },
    { key: "transferts", href: "#transferts", title: "Transferts" },
    { key: "circuits", href: "#circuits", title: "Circuits touristiques" },
    {
      key: "reservations",
      href: "#reservations",
      title: "Réservations générales",
    },
    { key: "responsabilite", href: "#responsabilite", title: "Responsabilité" },
    { key: "mentions", href: "#mentions", title: "Mentions légales" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Flex justify="center" vertical>
        <BeginningButton />
      <FloatingCartButton />

        {/* Navigation */}
        <div className="relative z-20 flex items-center justify-center">
          <NavBar menu="RESTAU" />
        </div>

        {/* Header Section */}
        <div className="bg-white py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Title
                level={1}
                className="text-gray-800 mb-2 text-3xl font-bold"
              >
                Conditions Générales de Vente
              </Title>
              <div className="text-gray-600 text-sm">
                Dernière mise à jour : 1er septembre 2025
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 max-h-[calc(100vh-100px)] overflow-hidden">
                  <Card className="shadow-md h-full flex flex-col">
                    <Title
                      level={4}
                      className="mb-4 text-gray-800 flex-shrink-0"
                    >
                      Table des matières
                    </Title>
                    <div className="flex-1 overflow-y-auto pr-2">
                      <Anchor
                        items={anchorItems}
                        offsetTop={80}
                        className="cgv-anchor"
                        bounds={20}
                      />
                    </div>
                  </Card>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3">
                <Card className="shadow-md">
                  <div className="prose prose-lg max-w-none">
                    {/* Service Clients */}
                    <section id="service-client" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        I. Service Clients
                      </Title>

                      <div className="bg-blue-50 p-6 rounded-lg mb-6">
                        <Title level={4} className="text-blue-800 mb-3">
                          Nous sommes toujours là pour vous aider
                        </Title>
                        <Paragraph className="mb-4">
                          Notre service clients compétent est disponible{" "}
                          <strong>24h/24 et 7j/7</strong>.
                        </Paragraph>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                            <strong>Téléphone :</strong>
                            <br />
                            <span className="text-lg text-blue-600">
                              +229 0167 110 110
                            </span>
                          </div>
                          <div className="bg-white p-4 rounded border-l-4 border-green-500">
                            <strong>Email :</strong>
                            <br />
                            <span className="text-lg text-green-600">
                              reservation@dahomeydiscovery.com
                            </span>
                          </div>
                        </div>
                      </div>

                      <Title level={3} className="text-gray-800 mb-4">
                        Informations sur l'Aéroport international de Cotonou
                      </Title>
                      <Paragraph>
                        L'aéroport international Cardinal Bernardin Gantin de
                        Cotonou, situé à quelques minutes seulement du
                        centre-ville, est la principale porte d'entrée du Bénin.
                        Grâce à sa position stratégique sur la côte atlantique,
                        il relie Cotonou aux grandes capitales africaines,
                        européennes et à plusieurs destinations internationales.
                      </Paragraph>

                      <Title level={3} className="text-gray-800 mb-4">
                        Installations modernes et services
                      </Title>
                      <Paragraph>
                        Dès votre arrivée à l'aéroport de Cotonou, vous êtes
                        accueilli dans un environnement pensé pour faciliter vos
                        démarches. Les voyageurs disposent de services variés :
                        comptoirs d'enregistrement rapides, zone de récupération
                        des bagages, restaurants, cafés et boutiques locales.
                      </Paragraph>
                    </section>

                    <Divider />

                    {/* Assistance d'urgence */}
                    <section id="assistance-urgence" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        II. L'assistance d'urgence des voyageurs
                      </Title>

                      <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                        <Title level={4} className="text-red-800 mb-3">
                          Service d'urgence 24h/24 et 7j/7
                        </Title>
                        <Paragraph>
                          DAHOMEY DISCOVERY fournit un service d'urgence complet
                          qui met tout en œuvre pour garantir le bon déroulement
                          de votre séjour au Bénin :
                        </Paragraph>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Bagages perdus pendant le voyage</li>
                          <li>Perte de documents d'identité</li>
                          <li>Voyage affecté par un accident ou une maladie</li>
                          <li>Assistance générale nécessaire</li>
                        </ul>
                      </div>
                    </section>

                    <Divider />

                    {/* Compensation anticipée */}
                    <section id="compensation" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        III. Compensation anticipée
                      </Title>

                      <div className="bg-green-50 p-6 rounded-lg">
                        <Paragraph>
                          DAHOMEY DISCOVERY pratique une{" "}
                          <strong>politique de compensation anticipée</strong>{" "}
                          pour toutes ses activités. Nous enquêtons sur toute
                          plainte déposée par les voyageurs et, s'il est
                          démontré que nous sommes en faute, nous fournissons
                          une compensation à l'avance.
                        </Paragraph>
                      </div>
                    </section>

                    <Divider />

                    {/* Conditions Hôtels */}
                    <section id="hotels" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        IV. Conditions qui s'appliquent à la réservation
                        d'hôtels
                      </Title>

                      <Title level={3} className="text-gray-800 mb-4">
                        Collaboration avec les hôtels
                      </Title>
                      <Paragraph>
                        Si votre réservation est modifiée après confirmation,
                        DAHOMEY DISCOVERY fera de son mieux pour coordonner
                        votre séjour. Nous travaillons directement avec
                        l'établissement pour trouver une solution adaptée.
                      </Paragraph>

                      <Title level={3} className="text-gray-800 mb-4">
                        Garantie de disponibilité de la chambre
                      </Title>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                        <Paragraph className="mb-4">
                          <strong>Important :</strong> Merci d'appeler DAHOMEY
                          DISCOVERY immédiatement si aucune chambre n'est
                          disponible à votre arrivée à l'hôtel. Si vous ne nous
                          contactez pas et séjournez dans un autre hôtel, vous
                          perdez vos droits à la « Garantie de disponibilité de
                          la chambre ».
                        </Paragraph>
                      </div>

                      <Title level={4} className="text-gray-700 mb-3 mt-6">
                        La garantie ne s'applique pas dans les cas suivants :
                      </Title>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Vous n'arrivez pas à l'hôtel à l'heure prévue</li>
                        <li>
                          Vous avez modifié la réservation sans confirmation de
                          notre part
                        </li>
                        <li>
                          Une chambre de qualité similaire ou supérieure vous a
                          été assignée sans frais
                        </li>
                        <li>
                          Cas de force majeure (incendie, catastrophe naturelle,
                          politique gouvernementale)
                        </li>
                        <li>Réservation non confirmée par DAHOMEY DISCOVERY</li>
                        <li>
                          Problèmes de paiement ou de sécurité transactionnelle
                        </li>
                      </ul>
                    </section>

                    <Divider />

                    {/* Location de voitures */}
                    <section id="voitures" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        V. Conditions qui s'appliquent à la location de voitures
                      </Title>

                      <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <Title level={4} className="text-blue-800 mb-3">
                            Garantie de réservation : non disponible après
                            confirmation
                          </Title>
                          <Paragraph>
                            Si l'agence vous informe qu'elle ne peut pas assurer
                            le service après paiement, nous nous efforçons de
                            trouver un véhicule de remplacement. Si aucune
                            voiture ne peut être fournie, nous fournissons une
                            indemnisation dans la limite du prix de location
                            journalier moyen.
                          </Paragraph>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-lg">
                          <Title level={4} className="text-orange-800 mb-3">
                            Déclassement de modèle de voiture
                          </Title>
                          <Paragraph>
                            Si la voiture fournie est d'un niveau inférieur à
                            celle réservée, contactez notre service clients.
                            Nous négocions un surclassement gratuit ou
                            remboursons la différence (limite de 3 fois le prix
                            journalier moyen) plus une indemnisation
                            correspondante.
                          </Paragraph>
                        </div>
                      </div>
                    </section>

                    <Divider />

                    {/* Transferts */}
                    <section id="transferts" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        VI. Conditions qui s'appliquent à la réservation d'un
                        transfert
                      </Title>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-6">
                        <Title level={4} className="text-gray-800 mb-3">
                          Transferts depuis et vers l'aéroport
                        </Title>
                        <Paragraph>
                          L'aéroport est idéalement situé à environ 15 minutes
                          du centre-ville de Cotonou. Réserver votre transfert à
                          l'avance vous permet d'éviter l'attente et de profiter
                          d'un trajet fluide et sécurisé.
                        </Paragraph>
                      </div>

                      <Title level={4} className="text-gray-700 mb-3">
                        Destinations principales depuis Cotonou :
                      </Title>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <ul className="space-y-2">
                          <li>
                            • <strong>Porto-Novo</strong> - 45 minutes
                          </li>
                          <li>
                            • <strong>Ouidah</strong> - Route des Esclaves
                          </li>
                          <li>
                            • <strong>Abomey</strong> - UNESCO
                          </li>
                          <li>
                            • <strong>Ganvié</strong> - Venise de l'Afrique
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li>
                            • <strong>Grand-Popo</strong> - Station balnéaire
                          </li>
                          <li>
                            • <strong>Natitingou</strong> - Parc de la Pendjari
                          </li>
                          <li>
                            • <strong>Parakou</strong> - Nord du pays
                          </li>
                          <li>
                            • <strong>Abomey-Calavi</strong> - Université
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                        <Title level={4} className="text-blue-800 mb-3">
                          Garanties de service transfert
                        </Title>
                        <ul className="space-y-2">
                          <li>
                            • <strong>Service non disponible :</strong>{" "}
                            Remboursement intégral
                          </li>
                          <li>
                            • <strong>Service non assuré à l'arrivée :</strong>{" "}
                            Organisation d'un nouveau transfert
                          </li>
                          <li>
                            •{" "}
                            <strong>Véhicule de catégorie inférieure :</strong>{" "}
                            Surclassement gratuit ou remboursement
                          </li>
                          <li>
                            • <strong>Retard de vol :</strong> Ajustement
                            gratuit de l'horaire
                          </li>
                        </ul>
                      </div>
                    </section>

                    <Divider />

                    {/* Circuits touristiques */}
                    <section id="circuits" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        VII. Garantie de réservation - Circuits touristiques
                      </Title>

                      <div className="space-y-6">
                        <div className="bg-purple-50 p-6 rounded-lg">
                          <Title level={4} className="text-purple-800 mb-3">
                            Indisponibilité après confirmation
                          </Title>
                          <Paragraph>
                            Si le circuit ne peut être assuré tel que prévu,
                            nous proposons une alternative équivalente ou
                            procédons au remboursement du montant payé.
                          </Paragraph>
                        </div>

                        <div className="bg-indigo-50 p-6 rounded-lg">
                          <Title level={4} className="text-indigo-800 mb-3">
                            Modification ou réduction de programme
                          </Title>
                          <Paragraph>
                            Si une partie du circuit ne peut être réalisée, nous
                            proposons une activité de remplacement de valeur
                            équivalente ou remboursons la différence.
                          </Paragraph>
                        </div>
                      </div>
                    </section>

                    <Divider />

                    {/* Responsabilité */}
                    <section id="responsabilite" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        VIII. Responsabilité
                      </Title>

                      <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                        <Title level={4} className="text-red-800 mb-4">
                          Limitations de responsabilité
                        </Title>
                        <Paragraph>
                          Dans les limites prévues par la loi,{" "}
                          <strong>
                            Dahomey Discovery ne pourra être tenu responsable
                          </strong>
                          d'éventuelles erreurs, omissions ou informations
                          incomplètes publiées sur le site.
                        </Paragraph>
                      </div>

                      <Title level={4} className="text-gray-700 mb-3">
                        Nous déclinons toute responsabilité pour les pertes
                        résultant de :
                      </Title>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>
                          Informations incorrectes fournies lors de la
                          réservation
                        </li>
                        <li>
                          Absence de documents requis (passeport, visa,
                          certificats)
                        </li>
                        <li>Absence de couverture d'assurance adaptée</li>
                        <li>
                          Non-respect des conditions générales du prestataire
                        </li>
                        <li>Événements de force majeure</li>
                        <li>
                          Problèmes techniques indépendants de notre volonté
                        </li>
                      </ul>
                    </section>

                    <Divider />

                    {/* Mentions légales */}
                    <section id="mentions" className="mb-12">
                      <Title
                        level={2}
                        className="text-blue-800 border-b border-blue-200 pb-3 mb-6"
                      >
                        IX. Mentions légales
                      </Title>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Title level={4} className="text-gray-800 mb-3">
                              Informations société
                            </Title>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Raison sociale :</strong> SARL DAHOMEY
                                DISCOVERY
                              </div>
                              <div>
                                <strong>Capital :</strong> 1 000 000 FCFA
                              </div>
                              <div>
                                <strong>RCCM :</strong> RB/COT/25 B 39885
                              </div>
                              <div>
                                <strong>IFU :</strong> 3 2025 8567 6314
                              </div>
                              <div>
                                <strong>Siège social :</strong> COTONOU
                              </div>
                            </div>
                          </div>
                          <div>
                            <Title level={4} className="text-gray-800 mb-3">
                              Direction
                            </Title>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Responsable de publication :</strong>{" "}
                                Zoulfati DERBY
                              </div>
                              <div>
                                <strong>Directeur de publication :</strong>{" "}
                                Zoulfati DERBY
                              </div>
                            </div>

                            <Title
                              level={4}
                              className="text-gray-800 mb-3 mt-6"
                            >
                              Contact
                            </Title>
                            <div className="space-y-2 text-sm">
                              <div>
                                <strong>Téléphone :</strong> +229 0167 110 110
                              </div>
                              <div>
                                <strong>Email :</strong>{" "}
                                reservation@dahomeydiscovery.com
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Footer section */}
                    <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center">
                      <Title level={4} className="text-gray-800 mb-3">
                        Découvrir le Bénin avec sens
                      </Title>
                      <Paragraph className="text-gray-600 mb-4">
                        Pour toute question concernant ces conditions générales,
                        n'hésitez pas à contacter notre équipe.
                      </Paragraph>
                      <Button
                        type="primary"
                        size="large"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Nous contacter
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <Button
            className="fixed bottom-6 right-6 z-50 shadow-lg"
            type="primary"
            shape="circle"
            size="large"
            icon={<UpOutlined />}
            onClick={scrollToTop}
          />
        )}

        <Footer />
      </Flex>

      <style>{`
        .cgv-anchor .ant-anchor-link-title {
          font-size: 14px;
          line-height: 1.4;
        }
        
        .cgv-anchor .ant-anchor-link {
          padding: 4px 0;
        }
        
        /* Custom scrollbar for anchor container */
        .cgv-anchor .ant-anchor-wrapper {
          max-height: none;
        }
        
        /* Scrollbar styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        
        @media print {
          .no-print {
            display: none !important;
          }
        }
        
        .prose h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .prose h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose h4 {
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default CGV;
