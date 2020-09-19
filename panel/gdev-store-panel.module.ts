import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GdevStorePanelRoutinModule } from './gdev-store-panel-routing.module';
import { CollapsibleTableModule } from 'src/app/Gdev-Tools/collapsible-table/collapsible-table.module';
import { MaterialModule } from 'src/app/material.module';
import { FormConstructorModule } from 'src/app/Gdev-Tools/form-constructor/form-constructor.module';


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
    TopbarComponent
  ],
  imports: [
    CommonModule,
    GdevStorePanelRoutinModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    GdevToolsModule,
  ],
  entryComponents: [
    AddCategoryComponent,
    EditCategoryComponent,
    DelCategoryComponent
  ],
  exports: [
    GdevStoreComponent
  ]
})
export class GdevStorePanelModule { }
