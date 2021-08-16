import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptor, ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';

//Adicionamos a importação HttpClientModule para efetuar requisições
//Inserimos na classe principal da aplicação pq fica disponível para todas as classes
//Adicionamos a importação CategoriaService do serviço para que ele possa ser usado por todas as classes da aplicação

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Chamamos nossas classes no provider
    CategoriaService,
    AuthInterceptorProvider, //Chamamos antes pq é necessário colocar o cabeçalho primeiro e depois lançar a exceção caso haja alguma
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService
  ]
})
export class AppModule {}
