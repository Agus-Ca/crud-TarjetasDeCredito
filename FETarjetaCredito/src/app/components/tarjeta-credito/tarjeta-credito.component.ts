import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  constructor(private fb:FormBuilder, private toastr:ToastrService, private _tarjetaService:TarjetaService) { 
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }
  
  listaTarjetas:any[] = [];
  
  form: FormGroup;

  accion:string = 'agregar';

  id:number|undefined;
  
  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas()
    .subscribe( data => {
      console.log(data);
      this.listaTarjetas = data;
    }, error => {
      console.log(error);
    });
  }

  guardarTarjeta(): void {
    const tarjeta:any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };

    if(this.id == undefined)
    {
      //Guardamos la tarjeta
      tarjeta.id = this.id;
      this._tarjetaService.saveTarjeta(tarjeta)
      .subscribe( 
        data => {
          this.toastr.success('La tarjeta ha sido registrada con exito!', 'Tarjeta registrada!');
          this.obtenerTarjetas();
          this.form.reset();
      }, error => {
          this.toastr.error('Opsss... Ha ocurrido un error!', 'Error');
      });
    }
    else
    {
      //Editamos la tarjeta
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.accion = 'agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito!', 'Tarjeta actulizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }
  }

  eliminarTarjeta(id:number):void {
    this._tarjetaService.deleteTarjeta(id).subscribe( data => {
      this.toastr.error('La tarjeta ha sido eliminada exitosamente!', 'Tarjeta eliminada!');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    });
  }

  editarTarjeta(tarjeta:any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv,
    })
  }
}
