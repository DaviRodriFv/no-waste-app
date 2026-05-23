import { useState, useEffect, useCallback } from 'react';
import * as service from '@/services/residuosService';
import { isApiError } from '@/lib/api';
import type {
  ResiduoFormData, ResiduoSummary, ResiduoDetalhe,
  ResiduoFiltros, Page, StatusResiduo,
} from '@/types/residuos';

export function useResiduos(filtros: ResiduoFiltros = {}) {
  const [data, setData]       = useState<Page<ResiduoSummary> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await service.listarResiduos(filtros));
    } catch (err) {
      setError(isApiError(err) ? err.response.data.message : 'Erro ao carregar resíduos');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useResiduo(id: number | null) {
  const [data, setData]       = useState<ResiduoDetalhe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    service.buscarResiduo(id)
      .then(setData)
      .catch(err => setError(isApiError(err) ? err.response.data.message : 'Erro ao carregar'))
      .finally(() => setLoading(false));
  }, [id]);

  return { data, loading, error };
}

export function useCriarResiduo() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const criar = useCallback(async (formData: ResiduoFormData) => {
    setLoading(true);
    setError(null);
    try {
      return await service.criarResiduo(formData);
    } catch (err) {
      const msg = isApiError(err) ? err.response.data.message : 'Erro ao criar resíduo';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return { criar, loading, error };
}

export function useAtualizarResiduo() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const atualizar = useCallback(async (id: number, formData: ResiduoFormData) => {
    setLoading(true);
    setError(null);
    try {
      return await service.atualizarResiduo(id, formData);
    } catch (err) {
      const msg = isApiError(err) ? err.response.data.message : 'Erro ao atualizar';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return { atualizar, loading, error };
}

export function useDeletarResiduo() {
  const [loading, setLoading] = useState(false);

  const deletar = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await service.deletarResiduo(id);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deletar, loading };
}

export function useAtualizarStatus() {
  const [loading, setLoading] = useState(false);

  const atualizar = useCallback(async (id: number, status: StatusResiduo) => {
    setLoading(true);
    try {
      return await service.atualizarStatus(id, status);
    } finally {
      setLoading(false);
    }
  }, []);

  return { atualizar, loading };
}
