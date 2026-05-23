import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { LoginPage } from "./pages/login";
import { DashboardPage } from "./pages/dashboard";
import { MarketplacePage } from "./pages/marketplace";
import { DetalheResiduoPage } from "./pages/detalhe-residuo";
import { CadastrarResiduoPage } from "./pages/cadastrar-residuo";
import { ResiduosPage } from "./pages/residuos";
import { NegociacaoPage } from "./pages/negociacao";
import { PlanosPage } from "./pages/planos";
import { RelatoriosPage } from "./pages/relatorios";
import { DocumentosPage } from "./pages/documentos";
import { MainLayout } from "./components/layout/main-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/residuos" element={<ResiduosPage />} />
          <Route path="/residuos/novo" element={<CadastrarResiduoPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<DetalheResiduoPage />} />
          <Route path="/negociacoes" element={<NegociacaoPage />} />
          <Route path="/documentos" element={<DocumentosPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/planos" element={<PlanosPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}