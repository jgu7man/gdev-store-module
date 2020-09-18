import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { ClientesService } from '../clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WishlistService } from '../../wishlist/wishlist.service';
import { ClienteModel } from '../cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteLoginService {

  cliente$: Observable<ClienteModel>
  public cliente: ClienteModel
  public clientes: any;
  constructor (
    private fs: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private _clientes: ClientesService,
    private _snack: MatSnackBar,
    private _wishlist: WishlistService
  ) {
    this.cliente = new ClienteModel( '', '', )
    this.cliente$ = this.auth.authState.pipe(
      switchMap( client => {
        if ( client ) {
          return this.fs.doc<ClienteModel>( `clientes/${ client.uid }` ).valueChanges()
        } else {
          return of( null );
        }
      } )
    )
  }

  async emailSingIn( email, pwd ) {
    try {
      var resp = await this.auth.signInWithEmailAndPassword( email, pwd )
      // var uid = resp.user.uid
      // console.log(resp.user);
      this.cliente = await this._clientes.getCliente( 'email', email )
      localStorage.setItem( 'lasmotoscliente', JSON.stringify( this.cliente ) )
      this._wishlist.updateOnlogin( this.cliente.idCliente )
      return true
    }    
    catch( error ) {
      console.log( error )
      if ( error.code.includes( 'not-found' ) ) {
        this._snack.open( 'No se encontró el email' )
      }
      if ( error.code.includes( 'invalid' ) ) {
        this._snack.open( 'Escribe una direccion de correo válida' )
      }
      if ( error.code.includes( 'wrong-password' ) ) {
        this._snack.open( 'Contraseña incorrecta' )
      }
    } 
  }


  async googleSingIn() {
    // Abre el popup de autenticación

    const provider = new auth.GoogleAuthProvider()
    var credential = await this.auth.signInWithPopup( provider )
    var email = credential.user.email
    this.cliente = await this._clientes.getCliente( 'email', email )
    localStorage.setItem( 'lasmotoscliente', JSON.stringify( this.cliente ) )
    this._wishlist.updateOnlogin( this.cliente.idCliente )
    return true
  }

  async facebookSingIn() {
    // Abre el popup de autenticación
    const provider = new auth.FacebookAuthProvider();
    var credential = await this.auth.signInWithPopup( provider )
    var email = credential.user.email
    this.cliente = await this._clientes.getCliente( 'email', email )
    localStorage.setItem( 'lasmotoscliente', JSON.stringify( this.cliente ) )
    this._wishlist.updateOnlogin(this.cliente.idCliente)
    return true
  }


  async logOut() {
    localStorage.removeItem( 'lasmotoscliente' )
    this.router.navigate( [ '/' ] )
  }



  async saveCliente( cliente: ClienteModel ) {

    var clienteGuardado = await this._clientes.getCliente('celular', cliente.celular)

    console.log(clienteGuardado);
    if( !clienteGuardado) {
      this.resgistAuthCliente( cliente )     
      return true
    } else {
      if ( clienteGuardado.email ) {
        this._snack.open('El cliente ya existe. Sólo debe iniciar sesión')
      } else {
        this.resgistAuthCliente(cliente, clienteGuardado.idCliente)
      }
      
    }
  }

  async resgistAuthCliente(cliente: ClienteModel, idCliente?) {
    try {
      var clienteNew = await this.auth
        .createUserWithEmailAndPassword( cliente.email, cliente.contra )

      if ( clienteNew ) {
        delete cliente.contra
        const clienteRef = this.fs.collection( 'clientes' ).ref

        if ( !idCliente ) {
          cliente.registrado = new Date()
          cliente.idCliente = clienteNew.user.uid
          clienteRef.add( cliente ).then( ref => {
            clienteRef.doc( ref.id ).update( { idCliente: ref.id } )
            console.log( 'cliente guardado' );
            this._snack.open('Listo! Te has registrado. Ahora inicia sesión')
          } )
        } else {
          await clienteRef.doc( idCliente ).update( cliente )
          console.log( 'cliente guardado' );
          this._snack.open( 'Listo! Te has registrado. Ahora inicia sesión' )
        }
      } else {
        console.log('no se guardó');
      }
    }
    catch ( error ) {
      var errorCode = error.code;
      console.log( errorCode, error.message );
      if ( errorCode == 'auth/email-already-in-use' ) {
        this._snack.open('Este correo ya está registrado, por favor usa otro')
      }
    }
  }


  editPwd( email ) {
    this.auth.sendPasswordResetEmail( email )
      .then( res => {
        this._snack.open( 'Se ha enviado un email al admin para cambiar su contraseña' )
      } ).catch( error => {
        alert( error.message )
      } )
  }




  
}
