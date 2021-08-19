import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthService) {
      this.initializeApp();

      // used for an example of ngFor and navigation
      this.pages = [
        { title: 'Profile', component: 'ProfilePage' },
        { title: 'Categorias', component: 'CategoriasPage' },
        {title: 'Logout', component: ''} //Sem component pois ele terá um tratamento especial
      ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: {title: string, component: string}) { //Dessa forma conseguimos acessar os atríbutos do objeto page
    //Fazemos o switch para verificar se é o Logout
    switch(page.title){
      case 'Logout':
        //Chamamos o método logout() criado na classe AuthService para remover o token do usuário do armazenamento
        this.auth.logout();
        //Redirecionamos para a página Home
        this.nav.setRoot('HomePage');
        break;
      default:
        //Abrimos a página normalmente
        this.nav.setRoot(page.component);
    }
    
    
  }
}
