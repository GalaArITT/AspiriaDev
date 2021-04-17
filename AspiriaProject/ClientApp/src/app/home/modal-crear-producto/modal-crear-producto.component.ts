import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from '../home.component';
import { ProductosService } from '../../services/productos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-producto',
  templateUrl: './modal-crear-producto.component.html',
  styleUrls: ['./modal-crear-producto.component.css']
})
export class ModalCrearProductoComponent implements OnInit {
  
  constructor(public dialogRevisionRef: MatDialogRef<HomeComponent>,
    private snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productosService: ProductosService) { }
    
    registroProducto : FormGroup;
  ngOnInit() {
    console.log(this.data);
    if(this.data.esNuevoRegistro){
      this.registroProducto = new FormGroup({
        nombre: new FormControl(null, [Validators.required,Validators.maxLength(50)]),
        descripcion: new FormControl(null, [Validators.required,,Validators.maxLength(100)]),
        restriccionEdad: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
        compania: new FormControl(null, [Validators.required,,Validators.maxLength(50)]),
        precio: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)] )
      })
    }else{
      this.registroProducto = new FormGroup({
        id: new FormControl(this.data.producto[0].id),
        nombre: new FormControl(this.data.producto[0].nombre, [Validators.required,Validators.maxLength(50)]),
        descripcion: new FormControl(this.data.producto[0].descripcion, [Validators.required,,Validators.maxLength(100)]),
        restriccionEdad: new FormControl(this.data.producto[0].restriccionEdad, [Validators.required, Validators.min(0), Validators.max(100)]),
        compania: new FormControl(this.data.producto[0].compania, [Validators.required,,Validators.maxLength(50)]),
        precio: new FormControl(this.data.producto[0].precio, [Validators.required, Validators.min(0), Validators.max(100)])
      })
    }
  }

  salir(){
    this.dialogRevisionRef.close();
  }
  guardar(){
    if(this.data.esNuevoRegistro){
      this.productosService.PostProductos(this.registroProducto.value).subscribe(res=>{
        console.log(res);
        this.snackBar.open("Registro exitoso", "OK", { duration: 2000 });
        this.productosService.invocarMetodoTraerContenido();
      });
    }else{
      let id = this.data.producto[0].id;
      this.productosService.PutProductos(id,this.registroProducto.value).subscribe(res=>{
        this.snackBar.open("Actualización exitosa.", "OK", { duration: 2000 });
        this.productosService.invocarMetodoTraerContenido();
      })
    }
  }
  validarConfirmacion(){
    if(this.registroProducto.valid){
      this.guardar()
    }else{
      this.registroProducto.get('nombre').markAsTouched();
      this.registroProducto.get('compania').markAsTouched();
      this.registroProducto.get('precio').markAsTouched();
      this.snackBar.open("Error al guardar los datos.", "Error", { duration: 2000 });
    }
  }

}
