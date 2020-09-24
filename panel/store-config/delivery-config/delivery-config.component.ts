import { Component, OnInit } from '@angular/core';

import { StoreConfigService } from '../store-config.service';
import { DeliveryConfig } from './delivery-config.model';

@Component({
  selector: 'gdev-delivery-config',
  templateUrl: './delivery-config.component.html',
  styleUrls: ['./delivery-config.component.scss']
})
export class DeliveryConfigComponent implements OnInit {

  deliveryConfig: DeliveryConfig

  constructor (
    public storeConfig: StoreConfigService
  ) {
    this.deliveryConfig = new DeliveryConfig(0)
    this.getConfig()
   }

  ngOnInit(): void {
  }

  async getConfig() {
    this.deliveryConfig = await this.storeConfig.getDeliveryConfig()
  }

  

}


