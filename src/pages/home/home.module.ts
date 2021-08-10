import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';

//Aplicamos o método Lazy loading
//Como o carregamento em um pouco lento, criamos outro módulo para nossa página home
//O nome HomePage é correspondente a classe home.ts >> class HomePage
@NgModule({
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)]
    })

export class HomeModule {
}