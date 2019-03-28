import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { TablesRoutes } from './tables.routing';
import { PrescripteurComponent } from './prescripteur/prescripteur.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ObservationComponent } from './observation/observation.component';
import { CorrectionComponent } from './correction/correction.component';
import { JournalComponent } from './journal/journal.component';
import { ArrivageComponent } from './arrivage/arrivage.component';
import { BonComponent } from './bon/bon.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { FamilleComponent } from './famille/famille.component';
import { ArticleComponent } from './article/article.component';
import { SaisiefournisseurComponent } from './saisiefournisseur/saisiefournisseur.component';
import { PatientComponent } from './patient/patient.component';
import { SaisiepatientComponent } from './saisiepatient/saisiepatient.component';



import { SmarttableComponent } from './smart-table/smart-table.component';
import { BasictableComponent } from './basic/basic.component';
import { DarktableComponent } from './dark-basic/dark.component';
import { ColortableComponent } from './color-table/color.component';
import { TablesizeComponent } from './sizing/size.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule.forChild(TablesRoutes),
    CommonModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    FormsModule
  ],
  declarations: [
    PrescripteurComponent,
    PrescriptionComponent,
    BasictableComponent,
    DarktableComponent,
    ColortableComponent,
    TablesizeComponent,
    SmarttableComponent,
    ObservationComponent,
    CorrectionComponent,
    JournalComponent,
    ArrivageComponent,
    BonComponent,
    FournisseurComponent,
    FamilleComponent,
    ArticleComponent,
    SaisiefournisseurComponent,
    PatientComponent,
    SaisiepatientComponent 
  ]
})
export class TablesModule {}
