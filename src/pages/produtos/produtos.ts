import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {}

  ionViewDidLoad() {
    //Passamos o paramêtro que veio na navegação
    //NavParams conseguimos obter esses paramêtros
    let categoria_id = this.navParams.get('categoria_id'); //Passamos o nome do paramêtro
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
          //A resposta é especial por que esse Endpoint é paginado
          //Por isso obtemos o content
          this.items = response['content'];
        },
        error => {});
  };

}
