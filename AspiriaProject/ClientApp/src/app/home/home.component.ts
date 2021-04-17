import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';
import { ModalesService } from '../services/modales.service';
import { MatPaginator, MatPaginatorIntl, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ModalCrearProductoComponent } from './modal-crear-producto/modal-crear-producto.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('dialogAdvertencia',{static:false}) dialogAdvertencia: TemplateRef<any>;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  userDetails; 
  listaProductos:any[]=[];
  dataSource: MatTableDataSource<any>;
  public dialogoRefAdver: any;

  constructor(
    private productosService: ProductosService,
    private modal: ModalesService,
    private snackBar: MatSnackBar,
    private paginador: MatPaginatorIntl) { }

  displayedColumns: string[] = [
    'Id',
    'Nombre',
    // 'Descripcion',
    'RestriccionEdad',
    'Compania',
    'Precio',
    'Acciones'];
  ngOnInit() {
    this.obtenerListadoProductos();
    if(this.productosService.invocarTraerContenidoSubscription == undefined){
      this.productosService.invocarTraerContenidoSubscription = 
      this.productosService.invocarTraerContenido.subscribe(()=>{
        this.obtenerListadoProductos();
      })
    }
  }
  obtenerListadoProductos(){
    this.productosService.GetProductos().subscribe(res=>{
      if(res){
        console.log(res);
        this.listaProductos = res; 
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
      else{
        this.dataSource = new MatTableDataSource([]);
      }
    },error=>{
      this.dataSource = new MatTableDataSource([]);
    })
  }
  abrirModalAgregar(){
    let datos ={
      esNuevoRegistro:true
    }
    this.modal.abrirDialogoLateral(ModalCrearProductoComponent, datos)
  }
  abrirModalEditar(idProducto){
    let datos ={
      producto: this.listaProductos.filter(x=>x.id===idProducto),
      esNuevoRegistro:false
    }
    this.modal.abrirDialogoLateral(ModalCrearProductoComponent, datos)
  }
  abrirModalConfirmacion(idproducto) {
    this.userDetails = idproducto;
    //this.ParcialActual = this.filtroForm.get('parcial').value;
    this.dialogoRefAdver = this.modal.openDialog(this.dialogAdvertencia, { disableClose: true });
  }
  cerrarModal() {
    this.dialogoRefAdver.close();
  }
  confirmarEliminar(){
    this.productosService.DeleteProductos(this.userDetails).subscribe(res=>{
      this.snackBar.open("Eliminación exitosa.", "OK", { duration: 2000 });
      this.obtenerListadoProductos();
      this.cerrarModal();
    })
  }
  
}
