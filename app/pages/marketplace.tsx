import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, SlidersHorizontal, Grid3x3, Map, MapPin, Package, Loader2, AlertCircle } from "lucide-react";
import { useMarketplace } from "@/hooks/useMarketplace";
import type { CategoriaResiduo, ClassePericulosidade, MarketplaceFiltros } from "@/types/residuos";

const categoriaLabel: Record<CategoriaResiduo, string> = {
  SOLIDO: "Sólido",
  EFLUENTE_QUIMICO: "Efluente químico",
  MISTURA: "Mistura",
  RESIDUO_MEDICO: "Resíduo médico",
  CONSTRUCAO_CIVIL: "Construção civil",
};

const classeLabel: Record<ClassePericulosidade, string> = {
  CLASSE_I: "Classe I",
  CLASSE_IIA: "Classe II-A",
  CLASSE_IIB: "Classe II-B",
};

const sortOptions = [
  { label: "Relevância", value: "createdAt,desc" },
  { label: "Preço", value: "preco,asc" },
  { label: "Quantidade", value: "quantidadeKg,desc" },
];

export function MarketplacePage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const [filtroForm, setFiltroForm] = useState({
    search: "",
    categoria: "" as CategoriaResiduo | "",
    classePericulosidade: "" as ClassePericulosidade | "",
    quantidadeMin: "",
    precoMin: "",
    precoMax: "",
    sort: "createdAt,desc",
  });

  const [filtros, setFiltros] = useState<MarketplaceFiltros>({ sort: "createdAt,desc" });
  const { data, loading, error } = useMarketplace(filtros);

  const aplicarFiltros = () => {
    const f: MarketplaceFiltros = { sort: filtroForm.sort };
    if (filtroForm.search)               f.search = filtroForm.search;
    if (filtroForm.categoria)            f.categoria = filtroForm.categoria;
    if (filtroForm.classePericulosidade) f.classePericulosidade = filtroForm.classePericulosidade;
    if (filtroForm.quantidadeMin)        f.quantidadeMin = Number(filtroForm.quantidadeMin);
    if (filtroForm.precoMin)             f.precoMin = Number(filtroForm.precoMin);
    if (filtroForm.precoMax)             f.precoMax = Number(filtroForm.precoMax);
    setFiltros(f);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar Filters */}
      <aside className="w-72 bg-card border-r border-border p-6 overflow-auto">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-foreground" />
          <h2 className="font-semibold text-foreground">Filtros</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Busca</label>
            <Input
              placeholder="Nome ou localização..."
              value={filtroForm.search}
              onChange={(e) => setFiltroForm({ ...filtroForm, search: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Categoria</label>
            <select
              className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm"
              value={filtroForm.categoria}
              onChange={(e) => setFiltroForm({ ...filtroForm, categoria: e.target.value as CategoriaResiduo | "" })}
            >
              <option value="">Todas</option>
              <option value="SOLIDO">Sólido</option>
              <option value="EFLUENTE_QUIMICO">Efluente químico</option>
              <option value="MISTURA">Mistura</option>
              <option value="RESIDUO_MEDICO">Resíduo médico</option>
              <option value="CONSTRUCAO_CIVIL">Construção civil</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Quantidade mínima (kg)</label>
            <Input
              type="number"
              placeholder="1000"
              value={filtroForm.quantidadeMin}
              onChange={(e) => setFiltroForm({ ...filtroForm, quantidadeMin: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Classe de periculosidade</label>
            <select
              className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm"
              value={filtroForm.classePericulosidade}
              onChange={(e) => setFiltroForm({ ...filtroForm, classePericulosidade: e.target.value as ClassePericulosidade | "" })}
            >
              <option value="">Todas</option>
              <option value="CLASSE_I">Classe I - Perigoso</option>
              <option value="CLASSE_IIA">Classe II-A - Não inerte</option>
              <option value="CLASSE_IIB">Classe II-B - Inerte</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">Faixa de preço (R$)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filtroForm.precoMin}
                onChange={(e) => setFiltroForm({ ...filtroForm, precoMin: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Max"
                value={filtroForm.precoMax}
                onChange={(e) => setFiltroForm({ ...filtroForm, precoMax: e.target.value })}
              />
            </div>
          </div>

          <Button className="w-full" onClick={aplicarFiltros}>
            Aplicar filtros
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar resíduos..."
                className="pl-10"
                value={filtroForm.search}
                onChange={(e) => setFiltroForm({ ...filtroForm, search: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && aplicarFiltros()}
              />
            </div>

            <select
              className="px-3 py-2 bg-white border border-border rounded-lg text-sm"
              value={filtroForm.sort}
              onChange={(e) => {
                setFiltroForm({ ...filtroForm, sort: e.target.value });
                setFiltros({ ...filtros, sort: e.target.value });
              }}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === "map" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("map")}>
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {!loading && !error && viewMode === "grid" && (
            <>
              {data?.empty && (
                <div className="text-center py-16 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-40" />
                  <p>Nenhum resíduo encontrado com os filtros aplicados.</p>
                </div>
              )}
              <div className="grid grid-cols-3 gap-6">
                {data?.content.map((residuo) => (
                  <Card
                    key={residuo.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/marketplace/${residuo.id}`)}
                  >
                    <CardContent className="pt-6">
                      <div className="mb-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground" />
                      </div>

                      <h3 className="font-semibold text-foreground mb-2">{residuo.nome}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Categoria:</span>
                          <span className="text-foreground">{categoriaLabel[residuo.categoria] ?? residuo.categoria}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Quantidade:</span>
                          <span className="text-foreground">{residuo.quantidadeKg.toLocaleString("pt-BR")} kg</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Classe:</span>
                          <span className="text-foreground">{classeLabel[residuo.classePericulosidade] ?? residuo.classePericulosidade}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Distância:</span>
                          <span className="flex items-center gap-1 text-foreground">
                            <MapPin className="h-3 w-3" />
                            {residuo.distanciaKm} km
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">{residuo.compatibilidade}%</Badge>
                        <Badge variant={residuo.tipoOferta === "DOACAO" ? "outline" : "default"}>
                          {residuo.tipoOferta === "DOACAO" ? "Doação" : "Venda"}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-end pt-4 border-t border-border">
                        <Button size="sm" variant="outline">Ver detalhes</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {data && data.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={data.first}
                    onClick={() => setFiltros({ ...filtros, page: (filtros.page ?? 0) - 1 })}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Página {data.number + 1} de {data.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={data.last}
                    onClick={() => setFiltros({ ...filtros, page: (filtros.page ?? 0) + 1 })}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </>
          )}

          {!loading && viewMode === "map" && (
            <div className="h-full bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Map className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Vista de Mapa</p>
                <p className="text-sm">Visualização geográfica dos resíduos disponíveis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
