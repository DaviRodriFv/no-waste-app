import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { MapPin, Package, FileText, ArrowLeft, Loader2, AlertCircle, Download } from "lucide-react";
import { useResiduo } from "@/hooks/useResiduos";
import { getDownloadUrl } from "@/services/residuosService";
import type { CategoriaResiduo, ClassePericulosidade, TipoFrete } from "@/types/residuos";

const categoriaLabel: Record<CategoriaResiduo, string> = {
  SOLIDO: "Sólido",
  EFLUENTE_QUIMICO: "Efluente químico",
  MISTURA: "Mistura",
  RESIDUO_MEDICO: "Resíduo médico",
  CONSTRUCAO_CIVIL: "Construção civil",
};

const classeLabel: Record<ClassePericulosidade, string> = {
  CLASSE_I: "Classe I - Perigoso",
  CLASSE_IIA: "Classe II-A - Não inerte",
  CLASSE_IIB: "Classe II-B - Inerte",
};

const freteLabel: Record<TipoFrete, string> = {
  OFERTANTE: "Fornecedor transporta",
  NEGOCIAR: "A negociar",
};

export function DetalheResiduoPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: residuo, loading, error } = useResiduo(id ? parseInt(id) : null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !residuo) {
    return (
      <div className="p-8">
        <Button variant="ghost" onClick={() => navigate("/marketplace")} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Marketplace
        </Button>
        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm">{error ?? "Resíduo não encontrado."}</span>
        </div>
      </div>
    );
  }

  const formatPreco = () => {
    if (residuo.tipoOferta === "DOACAO") return "Doação";
    if (residuo.preco == null) return "A negociar";
    return `R$ ${residuo.preco.toLocaleString("pt-BR")}/ton`;
  };

  return (
    <div className="p-8">
      <Button variant="ghost" onClick={() => navigate("/marketplace")} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Marketplace
      </Button>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center shrink-0">
                  <Package className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{residuo.nome}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="default">Reaproveitável</Badge>
                    <Badge>{classeLabel[residuo.classePericulosidade] ?? residuo.classePericulosidade}</Badge>
                    <Badge variant={residuo.tipoOferta === "DOACAO" ? "outline" : "default"}>
                      {residuo.tipoOferta === "DOACAO" ? "Doação" : "Venda"}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Categoria:</span>
                      <span className="ml-2 text-foreground">{categoriaLabel[residuo.categoria] ?? residuo.categoria}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Quantidade:</span>
                      <span className="ml-2 text-foreground">{residuo.quantidadeKg.toLocaleString("pt-BR")} kg</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Localização:</span>
                      <span className="ml-2 text-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{residuo.localizacao}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Preço:</span>
                      <span className="ml-2 text-primary font-semibold">{formatPreco()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Disponível até:</span>
                      <span className="ml-2 text-foreground">
                        {new Date(residuo.prazoDisponibilidade).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Frete:</span>
                      <span className="ml-2 text-foreground">{freteLabel[residuo.frete]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Ficha Técnica Completa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {residuo.composicaoQuimica && (
                  <div>
                    <h4 className="font-medium mb-2">Composição Química</h4>
                    <p className="text-sm text-muted-foreground">{residuo.composicaoQuimica}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-medium mb-2">Classe de Periculosidade</h4>
                  <p className="text-sm text-muted-foreground">
                    {classeLabel[residuo.classePericulosidade] ?? residuo.classePericulosidade}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Transporte</h4>
                  <Badge variant="outline">{freteLabel[residuo.frete]}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {residuo.documentos.filter(d => d.tipoDocumento === "LAUDO_TECNICO").length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Laudos Técnicos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {residuo.documentos.filter(d => d.tipoDocumento === "LAUDO_TECNICO").map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="text-sm font-medium">{doc.nomeArquivo}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.tipoDocumento.replace("_", " ")} · {(doc.tamanhoBytes / 1024).toFixed(0)} KB
                        </p>
                      </div>
                      <a href={getDownloadUrl(residuo.id, doc.id)} download>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

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
                  <p>{residuo.localizacao}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Informações da Oferta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tipo:</span>
                  <span className="font-medium">{residuo.tipoOferta === "DOACAO" ? "Doação" : "Venda"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Preço:</span>
                  <span className="font-semibold text-primary">{formatPreco()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantidade:</span>
                  <span className="font-medium">{residuo.quantidadeKg.toLocaleString("pt-BR")} kg</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Disponível até:</span>
                  <span className="font-medium">
                    {new Date(residuo.prazoDisponibilidade).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => navigate(`/negociacoes/${residuo.id}`)}>
                  Iniciar negociação
                </Button>
                <Button variant="outline" className="w-full">Solicitar contato</Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2 text-sm">Informações adicionais</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {residuo.documentos.filter(d => d.tipoDocumento === "LAUDO_TECNICO").length > 0 && (
                    <li>• {residuo.documentos.filter(d => d.tipoDocumento === "LAUDO_TECNICO").length} laudo(s) técnico(s) disponível(is)</li>
                  )}
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
