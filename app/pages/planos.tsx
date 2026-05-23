import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Check, Lock } from "lucide-react";

const features = [
  "Vitrine de compra e venda de resíduos",
  "Cadastro ilimitado de resíduos",
  "Matches com compradores via IA",
  "Negociações intermediadas pela NoWaste",
  "Indicadores ambientais e relatórios",
  "Suporte prioritário",
  "Contratos digitais",
];

export function PlanosPage() {
  return (
    <div className="p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Planos & Assinatura
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Acesse a plataforma completa com um único plano. A assinatura é obrigatória para utilizar o sistema.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <Card className="w-full max-w-md border-primary shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle>
              <div className="text-xl font-bold mb-3">Plano NoWaste</div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">R$ 600</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3 mb-8">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" size="lg">
              Assinar agora
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-2xl mx-auto bg-muted/30 border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm mb-1">Acesso restrito sem assinatura</p>
              <p className="text-sm text-muted-foreground">
                Sem um plano ativo, o acesso à plataforma fica bloqueado. Além da mensalidade,
                a NoWaste cobra uma comissão de{" "}
                <span className="font-medium text-foreground">5% sobre o valor</span> de cada
                negociação realizada.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
