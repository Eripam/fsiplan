export interface listaI {
	success: boolean;
	data: any[];
}

export interface plan_estrategico {
    plan_id:           number;
    plan_nombre:       string;
    plan_fecha_inicio: string;
    plan_fecha_fin:    string;
    plan_vision:       string;
    plan_mision:       string;
    plan_dependencia:  number;
    plan_anio:         string;
    plan_clon?:         number;
    plan_cambio?:       number;
    plan_estado:       string;
    plan_planid?:       number;
    estadonombre?:      string;
	auditoria:		   auditoria;
}

export interface auditoria{
	aud_usuario:		string;
	aud_proceso:	    string;
	aud_descripcion:	string;
	aud_rol:			string;
	aud_dependencia:	number;
}

export interface estructura{
    est_id:         number;
    est_nombre:     string;
    est_codigo:     string;
    est_estado:     string;
    estadonombre?:  string;
    est_plan:       string;
    est_eje:        boolean;
    est_componente: boolean;
    est_politicas:  boolean;
    est_planes:     boolean;
    est_orden:      string;
    auditoria:		   auditoria;
}

export interface eje{
    eje_id:        number;
    eje_nombre:    string;
    eje_estado:    string;
    eje_plan:      string;
    estadonombre?: string;
    auditoria:     auditoria;
}