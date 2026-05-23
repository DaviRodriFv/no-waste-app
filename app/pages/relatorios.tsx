import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { TrendingUp, Package, Leaf, DollarSign } from "lucide-react";

export function RelatoriosPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios</h1>
        <p className="text-muted-foreground">
          Análise de desempenho e impacto ambiental
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Economia Gerada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success mb-2">R$ 84.500</div>
            <p className="text-sm text-muted-foreground">Nos últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Resíduos Reaproveitados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">45 ton</div>
            <p className="text-sm text-muted-foreground">Total acumulado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success" />
              Impacto Ambiental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-success mb-2">12.3 tCO₂e</div>
            <p className="text-sm text-muted-foreground">Emissões evitadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Negociações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary mb-2">5</div>
            <p className="text-sm text-muted-foreground">Em andamento</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
