import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { GdevStoreComponent } from './gdev-store-panel.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { GdevCategoryAttributesComponent } from './categories/category-attributes/category-attributes.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: GdevStoreComponent, children:[
    { path: '', component: DashboardComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'attributes/:id', component: GdevCategoryAttributesComponent },
    { path: 'products/add', component: AddProductComponent },
    { path: 'products/edit/:id', component: EditProductComponent },
  ] },
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
