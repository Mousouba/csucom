import { Routes } from '@angular/router';

import { PrescripteurComponent } from './prescripteur/prescripteur.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ObservationComponent } from './observation/observation.component';
import { CorrectionComponent } from './correction/correction.component';
import { JournalComponent } from './journal/journal.component';
import { ArrivageComponent } from './arrivage/arrivage.component';
import { FamilleComponent } from './famille/famille.component';
import { ArticleComponent } from './article/article.component';
import { SaisiefournisseurComponent } from './saisiefournisseur/saisiefournisseur.component';
import { PatientComponent } from './patient/patient.component';
import { SaisiepatientComponent } from './saisiepatient/saisiepatient.component';
import { CaisseComponent } from './caisse/caisse.component';
import { PanneauComponent } from './panneau/panneau.component';
import { CompteComponent } from './compte/compte.component';

export const TablesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'prescripteur',
        component: PrescripteurComponent,
        data: {
          title: 'Liste des prescripteurs',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des prescripteurs' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'prescription',
        component: PrescriptionComponent,
        data: {
          title: 'Liste des prescriptions',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des prescriptions' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'observation',
        component: ObservationComponent,
        data: {
          title: 'Mise en observation',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des prescriptions' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'correction',
        component: CorrectionComponent,
        data: {
          title: 'Correction de stocks',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des prescriptions' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'journal',
        component: JournalComponent,
        data: {
          title: 'Journal des ventes',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des prescriptions' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'caisse',
        component: CaisseComponent ,
        data: {
          title: 'Journal de la caisse ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Journal de la caisse' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'arrivage',
        component: ArrivageComponent,
        data: {
          title: 'Arrivages',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Liste des prescriptions' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'famille',
        component: FamilleComponent,
        data: {
          title: 'Saisie de grande famille',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Bons de commande fournisseur' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'article',
        component: ArticleComponent,
        data: {
          title: 'Saisie d\'article ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Bons de commande fournisseur' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'saisiefournisseur',
        component: SaisiefournisseurComponent,
        data: {
          title: 'Saisie de fournisseurs ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Bons de commande fournisseur' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'patient',
        component: PatientComponent,
        data: {
          title: 'Liste des patients ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Bons de commande fournisseur' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'saisiepatient',
        component: SaisiepatientComponent,
        data: {
          title: 'Saisie de patients ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Bons de commande fournisseur' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'panneau',
        component: PanneauComponent,
        data: {
          title: 'Saisie de patients ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Panneau d\'administration' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'compte',
        component: CompteComponent,
        data: {
          title: 'Creation de compte utilisateur ',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Creationde compte utilisateur' }
          ]
        }
      }
    ]
  }
];
