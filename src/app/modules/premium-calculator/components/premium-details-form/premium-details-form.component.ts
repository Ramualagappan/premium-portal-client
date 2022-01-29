import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PremiumService, AlertService } from '../../../../services';
@Component({
  selector: 'app-premium-details-form',
  templateUrl: './premium-details-form.component.html',
  styleUrls: ['./premium-details-form.component.scss']
})
export class PremiumDetailsFormComponent implements OnInit {
  occupationList: any;
  form: FormGroup;
  loading = false;
  submitted = false;
  myDateValue: string;
  totalPremiumAmount: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private premiumService: PremiumService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.myDateValue = new Date().toISOString().slice(0, 10);
    this.getOccupationDetails();

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      age: [null, Validators.required],
      occupation: [null, Validators.required],
      deathsuminsured: [null, Validators.required],
      dob: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.calculatePremium();

  }


  private getOccupationDetails() {
    this.premiumService.getOccupationDetails()
      .pipe()
      .subscribe(
        data => {
          this.occupationList = data;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  private calculatePremium() {
    this.premiumService.register(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.totalPremiumAmount = data;
          this.alertService.success('User added successfully', { keepAfterRouteChange: true });
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  CalculateAge() {
    if (this.form.controls.dob.value) {
      let newDate = new Date(this.form.controls.dob.value);
      var timeDiff = Math.abs(Date.now() - newDate.getTime());
      //Used Math.floor instead of Math.ceil
      //so 29 years and 140 days would be considered as 29, not 27.
      this.form.controls.age.setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
    }
  }

  onOccupationChange(event) {
    const value = event.target.value;

    if (this.form.valid) {
      this.calculatePremium();
    }
    console.log(value);
  }
  resetForm() {
    this.form.reset();
    this.totalPremiumAmount = null;
  }
}
