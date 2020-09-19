import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AdminInterface } from './admin.model';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  $admin = new Observable<any>()
  constructor (
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private _cache: CacheService,
    private router: Router
  ) {
    this.$admin = this.auth.authState.pipe(
      switchMap( admin => {
        return admin
          ? this.fs.doc<AdminInterface>( `admins/${ admin.uid }` ).valueChanges()
          : of(null)
      })
    )
  }
  
  createAdmin(admin: AdminInterface) {
    
  }

  async adminLogin( email, pwd ) {
    try {
      var credential = await this.auth.signInWithEmailAndPassword( email, pwd )
      this.router.navigate(['/panel'])
      return this.updateUserData( credential.user )
    } catch ( error ) {
      console.log( error )
      if ( error.code.includes( 'not-found' ) ) {
        alert( 'No se encontró el email' )
      }
      if ( error.code.includes( 'invalid' ) ) {
        alert( 'Escribe una direccion de correo válida' )
      }
      if ( error.code.includes( 'wrong-password' ) ) {
        alert( 'Contraseña incorrecta' )
      }
    }
  }

  private async updateUserData( { uid, email, displayName, photoURL }: AdminInterface ) {
    // Buscar el usuario en la base de datos de firebase
    const adminRef: AngularFirestoreDocument<AdminInterface>
      = this.fs.doc( `admins/${ uid }` );
    
    const adminDoc = await this.fs.collection( 'admins' ).ref.doc( uid ).get()
    const dateRegist = new Date()

    // Si no existe, se agrega fecha de registro
    if ( adminDoc.exists ) {
      var data = { uid, email, displayName, photoURL }
      adminRef.set( data, { merge: true } )
      this._cache.updateData( 'admin', adminDoc.data() )
    } else {
      var newData = { uid, email, displayName, photoURL, dateRegist }
      adminRef.set( newData, { merge: true } )
      this._cache.updateData( 'admin', newData )
    }


    this.router.navigate( [ '' ] );
  }


  //? Cerrar sesión

  async singOut() {
    await this.auth.signOut();
    return this.router.navigate( [ '/' ] );
  }
  


}
