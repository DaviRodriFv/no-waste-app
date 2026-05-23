import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { ArrowLeft, ArrowRight, Check, Upload, Info, Truck, ScrollText } from "lucide-react";

type TipoVenda = "venda" | "doacao";
type Frete = "ofertante" | "negociar";

export function CadastrarResiduoPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [aceitouTermos, setAceitouTermos] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    composicao: "",
    classe: "",
    localizacao: "",
    prazo: "",
    tipoVenda: "venda" as TipoVenda,
    preco: "",
    frete: "ofertante" as Frete,
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    navigate("/residuos");
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
                s <= step
                  ? "bg-primary border-primary text-white"
                  : "border-border text-muted-foreground"
              }`}>
                {s < step ? <Check className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  s < step ? "bg-primary" : "bg-border"
                }`} />
              )}
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
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  <option value="solido">Sólido</option>
                  <option value="efluente">Efluente químico</option>
                  <option value="mistura">Mistura</option>
                  <option value="medico">Resíduo médico</option>
                  <option value="construcao">Construção civil</option>
                </select>
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
                  value={formData.composicao}
                  onChange={(e) => setFormData({ ...formData, composicao: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Classe de periculosidade</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg"
                  value={formData.classe}
                  onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  <option value="1">Classe I - Perigoso</option>
                  <option value="2a">Classe II-A - Não inerte</option>
                  <option value="2b">Classe II-B - Inerte</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Laudos / Fichas técnicas</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-7 w-7 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para fazer upload ou arraste o arquivo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, máx. 10MB</p>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-sm text-foreground">
                  Orçamento de custo de descarte
                </label>
                <p className="text-xs text-muted-foreground mb-2">
                  Documentos com o custo atual que sua empresa teria com o descarte convencional deste resíduo.
                  Isso ajuda a demonstrar o valor da solução NoWaste.
                </p>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-7 w-7 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para fazer upload ou arraste o arquivo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, máx. 10MB</p>
                </div>
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
                  value={formData.prazo}
                  onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
                />
              </div>

              {/* Tipo de oferta */}
              <div>
                <label className="block mb-2 text-sm text-foreground font-medium">Tipo de oferta</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoVenda: "venda" })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.tipoVenda === "venda"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Venda
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tipoVenda: "doacao", preco: "" })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.tipoVenda === "doacao"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Doação
                  </button>
                </div>
              </div>

              {/* Preço — só aparece em Venda */}
              {formData.tipoVenda === "venda" && (
                <div>
                  <label className="block mb-1.5 text-sm text-foreground">Preço (R$) — deixe em branco para 'A negociar'</label>
                  <Input
                    type="number"
                    placeholder="Ex: 500"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  />
                </div>
              )}

              {/* Frete */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-4 w-4 text-foreground" />
                  <label className="text-sm text-foreground font-medium">Custo do frete</label>
                </div>

                <Card className="border-muted bg-muted/20 mb-3">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-xs text-muted-foreground">
                      {formData.tipoVenda === "doacao"
                        ? "Na doação, o ofertante arca com o custo do frete por padrão."
                        : "Na venda, o ofertante arca com o custo do frete por padrão."}
                    </p>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frete: "ofertante" })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.frete === "ofertante"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    Ofertante paga (padrão)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, frete: "negociar" })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.frete === "negociar"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    A negociar
                  </button>
                </div>
              </div>

              {/* Termos de uso */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ScrollText className="h-4 w-4 text-foreground" />
                  <label className="text-sm text-foreground font-medium">Termos de uso e responsabilidade</label>
                </div>
                <div className="border border-border rounded-lg h-40 overflow-y-auto p-4 bg-muted/20 text-xs text-muted-foreground space-y-3 mb-4">
                  <p className="font-semibold text-foreground">Termos de Uso — Plataforma NoWaste</p>
                  <p>
                    Ao publicar um resíduo nesta plataforma, o ofertante declara e concorda com os seguintes termos:
                  </p>
                  <p>
                    <strong>1. Veracidade das informações.</strong> As informações fornecidas sobre o resíduo (composição, classe de periculosidade, quantidade, localização e prazo) são verdadeiras e correspondem à realidade. O ofertante é o único responsável por dados incorretos ou omitidos.
                  </p>
                  <p>
                    <strong>2. Conformidade legal.</strong> O ofertante declara que a geração, armazenagem e destinação do resíduo estão em conformidade com a legislação ambiental vigente, incluindo a Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010), as normas ABNT NBR 10.004 a 10.007 e demais regulamentações estaduais e municipais aplicáveis.
                  </p>
                  <p>
                    <strong>3. Documentação obrigatória.</strong> O ofertante se compromete a fornecer, quando solicitado, toda a documentação técnica pertinente ao resíduo, incluindo laudos laboratoriais, Fichas de Informações de Segurança (FISPQ) e Manifesto de Transporte de Resíduos (MTR), conforme exigido pela legislação.
                  </p>
                  <p>
                    <strong>4. Rastreabilidade.</strong> O ofertante autoriza a NoWaste a registrar e manter o histórico completo das transações e movimentações do resíduo, garantindo a cadeia de custódia e rastreabilidade exigida pelos órgãos ambientais.
                  </p>
                  <p>
                    <strong>5. Responsabilidade civil e ambiental.</strong> O ofertante reconhece sua corresponsabilidade civil e ambiental até a destinação final adequada do resíduo, nos termos do art. 30 da Lei nº 12.305/2010.
                  </p>
                  <p>
                    <strong>6. Uso de dados.</strong> Os dados cadastrados poderão ser utilizados pela NoWaste para fins de relatórios ambientais, certificações de economia circular e auditorias, respeitada a confidencialidade das partes conforme nossa Política de Privacidade.
                  </p>
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
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {step === 1 ? "Cancelar" : "Voltar"}
        </Button>
        <Button
          onClick={step === 3 ? handleSubmit : handleNext}
          disabled={step === 3 && !aceitouTermos}
        >
          {step === 3 ? "Publicar resíduo" : "Próximo"}
          {step < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
