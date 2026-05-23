import type { ResiduoFormData } from '@/types/residuos';

export function toResiduoFormData(data: ResiduoFormData): FormData {
  const fd = new FormData();

  fd.append('nome', data.nome);
  fd.append('categoria', data.categoria);
  fd.append('classePericulosidade', data.classePericulosidade);
  fd.append('localizacao', data.localizacao);
  fd.append('prazoDisponibilidade', data.prazoDisponibilidade);
  fd.append('tipoOferta', data.tipoOferta);
  fd.append('frete', data.frete);
  fd.append('quantidadeKg', String(data.quantidadeKg));
  fd.append('aceitouTermos', String(data.aceitouTermos));

  if (data.composicaoQuimica) fd.append('composicaoQuimica', data.composicaoQuimica);
  if (data.preco != null)     fd.append('preco', String(data.preco));
  data.laudoTecnico?.forEach((f) => fd.append('laudoTecnico', f));

  return fd;
}
