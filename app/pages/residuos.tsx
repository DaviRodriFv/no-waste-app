import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../components/ui/dialog";
import { Plus, Package, Trash2, Loader2, AlertCircle, Edit, Upload, X, FileText } from "lucide-react";
import { useResiduos, useDeletarResiduo, useAtualizarResiduo } from "@/hooks/useResiduos";
import { buscarResiduo, deletarDocumento } from "@/services/residuosService";
import type {
  CategoriaResiduo, StatusResiduo, ResiduoSummary,
  ClassePericulosidade, TipoOferta, DocumentoResponse,
} from "@/types/residuos";

const categoriaLabel: Record<CategoriaResiduo, string> = {
  SOLIDO: "Sólido",
  EFLUENTE_QUIMICO: "Efluente químico",
  MISTURA: "Mistura",
  RESIDUO_MEDICO: "Resíduo médico",
  CONSTRUCAO_CIVIL: "Construção civil",
};

const statusLabel: Record<StatusResiduo, string> = {
  ATIVO: "Publicado",
  INATIVO: "Inativo",
  PENDENTE: "Pendente",
};

const tipoDocLabel: Record<string, string> = {
  LAUDO_TECNICO: "Laudo Técnico",
  CONTRATO: "Contrato",
  MANIFESTO_MTR: "Manifesto MTR",
  LICENCA: "Licença",
  OUTRO: "Outro",
};

interface EditForm {
  nome: string;
  categoria: CategoriaResiduo | "";
  classePericulosidade: ClassePericulosidade | "";
  quantidadeKg: string;
  localizacao: string;
  prazoDisponibilidade: string;
  tipoOferta: TipoOferta;
  preco: string;
}

function fromSummary(r: ResiduoSummary): EditForm {
  return {
    nome: r.nome,
    categoria: r.categoria,
    classePericulosidade: r.classePericulosidade,
    quantidadeKg: String(r.quantidadeKg),
    localizacao: r.localizacao,
    prazoDisponibilidade: r.prazoDisponibilidade,
    tipoOferta: r.tipoOferta,
    preco: r.preco != null ? String(r.preco) : "",
  };
}

