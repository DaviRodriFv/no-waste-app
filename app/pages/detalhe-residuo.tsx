import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, Package, FileText, TrendingDown, ArrowLeft } from "lucide-react";

export function DetalheResiduoPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/marketplace")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Marketplace
      </Button>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <Package className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Escória de alto-forno
                  </h1>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="default">Reaproveitável</Badge>
                    <Badge variant="secondary">95% compatível</Badge>
                    <Badge>Classe II-B</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="ml-2 text-foreground">Sólido</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quantidade:</span>
                      <span className="ml-2 text-foreground">5.000 kg/mês</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Distância:</span>
                      <span className="ml-2 text-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        12 km
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Preço:</span>
                      <span className="ml-2 text-primary font-semibold">R$ 150/ton</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ficha Técnica Completa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Composição Química</h4>
                  <p className="text-sm text-muted-foreground">
                    CaO (35-45%), SiO₂ (30-40%), Al₂O₃ (8-15%), MgO (5-10%), Fe₂O₃ (0.5-2%)
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Classe de Periculosidade</h4>
                  <p className="text-sm text-muted-foreground">
                    Classe II-B - Resíduo inerte, não apresenta riscos à saúde ou meio ambiente
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Frequência de Geração</h4>
                  <p className="text-sm text-muted-foreground">
                    Mensal, com disponibilidade contínua
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Transporte</h4>
                  <div className="flex gap-2">
                    <Badge variant="outline">Fornecedor transporta</Badge>
                    <Badge variant="outline">Retirada no local</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Comparison */}
          <Card className="border-success">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingDown className="h-5 w-5" />
                Cenário SEM NoWaste × COM NoWaste
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">Sem NoWaste</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tratamento/Incineração:</span>
                      <span className="text-foreground font-medium">R$ 28.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Logística:</span>
                      <span className="text-foreground font-medium">R$ 3.500</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border font-semibold">
                      <span>Total:</span>
                      <span className="text-destructive">R$ 31.500</span>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-success">Com NoWaste</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tratamento/Incineração:</span>
                      <span className="text-foreground font-medium line-through">R$ 0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Logística:</span>
                      <span className="text-foreground font-medium">R$ 3.500</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border font-semibold">
                      <span>Total:</span>
                      <span className="text-success">R$ 3.500</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-success/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-success">Economia gerada:</span>
                  <span className="text-2xl font-bold text-success">R$ 28.000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Localização Aproximada
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>São Paulo - SP</p>
                  <p className="text-sm">12 km do seu local</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Sticky Sidebar */}
        <div className="col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Compatibilidade Técnica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-success">95%</span>
                  <Badge variant="default">Excelente</Badge>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success" style={{ width: "95%" }} />
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  Este resíduo é altamente compatível com seu processo produtivo. A composição química
                  atende aos requisitos para uso como insumo alternativo.
                </p>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Iniciar negociação
                </Button>
                <Button variant="outline" className="w-full">
                  Solicitar contato
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-sm">Informações adicionais</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Laudo técnico disponível</li>
                  <li>• Certificado de destinação</li>
                  <li>• Histórico de transações</li>
                  <li>• Contrato padrão disponível</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
