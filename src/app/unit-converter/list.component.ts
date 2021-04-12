import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnitService, UnitSignalRService } from '../_services';
import { Unit, User } from '../_models';
import { AccountService } from '../_services';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  form: FormGroup;
  unitResult: Unit = new Unit();
  landmarkSubscription: Subscription;
  unit: Unit = new Unit();
  processing: boolean = false;
  user: User;
  metricInfo: string = '';
  imperialInfo: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private landmarkService: UnitService,
    public landmarkSignalRService: UnitSignalRService,
    private accountService: AccountService) 
    {
       this.user = this.accountService.userValue;
    }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      metric: ['0'],
      imperial: ['0'],
      type: ['temp'],
    });
    
    this.updateTypeInfoUI('temp');
    
    this.landmarkSignalRService.startConnection();
    this.landmarkSignalRService.addListener();
    
    this.landmarkSubscription = this.landmarkSignalRService.onData()
    .subscribe(data => {
      this.processing = false;
      this.unitResult = data;

      let result = data.result;

      if(data.toMetric){
        this.form.patchValue({
          metric: result
        });
      }
      else{
        this.form.patchValue({
          imperial: result
        });
      }
    });

  }

  onChange(newValue) {
    this.updateTypeInfoUI(newValue);

    this.form.patchValue({
      metric: 0,
      imperial: 0
    });
  }

  updateTypeInfoUI(value: string){
    let type = value || this.form.get('type').value;

    if(type == 'temp'){
      this.metricInfo = 'Celcius';
      this.imperialInfo = 'Farenheit';
    }
    else if(type == 'length'){
      this.metricInfo = 'Meters';
      this.imperialInfo = 'Yards';
    }
    else if(type == 'mass'){
      this.metricInfo = 'Kilograms';
      this.imperialInfo = 'Pounds';
    }
    else if(type == 'power'){
      this.metricInfo = 'Kilowatt';
      this.imperialInfo = 'horsepower';
    }
    else if(type == 'volume'){
      this.metricInfo = 'Cubic meter';
      this.imperialInfo = 'Cubic foot';
    }
  }


  ngOnSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.processing = true;

    //clear the results
    this.unit = new Unit();

    let m = this.form.get('imperial').value;

    if(m != 0){
      this.unit.toMetric = true;
      this.unit.unit = this.form.get('imperial').value;
    }
    else{
      this.unit.toMetric = false;
      this.unit.unit = this.form.get('metric').value;
    }

    if(this.user)
      this.unit.userId = parseInt(this.user.id);
    
    let type = this.form.get('type').value;
    
    this.landmarkService.convert(this.unit, type)
      .pipe(first())
      .subscribe();
  }

  onKeypressEvent(event: any){

    let el = event.target.getAttribute('formControlName');

    if(el == "metric"){
      this.form.patchValue({
        imperial: 0
      });
    }
    else{
      this.form.patchValue({
        metric: 0
      });
    }
  }

  ngOnDestroy() {
    this.landmarkSignalRService.stopConnection();
  }

}
