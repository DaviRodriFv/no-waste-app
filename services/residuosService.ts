import { api } from '@/lib/api';
import { toResiduoFormData } from '@/lib/toFormData';
import type {
  ResiduoFormData, ResiduoResponse, ResiduoSummary,
  ResiduoDetalhe, DocumentoResponse, ResiduoFiltros,
  StatusResiduo, Page,
} from '@/types/residuos';

export async function criarResiduo(data: ResiduoFormData): Promise<ResiduoResponse> {
  const res = await api.post<ResiduoResponse>('/residuos', toResiduoFormData(data), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function listarResiduos(filtros: ResiduoFiltros = {}): Promise<Page<ResiduoSummary>> {
  const res = await api.get<Page<ResiduoSummary>>('/residuos', { params: filtros });
  return res.data;
}

export async function buscarResiduo(id: number): Promise<ResiduoDetalhe> {
  const res = await api.get<ResiduoDetalhe>(`/residuos/${id}`);
  return res.data;
}

export async function atualizarResiduo(id: number, data: ResiduoFormData): Promise<ResiduoResponse> {
  const res = await api.put<ResiduoResponse>(`/residuos/${id}`, toResiduoFormData(data), {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

export async function atualizarStatus(id: number, status: StatusResiduo): Promise<ResiduoResponse> {
  const res = await api.patch<ResiduoResponse>(`/residuos/${id}/status`, { status });
  return res.data;
}

export async function deletarResiduo(id: number): Promise<void> {
  await api.delete(`/residuos/${id}`);
}

export async function listarDocumentos(residuoId: number): Promise<DocumentoResponse[]> {
  const res = await api.get<DocumentoResponse[]>(`/residuos/${residuoId}/documentos`);
  return res.data;
}

export function getDownloadUrl(residuoId: number, docId: number): string {
  const base = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';
  return `${base}/residuos/${residuoId}/documentos/${docId}/download`;
}

export async function deletarDocumento(residuoId: number, docId: number): Promise<void> {
  await api.delete(`/residuos/${residuoId}/documentos/${docId}`);
}
