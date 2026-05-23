import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Send, FileText, CheckCircle2 } from "lucide-react";

export function NegociacaoPage() {
  const [message, setMessage] = useState("");

  const messages = [
    {
      sender: "platform",
      content: "Olá! Recebemos um interesse no seu resíduo de escória. Um comprador deseja negociar um contrato trimestral.",
      time: "10:30",
    },
    {
      sender: "me",
      content: "Sim, temos disponibilidade. Qual seria a quantidade mensal necessária?",
      time: "10:35",
    },
    {
      sender: "platform",
      content: "O comprador informou que precisa de aproximadamente 5 toneladas/mês. O preço de R$ 150/ton está dentro do orçamento dele.",
      time: "10:42",
    },
    {
      sender: "me",
      content: "Perfeito. Podemos formalizar o contrato. Qual a preferência de logística?",
      time: "10:45",
    },
    {
      sender: "platform",
      content: "O comprador prefere retirada no local. Podemos prosseguir com o contrato?",
      time: "10:48",
    },
  ];

  const steps = [
    { label: "Negociação", active: true },
    { label: "Contrato", active: false },
    { label: "Logística", active: false },
    { label: "Reaproveitamento", active: false },
  ];

  return (
    <div className="p-8">
      {/* Status Tracker */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className={`flex items-center justify-center px-4 py-2 rounded-full ${
                step.active
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              }`}>
                {step.label}
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  step.active ? "bg-primary" : "bg-muted"
                }`} />
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
              <CardTitle>Negociação - Escória de alto-forno</CardTitle>
              <p className="text-sm text-muted-foreground">
                Intermediado pela NoWaste
              </p>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-6">
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] ${
                      msg.sender === "me" ? "text-right" : "text-left"
                    }`}>
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
              </div>
            </CardContent>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                      setMessage("");
                    }
                  }}
                />
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Deal Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Negócio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Material:</span>
                  <p className="font-medium">Escória de alto-forno</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantidade:</span>
                  <p className="font-medium">5 ton/mês</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Preço proposto:</span>
                  <p className="font-medium text-primary">R$ 150/ton</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className="mt-1">
                    <Badge>Em negociação</Badge>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Logística:</span>
                  <p className="font-medium">Retirada no local</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contract */}
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
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-8 w-8 text-muted-foreground" />
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

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    Li e concordo com os termos
                  </label>
                </div>

                <Button className="w-full" disabled>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Assinar / Aceitar termos
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Disponível após acordo final de preço e quantidade
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
