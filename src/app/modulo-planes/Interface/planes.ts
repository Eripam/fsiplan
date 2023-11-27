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
    plan_planest:       boolean;
    plan_poa:          boolean;
}

export interface auditoria{
	aud_usuario:		string;
	aud_proceso:	    string;
	aud_descripcion:	string;
	aud_rol:			string;
	aud_dependencia:	number;
}

export interface estructura{
    est_id:            number;
    est_nombre:        string;
    est_codigo:        string;
    est_estado:        string;
    est_plan:          string;
    est_orden:         string;
    estadonombre?:     string;
	auditoria:		   auditoria;
    est_muestra:       boolean;
}