export function ResiduosPage() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useResiduos();
  const { deletar, loading: deletando } = useDeletarResiduo();
  const { atualizar, loading: salvando, error: erroEdicao } = useAtualizarResiduo();

  const [editando, setEditando] = useState<ResiduoSummary | null>(null);
  const [form, setForm] = useState<EditForm | null>(null);
  const [documentos, setDocumentos] = useState<DocumentoResponse[]>([]);
  const [loadingDetalhe, setLoadingDetalhe] = useState(false);
  const [deletandoDocId, setDeletandoDocId] = useState<number | null>(null);
  const [laudoFiles, setLaudoFiles] = useState<File[]>([]);
  const [transportadora, setTransportadora] = useState("");

  const laudoRef = useRef<HTMLInputElement>(null);

  const abrirEdicao = async (r: ResiduoSummary) => {
    setEditando(r);
    setForm(fromSummary(r));
    setLoadingDetalhe(true);
    try {
      const detalhe = await buscarResiduo(r.id);
      setDocumentos(detalhe.documentos);
    } catch {
      setDocumentos([]);
    } finally {
      setLoadingDetalhe(false);
    }
  };

  const fecharEdicao = () => {
    setEditando(null);
    setForm(null);
    setDocumentos([]);
    setLaudoFiles([]);
    setTransportadora("");
  };

  const handleRemoverDoc = async (docId: number) => {
    if (!editando) return;
    setDeletandoDocId(docId);
    try {
      await deletarDocumento(editando.id, docId);
      setDocumentos((prev) => prev.filter((d) => d.id !== docId));
    } finally {
      setDeletandoDocId(null);
    }
  };

  const handleSalvar = async () => {
    if (!editando || !form) return;
    await atualizar(editando.id, {
      nome: form.nome,
      categoria: form.categoria as CategoriaResiduo,
      classePericulosidade: form.classePericulosidade as ClassePericulosidade,
      quantidadeKg: Number(form.quantidadeKg),
      localizacao: form.localizacao,
      prazoDisponibilidade: form.prazoDisponibilidade,
      tipoOferta: form.tipoOferta,
      preco: form.preco ? Number(form.preco) : null,
      frete: "OFERTANTE",
      aceitouTermos: true,
      laudoTecnico: laudoFiles,
    });
    fecharEdicao();
    refetch();
  };

  const handleDelete = async (id: number) => {
    await deletar(id);
    refetch();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Meus Resíduos</h1>
          <p className="text-muted-foreground">Gerencie seus resíduos cadastrados</p>
        </div>
        <Button onClick={() => navigate("/residuos/novo")}>
          <Plus className="h-4 w-4 mr-2" />
          Cadastrar novo resíduo
        </Button>
      </div>

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

      {!loading && !error && (
        <div className="space-y-4">
          {data?.content.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Nenhum resíduo cadastrado ainda.</p>
              <Button className="mt-4" onClick={() => navigate("/residuos/novo")}>
                Cadastrar primeiro resíduo
              </Button>
            </div>
          )}

          {data?.content.map((residuo) => (
            <Card key={residuo.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{residuo.nome}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Categoria: {categoriaLabel[residuo.categoria] ?? residuo.categoria}</span>
                      <span>Quantidade: {residuo.quantidadeKg.toLocaleString("pt-BR")} kg</span>
                      <span>Localização: {residuo.localizacao}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={residuo.status === "ATIVO" ? "default" : "secondary"}>
                      {statusLabel[residuo.status] ?? residuo.status}
                    </Badge>

                    <Button variant="outline" size="sm" onClick={() => abrirEdicao(residuo)}>
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={deletando}
                      onClick={() => handleDelete(residuo.id)}
                    >
                      {deletando ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Edição */}
      <Dialog open={!!editando} onOpenChange={(open) => !open && fecharEdicao()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Resíduo</DialogTitle>
          </DialogHeader>

          {form && (
            <div className="space-y-4 py-2">
              {erroEdicao && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {erroEdicao}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block mb-1.5 text-sm font-medium">Nome do resíduo</label>
                  <Input
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium">Categoria</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value as CategoriaResiduo })}
                  >
                    <option value="SOLIDO">Sólido</option>
                    <option value="EFLUENTE_QUIMICO">Efluente químico</option>
                    <option value="MISTURA">Mistura</option>
                    <option value="RESIDUO_MEDICO">Resíduo médico</option>
                    <option value="CONSTRUCAO_CIVIL">Construção civil</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium">Classe de periculosidade</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm"
                    value={form.classePericulosidade}
                    onChange={(e) => setForm({ ...form, classePericulosidade: e.target.value as ClassePericulosidade })}
                  >
                    <option value="CLASSE_I">Classe I - Perigoso</option>
                    <option value="CLASSE_IIA">Classe II-A - Não inerte</option>
                    <option value="CLASSE_IIB">Classe II-B - Inerte</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium">Quantidade (kg)</label>
                  <Input
                    type="number"
                    value={form.quantidadeKg}
                    onChange={(e) => setForm({ ...form, quantidadeKg: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium">Localização</label>
                  <Input
                    placeholder="Cidade, Estado"
                    value={form.localizacao}
                    onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium">Prazo de disponibilidade</label>
                  <Input
                    type="date"
                    value={form.prazoDisponibilidade}
                    onChange={(e) => setForm({ ...form, prazoDisponibilidade: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-sm font-medium">Tipo de oferta</label>
                  <select
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm"
                    value={form.tipoOferta}
                    onChange={(e) => setForm({ ...form, tipoOferta: e.target.value as TipoOferta, preco: "" })}
                  >
                    <option value="VENDA">Venda</option>
                    <option value="DOACAO">Doação</option>
                  </select>
                </div>


                {form.tipoOferta === "VENDA" && (
                  <div className="col-span-2">
                    <label className="block mb-1.5 text-sm font-medium">
                      Preço (R$) — deixe em branco para "A negociar"
                    </label>
                    <Input
                      type="number"
                      placeholder="Ex: 500"
                      value={form.preco}
                      onChange={(e) => setForm({ ...form, preco: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* Transportadora */}
              <div className="col-span-2">
                <label className="block mb-1.5 text-sm font-medium">Transportadora parceira</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm"
                  value={transportadora}
                  onChange={(e) => setTransportadora(e.target.value)}
                >
                  <option value="">Selecione uma transportadora...</option>
                  <option value="TEGMA">Tegma Gestão Logística</option>
                  <option value="JSL">JSL Logística</option>
                  <option value="BRASPRESS">Braspress Transportes</option>
                  <option value="PATRUS">Patrus Transportes</option>
                  <option value="RODONAVES">Rodonaves Transportes</option>
                  <option value="GOLLOG">Gollog</option>
                  <option value="LOCALFRIO">Localfrio</option>
                </select>
              </div>

              {/* Documentos existentes */}
              <div className="pt-2">
                <label className="block mb-2 text-sm font-medium">Documentos anexados</label>
                {loadingDetalhe ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Carregando documentos...
                  </div>
                ) : documentos.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum documento anexado.</p>
                ) : (
                  <div className="space-y-2">
                    {documentos.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{doc.nomeArquivo}</p>
                            <p className="text-xs text-muted-foreground">
                              {tipoDocLabel[doc.tipoDocumento] ?? doc.tipoDocumento} · {(doc.tamanhoBytes / 1024).toFixed(0)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive shrink-0 ml-2"
                          disabled={deletandoDocId === doc.id}
                          onClick={() => handleRemoverDoc(doc.id)}
                        >
                          {deletandoDocId === doc.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upload de novos arquivos */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block mb-1.5 text-sm font-medium">Laudos / Fichas técnicas (novos)</label>
                  <input
                    ref={laudoRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const novos = Array.from(e.target.files ?? []);
                      setLaudoFiles((prev) => [...prev, ...novos]);
                      if (laudoRef.current) laudoRef.current.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => laudoRef.current?.click()}
                    className="w-full flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Upload className="h-4 w-4 shrink-0" />
                    <span>Adicionar arquivos</span>
                  </button>
                  {laudoFiles.length > 0 && (
                    <ul className="mt-1 space-y-1">
                      {laudoFiles.map((f, i) => (
                        <li key={i} className="flex items-center justify-between gap-2 text-xs text-primary">
                          <span className="truncate">{f.name}</span>
                          <button
                            type="button"
                            onClick={() => setLaudoFiles((prev) => prev.filter((_, j) => j !== i))}
                            className="text-destructive hover:underline shrink-0"
                          >
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={fecharEdicao} disabled={salvando}>
              Cancelar
            </Button>
            <Button onClick={handleSalvar} disabled={salvando}>
              {salvando ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Salvando...</>
              ) : (
                "Salvar alterações"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
