export type CategoriaResiduo =
  | 'SOLIDO'
  | 'EFLUENTE_QUIMICO'
  | 'MISTURA'
  | 'RESIDUO_MEDICO'
  | 'CONSTRUCAO_CIVIL';

export type ClassePericulosidade = 'CLASSE_I' | 'CLASSE_IIA' | 'CLASSE_IIB';

export type TipoOferta = 'VENDA' | 'DOACAO';

export type TipoFrete = 'OFERTANTE' | 'NEGOCIAR';

export type TipoDocumento =
  | 'LAUDO_TECNICO'
  | 'CONTRATO'
  | 'MANIFESTO_MTR'
  | 'LICENCA'
  | 'OUTRO';

export type StatusResiduo = 'ATIVO' | 'INATIVO' | 'PENDENTE';

export interface ResiduoFormData {
  nome: string;
  categoria: CategoriaResiduo;
  composicaoQuimica?: string;
  classePericulosidade: ClassePericulosidade;
  localizacao: string;
  prazoDisponibilidade: string;
  tipoOferta: TipoOferta;
  preco?: number | null;
  frete: TipoFrete;
  quantidadeKg: number;
  aceitouTermos: boolean;
  laudoTecnico?: File[];
}

export interface DocumentoResponse {
  id: number;
  residuoId: number;
  tipoDocumento: TipoDocumento;
  nomeArquivo: string;
  contentType: string;
  tamanhoBytes: number;
  createdAt: string;
}

export interface ResiduoResponse {
  id: number;
  nome: string;
  categoria: CategoriaResiduo;
  composicaoQuimica: string | null;
  classePericulosidade: ClassePericulosidade;
  localizacao: string;
  prazoDisponibilidade: string;
  tipoOferta: TipoOferta;
  preco: number | null;
  frete: TipoFrete;
  quantidadeKg: number;
  status: StatusResiduo;
  aceiteTermos: boolean;
  empresaId: number | null;
  createdAt: string;
  updatedAt: string;
  documentos: DocumentoResponse[];
}

export interface ResiduoSummary {
  id: number;
  nome: string;
  categoria: CategoriaResiduo;
  classePericulosidade: ClassePericulosidade;
  localizacao: string;
  prazoDisponibilidade: string;
  tipoOferta: TipoOferta;
  preco: number | null;
  frete: TipoFrete;
  quantidadeKg: number;
  status: StatusResiduo;
  createdAt: string;
}

export type ResiduoDetalhe = ResiduoResponse;

export interface MarketplaceItem {
  id: number;
  nome: string;
  categoria: CategoriaResiduo;
  classePericulosidade: ClassePericulosidade;
  localizacao: string;
  tipoOferta: TipoOferta;
  preco: number | null;
  frete: TipoFrete;
  quantidadeKg: number;
  compatibilidade: number;
  distanciaKm: number;
  createdAt: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ResiduoFiltros {
  categoria?: CategoriaResiduo;
  classePericulosidade?: ClassePericulosidade;
  tipoOferta?: TipoOferta;
  status?: StatusResiduo;
  precoMin?: number;
  precoMax?: number;
  quantidadeMin?: number;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export type MarketplaceFiltros = Omit<ResiduoFiltros, 'status'>;

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  fieldErrors?: string[];
}
