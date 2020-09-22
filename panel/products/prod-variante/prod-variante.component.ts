import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProdVariante, Addon } from '../product.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'gdev-prod-variante',
  templateUrl: './prod-variante.component.html',
  styleUrls: ['./prod-variante.component.scss']
})
export class ProdVarianteComponent implements OnInit {

  private _variantes: BehaviorSubject<ProdVariante[]> = new BehaviorSubject([])
  @Input() set Variantes( vars: ProdVariante[] ) { this._variantes.next( vars ) }
  get Variantes() { return this._variantes.getValue() }
  variantes: ProdVariante[] = []

  nuVariante: ProdVariante = { name: '', variantes: []}
  nuAddon: Addon = { ref: '', precio: 0 }
  
  @Output() onChange: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
    this._variantes.subscribe( value => {
      this.variantes = value
    })
  }


  onAddVariante( ) {
    this.variantes.push( this.nuVariante )
    this.nuVariante = { name: '', variantes: [] }
    this.onChange.emit(this.variantes)
  }

  onAddAddon( iV ) {
    let variants = this.variantes[ iV ].variantes
    variants.push( this.nuAddon )
    this.variantes[ iV ].variantes = variants
    this.nuAddon = { ref: '', precio: 0 }
    this.onChange.emit( this.variantes )
  }

  deleteVariant(iV) {
    this.variantes.slice( iV, 1 )
    this.onChange.emit( this.variantes )
  }

  deleteAddon( i, iV ) {
    let variants = this.variantes[ iV ].variantes
    variants.slice( i, 1 )
    this.variantes[ iV ].variantes = variants
    this.onChange.emit( this.variantes )
  }

}
