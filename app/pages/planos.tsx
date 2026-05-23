import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, Sparkles } from "lucide-react";

export function PlanosPage() {
  const plans = [
    {
      name: "Básico",
      price: "R$ 499",
      period: "/mês",
      popular: false,
      features: [
        "Vitrine de compra e venda",
        "Até 10 resíduos cadastrados",
        "Matches básicos",
        "Suporte por email",
        "Relatórios mensais",
      ],
    },
    {
      name: "Profissional",
      price: "R$ 999",
      period: "/mês",
      popular: true,
      features: [
        "Vitrine de compra e venda",
        "Resíduos ilimitados",
        "Matches ilimitados com IA",
        "Indicadores ambientais avançados",
        "Análise de eficiência circular",
        "Suporte prioritário",
        "Relatórios semanais personalizados",
        "API de integração",
      ],
    },
    {
      name: "Empresarial",
      price: "R$ 2.499",
      period: "/mês",
      popular: false,
      features: [
        "Tudo do Profissional, mais:",
        "Consultoria técnica especializada",
        "Múltiplas unidades/plantas",
        "Gestão de equipe",
        "Relatórios customizados",
        "Gerente de conta dedicado",
        "Treinamento presencial",
        "SLA garantido",
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Planos & Assinatura
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Escolha o plano ideal para sua empresa. Todos os planos incluem comissão de intermediação
          sobre negociações realizadas.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${
              plan.popular
                ? "border-primary shadow-lg scale-105"
                : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Mais popular
                </div>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-xl font-bold mb-2">{plan.name}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                Assinar plano
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-4xl mx-auto bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Comissão de Intermediação</h3>
            <p className="text-sm text-muted-foreground">
              Além da assinatura mensal, a NoWaste cobra uma comissão de{" "}
              <span className="font-medium text-foreground">5% sobre o valor</span> de cada
              negociação realizada pela plataforma. Essa comissão garante a manutenção do
              ecossistema, verificação de empresas, e suporte técnico contínuo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
