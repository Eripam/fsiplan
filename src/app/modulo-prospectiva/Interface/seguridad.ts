export interface listaI {
	success: boolean;
	data: any[];
}

export interface tipo_arbol{
	tarb_id:number;
	tarb_nombre:string;
	tarb_estado:number;
	tarb_prospectiva:number;
}

export interface tipo_eje{
	teje_id:number;
	teje_nombre:string;
	teje_estado:number;
	teje_prospectiva:number;
}

export interface eje_estrategico{
	eje_id:number;
	eje_teje:number;
	teje_nombre?:string;
	eje_prospectiva:number;
	eje_nombre:string;
	eje_descripcion:string;
	eje_microescenario:string;
	eje_clon?:number;
	eje_cambio?:number;
	eje_estado:number;
	eje_accion:any;
}