import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GdevStorePanelRoutinModule } from './gdev-store-panel-routing.module';
import { CollapsibleTableModule } from 'src/app/Gdev-Tools/collapsible-table/collapsible-table.module';
import { MaterialModule } from 'src/app/material.module';
import { FormConstructorModule } from 'src/app/Gdev-Tools/form-constructor/form-constructor.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


import { GdevStoreComponent } from './gdev-store-panel.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { DelCategoryComponent } from './categories/del-category/del-category.component';
import { CategoryTableComponent } from './categories/category-table/category-table.component';
import { CategoryFieldsComponent } from './categories/category-fields/category-fields.component';
import { ProductsComponent } from './products/products.component';
import { GdevCategoryAttributesComponent } from './categories/category-attributes/category-attributes.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { DelProdcutComponent } from './products/del-prodcut/del-prodcut.component';
import { GdevToolsModule } from '../../Gdev-Tools/gdev-tools.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { EditAdminComponent } from './admin/edit-admin/edit-admin.component';
import { PageDesignComponent } from './page-design/page-design.component';
import { HeroSliderComponent } from './page-design/hero-slider/hero-slider.component';
import { AddSlideComponent } from './page-design/hero-slider/add-slide/add-slide.component';
import { SlideComponent } from './page-design/hero-slider/slide/slide.component';
import { ProdVarianteComponent } from './products/prod-variante/prod-variante.component';
import { ProdAddonsComponent } from './products/prod-addons/prod-addons.component';
import { ProdDescComponent } from './products/prod-desc/prod-desc.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { StoreConfigComponent } from './store-config/store-config.component';
import { DeliveryConfigComponent } from './store-config/delivery-config/delivery-config.component';
import { BranchesComponent } from './store-config/branches/branches.component';
import { GdevComponentsModule } from '../../gdev-components/gdev-components.module';
import { BranchLocationComponent } from './store-config/branches/branch-location/branch-location.component';
import { BranchFormComponent } from './store-config/branches/branch-form/branch-form.component';
import { PayMethodConfigComponent } from './store-config/pay-method-config/pay-method-config.component';
import { PedidosComponent } from "./pedidos/pedidos.component";
import { PedidoComponent } from "./pedidos/pedido/pedido.component";
import { ClienteComponent } from './clientes/cliente/cliente.component';


@NgModule( {
  declarations: [
    GdevStoreComponent,
    CategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    DelCategoryComponent,
    CategoryTableComponent,
    CategoryFieldsComponent,
    ProductsComponent,
    GdevCategoryAttributesComponent,
    AddProductComponent,
    EditProductComponent,
    DelProdcutComponent,
    DashboardComponent,
    LoginComponent,
    AdminComponent,
    TopbarComponent,
    AddAdminComponent,
    EditAdminComponent,
    PageDesignComponent,
    HeroSliderComponent,
    AddSlideComponent,
    SlideComponent,
    ProdVarianteComponent,
    ProdAddonsComponent,
    ProdDescComponent,
    ContactoComponent,
    ClientesComponent,
    StoreConfigComponent,
    DeliveryConfigComponent,
    BranchesComponent,
    BranchLocationComponent,
    BranchFormComponent,
    PayMethodConfigComponent,
    PedidosComponent,
    PedidoComponent,
    ClienteComponent,
  ],
  imports: [
    CommonModule,
    GdevStorePanelRoutinModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GdevToolsModule,
    GdevComponentsModule,
    NgxMaterialTimepickerModule
  ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent,
    DelCategoryComponent,
    AddAdminComponent,
    EditAdminComponent,
    AddSlideComponent
  ],
  exports: [
    GdevStoreComponent
  ]
})
export class GdevStorePanelModule { }
