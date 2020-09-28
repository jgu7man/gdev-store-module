import { Component, OnInit } from '@angular/core';
import { PayConfigModel } from './pay-config.model';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PayMethodsService } from './pay-methods.service';

@Component({
  selector: 'gdev-pay-method-config',
  templateUrl: './pay-method-config.component.html',
  styleUrls: ['./pay-method-config.component.scss']
})
export class PayMethodConfigComponent implements OnInit {

  payConfig: PayConfigModel

  constructor (public payConfigS: PayMethodsService) {
    this.payConfig = new PayConfigModel([])
   }

  ngOnInit(): void {
    this.getConfig()
  }

  async getConfig() {
    var config = await this.payConfigS.getAvalibleMethods()
    if ( config ) { this.payConfig = config }
  }

  toggleMethod(element: MatSlideToggle, change: MatSlideToggleChange) {
    console.log( element.ariaLabel, change );
    if ( change.checked ) {
      this.payConfig.avalibleMethods.push(element.ariaLabel)
    } else {
      let i = this.payConfig.avalibleMethods.findIndex(
        m => m === element.ariaLabel )
      console.log(i);
      this.payConfig.avalibleMethods.splice( i, 1 )
      
    }
    this.payConfigS.savePayConfig(this.payConfig)
  }

}
