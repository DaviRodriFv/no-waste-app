import { useState, useEffect, useCallback } from 'react';
import { listarMarketplace } from '@/services/marketplaceService';
import { isApiError } from '@/lib/api';
import type { MarketplaceItem, MarketplaceFiltros, Page } from '@/types/residuos';

export function useMarketplace(filtros: MarketplaceFiltros = {}) {
  const [data, setData]       = useState<Page<MarketplaceItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await listarMarketplace(filtros));
    } catch (err) {
      setError(isApiError(err) ? err.response.data.message : 'Erro ao carregar marketplace');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filtros)]);

  useEffect(() => { fetch(); }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
