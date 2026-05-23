import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Upload, Info, Truck, ScrollText, Loader2, AlertCircle, FileCheck2 } from "lucide-react";
import { useCriarResiduo } from "@/hooks/useResiduos";
import type { CategoriaResiduo, ClassePericulosidade, TipoOferta } from "@/types/residuos";

export function CadastrarResiduoPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { criar, loading: salvando, error: erroApi } = useCriarResiduo();

  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [laudos, setLaudos] = useState<File[]>([]);
  const [transportadora, setTransportadora] = useState("");
  const laudoRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "" as CategoriaResiduo | "",
    quantidadeKg: "",
    composicaoQuimica: "",
    classePericulosidade: "" as ClassePericulosidade | "",
    localizacao: "",
    prazoDisponibilidade: "",
    tipoOferta: "VENDA" as TipoOferta,
    preco: "",
  });

  const handleNext = () => { if (step < 3) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = async () => {
    try {
      await criar({
        nome: formData.nome,
        categoria: formData.categoria as CategoriaResiduo,
        composicaoQuimica: formData.composicaoQuimica || undefined,
        classePericulosidade: formData.classePericulosidade as ClassePericulosidade,
        localizacao: formData.localizacao,
        prazoDisponibilidade: formData.prazoDisponibilidade,
        tipoOferta: formData.tipoOferta,
        preco: formData.preco ? Number(formData.preco) : null,
        frete: "OFERTANTE",
        quantidadeKg: Number(formData.quantidadeKg),
        aceitouTermos,
        laudoTecnico: laudos,
      });
      navigate("/residuos");
    } catch {
      // erro capturado pelo hook, exibido abaixo
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Cadastrar Resíduo</h1>
        <p className="text-muted-foreground">
          Publique seu resíduo industrial para encontrar compradores ou donatários
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                s <= step ? "bg-primary border-primary text-white" : "border-border text-muted-foreground"
              }`}>
                {s < step ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 mx-2 ${s < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-2xl mx-auto mt-2">
          <span className="text-sm text-muted-foreground">Identificação</span>
          <span className="text-sm text-muted-foreground">Caracterização</span>
          <span className="text-sm text-muted-foreground">Disponibilidade</span>
        </div>
      </div>

      {/* Info Box */}
      <Card className="mb-6 border-secondary/30 bg-secondary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Seus dados são protegidos por anonimização parcial e confidencialidade garantida por contrato.
              Apenas empresas verificadas têm acesso às informações completas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Erro da API */}
      {erroApi && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive mb-4">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm">{erroApi}</span>
        </div>
      )}

      {/* Form Steps */}
      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Identificação do Resíduo"}
            {step === 2 && "Caracterização Técnica"}
            {step === 3 && "Disponibilidade & Logística"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 text-sm text-foreground">Nome do resíduo</label>
                <Input
                  placeholder="Ex: Escória de alto-forno"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Categoria</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value as CategoriaResiduo })}
                >
                  <option value="">Selecione...</option>
                  <option value="SOLIDO">Sólido</option>
                  <option value="EFLUENTE_QUIMICO">Efluente químico</option>
                  <option value="MISTURA">Mistura</option>
                  <option value="RESIDUO_MEDICO">Resíduo médico</option>
                  <option value="CONSTRUCAO_CIVIL">Construção civil</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Quantidade disponível (kg)</label>
                <Input
                  type="number"
                  placeholder="Ex: 5000"
                  value={formData.quantidadeKg}
                  onChange={(e) => setFormData({ ...formData, quantidadeKg: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5 text-sm text-foreground">Composição química</label>
                <textarea
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg min-h-[100px]"
                  placeholder="Descreva a composição química do resíduo..."
                  value={formData.composicaoQuimica}
                  onChange={(e) => setFormData({ ...formData, composicaoQuimica: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Classe de periculosidade</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg"
                  value={formData.classePericulosidade}
                  onChange={(e) => setFormData({ ...formData, classePericulosidade: e.target.value as ClassePericulosidade })}
                >
                  <option value="">Selecione...</option>
                  <option value="CLASSE_I">Classe I - Perigoso</option>
                  <option value="CLASSE_IIA">Classe II-A - Não inerte</option>
                  <option value="CLASSE_IIB">Classe II-B - Inerte</option>
                </select>
              </div>

              {/* Upload Laudo */}
              <div>
                <label className="block mb-1.5 text-sm text-foreground">Laudos / Fichas técnicas</label>
                <input
                  ref={laudoRef}
                  type="file"
                  accept="application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const novos = Array.from(e.target.files ?? []);
                    setLaudos((prev) => [...prev, ...novos]);
                    if (laudoRef.current) laudoRef.current.value = "";
                  }}
                />
                <div
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
                  onClick={() => laudoRef.current?.click()}
                >
                  <Upload className="h-7 w-7 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Clique para adicionar arquivos</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, máx. 10MB por arquivo</p>
                </div>
                {laudos.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {laudos.map((f, i) => (
                      <li key={i} className="flex items-center justify-between gap-2 text-sm text-primary">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileCheck2 className="h-4 w-4 shrink-0" />
                          <span className="truncate">{f.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setLaudos((prev) => prev.filter((_, j) => j !== i))}
                          className="text-xs text-destructive hover:underline shrink-0"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-1.5 text-sm text-foreground">Localização</label>
                <Input
                  placeholder="Cidade, Estado"
                  value={formData.localizacao}
                  onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Prazo de disponibilidade</label>
                <Input
                  type="date"
                  value={formData.prazoDisponibilidade}
                  onChange={(e) => setFormData({ ...formData, prazoDisponibilidade: e.target.value })}
                />
              </div>

              {/* Tipo de oferta */}
              <div>
                <label className="block mb-2 text-sm text-foreground font-medium">Tipo de oferta</label>
                <div className="flex gap-3">
                  {(["VENDA", "DOACAO"] as TipoOferta[]).map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => setFormData({ ...formData, tipoOferta: tipo, preco: tipo === "DOACAO" ? "" : formData.preco })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.tipoOferta === tipo
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {tipo === "VENDA" ? "Venda" : "Doação"}
                    </button>
                  ))}
                </div>
              </div>

              {formData.tipoOferta === "VENDA" && (
                <div className="space-y-2">
                  <label className="block mb-1.5 text-sm text-foreground">Preço (R$) — deixe em branco para 'A negociar'</label>
                  <Input
                    type="number"
                    placeholder="Ex: 500"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  />
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
                    <Info className="h-4 w-4 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-medium">Comissão NoWaste: 10% sobre o valor da venda.</span>
                      {formData.preco && Number(formData.preco) > 0 && (
                        <span className="block mt-0.5 text-amber-700">
                          Sobre R$ {Number(formData.preco).toLocaleString("pt-BR")}, a comissão será de{" "}
                          <strong>R$ {(Number(formData.preco) * 0.1).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>{" "}
                          e você receberá{" "}
                          <strong>R$ {(Number(formData.preco) * 0.9).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Transportadora */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-foreground" />
                  <label className="text-sm text-foreground font-medium">Transportadora parceira</label>
                </div>
                <select
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg"
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

              {/* Termos de uso */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ScrollText className="h-4 w-4 text-foreground" />
                  <label className="text-sm text-foreground font-medium">Termos de uso e responsabilidade</label>
                </div>
                <div className="border border-border rounded-lg h-40 overflow-y-auto p-4 bg-muted/20 text-xs text-muted-foreground space-y-3 mb-4">
                  <p className="font-semibold text-foreground">Termos de Uso — Plataforma NoWaste</p>
                  <p>Ao publicar um resíduo nesta plataforma, o ofertante declara e concorda com os seguintes termos:</p>
                  <p><strong>1. Veracidade das informações.</strong> As informações fornecidas sobre o resíduo são verdadeiras e correspondem à realidade. O ofertante é o único responsável por dados incorretos ou omitidos.</p>
                  <p><strong>2. Conformidade legal.</strong> O ofertante declara conformidade com a legislação ambiental vigente, incluindo a Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010) e as normas ABNT NBR 10.004 a 10.007.</p>
                  <p><strong>3. Documentação obrigatória.</strong> O ofertante se compromete a fornecer laudos laboratoriais, FISPQ e Manifesto de Transporte de Resíduos (MTR) quando solicitado.</p>
                  <p><strong>4. Rastreabilidade.</strong> O ofertante autoriza a NoWaste a registrar e manter o histórico completo das transações, garantindo a cadeia de custódia exigida pelos órgãos ambientais.</p>
                  <p><strong>5. Responsabilidade civil e ambiental.</strong> O ofertante reconhece sua corresponsabilidade até a destinação final adequada do resíduo, nos termos do art. 30 da Lei nº 12.305/2010.</p>
                  <p><strong>6. Uso de dados.</strong> Os dados poderão ser utilizados para relatórios ambientais, certificações e auditorias, respeitada a Política de Privacidade da NoWaste.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="aceite-termos"
                    checked={aceitouTermos}
                    onCheckedChange={(v) => setAceitouTermos(v === true)}
                  />
                  <label htmlFor="aceite-termos" className="text-sm text-foreground leading-snug cursor-pointer">
                    Li e aceito os <span className="text-primary underline">Termos de Uso</span> e declaro que as informações fornecidas são verdadeiras, assumindo total responsabilidade civil e ambiental pela destinação deste resíduo.
                  </label>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={step === 1 ? () => navigate("/residuos") : handleBack}
          disabled={salvando}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {step === 1 ? "Cancelar" : "Voltar"}
        </Button>
        <Button
          onClick={step === 3 ? handleSubmit : handleNext}
          disabled={(step === 3 && !aceitouTermos) || salvando}
        >
          {salvando ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Publicando...
            </>
          ) : (
            <>
              {step === 3 ? "Publicar resíduo" : "Próximo"}
              {step < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
