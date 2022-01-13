import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { MensajesGenerales } from 'src/app/Herramientas/Mensajes/MensajesGenerales.component';
import { listaI, opcion, PadreOpcion } from '../../Interface/seguridad';
import { swPadreopcionService } from '../../ServiciosWeb/PadreOpcion/swpadreopcion.service';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class OpcionesComponent implements OnInit {

   //Variable para listar
   listaPadreOpcion: PadreOpcion[]=[];
   listaOpcion: opcion[]=[];
   //Menú del home
   items: MenuItem[] = [{ label: 'Gestión de Opciones' }];
   home!: MenuItem;
   //Variable para los estados de usuario
   statuses!: any[];
   //Variable para mostrar el loading en la tabla
   loading: boolean = true;
   //Variable para abrir y cerrar el modal
   modalPadreOp!: boolean;
   modalPadreOpM!: boolean;
   modalOpcion!: boolean;
   modalOpcionM!:boolean;
   //Titulo del modal
   tituloModal: string = '';
   //Declaración de variables para ingreso y modificaicón
   txtEstado: string = '';
   padreopcion : PadreOpcion={};
   opcion : opcion={};
   txtNombre: string = '';
   txtIcono: string = '';
   txtCodigo: string = '';
   txtUrl: string='';
   txtDescripcion: string='';
   
   constructor(private messageService: MessageService ,private mensajesg: MensajesGenerales, private padreopcionser: swPadreopcionService) {
   }
 
 
   ngOnInit(): void {
     this.listarPadreOpcion();
     this.listarOpcion();
     //Menu superio con enlace del home
     this.home = { icon: 'pi pi-home', routerLink: '/' };
 
     //Ingreso de los tipos que tiene el estado de usuario
     this.statuses = [
       { label: 'Activo', value: 1 },
       { label: 'Inactivo', value: 0 },
     ];
   }
 
   async listarPadreOpcion(){
     const datos:listaI=await new Promise<listaI>((resolve)=> this.padreopcionser.ListaPadreOpcion().subscribe((translated)=>{resolve(translated);}))
     if(datos.success){
       this.listaPadreOpcion=datos.data;
     }else{
       this.listaPadreOpcion=[];
     }
     this.loading=false;
   }

   async listarOpcion(){
    const datos:listaI=await new Promise<listaI>((resolve)=> this.padreopcionser.ListarOpciones().subscribe((translated)=>{resolve(translated);}))
    if(datos.success){
      this.listaOpcion=datos.data;
    }else{
      this.listaOpcion=[];
    }
    this.loading=false;
  }
 
   openNewPO(){
     this.tituloModal="Crear Encabezado Opción";
     this.txtNombre='';
     this.txtIcono='';
     this.modalPadreOp=true;
   }

   openNewOP(){
    this.tituloModal="Crear Opción";
    this.txtNombre='';
    this.txtDescripcion='';
    this.txtUrl='';
    this.modalOpcion=true;
  }
 
   modificarPadreOp(padreop: any){
     this.tituloModal="Modificar Encabezado Opción";
     this.txtCodigo=padreop.pop_codigo;
     this.txtNombre=padreop.pop_nombre;
     this.txtIcono=padreop.pop_icono;
     this.txtEstado=padreop.pop_estado;
     this.modalPadreOpM=true;
   }

   modificarOpcion(opcion: any){
    this.tituloModal="Modificar Opción";
    this.txtCodigo=opcion.opc_codigo;
    this.txtNombre=opcion.opc_nombre;
    this.txtDescripcion=opcion.opc_descripcion;
    this.txtUrl=opcion.opc_url
    this.txtEstado=opcion.opc_estado;
    this.modalOpcionM=true;
  }
 
   hideDialogPO(){
     this.modalPadreOp=false;
   }
  
   hideDialogPOM(){
     this.modalPadreOpM=false; 
   }

   hideDialogOP(){
    this.modalOpcion=false;
  }
 
  hideDialogOPM(){
    this.modalOpcionM=false; 
  }
 
   async guardarOpcion(){
     this.opcion={
       opc_nombre:this.txtNombre,
       opc_descripcion:this.txtDescripcion,
       opc_url:this.txtUrl
     };
 
     if (this.txtNombre == '' || this.txtDescripcion == '' || this.txtUrl=='') {
       this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
     } else {
       const datos = await new Promise<any>((resolve) =>
          this.padreopcionser.IngresarOpcion(this.opcion).subscribe((translated) => {
           resolve(translated);
         })
       );
 
       if (datos.success) {
         this.modalOpcion = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Opción ' + this.mensajesg.IngresadoCorrectamente});
         this.listarOpcion();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
   }

   async guardarPadreOpcion(){
    this.padreopcion={
      pop_nombre:this.txtNombre,
      pop_icono:this.txtIcono
    };

    if (this.txtNombre == '' || this.txtIcono == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    } else {
      const datos = await new Promise<any>((resolve) =>
         this.padreopcionser.IngresarPadreOpcion(this.padreopcion).subscribe((translated) => {
          resolve(translated);
        })
      );

      if (datos.success) {
        this.modalPadreOp = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Encabezado Opción ' + this.mensajesg.IngresadoCorrectamente});
        this.listarPadreOpcion();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }
  
   async guardarPadreOM(){
     this.padreopcion={
       pop_codigo:parseInt(this.txtCodigo),
       pop_nombre:this.txtNombre,
       pop_icono:this.txtIcono,
       pop_estado:parseInt(this.txtEstado)
     }
   
     if (this.txtCodigo == '' || this.txtNombre == '' || this.txtIcono == '') {
       this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
     }  else {
       const datos = await new Promise<any>((resolve) =>
         this.padreopcionser.ModificarPadreOpcion(this.padreopcion).subscribe((translated) => {
           resolve(translated);
         })
       );
   
       if (datos.success) {
         this.modalPadreOpM = false;
         this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Encabezado Opción ' + this.mensajesg.ModificadoCorrectamente});
         this.listarPadreOpcion();
       } else {
         this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
       }
     }
   }

   async guardarOpcionM(){
    this.opcion={
      opc_codigo:parseInt(this.txtCodigo),
      opc_nombre:this.txtNombre,
      opc_descripcion:this.txtDescripcion,
      opc_url:this.txtUrl,
      opc_estado:parseInt(this.txtEstado)
    }
  
    if (this.txtCodigo == '' || this.txtNombre == '' || this.txtDescripcion == '' || this.txtUrl == '') {
      this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError,detail: this.mensajesg.CamposVacios});
    }  else {
      const datos = await new Promise<any>((resolve) =>
        this.padreopcionser.ModificarOpcion(this.opcion).subscribe((translated) => {
          resolve(translated);
        })
      );
  
      if (datos.success) {
        this.modalOpcionM = false;
        this.messageService.add({severity: 'success', summary: this.mensajesg.CabeceraExitoso, detail: 'Opción ' + this.mensajesg.ModificadoCorrectamente});
        this.listarOpcion();
      } else {
        this.messageService.add({severity: 'error', summary: this.mensajesg.CabeceraError, detail: this.mensajesg.ErrorProcesoDu});
      }
    }
  }
 }
 