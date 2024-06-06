import { NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
// import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormGroup, FormControl } from '@angular/forms';


// import { MatTabsModule } from '@angular/material';

import { HeaderComponent } from './UI/header/header.component';
import { FooterComponent } from './UI/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FrequencyObjectComponent } from './objects/frequency-object/frequency-object.component';
import { TenantsComponent } from './objects/Tenants/Tenants.component';
import { ProfessionalsComponent } from './objects/Professionals/Professionals.component';
import { TasksComponent } from './objects/Tasks/Tasks.component';
import { ExpensesComponent } from './objects/Expenses/Expenses.component';
import { InsertionsComponent } from './objects/Insertions/Insertions.component';
import { FrequenciesComponent } from './objects/Frequencies/Frequencies.component';
import { ManageComponent } from './objects/Manager/Manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { ShowFrequenciesComponent } from './show/show-Frequencies/show-Frequencies.component';
import { ShowExpensesComponent } from './show/show-Expenses/show-Expenses.component';
import { ShowTasksComponent } from './show/show-Tasks/show-Tasks.component';
import { FilterPipe2 } from './pipes/filter2.pipe';
import { HomeComponent } from './UI/home/home.component';
import { FilterPipe3 } from './pipes/filter3.pipe';
import { ChartModule } from 'angular2-chartjs';
import { MatTableModule } from '@angular/material/table';
import { StatisticsComponent } from './objects/statistics/statistics.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MaterialExampleModule } from './material.module';
import { ManageIntComponent } from './objects/ManagerInt/ManageInt.component';
import { ManageExpComponent } from './objects/ManagerExp/ManageExp.component';
import { MatDialogModule } from '@angular/material/dialog';
const materialModules: any[] = [
  MatTableModule,
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
  MaterialExampleModule,
  MatCheckboxModule
];
// import { NgChartsModule } from 'ng2-charts';
// import {MatGridListModule} from '@angular/primeng';
// import {AccordionModule,MenuItem} from 'primeng/*';
const route: Routes = [
{path:'Home',component:HomeComponent},
  { path: 'Tenants', component: TenantsComponent },
  { path: 'Frequencies', component: FrequenciesComponent },
  { path: 'Professionals', component: ProfessionalsComponent },
  { path: 'Tasks', component: TasksComponent },
  { path: 'Expenses', component: ExpensesComponent },
  { path: 'Insertions', component: InsertionsComponent },
  { path: 'ManagerHome', component: ManageExpComponent },
  { path: 'Manager', component: ManageComponent },
]
@NgModule({
  imports: [
    ChartModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    BrowserModule, 
    BrowserAnimationsModule,
    ...materialModules,
    RouterModule.forRoot(route),
    HttpClientModule,
    NgbModule,
    MatDialogModule
    // NgModel,
    // NgForm,
    // FormGroup
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrequenciesComponent,
    ProfessionalsComponent,
    InsertionsComponent,
    TasksComponent,
    TenantsComponent,
    StatisticsComponent,
    ManageExpComponent,
    HomeComponent,
    ExpensesComponent,
    ManageComponent,
    ManageIntComponent,
    FilterPipe,
    FilterPipe2,
    FilterPipe3,
    ShowFrequenciesComponent,
    ShowExpensesComponent,
    ShowTasksComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
