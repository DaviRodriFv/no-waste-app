import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Leaf, TrendingDown, Shield } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              src="/styles/assets/nowastelogo.jpeg"
              alt="NoWaste"
              className="h-16 object-contain mx-auto mb-4"
            />
            <p className="text-muted-foreground">Acesse sua conta corporativa</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              type="email"
              placeholder="Email corporativo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full">
              Entrar
            </Button>

            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-secondary hover:underline">
                Esqueci a senha
              </a>
              <a href="#" className="text-secondary hover:underline">
                Criar conta da empresa
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Brand Panel */}
      <div className="flex-1 bg-primary p-12 flex flex-col justify-center text-white">
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Transforme resíduo em oportunidade
          </h2>

          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Leaf className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Economia Circular</h3>
                <p className="text-white/80 text-sm">
                  Conecte sua empresa ao ecossistema de simbiose industrial
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <TrendingDown className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Redução de Custos</h3>
                <p className="text-white/80 text-sm">
                  Economize em tratamento de resíduos e compra de insumos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Conformidade Ambiental</h3>
                <p className="text-white/80 text-sm">
                  Documentação completa e rastreabilidade garantida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
