import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Plus, Package, Edit, Trash2 } from "lucide-react";

export function ResiduosPage() {
  const navigate = useNavigate();

  const residuos = [
    {
      id: 1,
      nome: "Escória de alto-forno",
      categoria: "Sólido",
      quantidade: 5000,
      status: "Publicado",
      matches: 8,
    },
    {
      id: 2,
      nome: "Resíduo de borracha",
      categoria: "Sólido",
      quantidade: 1200,
      status: "Publicado",
      matches: 3,
    },
    {
      id: 3,
      nome: "Óleo lubrificante usado",
      categoria: "Efluente químico",
      quantidade: 800,
      status: "Rascunho",
      matches: 0,
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Meus Resíduos</h1>
          <p className="text-muted-foreground">
            Gerencie seus resíduos cadastrados
          </p>
        </div>
        <Button onClick={() => navigate("/residuos/novo")}>
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar novo resíduo
        </Button>
      </div>

      <div className="space-y-4">
        {residuos.map((residuo) => (
          <Card key={residuo.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{residuo.nome}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Categoria: {residuo.categoria}</span>
                    <span>Quantidade: {residuo.quantidade} kg/mês</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{residuo.matches}</div>
                    <div className="text-xs text-muted-foreground">Matches</div>
                  </div>

                  <Badge variant={residuo.status === "Publicado" ? "default" : "secondary"}>
                    {residuo.status}
                  </Badge>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
