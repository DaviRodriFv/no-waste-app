import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Search, SlidersHorizontal, Grid3x3, Map, MapPin, Package } from "lucide-react";

export function MarketplacePage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const residuos = [
    {
      id: 1,
      nome: "Escória de alto-forno",
      categoria: "Sólido",
      quantidade: 5000,
      distancia: 12,
      preco: "R$ 150/ton",
      compatibilidade: 95,
      tipo: "Venda",
    },
    {
      id: 2,
      nome: "Resíduo químico classe 1",
      categoria: "Efluente químico",
      quantidade: 2000,
      distancia: 8,
      preco: "A negociar",
      compatibilidade: 88,
      tipo: "Venda",
    },
    {
      id: 3,
      nome: "Cinzas industriais",
      categoria: "Sólido",
      quantidade: 8000,
      distancia: 45,
      preco: "Doação",
      compatibilidade: 82,
      tipo: "Doação",
    },
    {
      id: 4,
      nome: "Resíduo de construção civil",
      categoria: "Construção civil",
      quantidade: 15000,
      distancia: 22,
      preco: "R$ 20/ton",
      compatibilidade: 76,
      tipo: "Venda",
    },
    {
      id: 5,
      nome: "Lodo de tratamento",
      categoria: "Efluente químico",
      quantidade: 3500,
      distancia: 18,
      preco: "R$ 200/ton",
      compatibilidade: 90,
      tipo: "Venda",
    },
    {
      id: 6,
      nome: "Sucata metálica",
      categoria: "Sólido",
      quantidade: 12000,
      distancia: 35,
      preco: "Doação",
      compatibilidade: 85,
      tipo: "Doação",
    },
  ];

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
            <label className="block mb-2 text-sm font-medium text-foreground">
              Categoria
            </label>
            <select className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm">
              <option>Todas</option>
              <option>Sólido</option>
              <option>Efluente químico</option>
              <option>Mistura</option>
              <option>Construção civil</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">
              Distância máxima (km)
            </label>
            <Input type="number" placeholder="50" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">
              Quantidade mínima (kg)
            </label>
            <Input type="number" placeholder="1000" />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">
              Classe de periculosidade
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm">Classe I</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm">Classe II-A</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm">Classe II-B</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-foreground">
              Faixa de preço
            </label>
            <div className="flex gap-2">
              <Input type="number" placeholder="Min" />
              <Input type="number" placeholder="Max" />
            </div>
          </div>

          <Button className="w-full">Aplicar filtros</Button>
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
              />
            </div>

            <select className="px-3 py-2 bg-white border border-border rounded-lg text-sm">
              <option>Relevância</option>
              <option>Distância</option>
              <option>Preço</option>
              <option>Quantidade</option>
            </select>

            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-6">
              {residuos.map((residuo) => (
                <Card
                  key={residuo.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/marketplace/${residuo.id}`)}
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 h-32 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>

                    <h3 className="font-semibold text-foreground mb-2">
                      {residuo.nome}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Categoria:</span>
                        <span className="text-foreground">{residuo.categoria}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Quantidade:</span>
                        <span className="text-foreground">{residuo.quantidade} kg</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Distância:</span>
                        <span className="flex items-center gap-1 text-foreground">
                          <MapPin className="h-3 w-3" />
                          {residuo.distancia} km
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="default">Reaproveitável</Badge>
                      <Badge variant="secondary">{residuo.compatibilidade}%</Badge>
                      <Badge variant={residuo.tipo === "Doação" ? "outline" : "default"}>
                        {residuo.tipo}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="font-semibold text-primary">
                        {residuo.tipo === "Doação" ? "Doação" : residuo.preco}
                      </span>
                      <Button size="sm" variant="outline">
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
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
