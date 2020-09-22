import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { GdevStoreComponent } from './gdev-store-panel.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { GdevCategoryAttributesComponent } from './categories/category-attributes/category-attributes.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HeroSliderComponent } from './page-design/hero-slider/hero-slider.component';
import { GdevSliderConfigComponent } from '../../Gdev-Tools/gdev-slider/gdev-slider-config/gdev-slider-config.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path: '', component: GdevStoreComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: '/panel/inicio' },
    { path: 'inicio', component: DashboardComponent },
    { path: 'contacto', component: ContactoComponent },
    
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'attributes/:id', component: GdevCategoryAttributesComponent },
    { path: 'products/add', component: AddProductComponent },
    { path: 'products/edit/:id', component: EditProductComponent },
    
    { path: 'admins', component: AdminComponent },
    
    { path: 'slider', component: HeroSliderComponent },
    { path: 'slider-config', component: GdevSliderConfigComponent },
    { path: 'clientes', component: ClientesComponent },
  ]
  },
  { path: 'login', component: LoginComponent },
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'disabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GdevStorePanelRoutinModule { }
