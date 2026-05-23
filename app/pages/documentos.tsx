import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import {
  FileText, FileCheck, FileClock, Upload, Plus, Search,
  Plug, CheckCircle2, Clock, ArrowUpRight, ShieldCheck,
  FileSignature, Truck, ClipboardList,
} from "lucide-react";

const documentos = [
  {
    id: 1,
    nome: "Contrato de Destinação - Resíduo Metálico",
    tipo: "Contrato",
    residuo: "Sucata Metálica",
    parceiro: "MetalRecicla Ltda",
    data: "15/03/2026",
    status: "Ativo",
    vencimento: "15/03/2027",
  },
  {
    id: 2,
    nome: "MTR - Manifesto de Transporte de Resíduos",
    tipo: "Manifesto",
    residuo: "Óleo Lubrificante Usado",
    parceiro: "OleoRec S.A.",
    data: "02/04/2026",
    status: "Em análise",
    vencimento: "-",
  },
  {
    id: 3,
    nome: "Licença de Operação - Gerador",
    tipo: "Licença",
    residuo: "-",
    parceiro: "-",
    data: "10/01/2026",
    status: "Vigente",
    vencimento: "10/01/2027",
  },
  {
    id: 4,
    nome: "Contrato de Compra - Papelão e Papel",
    tipo: "Contrato",
    residuo: "Papelão e Papel",
    parceiro: "PapelCiclo ME",
    data: "20/02/2026",
    status: "Expirado",
    vencimento: "20/04/2026",
  },
];

const integracoes = [
  {
    id: "fdi",
    nome: "FDI — Homologação de Resíduos",
    descricao:
      "Homologação e certificação de resíduos industriais junto ao FDI. Gerencie laudos, classificações e aprovações diretamente na plataforma.",
    tags: ["Homologação", "Certificação", "Resíduos"],
    icon: ShieldCheck,
    status: "disponivel",
    acao: "Acessar",
  },
  {
    id: "d4sign",
    nome: "D4Sign — Assinatura Digital",
    descricao:
      "Assine contratos de destinação e termos de responsabilidade com validade jurídica usando certificado ICP-Brasil.",
    tags: ["Assinatura digital", "Contratos", "ICP-Brasil"],
    icon: FileSignature,
    status: "disponivel",
    acao: "Conectar",
  },
  {
    id: "sigor",
    nome: "SIGOR / MTR Online",
    descricao:
      "Emissão e gestão de Manifestos de Transporte de Resíduos (MTR) integrados ao sistema INEA para rastreabilidade completa.",
    tags: ["MTR", "INEA", "Transporte"],
    icon: Truck,
    status: "em_breve",
    acao: "Em breve",
  },
  {
    id: "clicksign",
    nome: "Clicksign",
    descricao:
      "Plataforma de assinatura eletrônica para formalização ágil de contratos entre geradores e destinadores de resíduos.",
    tags: ["Assinatura eletrônica", "Contratos"],
    icon: FileSignature,
    status: "disponivel",
    acao: "Conectar",
  },
  {
    id: "ibama",
    nome: "IBAMA CTF — Cadastro Técnico Federal",
    descricao:
      "Integração com o Cadastro Técnico Federal do IBAMA para verificação de habilitação de empresas e emissão de documentos regulatórios.",
    tags: ["IBAMA", "Regulatório", "Habilitação"],
    icon: ClipboardList,
    status: "em_breve",
    acao: "Em breve",
  },
];

const statusDocColor: Record<string, string> = {
  Ativo: "bg-success/10 text-success border-success/20",
  Vigente: "bg-success/10 text-success border-success/20",
  "Em análise": "bg-warning/10 text-warning border-warning/20",
  Expirado: "bg-destructive/10 text-destructive border-destructive/20",
};

const tipoIcon: Record<string, React.ElementType> = {
  Contrato: FileCheck,
  Manifesto: FileClock,
  Licença: FileText,
};

export function DocumentosPage() {
  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Documentos e Contratos
          </h1>
          <p className="text-muted-foreground">
            Gerencie contratos, manifestos, licenças e integrações de homologação
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Documento
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <FileCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contratos ativos</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <FileClock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em análise</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Plug className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Integrações disponíveis</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contratos">
        <TabsList className="mb-6">
          <TabsTrigger value="contratos" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contratos e Documentos
          </TabsTrigger>
          <TabsTrigger value="integracoes" className="flex items-center gap-2">
            <Plug className="h-4 w-4" />
            Integrações
          </TabsTrigger>
        </TabsList>

        {/* Aba: Contratos e Documentos */}
        <TabsContent value="contratos">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Todos os Documentos</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar documento..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentos.map((doc) => {
                  const Icon = tipoIcon[doc.tipo] ?? FileText;
                  return (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.residuo !== "-" && <span>{doc.residuo} · </span>}
                            {doc.parceiro !== "-" && <span>{doc.parceiro} · </span>}
                            <span>{doc.data}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1">Vencimento</p>
                          <p className="text-sm font-medium">{doc.vencimento}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={statusDocColor[doc.status] ?? ""}
                        >
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba: Integrações */}
        <TabsContent value="integracoes">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Conecte a NoWaste às plataformas externas para homologação de resíduos, assinatura de contratos e emissão de documentos regulatórios.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {integracoes.map((integracao) => {
              const Icon = integracao.icon;
              const disponivel = integracao.status === "disponivel";
              return (
                <Card
                  key={integracao.id}
                  className={`transition-colors ${disponivel ? "hover:border-primary/40" : "opacity-70"}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${disponivel ? "bg-primary/10" : "bg-muted"}`}>
                          <Icon className={`h-5 w-5 ${disponivel ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{integracao.nome}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {disponivel ? (
                              <>
                                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                                <span className="text-xs text-success">Disponível</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Em breve</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {integracao.descricao}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {integracao.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant={disponivel ? "default" : "outline"}
                      size="sm"
                      disabled={!disponivel}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      {disponivel && <ArrowUpRight className="h-4 w-4" />}
                      {!disponivel && <Clock className="h-4 w-4" />}
                      {integracao.acao}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
