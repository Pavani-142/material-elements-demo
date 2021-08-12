import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { CardComponent } from './components/card/card.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { SnackbarComponent, CustomSnackBarComponent } from './components/snackbar/snackbar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogExampleComponent } from './components/dialog-example/dialog-example.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { ListOfSchoolsComponent } from './components/list-of-schools/list-of-schools.component';
import { DataTableGroupComponent } from './components/data-table-group/data-table-group.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { ClassComponent } from './components/class/class.component';
import { EditClassComponent } from './components/edit-class/edit-class.component';
import { NewAddClassComponent } from './components/new-add-class/new-add-class.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { DynamicSchoolTableComponent } from './components/dynamic-school-table/dynamic-school-table.component';
import { TableFeatureComponent } from './components/table-feature/table-feature.component';
import { PerformanceTabComponent } from './components/performance-tab/performance-tab.component';
import { CustomTooltipComponent } from './components/custom-tooltip/custom-tooltip.component';
import { MyDirective } from './components/custom-tooltip/custom-tooltip.directive';
import { OverlayComponent } from './components/overlay/overlay.component';
import { SelectAutoCompleteComponent } from './components/select-auto-complete/select-auto-complete.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { AssesmentsAutoCompleteComponent } from './components/assesments-auto-complete/assesments-auto-complete.component';
import { RadioCardComponent } from './components/radio-card/radio-card.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatSnackBarModule, MatDialogModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule, MatAutocompleteModule, MatProgressBarModule } from '@angular/material';
import { FlexDemoComponent } from './components/flex-demo/flex-demo.component';
import { TextAreaResizeComponent } from './components/text-area-resize/text-area-resize.component';
import { ImageDemoComponent } from './components/image-demo/image-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpansionComponent,
    AccordionComponent,
    CardComponent,
    TabsComponent,
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    DatePickerComponent,
    ToolTipComponent,
    SnackbarComponent,
    CustomSnackBarComponent,
    DialogComponent,
    DialogExampleComponent,
    DataTableComponent,
    DragDropComponent,
    ListOfSchoolsComponent,
    DataTableGroupComponent,
    AddClassComponent,
    ClassComponent,
    EditClassComponent,
    NewAddClassComponent,
    DynamicTableComponent,
    DynamicSchoolTableComponent,
    TableFeatureComponent,
    PerformanceTabComponent,
    CustomTooltipComponent,
    MyDirective,
    OverlayComponent,
    SelectAutoCompleteComponent,
    AutoCompleteComponent,
    AssesmentsAutoCompleteComponent,
    RadioCardComponent,
    FlexDemoComponent,
    TextAreaResizeComponent,
    ImageDemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    OverlayModule,
    MatAutocompleteModule,
    MatProgressBarModule
  ],
  providers: [], 
  bootstrap: [AppComponent],
  entryComponents: [CustomSnackBarComponent, DialogExampleComponent, ClassComponent, NewAddClassComponent]
})
export class AppModule { }
