export class Usuario{
    constructor(public per_codigo: string, public per_cedula: string, public per_nombres: string, public per_apellidos: string, public per_email: string, public per_estado: number){}
}

export interface Data {
	rol_codigo?: number;
	rol_nombre?: string;
	rol_descripcion?: string;
	rol_estado?: number;
	rol_estado_nombre?: string;
}

export interface listaI {
	success: boolean;
	data: any[];
}
export interface tipoDep {
	tde_nombre?: string;
	tde_codigo?: number;
	tde_estado?: number;
	tde_estado_nombre?: string;
}

export interface dependencia {
	dep_codigo?: string;
	dep_alias?: string;
	dep_estado?: number;
	dep_tipo?: number;
	tde_nombre?: string;
	dep_codcodigo?: any;
	dep_nombre_p?: any;
	dep_alias_p?: any;
	dep_nombre?:string;
	dep_estado_nombre?: string;
}

export interface rolpersona {
	rpe_persona?: string;
	rpe_rol?: number;
	rpe_dependencia?: number;
	rpe_estado?: number;
	per_codigo?: string;
	per_cedula?: string;
	per_nombres?: string;
	per_apellidos?: string;
	rpe_dependencia_m?: number;
	dep_nombre?: string;
	dep_alias?: string;
	rol_nombre?: string;
	rpe_rol_m?: number;
	rpe_estado_nombre?: string;
}
export interface PadreOpcion {
	pop_codigo?: number;
	pop_nombre?: string;
	pop_icono?: string;
	pop_estado?: number;
	pop_estado_nombre?: string;
}
export interface opcion {
	opc_codigo?: number;
	opc_nombre?: string;
	opc_descripcion?: string;
	opc_url?: string;
	opc_estado?: number;
	opc_estado_nombre?: string;
}

export interface rolopcion {
	rop_rol?: number;
	rop_padreop?: number;
	rop_opcion?: number;
	rop_insertar?: boolean;
	rop_modificar?: boolean;
	rop_eliminar?: boolean;
	rop_padreop_a?: number;
	rop_opcion_a?: number;
	rop_estado?: number;
}