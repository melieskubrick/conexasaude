export interface SignInCredentials {
  email: string;
  senha: string;
}

export interface CreateConsultationCredentials {
  idMedico: number;
  paciente: string;
  dataConsulta: string;
  observacao: string;
}
