import { useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Package, Handshake, MessageSquare, TrendingUp, Plus, Search, MapPin } from "lucide-react";
import { Badge } from "../components/ui/badge";

export function DashboardPage() {
  const navigate = useNavigate();

  const kpis = [
    { label: "Resíduos cadastrados", value: "12", icon: Package, color: "text-primary" },
    { label: "Matches ativos", value: "8", icon: Handshake, color: "text-secondary" },
    { label: "Negociações em andamento", value: "5", icon: MessageSquare, color: "text-primary" },
    { label: "Economia gerada", value: "R$ 84.500", icon: TrendingUp, color: "text-success", highlight: true },
  ];

  const recentMatches = [
    {
      company: "Indústria Química ABC",
      material: "Resíduo químico classe 1",
      compatibility: 95,
      distance: 12,
    },
    {
      company: "Metalúrgica XYZ",
      material: "Escória de aço",
      compatibility: 88,
      distance: 8,
    },
    {
      company: "Cimenteira DEF",
      material: "Cinzas industriais",
      compatibility: 82,
      distance: 45,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da sua atividade na plataforma
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label} className={kpi.highlight ? "border-success" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className={`text-3xl font-bold mb-1 ${kpi.highlight ? "text-success" : "text-foreground"}`}>
                  {kpi.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {kpi.label}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button onClick={() => navigate("/residuos/novo")} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Cadastrar novo resíduo
        </Button>
        <Button variant="outline" onClick={() => navigate("/marketplace")} size="lg">
          <Search className="h-5 w-5 mr-2" />
          Explorar marketplace
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Matches */}
        <Card>
          <CardHeader>
            <CardTitle>Matches recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMatches.map((match, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                  <div className="flex-1">
                    <div className="font-medium text-foreground mb-1">
                      {match.company}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {match.material}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      {match.compatibility}% compatível
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                      {match.distance}km
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Empresas compatíveis próximas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2" />
                <p>Mapa de geolocalização</p>
                <p className="text-sm">8 empresas em um raio de 50km</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
