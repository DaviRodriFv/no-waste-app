import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, FileCheck, FileClock, Upload, Plus, Search } from "lucide-react";
import { Input } from "../components/ui/input";

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

const statusColor: Record<string, string> = {
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
            Gerencie contratos, manifestos e licenças relacionados aos resíduos
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
              <div className="p-2 bg-destructive/10 rounded-lg">
                <FileText className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expirados</p>
                <p className="text-2xl font-bold text-foreground">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                      className={statusColor[doc.status] ?? ""}
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
    </div>
  );
}
