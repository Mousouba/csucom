import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
{
    path: '/dashboard/dashboard1',
    title: 'Accueil',
    icon: 'icon-Home',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Resumé prescriptions',
    icon: 'fas fa-stethoscope',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/tables/prescripteur',
        title: 'Liste des prescripteurs',
        icon: '',
        class: '',
        extralink: false, 
        submenu: []
      },
      {
        path: '/tables/prescription',
        title: 'Liste des prescriptions',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Caisse de la pharmacie',
    icon: 'icon-Hospital',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/ecom/products',
        title: 'Vente au comptant',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/observation',
        title: 'Mise en observation',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/journal',
        title: 'Journal des ventes',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '',
        title: 'Articles',
        icon: '',
        class: 'right-title',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/famille',
        title: 'Saisie de grandes familles',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/article',
        title: 'Saisie des articles',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/ecom/orders',
        title: 'Inventaire des articles',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'Caisse entrée générale',
    icon: 'icon-Checkout',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/tables/patient',
        title: 'Liste des patients',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/caisse',
        title: 'Journal de la caisse',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '',
        title: 'Etat général des recettes',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '/tables/panneau',
    title: 'Panneau d\'administration',
    icon: 'ti-settings',
    class: '',
    extralink: false,
    submenu: []
  }
];
