import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PayMethodsService } from '../../../panel/store-config/pay-method-config/pay-methods.service';

@Component({
  selector: 'gdev-pay-methods',
  templateUrl: './pay-methods.component.html',
  styleUrls: ['./pay-methods.component.scss']
})
export class PayMethodsComponent implements OnInit {

  avalibleMethods: string[] = []
  @Output() methodSelected: EventEmitter<string> = new EventEmitter()

  constructor (
    public payConfigS: PayMethodsService
  ) { }

  ngOnInit(): void {
    this.getMethods()
  }

  async getMethods() {
    const config = await this.payConfigS.getAvalibleMethods();
    this.avalibleMethods = config.avalibleMethods
  }


  onExpand( item ) {
    console.log('Método de pago: ', item);
    this.methodSelected.emit(item)
  }

  
  

}
