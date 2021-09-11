import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
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

          //Chamamos depois que chegarem os produtos
          this.loadImageUrls();
        },
        error => {});
  };

  loadImageUrls(){
    for(var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetail(){
    this.navCtrl.push('ProdutoDetailPage');
  }

}
