export interface AuthenticationData {
    id: string
}

export interface Class {
    id: string,
    nome: string,
    modulo: string
}

export interface Student {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string
}

export interface Teacher {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string
}
