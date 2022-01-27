import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PremiumCalculatorRoutingModule } from './premium-calculator-routing.module';
import { PremiumDetailsFormComponent } from './components/premium-details-form/premium-details-form.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PremiumDetailsFormComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PremiumCalculatorRoutingModule
  ],
  exports:[
    PremiumDetailsFormComponent
  ]
})
export class PremiumCalculatorModule { }
