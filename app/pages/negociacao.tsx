import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Send, FileText, CheckCircle2, MapPin, Loader2, AlertCircle, Download, ArrowLeft } from "lucide-react";
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

const tipoDocLabel: Record<string, string> = {
  LAUDO_TECNICO: "Laudo Técnico",
  CONTRATO: "Contrato",
  MANIFESTO_MTR: "Manifesto MTR",
  LICENCA: "Licença",
  OUTRO: "Outro",
};

interface ChatMessage {
  sender: "me" | "platform";
  content: string;
  time: string;
}

const steps = ["Negociação", "Contrato", "Logística", "Reaproveitamento"];

function nowTime() {
  return new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function NegociacaoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: residuo, loading, error } = useResiduo(id ? parseInt(id) : null);

  const [termoAceito, setTermoAceito] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: "platform",
      content: "Bem-vindo à negociação! A NoWaste intermediará esta conversa para garantir transparência e rastreabilidade. Como posso ajudar?",
      time: "10:30",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: "me", content: message.trim(), time: nowTime() },
    ]);
    setMessage("");
  };

  if (!id) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>Selecione um resíduo no marketplace para iniciar uma negociação.</p>
        <Button className="mt-4" onClick={() => navigate("/marketplace")}>
          Ir ao Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      {/* Status Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className={`flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${
                idx === 0 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
              }`}>
                {step}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${idx === 0 ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b border-border">
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">Carregando...</span>
                </div>
              ) : (
                <>
                  <CardTitle>
                    Negociação — {residuo?.nome ?? "Resíduo"}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Intermediado pela NoWaste</p>
                </>
              )}
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-6">
              <div className="space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                      <p className="text-xs text-muted-foreground mb-1">
                        {msg.sender === "me" ? "Você" : "NoWaste"} • {msg.time}
                      </p>
                      <div className={`inline-block px-4 py-2 rounded-lg ${
                        msg.sender === "me"
                          ? "bg-primary text-white"
                          : "bg-secondary/20 text-foreground border border-secondary/30"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </CardContent>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button onClick={handleSend} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Resumo do Negócio */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Negócio</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-destructive text-xs">
                  <AlertCircle className="h-4 w-4" />
                  <span>Erro ao carregar dados do resíduo.</span>
                </div>
              )}
              {!loading && residuo && (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Material:</span>
                    <p className="font-medium">{residuo.nome}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Categoria:</span>
                    <p className="font-medium">{categoriaLabel[residuo.categoria] ?? residuo.categoria}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Classe:</span>
                    <p className="font-medium">{classeLabel[residuo.classePericulosidade] ?? residuo.classePericulosidade}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quantidade:</span>
                    <p className="font-medium">{residuo.quantidadeKg.toLocaleString("pt-BR")} kg</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Frete:</span>
                    <p className="font-medium">{freteLabel[residuo.frete]}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Localização:</span>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="h-3 w-3" />{residuo.localizacao}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Disponível até:</span>
                    <p className="font-medium">
                      {new Date(residuo.prazoDisponibilidade).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="mt-1">
                      <Badge>Em negociação</Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Laudos e Documentos */}
          {!loading && residuo && residuo.documentos.filter(d => d.tipoDocumento === "LAUDO_TECNICO").length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Laudos e Documentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {residuo.documentos.filter(d => d.tipoDocumento === "LAUDO_TECNICO").map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{doc.nomeArquivo}</p>
                        <p className="text-xs text-muted-foreground">
                          {tipoDocLabel[doc.tipoDocumento] ?? doc.tipoDocumento} · {(doc.tamanhoBytes / 1024).toFixed(0)} KB
                        </p>
                      </div>
                      <a href={getDownloadUrl(residuo.id, doc.id)} download className="ml-2 shrink-0">
                        <Button variant="ghost" size="sm">
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contrato */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contrato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Contrato de confidencialidade e responsabilidade técnica
                </p>

                <div className="border border-border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Contrato Padrão NoWaste</p>
                      <p className="text-xs text-muted-foreground">PDF • 245 KB</p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Visualizar contrato
                </Button>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    checked={termoAceito}
                    onChange={(e) => setTermoAceito(e.target.checked)}
                  />
                  Li e concordo com os termos
                </label>

                <Button className="w-full" disabled={!termoAceito}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Assinar / Aceitar termos
                </Button>

                {!termoAceito && (
                  <p className="text-xs text-muted-foreground text-center">
                    Disponível após aceitar os termos acima
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
