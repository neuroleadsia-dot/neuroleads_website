import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ArrowLeft, Scale, Shield, FileText, Mail } from 'lucide-react';

interface LegalPageProps {
  type: 'mentions' | 'cgv' | 'confidentialite';
}

const content = {
  mentions: {
    title: 'Mentions Légales',
    icon: Scale,
    sections: [
      {
        title: '1. Éditeur du site',
        content: `Le site NeuroLeads est édité par :

ROUIJEL REDA
Entrepreneur Individuel
SIRET : 100 065 440 00016
18 rue de Cabrières
30320 Saint-Gervasy
France

Téléphone : 07 69 57 67 60 / 07 81 89 39 35
Email : neuroleads.ia@gmail.com

TVA non applicable – article 293 B du CGI`
      },
      {
        title: '2. Directeur de la publication',
        content: `Le directeur de la publication est :
ROUIJEL REDA`
      },
      {
        title: '3. Hébergeur',
        content: `Le site est hébergé par :

OVHcloud
SAS au capital de 10 069 020 €
RCS Lille Métropole 424 761 419 00045
Siège social : 2 rue Kellermann, 59100 Roubaix, France`
      },
      {
        title: '4. Propriété intellectuelle',
        content: `L'ensemble du contenu du site NeuroLeads (textes, images, logos, vidéos, etc.) est protégé par le droit de la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite sans l'autorisation écrite préalable de ROUIJEL REDA.

Toute exploitation non autorisée du site ou de son contenu engage la responsabilité de l'utilisateur et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.`
      },
      {
        title: '5. Liens hypertextes',
        content: `Le site peut contenir des liens hypertextes vers d'autres sites internet. ROUIJEL REDA n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.`
      },
      {
        title: '6. Limitation de responsabilité',
        content: `ROUIJEL REDA s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, il ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur le site.

En conséquence, ROUIJEL REDA décline toute responsabilité :
- Pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site
- Pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le site
- Et plus généralement, pour tous dommages, directs ou indirects, quelles qu'en soient les causes, origines, natures ou conséquences`
      },
      {
        title: '7. Droit applicable',
        content: `Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront compétents.`
      },
      {
        title: '8. Contact',
        content: `Pour toute question concernant le site, vous pouvez nous contacter :

Par email : neuroleads.ia@gmail.com
Par téléphone : 07 69 57 67 60 / 07 81 89 39 35`
      }
    ]
  },
  cgv: {
    title: 'Conditions Générales de Vente',
    icon: FileText,
    sections: [
      {
        title: '1 – Identification du prestataire',
        content: `ROUIJEL REDA
Entrepreneur Individuel
SIRET : 100 065 440 00016
18 rue de Cabrières
30320 Saint-Gervasy
TVA non applicable – article 293 B du CGI

Les présentes CGV s'appliquent exclusivement aux professionnels (B2B).`
      },
      {
        title: '2 – Objet',
        content: `Les présentes CGV régissent les prestations suivantes :
• Conseil en intelligence artificielle
• Conception d'agents IA
• Automatisation de processus
• Intégration API
• Développement de scripts et workflows
• Maintenance technique

Toute commande implique l'acceptation sans réserve des présentes CGV.`
      },
      {
        title: '3 – Obligation de moyens',
        content: `Le Prestataire est tenu à une obligation de moyens.

Les technologies d'intelligence artificielle étant par nature probabilistes et évolutives :
• Aucun résultat exact ou constant ne peut être garanti
• Aucune performance commerciale n'est promise
• Les résultats peuvent varier selon les données et usages

Le Client reconnaît avoir été informé de ces caractéristiques avant la conclusion du contrat.`
      },
      {
        title: '4 – Recours à des services tiers',
        content: `Les prestations peuvent s'appuyer notamment sur :
• OpenAI
• Anthropic
• Zapier
• Make
• Twilio
• GitHub

Le Client reconnaît que :
• Ces services peuvent évoluer ou être interrompus
• Ils peuvent être hébergés hors Union Européenne
• Le Prestataire ne contrôle ni leur disponibilité ni leurs politiques internes

Aucune responsabilité ne pourra être engagée en cas de défaillance d'un service tiers.`
      },
      {
        title: '5 – Commande et formation du contrat',
        content: `Toute prestation fait l'objet :
• D'un devis personnalisé
• D'une validation écrite (email ou signature)
• Du paiement d'un acompte de 30% si prévu

Le contrat est formé à réception de l'acceptation du devis par le Client.

Les délais de réalisation sont indicatifs et communiqués dans le devis.`
      },
      {
        title: '6 – Tarifs et paiement',
        content: `Les tarifs sont fixés sur devis, après diagnostic des besoins du Client.

Modalités de paiement :
• Acompte de 30% à la commande
• Solde à la livraison ou selon échéancier convenu
• Virement bancaire ou autres moyens convenus

En cas de retard de paiement :
• Pénalités de retard : taux d'intérêt légal en vigueur
• Indemnité forfaitaire de recouvrement : 40€ (art. L441-10 Code de commerce)

Le Prestataire se réserve le droit de suspendre l'exécution des prestations en cas d'impayé.`
      },
      {
        title: '7 – Maintenance et support',
        content: `Une maintenance mensuelle peut être proposée selon les termes du contrat.

La maintenance inclut :
• Corrections de bugs
• Mises à jour de sécurité
• Support technique

Résiliation de la maintenance : préavis de 30 jours.

L'intervention sur des problèmes causés par le Client ou des tiers peut être facturée en sus.`
      },
      {
        title: '8 – Propriété intellectuelle',
        content: `Les développements spécifiques réalisés pour le Client lui sont transférés après paiement intégral de la prestation.

Le Prestataire conserve :
• Son savoir-faire et expertise
• Les briques génériques et réutilisables
• Les méthodologies et frameworks
• Le droit de réutiliser ces éléments pour d'autres clients

Les outils tiers (OpenAI, etc.) restent la propriété de leurs éditeurs respectifs.`
      },
      {
        title: '9 – Responsabilité',
        content: `La responsabilité du Prestataire est strictement limitée au montant total payé par le Client au titre de la prestation concernée.

Sont expressément exclus de la responsabilité du Prestataire :
• Pertes indirectes ou immatérielles
• Perte d'exploitation ou de chiffre d'affaires
• Perte de données (sauvegarde recommandée)
• Dommages résultant de décisions automatisées
• Usage non conforme ou détourné des solutions
• Défaillances des services tiers
• Cas de force majeure

Le Client est responsable de :
• La légalité des données qu'il fournit
• L'obtention des consentements nécessaires (RGPD)
• La sauvegarde de ses données`
      },
      {
        title: '10 – Données personnelles (RGPD)',
        content: `10.1 – Rôle
Lorsque le Prestataire traite des données pour le Client, il agit en qualité de sous-traitant au sens du RGPD. Le Client demeure responsable de traitement.

10.2 – Obligations du Client
Le Client garantit :
• Disposer d'une base légale pour le traitement
• Avoir informé les personnes concernées
• Ne pas transmettre de données illicites

10.3 – Mesures de sécurité
Le Prestataire met en œuvre :
• Accès restreints et authentifiés
• Sécurisation des environnements
• Hébergement sécurisé (OVHcloud)

10.4 – Transferts hors UE
Le Client est informé que certains outils utilisés (OpenAI, etc.) peuvent entraîner un transfert de données hors Union Européenne. Ces transferts sont encadrés par les mécanismes juridiques prévus par le RGPD.`
      },
      {
        title: '11 – Confidentialité',
        content: `Chaque partie s'engage à conserver confidentielles les informations stratégiques, commerciales et techniques obtenues dans le cadre de la prestation.

Cette obligation de confidentialité perdure pendant toute la durée du contrat et 3 ans après sa résiliation.`
      },
      {
        title: '12 – Force majeure',
        content: `Les parties ne seront pas tenues pour responsables de tout retard ou manquement dû à un cas de force majeure au sens de l'article 1218 du Code civil.

Sont notamment considérés comme cas de force majeure : catastrophes naturelles, grèves, émeutes, guerres, pannes réseau ou serveur indépendantes de la volonté du Prestataire, défaillance des services tiers.`
      },
      {
        title: '13 – Résiliation',
        content: `En cas de manquement grave de l'une des parties aux obligations du contrat, l'autre partie pourra résilier de plein droit après mise en demeure restée sans effet pendant 15 jours.

En cas de résiliation, les prestations déjà réalisées restent dues au prorata.`
      },
      {
        title: '14 – Droit applicable et juridiction',
        content: `Les présentes CGV sont soumises au droit français.

En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire.

À défaut d'accord amiable, le litige sera porté devant les tribunaux compétents du ressort du domicile du Prestataire (Nîmes).`
      }
    ]
  },
  confidentialite: {
    title: 'Politique de Confidentialité',
    icon: Shield,
    sections: [
      {
        title: '1 – Responsable du traitement',
        content: `Le responsable du traitement des données personnelles est :

ROUIJEL REDA
Entrepreneur Individuel
SIRET : 100 065 440 00016
18 rue de Cabrières
30320 Saint-Gervasy

Contact : neuroleads.ia@gmail.com`
      },
      {
        title: '2 – Données collectées',
        content: `Nous collectons les catégories de données suivantes :

• Données d'identification : nom, prénom
• Données de contact : email, téléphone
• Données professionnelles : entreprise, poste
• Données contractuelles : prestations demandées, devis
• Données techniques : adresse IP, cookies
• Données de facturation (le cas échéant)

Nous ne collectons pas de données sensibles (origine raciale, opinions politiques, religieuses, etc.).`
      },
      {
        title: '3 – Finalités du traitement',
        content: `Vos données sont collectées pour les finalités suivantes :

• Gestion des demandes et devis
• Exécution des prestations contractuelles
• Facturation et comptabilité
• Communication et suivi client
• Sécurité de nos services
• Respect des obligations légales

Nous ne traitons vos données que pour les finalités pour lesquelles elles ont été collectées.`
      },
      {
        title: '4 – Bases légales',
        content: `Le traitement de vos données repose sur les bases légales suivantes :

• Exécution du contrat (article 6.1.b RGPD) : pour les prestations demandées
• Intérêt légitime (article 6.1.f RGPD) : pour la prospection commerciale
• Obligation légale (article 6.1.c RGPD) : pour la comptabilité
• Consentement (article 6.1.a RGPD) : pour les cookies non essentiels`
      },
      {
        title: '5 – Durée de conservation',
        content: `Nous conservons vos données pendant les durées suivantes :

• Prospects (demande de devis sans suite) : 3 ans à compter du dernier contact
• Clients : durée contractuelle + 5 ans à des fins probatoires
• Données comptables : 10 ans (obligation légale)
• Données techniques (logs) : 1 an

Passé ces délais, vos données sont supprimées ou anonymisées.`
      },
      {
        title: '6 – Destinataires des données',
        content: `Vos données peuvent être transmises aux destinataires suivants :

• Le personnel habilité de NeuroLeads
• Nos sous-traitants techniques (hébergement OVHcloud)
• Les autorités compétentes en cas de réquisition légale

Nous ne vendons ni ne louons vos données à des tiers.`
      },
      {
        title: '7 – Transferts hors Union Européenne',
        content: `Certains outils que nous utilisons (OpenAI, etc.) peuvent entraîner un transfert de données hors Union Européenne (notamment aux États-Unis).

Ces transferts sont encadrés par :
• Les clauses contractuelles types de la Commission européenne
• Les décisions d'adéquation lorsqu'elles existent
• Les garanties appropriées conformément au RGPD

Nous veillons à ce que ces transferts respectent les exigences du RGPD.`
      },
      {
        title: '8 – Vos droits',
        content: `Conformément au RGPD, vous disposez des droits suivants :

• Droit d'accès : obtenir une copie de vos données
• Droit de rectification : corriger des données inexactes
• Droit à l'effacement : demander la suppression de vos données
• Droit à la limitation : restreindre le traitement
• Droit d'opposition : vous opposer au traitement
• Droit à la portabilité : recevoir vos données dans un format structuré

Pour exercer ces droits, contactez-nous :
• Email : neuroleads.ia@gmail.com
• Adresse : 18 rue de Cabrières, 30320 Saint-Gervasy

Nous répondons dans un délai maximum d'un mois.`
      },
      {
        title: '9 – Sécurité des données',
        content: `Nous mettons en œuvre les mesures techniques et organisationnelles suivantes :

• Hébergement sécurisé chez OVHcloud (certifié ISO 27001)
• Accès restreints et authentification
• Chiffrement des données en transit (HTTPS/TLS)
• Sauvegardes régulières
• Formation et sensibilisation

En cas de violation de données, nous vous en informerons dans les meilleurs délais.`
      },
      {
        title: '10 – Cookies',
        content: `Notre site utilise les cookies suivants :

• Cookies essentiels : fonctionnement du site (pas de consentement requis)
• Cookies de mesure d'audience : statistiques anonymes
• Cookies de préférences : mémorisation de vos choix

Vous pouvez gérer vos préférences cookies via les paramètres de votre navigateur.`
      },
      {
        title: '11 – Modifications',
        content: `Nous nous réservons le droit de modifier la présente politique de confidentialité. Toute modification sera publiée sur cette page avec la date de mise à jour.

Nous vous encourageons à consulter régulièrement cette page.`
      },
      {
        title: '12 – Contact',
        content: `Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits :

Email : neuroleads.ia@gmail.com
Adresse : 18 rue de Cabrières, 30320 Saint-Gervasy

Vous pouvez également contacter la CNIL :
https://www.cnil.fr`
      }
    ]
  }
};

export function LegalPage({ type }: LegalPageProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const pageContent = content[type];
  const Icon = pageContent.icon;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#B8B8C8] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </button>
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4AA] flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-white font-semibold">NeuroLeads</span>
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0066FF]/10 mb-6">
              <Icon className="w-8 h-8 text-[#0066FF]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {pageContent.title}
            </h1>
            <p className="text-[#6B6B7B]">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>

          <div className="space-y-8">
            {pageContent.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#12121A] rounded-2xl border border-white/5 p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div className="text-[#B8B8C8] whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-[#6B6B7B] mb-4">
              Une question concernant ces documents ?
            </p>
            <a
              href="mailto:neuroleads.ia@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white font-medium rounded-lg transition-colors"
            >
              <Mail className="w-5 h-5" />
              Nous contacter
            </a>
          </motion.div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#0A0A0F] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#6B6B7B] text-sm">
            © 2024 NeuroLeads. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}
