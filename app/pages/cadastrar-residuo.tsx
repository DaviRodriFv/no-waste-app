import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowLeft, ArrowRight, Check, Upload, Info } from "lucide-react";

export function CadastrarResiduoPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    quantidade: "",
    frequencia: "",
    composicao: "",
    classe: "",
    localizacao: "",
    prazo: "",
    transporte: "",
    preco: "",
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
          Publique seu resíduo industrial para encontrar compradores
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
              <Input
                label="Nome do resíduo"
                placeholder="Ex: Escória de alto-forno"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />

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

              <Input
                label="Quantidade (kg)"
                type="number"
                placeholder="Ex: 5000"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              />

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Frequência de geração</label>
                <select
                  className="w-full px-3 py-2 bg-white border border-border rounded-lg"
                  value={formData.frequencia}
                  onChange={(e) => setFormData({ ...formData, frequencia: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  <option value="mensal">Mensal</option>
                  <option value="trimestral">Trimestral</option>
                  <option value="anual">Anual</option>
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
                <label className="block mb-1.5 text-sm text-foreground">Upload de laudo/ficha técnica</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique para fazer upload ou arraste o arquivo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, máx. 10MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Input
                label="Localização"
                placeholder="Cidade, Estado"
                value={formData.localizacao}
                onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
              />

              <Input
                label="Prazo de disponibilidade"
                type="date"
                value={formData.prazo}
                onChange={(e) => setFormData({ ...formData, prazo: e.target.value })}
              />

              <div>
                <label className="block mb-1.5 text-sm text-foreground">Opções de transporte</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Fornecedor transporta</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">Retirada no local</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-sm">A combinar</span>
                  </label>
                </div>
              </div>

              <Input
                label="Preço (R$) ou deixe em branco para 'A negociar'"
                type="number"
                placeholder="Ex: 500"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
              />
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
        <Button onClick={step === 3 ? handleSubmit : handleNext}>
          {step === 3 ? "Publicar resíduo" : "Próximo"}
          {step < 3 && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
