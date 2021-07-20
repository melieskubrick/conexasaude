type SignInCredentials = {
  login: string;
  password: string;
};

type PasswordCredentials = {
  pwdCurrent: string;
  pwdNew: string;
  pwdNewConf: string;
};

type CreateConsultationCredentials = {
  idMedico: number;
  paciente: string;
  dataConsulta: string;
  observacao: string;
};

type DetailConsultationProps = {
  source: SourceDetails;
  schedule: ScheduleDetails;
  patient: PatientDetails;
  partner: PartnerDetails;
  procedures: ProceduresDetails[];
  payment: PaymentDetails[];
};

type SourceDetails = {
  source: string;
  name: string;
  phone: string;
  contact: string;
};

type ScheduleDetails = {
  referralId: number;
  date: string;
  time: string;
  issueDate: string;
  note: string;
  key: string;
};

type PatientDetails = {
  id: string;
  enrollment: number;
  name: string;
  ssn: string;
  birthDate: string;
};

type PartnerDetails = {
  name: string;
  phone: string;
  professional: ProfessionalDetails;
  address: AddressDetails;
};

type ProfessionalDetails = {
  name: string;
  affiliation: AffiliationDetails;
};

type AffiliationDetails = {
  council: string;
  number: number;
  state: string;
};

type AddressDetails = {
  zipCode: string;
  location: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  district: string;
  country: string;
};

type ProceduresDetails = {
  code: string;
  name: string;
  quantity: number;
  amount: number;
};

type PaymentDetails = {
  name: string;
  value: number;
};

type CardDetails = {
  enrollment: number;
  enrollmentDate: string;
  user: CardUserDetails;
  issuer: CardIssuerDetails;
};

type CardUserDetails = {
  name: string;
  ssn: string;
  type: string;
  gender: string;
  birthDate: string;
  age: number;
};

type CardIssuerDetails = {
  source: string;
  name: string;
  phone: string;
  whatsApp: string;
};
