import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Endereco } from '../models/Endereco';
import { Produto, ProdutoCarrinho } from '../models/Produto';
import { Usuario } from '../models/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CepService } from '../service/cep.service';
import { VendedorDadosComponent } from '../vendedor-dados/vendedor-dados.component';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  produtosCarrinho: ProdutoCarrinho[];
  produtosCarrinhoFull: Produto[];

  temProdutos: boolean;
  usuario: Usuario = new Usuario();

  endereco: Endereco = new Endereco();

  remetente: string;
  numeroCasa: string;

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private alertas: AlertasService,
    private auth: AuthService,
    private cepService: CepService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      window.scroll(0,0);
    });
    if(environment.token == '') {
      this.router.navigate(['/home']);
    }
    if(this.carrinhoService.produtosNoCarrinho.length < 1) {
      this.temProdutos = false;
    } else {
      this.temProdutos = true;
    }
    this.produtosCarrinho = this.carrinhoService.produtosNoCarrinho;
    this.produtosCarrinhoFull = this.carrinhoService.produtosNoCarrinhoFull;
    console.log(this.produtosCarrinho);
  }

  atualizarDados() {
    let urlAtual = this.router.url;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/carrinho']);
  }

  removerDoCarrinho(i: number) {
    this.carrinhoService.removerProduto(i);
    this.atualizarDados();
    this.alertas.showAlertInfo("Produto Removido!");
  }

  terminarCompra() {
    if(this.remetente != undefined && this.numeroCasa != undefined && this.endereco.cep != undefined && this.endereco.uf != undefined && this.endereco.localidade != undefined && this.endereco.logradouro != undefined && this.endereco.bairro != undefined) {
      let idDosProdutosComprados = [];
  
      for(let i = 0; i < this.produtosCarrinho.length; i++) {
        idDosProdutosComprados.push(this.produtosCarrinhoFull[i].id);
      }
  
      this.auth.adicionarProdutosComprados(environment.id, idDosProdutosComprados).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.alertas.showAlertSuccess("Compra efetuada!");
        this.carrinhoService.esvaziarCarrinho();
        this.router.navigate(['/home']);
      })
    } else {
      this.alertas.showAlertDanger("Você precisa preencher os dados de entrega antes de finalizar sua compra.");
    }
  }

  encontrarEnderecoPeloCep(cep: string) {
    this.cepService.encontrarEndereco(cep).subscribe((resp: Endereco) => {
      this.endereco = resp;
    })

  }


}
