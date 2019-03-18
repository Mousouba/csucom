import { Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { OrderComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';

export const EcomRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent,
        data: {
          title: 'Panier d\'achat ',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Cart' }]
        }
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Checkout',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Checkout' }
          ]
        }
      },
      {
        path: 'details',
        component: DetailsComponent,
        data: {
          title: 'Product Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Product Details' }
          ]
        }
      },
      {
        path: 'edit',
        component: EditComponent,
        data: {
          title: 'Edit Product',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Edit Product' }
          ]
        }
      },
      {
        path: 'orders',
        component: OrderComponent,
        data: {
          title: 'Inventaire des articles',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Inventaire des articles' }]
        }
      },
      {
        path: 'products',
        component: ProductComponent,
        data: {
          title: 'Vente au comptant',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Vente au comptant' }
          ]
        }
      }
    ]
  }
];
