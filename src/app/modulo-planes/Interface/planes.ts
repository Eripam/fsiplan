export interface listaI {
	success: boolean;
	data: any[];
}

export interface planes {
    plan_id:           number;
    plan_nombre:       string;
    plan_fecha_inicio: string;
    plan_fecha_fin:    string;
    plan_estado:       string;
    plan_tipoplan:     number;
    tipoplan_nombre?:   string;   
    estadonombre?:     string;
	auditoria:		   auditoria;
}

export interface auditoria{
	aud_usuario:		string;
	aud_proceso:	    string;
	aud_descripcion:	string;
	aud_rol:			string;
	aud_dependencia:	number;
}