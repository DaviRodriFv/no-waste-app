import { api } from '@/lib/api';
import type { MarketplaceItem, MarketplaceFiltros, Page } from '@/types/residuos';

export async function listarMarketplace(filtros: MarketplaceFiltros = {}): Promise<Page<MarketplaceItem>> {
  const res = await api.get<Page<MarketplaceItem>>('/marketplace', { params: filtros });
  return res.data;
}
