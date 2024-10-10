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
    plan_anio:         number;
    plan_clon?:         number;
    plan_cambio?:       number;
    plan_estado:       string;
    plan_planid?:       number;
    estadonombre?:      string;
	auditoria:		   auditoria;
    archivo?:            archivo;
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
    estadonombre?: string;
    auditoria:     auditoria;
}

export interface periodo{
    per_id:        number;
    per_nombre:    string;
    per_maximo:    number;
    per_estado:    string;
    auditoria:     auditoria;
}

export interface objetivo{
    objpn_id:        number;
    objpn_nombre:    string;
    objpn_estado:    string;
    estado_nombre?:  string;
    auditoria:       auditoria;
}

export interface politica{
    polpn_id:        number;
    polpn_nombre:    string;
    polpn_estado:    string;
    estado_nombre?:  string;
    polpn_objetivo:  number;
    objetivo_nombre?:string;
    auditoria:       auditoria;
}

export interface meta{
    metapn_id:        number;
    metapn_nombre:    string;
    metapn_politica:  number;
    polpn_nombre?:    string;
    metapn_estado:    string;
    estado_nombre?:   string;
    auditoria:       auditoria;
}

export interface indicador{
    indpn_id:                number;
    indpn_nombre:            string;
    indpn_descripcion:       string;
    indpn_valor_inicial:     string;
    indpn_expresion:         number;
    indpn_meta:              number;
    indpn_valor_absoluto:    string;
    indpn_valor_meta:        string;
    indp_estado:             string;
    estado_nombre?:          string;
    metapn_nombre?:          string;
    auditoria:               auditoria;
}

export interface archivo{
    arch_id:             number;
    arch_nombre:         string;
    arch_archivo:        string;
    arch_ruta:           string;
    arch_plan:           string;
}