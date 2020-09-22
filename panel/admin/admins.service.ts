import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { AdminInterface, AdminRol } from './admin.model';
import { CacheService } from '../../../Gdev-Tools/cache/cache.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../Gdev-Tools/alerts/alert.service';
import { ErrorAlertModel } from '../../../Gdev-Tools/alerts/alerts.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  admin$ = new Observable<any>()
  currentAdmin: AdminInterface
  admins$: Observable<AdminInterface[]> = new Observable()

  roles: AdminRol[] = [
    { value: 'admin', viewValue: 'Administrador' },
    { value: 'editor', viewValue: 'Editor' },
    { value: 'colab', viewValue: 'Colaborador' },
  ]

  constructor (
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private _cache: CacheService,
    private router: Router,
    private _alert: AlertService
  ) {
    this.getAdmins()
    this.getCurrentAdmin()
    this.admin$ = this.auth.authState.pipe(
      switchMap( admin => {
        return admin
          ? this.fs.doc<AdminInterface>( `admins/${ admin.uid }` ).valueChanges()
          : of(null)
      })
    )
  }


  getCurrentAdmin() {
    this.admin$.subscribe( admin => {
      this.currentAdmin = admin
    })
  }
  
  
  async createAdmin(admin: AdminInterface) {
    try {
        var nuevoAdmin =
          await this.auth.createUserWithEmailAndPassword( admin.email, admin.password )
        admin.uid = nuevoAdmin.user.uid
        
      this.updateUserData( admin );
      ( await this.auth.currentUser ).sendEmailVerification();

      return 

      } catch (error) {
        console.error( error );
        this.setErrorMsj( error )
      }
  }

  async adminLogin( email, pwd ) {
    try {
      var credential = await this.auth.signInWithEmailAndPassword( email, pwd )
      this.router.navigate(['/panel'])
      return this.updateUserData( credential.user )
    } catch ( error ) {
      console.log( error )
      this.setErrorMsj(error)
    }
  }

  private async updateUserData( { uid, email, displayName }: AdminInterface ) {
    // Buscar el usuario en la base de datos de firebase
    const adminRef: AngularFirestoreDocument<AdminInterface>
      = this.fs.doc( `admins/${ uid }` );
    
    const adminDoc = await this.fs.collection( 'admins' ).ref.doc( uid ).get()
    const dateRegist = new Date()

    // Si no existe, se agrega fecha de registro
    if ( adminDoc.exists ) {
      var data = { uid, email, displayName }
      adminRef.set( data, { merge: true } )
      this._cache.updateData( 'admin', adminDoc.data() )
    } else {
      var newData = { uid, email, displayName, dateRegist }
      adminRef.set( newData, { merge: true } )
      this._cache.updateData( 'admin', newData )
    }


  }


  async updateAdmin(admin: AdminInterface) {
    this.fs.collection('admins').ref.doc(admin.uid).update(admin)
  }


  async changePassword(email) {
    this.auth.sendPasswordResetEmail( email ).then( () => {
      this._alert.sendFloatNotification(`Se ha enviado un correo a ${email} para confirmar el cambio`)
    })
  }


  getAdmins() {
    this.admins$ = this.fs.collection<AdminInterface>('admins').valueChanges()
  }


  //? Cerrar sesión

  async singOut() {
    await this.auth.signOut();
    return this.router.navigate( [ '/' ] );
  }


  setErrorMsj( error: any ) {
    let errorObj = new ErrorAlertModel( '', error.code )
    if ( error.code.includes( 'not-found' ) ) {
      errorObj.mensaje = 'No se encontró el email'
    }
    if ( error.code.includes( 'invalid' ) ) {
      errorObj.mensaje = 'Escribe una direccion de correo válida'
    }
    if ( error.code.includes( 'wrong-password' ) ) {
      errorObj.mensaje = 'Contraseña incorrecta'
    }

    this._alert.errorAlert$.next( errorObj )
    
  }


  revokePermission(adminId: string) {
    this.fs.collection( 'admins' ).ref
    .doc(adminId).update({rol: 'revoke'})
  }
  


}
